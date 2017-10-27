var gulp      = require('gulp');
var useref    = require('gulp-useref');
var gulpif    = require('gulp-if');
var uglify    = require('gulp-uglify');

var config    = require('../config');


//___________________________________ functions
//
var userefTask = function() {
  return gulp.src(config.root.dest + '/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest(config.root.dest));
}

//___________________________________ tasks
//
gulp.task('useref', userefTask);

module.exports = userefTask;
