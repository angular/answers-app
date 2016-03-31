import {
  FnArg, 
  ClientMessageBroker,
  ClientMessageBrokerFactory,
  ServiceMessageBrokerFactory,
  UiArguments,
  PRIMITIVE
} from 'angular2/platform/worker_app';
import {RenderStoreObject} from 'angular2/src/web_workers/shared/serializer';
import {ElementRef, ElementRef_} from 'angular2/src/core/linker/element_ref';

declare var WorkerGlobalScope;

let num = 1;
let obj = {};
let serializationMap = {};
serializationMap[ElementRef.toString()] = RenderStoreObject;
serializationMap[obj.constructor.toString()] = PRIMITIVE;
serializationMap[[].constructor.toString()] = PRIMITIVE;
serializationMap[false.constructor.toString()] = PRIMITIVE;
serializationMap["".constructor.toString()] = PRIMITIVE;
serializationMap[num.constructor.toString()] = PRIMITIVE;

export interface MethodMetadata {
  name: string,
  args: [Function],
  returnType?: Function
}

export interface RenderServiceMetadata {
  methods: [MethodMetadata]
}

export function RenderService (metadata: RenderServiceMetadata) {
  return function(target) {
    let channelName = target.toString()
    if (isWorker()) {
      let state = {
        channelName: channelName,
        broker: null
      };
      var nativeMethods = {};
      for (var i = 0; i < metadata.methods.length; i++) {
        let method = metadata.methods[i];
        patchMethod(target, method, state);
      }
    } else {
      target.prototype.ngStartListening = function() {
        let brokerFactory = this.injector.get(ServiceMessageBrokerFactory);
        let broker = brokerFactory.createMessageBroker(channelName, true);
        for (var i = 0; i < metadata.methods.length; i++) {
          let methodInfo = metadata.methods[i];
          let methodName = methodInfo.name;
          let args = metadata.methods[i].args.map((v) => 
            serializationMap[v.toString()] ? serializationMap[v.toString()] : v);
          broker.registerMethod(methodName, args,
              target.prototype[methodName].bind(this), methodInfo.returnType);
        }
      }
    }
  }
}

function patchMethod(target: any, methodInfo: MethodMetadata, state: ServiceState) {
  target.prototype[methodInfo.name] = function() {
    if (state.broker == null) {
      let brokerFactory: ClientMessageBrokerFactory = 
        this.injector.get(ClientMessageBrokerFactory);
      state.broker = brokerFactory.createMessageBroker(state.channelName, true);
    }
    let broker = state.broker;
    let args = [];
    for (var i = 0; i < arguments.length; i++) {
      let val = arguments[i];
      if (val) {
        let type = methodInfo.args[i];
        if (type == ElementRef) {
          val = val.nativeElement;
        }
        if (serializationMap[type.toString()]) {
          type = serializationMap[type.toString()];
        }
        args.push(new FnArg(val, type));
      } else {
        // val may be null, undefined, etc...
        args.push(val, PRIMITIVE);
      }
    }
    broker.runOnService(new UiArguments(methodInfo.name, args), methodInfo.returnType);
  }
}

function isWorker() {
  return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
}

interface ServiceState {
  channelName: string;
  broker: ClientMessageBroker
}
