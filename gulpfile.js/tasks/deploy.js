var gulp    = require('gulp');
var ghPages = require('gulp-gh-pages');

var config  = require('../config');


//___________________________________ functions
//
var deploy = function() {
  return gulp.src(config.root.dest+'/**/*', { dot: true })
    .pipe(ghPages());
};


//___________________________________ tasks
//
gulp.task('deploy', deploy);

module.exports = deploy;