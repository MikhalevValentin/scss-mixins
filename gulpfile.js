"use strict";

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

//server connect
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        port: 3400,
        livereload: true
    });
});

//scss
gulp.task('css', function () {
    return gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(prefix('last 25 versions'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(notify("CSS compile OK!"))
        .pipe(connect.reload());
});

//html
gulp.task('html', function () {
    gulp.src('app/index.html')
        .pipe(notify("HTML change OK!"))
        .pipe(connect.reload());
})

//watch
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['css'])
    gulp.watch('app/index.html', ['html'])
})

//default
gulp.task('default', ['connect', 'html', 'css', 'watch']);