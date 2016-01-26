const copy  = (gulp, config) => {
	
	gulp.task('copy:dev', () => {
		return gulp.src(config.staticFiles)
		  .pipe(gulp.dest(config.dist));
	});
        gulp.task('copy:service-worker', () => {
                return gulp.src(['node_modules/angular2-service-worker/dist/worker.js'])
                  .pipe(gulp.dest(config.dist));
        });
	
}

export {copy};
