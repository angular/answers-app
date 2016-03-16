declare var require;

const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');

const copy  = (gulp, config) => {
	
	gulp.task('copy:dev', () => {
		return gulp.src(config.staticFiles)
		  .pipe(gulp.dest(config.dist));
	});
  
  gulp.task('clean:docker:h2o', () => del(['docker/dist/h2o']));
  gulp.task('clean:docker:universal', () => del(['docker/dist/universal']));
	
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
  
  gulp.task('!copy:dockerfile:h2o', () => gulp
    .src(['docker/Dockerfile.h2o'], {base: 'docker'})
    .pipe(rename(path => path.extname = ''))
    .pipe(gulp.dest('docker/dist/h2o')));

  gulp.task('!copy:docker:h2o', ['!copy:dockerfile:h2o'], () => gulp
    .src([
      'dist/**',
      'docker/h2o.conf',
      'server/**'
    ], {base: process.cwd()})
    .pipe(gulp.dest('docker/dist/h2o')));
    
  gulp.task('!copy:dockerfile:universal', () => gulp
    .src(['docker/Dockerfile.universal'], {base: 'docker'})
    .pipe(rename(path => path.extname = ''))
    .pipe(gulp.dest('docker/dist/universal')));

  gulp.task('!copy:docker:universal', ['!copy:dockerfile:universal'], () => gulp
    .src([
      'dist/**',
      'package.json',
    ], {base: process.cwd()})
    .pipe(gulp.dest('docker/dist/universal')));
}

export {copy};