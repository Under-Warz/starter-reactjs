var gulp      = require('gulp');
var watch     = require('gulp-watch');
var path      = require('path');

var config    = require('../config');


//___________________________________ functions
//
var watchTask = function() {
  var iconsSrc = path.join(config.root.assetsSrc, config.tasks.iconFont.src, '/*.svg');
  
  watch(iconsSrc, function() {
    gulp.start('iconfont');
  });
};

//___________________________________ tasks
//
gulp.task('watch', watchTask);

module.exports = watchTask;
