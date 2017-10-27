var gulp      = require('gulp');
var modernizr = require('gulp-modernizr');
var uglify    = require('gulp-uglify');

var config    = require('../config');


//___________________________________ functions
//
var modernizrDev = function() {
  gulp.src(config.root.src + '/' + config.tasks.js.src + '/**/*.*')
    .pipe(modernizr({
      cache : false,
      excludeTests: []
    }))
    .pipe(gulp.dest(config.root.src + '/' + config.tasks.js.src))
};

var modernizrProd = function() {
  gulp.src(config.root.src + '/' + config.tasks.js.src + '/**/*.*')
    .pipe(modernizr({
      cache : false,
      excludeTests: []
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.root.dest + '/' + config.tasks.js.dest))
};


//___________________________________ tasks
//
gulp.task('modernizrDev', modernizrDev);

gulp.task('modernizrProd', modernizrProd);