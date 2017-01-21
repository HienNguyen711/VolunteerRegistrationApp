var gulp  = require('gulp');
var gutil     = require('gulp-util');
var webserver = require('gulp-webserver');
var minifyCSS = require('gulp-minify-css');
var rename    = require('gulp-rename');
var sass      = require('gulp-sass');
var uglify    = require('gulp-uglify');
var concat    = require('gulp-concat');

//mainindex task
gulp.task('mainindex', function() {
  return gulp.src('builds/development/index.html')
    .pipe(gulp.dest('builds/production'))
});
//js task
gulp.task('js', function() {
  gulp.src(['builds/development/js/**/*.js', 'builds/development/js/*.js'])
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('builds/production'));
});
//views task
gulp.task('views', function() {
  return gulp.src('builds/development/views/*.html')
    .pipe(gulp.dest('builds/production/views'))
});
//sass compile
gulp.task('sass', function() {
  return gulp.src('builds/development/components/sass/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('builds/production'));
});
//watch changes
gulp.task('watch', function() {
  gulp.watch('builds/development/js/**/*', ['js']);
  gulp.watch(['builds/development/components/sass/*.scss',
    'builds/development/components/sass/pages/*.scss'], ['sass']);
  gulp.watch('builds/development/*.html', ['index']);
  gulp.watch('builds/development/views/*.html', ['views']);
});
//webserver
gulp.task('webserver', function() {
  gulp.src('builds/production/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'mainindex', 'views', 'js', 'sass', 'webserver']);
