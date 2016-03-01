//TODO: service worker stuffs

System.config({
	map: {
		app: 'src/app/ts/main.ts'
	}
});

System.import('app').catch(function(err){
	console.log(err);
});
