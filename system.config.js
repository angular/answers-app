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
			'reflect-metadata': 'node_modules/reflect-metadata/temp/Reflect.js',
			'zone.js': 'node_modules/zone.js/dist/zone.js',
			firebase: 'node_modules/firebase/lib/firebase-web.js',
      angularfire2: 'node_modules/angularfire2/dist'
		},
		packages: {
			app: {
				defaultExtension: 'ts',
				main: 'main.ts'
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
        main: 'angularfire.js'
      }
		}
});
