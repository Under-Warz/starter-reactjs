var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var mozjpeg = require('imagemin-mozjpeg');
var pngquant = require('imagemin-pngquant');
var path     = require('path');

var config   = require('../config');


//___________________________________ functions
//
var imageminTask = function() {
  var src = path.join(config.root.assetsSrc, config.tasks.imagemin.src, '/**');
  var dest = path.join(config.root.assetsDest, config.tasks.imagemin.dest);

  return gulp.src(src)
    /*.pipe(imagemin({
      progressive: true,
      interlaced: false,
      multipass: true,
      svgoPlugins: [
        { removeTitle: true },
        { convertPathData: false }
      ],
      use: [
        pngquant({
          floyd: 0.5,
          speed: 10,
          quality: 80
        })
      ]
    }))*/
    .pipe(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.gifsicle({
        interlaced: false
      }),
      imagemin.optipng({
        optimizationLevel: 4
      }),
      imagemin.svgo({
        plugins: [
          {
            removeTitle: true
          },
          {
            convertPathData: false
          },
          {
            removeViewBox: false
          },
          {
            removeEmptyAttrs: false
          }
        ]
      }),
      mozjpeg({
        progressive: true,
        quality: 95
      }),
      pngquant({
        quality: '75-90',
        speed: 3
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(dest));
};

//___________________________________ tasks
//
gulp.task('imagemin', imageminTask);

module.exports = imageminTask;