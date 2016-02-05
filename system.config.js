System.config({
		transpiler: 'typescript',
		typescriptOptions: {
    	emitDecoratorMetadata: true
  	},
		map: {
			typescript: 'node_modules/typescript/lib/typescript.js',
			app: './src',
			angular2: 'node_modules/angular2',
			rxjs: 'node_modules/rxjs',
      parse5: 'node_modules/parse5',
			'reflect-metadata': 'node_modules/reflect-metadata/temp/Reflect.js',
			'zone.js': 'node_modules/zone.js/dist/zone.js',
			firebase: 'node_modules/firebase/lib/firebase-web.js',
      angularfire2: 'node_modules/angularfire2'
		},
		packages: {
			'app/worker': {
				defaultExtension: 'ts',
				main: 'main_worker.ts'
			},
			'app/ui': {
				defaultExtension: 'ts',
				main: 'main_ui.ts'
			},
			'app/shared': {
				defaultExtension: 'ts'
			},
      app: {
				defaultExtension: 'ts'
      },
			angular2: {
				defaultExtension: 'js',
			},
			rxjs: {
				defaultExtension: 'js'
			},
			'reflect-metadata': {
				format: 'global'
			},
      angularfire2: {
        defaultExtension: 'js',
        main: 'angularfire2.js'
      },
      parse5: {
        defaultExtension: 'js'
      }
		}
});
