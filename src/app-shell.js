//TODO: service worker stuffs

System.config({
	map: {
		app: 'src/ui/main_ui.ts'
	}
});

System.import('app').catch(function(err){
	console.log(err);
});
