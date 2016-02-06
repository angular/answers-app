importScripts("angular2-polyfills.js", "./system.js", "./vendor_worker.js", "./app_worker.js");

System.config({
	map: {
		app: 'src/worker/main_worker.ts'
	}
});

System.import('app').catch(function(err) {
  console.error(err);
});
