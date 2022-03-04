'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')(require('node-sass'));
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
	return gulp.src('common/scss/main.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulp.dest('common/compiled'))
});

gulp.task('scripts', function () {
	return gulp.src('common/js/main.js')
		.pipe(
			webpack({
				mode: 'production',
				output: {
					filename: 'main.js',
				},
			})
		)
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('common/compiled'));
});

gulp.task('default', function () {
	gulp.watch('common/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('common/js/**/*.js', gulp.series('scripts'));
});

gulp.task('build', gulp.series('scripts', 'sass'));