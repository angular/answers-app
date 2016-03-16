declare var require;

const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');

const copy  = (gulp, config) => {
	
	gulp.task('copy:dev', () => {
		return gulp.src(config.staticFiles)
		  .pipe(gulp.dest(config.dist));
	});
  
  gulp.task('clean:docker:h2o', () => del(['docker/h2o']));
  gulp.task('clean:docker:universal', () => del(['docker/universal']));
	
  gulp.task('copy:docker', ['copy:docker:h2o', 'copy:docker:universal']);
  
  gulp.task('copy:docker:h2o', (done) => runSequence(
    ['default', 'clean:docker:h2o'],
    '!copy:docker:h2o',
    done
  ));

  gulp.task('copy:docker:universal', (done) => runSequence(
    ['default', 'clean:docker:universal'],
    '!copy:docker:universal',
    done
  ));
  
  gulp.task('!copy:docker:h2o', () => gulp
    .src([
      'dist/**',
      'h2o.conf',
      'Dockerfile.h2o',
      'server/**'
    ], {base: process.cwd()})
    .pipe(rename(path => {
      if (path.extname == '.h2o') {
        path.extname = '';
      }
    }))
    .pipe(gulp.dest('docker/h2o')));
    
    
  gulp.task('!copy:docker:universal', () => gulp
    .src([
      'dist/**',
      'package.json',
      'Dockerfile.universal',
    ], {base: process.cwd()})
    .pipe(rename(path => {
      if (path.extname == '.universal') {
        path.extname = '';
      }
    }))
    .pipe(gulp.dest('docker/universal')));
}

export {copy};