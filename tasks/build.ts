declare var require;

const sass = require('gulp-sass');
const inline = require('gulp-inline');
const minifyCSS = require('gulp-minify-css');
const path = require('path');
const swPrecache = require('sw-precache');

export const build = (gulp, config) => {
  
  gulp.task('default', ['build', 'build:sw-precache']);

	gulp.task('build', ['compile:sass','compile:app','copy:dev'], () => {

		gulp.src(config.index)
  		.pipe(inline({
    		base: 'dist',
				css: minifyCSS,
    		disabledTypes: ['img', 'js'], // Only inline css files
    	}))
  		.pipe(gulp.dest('dist/'));

	});
  
  gulp.task('build:sw-precache', ['build'], (done) => {
    swPrecache.write(
      'dist/service-worker.js',
      {
        staticFileGlobs: [
          'dist/**/*.{css,html,jpg,js,png,svg}',
          '!dist/service-worker.js'
        ],
        stripPrefix: 'dist'
      },
      done);
  });


}