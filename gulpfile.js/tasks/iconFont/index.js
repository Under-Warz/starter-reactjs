var config = require('../../config')
if (!config.tasks.iconFont) return;

var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var generateIconSass = require('./generateIconSass');
var handleErrors     = require('../../lib/handleErrors');
var package          = require('../../../package.json')
var path             = require('path');
var url              = require('url');

var fontPath = path.join(config.root.assetsSrc, config.tasks.iconFont.dest);
var cssPath = path.join(config.root.src, config.tasks.css.src);

var settings = {
  name: package.name + ' icons',
  src: path.join(config.root.assetsSrc, config.tasks.iconFont.src, '/*.svg'),
  dest: path.join(config.root.assetsSrc, config.tasks.iconFont.dest, '/icons'),
  sassDest: path.join(config.root.src, config.tasks.css.src, config.tasks.iconFont.sassDest),
  template: path.normalize('./gulpfile.js/tasks/iconFont/template.scss'),
  sassOutputName: '_icons.scss',
  fontPath: url.resolve('.', path.relative(cssPath, fontPath))+'/icons',
  className: 'icon',
  options: {
    svg: true,
    timestamp: 0,
    fontName: 'icons',
    prependUnicode: true,
    normalize: true,
    descent: 256,
    fontHeight: 1792,
    centerHorizontally: false,
    fixedWidth: false,
    formats: config.tasks.iconFont.extensions
  }
};


//___________________________________ functions
//
var iconFontTask = function() {
  return gulp.src(settings.src)
    .pipe(iconfont(settings.options))
    .on('glyphs', generateIconSass(settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest))
};


//___________________________________ tasks
//
gulp.task('iconfont', iconFontTask);

module.exports = iconFontTask;