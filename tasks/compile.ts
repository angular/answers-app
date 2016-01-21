declare var require;

var Builder = require('systemjs-builder');
var util = require('gulp-util');
var ts = require('gulp-typescript');

export const compile = (gulp, config) => {
  gulp.task('compile:main-server', () => {
    return gulp.src('src/**/*.ts')
      .pipe(ts({
        noImplicitAny: false,
        typescript: require('typescript'),
        module: 'commonjs',
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        moduleResolution: 'node'
      }))
      .pipe(gulp.dest('dist/app'));
  });

	gulp.task('compile:app', ['compile:vendor'], () => {

		let builder = new Builder();

		return builder.loadConfig(config.system.configFile)
		  .then(() => {
				return builder.bundle('app - dist/vendor.js', 'dist/app.js', {minify: util.env.production})
			})
	});

	gulp.task('compile:vendor', [], () => {

		let builder = new Builder();

		return builder.loadConfig(config.system.configFile)
		  .then(() => {
				return builder.bundle('app - [app/**/*]', 'dist/vendor.js', {minify: util.env.production})
			})
	});

	gulp.task('compile:serviceworker', [], () => {

		let builder = new Builder();

		return builder.loadConfig(config.system.configFile)
		  .then(() => {
				return builder.buildStatic('app/ng2-service-worker', 'dist/worker.js', {minify: util.env.production})
			})
	});
}
