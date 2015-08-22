var gulp = require('gulp');
var changed = require('gulp-changed');
var connect = require('gulp-connect');
var browserify = require("browserify");
var babelify = require("babelify");
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var DEST = "./dist";


// Watch changes
gulp.task('watch', function(){
	gulp.watch(['./app/**/*.html'], ['reloadHtml']);
	gulp.watch(['./app/**/*.js'], ['reloadJs']);
	gulp.watch(['./app/**/*.css'], ['reloadStyles']);
});


// Reload
gulp.task('reloadHtml', ['buildHtml'], function() {
	return gulp.src(DEST+'/**/*.html')
		.pipe(connect.reload());
});
 
gulp.task('reloadJs', ['buildJs'], function() {
   	return gulp.src(DEST+'/src/**/*.js')
		 .pipe(connect.reload());
});

gulp.task('reloadStyles', ['buildStyles'], function() {
	return gulp.src(DEST+'/styles/*.css')
		.pipe(connect.reload());
});
 
// Build
gulp.task('buildJs', function() {
	return browserify({
		entries: './app/src/app.module.js',
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('bundle.js'))
  	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
  	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(DEST+'/src'));
});

gulp.task("buildHtml", function () {
	return gulp.src(['./app/**/*.html'])
		.pipe(changed(DEST))
		.pipe(gulp.dest(DEST));
});

gulp.task("buildStyles", function () {
	return gulp.src('./app/styles/**/*.css', {base: 'app'})
		.pipe(changed(DEST))
		.pipe(gulp.dest(DEST));
});


// Server 
gulp.task('connect', function() {
  connect.server({
    root: DEST,
    livereload: true
  });
});

 
// Start the tasks
gulp.task('build', ['buildJs', 'buildHtml', 'buildStyles']);
gulp.task('default', ['watch'], function() {
	runSequence('connect','build');
});
