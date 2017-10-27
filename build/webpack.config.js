const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const project = require('../project.config');

const inProject = path.resolve.bind(path, project.basePath);
const inProjectSrc = (file) => inProject(project.srcDir, file);

const __DEV__ = project.env === 'development';
const __STG__ = project.env === 'staging';
const __PROD__ = project.env === 'production';

const config = {
  entry: {
    normalize: [
      'babel-polyfill',
      'whatwg-fetch',
    ],
    main: [
      inProjectSrc(project.jsDir+'/'+project.main),
    ],
  },
  devtool: __DEV__ ? (project.sourcemaps ? 'eval-source-map' : false) : false,
  output: {
    path: inProject(project.outDir),
    filename: __DEV__ ? (project.jsDir+'/[name].js') : (project.jsDir+'/[name].[chunkhash].js'),
    publicPath: project.publicPath,
  },
  resolve: {
    modules: [
      inProject(project.srcDir),
      'node_modules',
    ],
    alias: {
      assets: inProjectSrc(project.assetsDir),
    },
    extensions: ['*', '.js', '.jsx', '.scss', '.sass', '.css', '.json'],
  },
  externals: project.externals,
  module: {
    rules: [],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(project.env) },
      __DEV__,
      __STG__,
      __PROD__,
    }, project.globals))
  ],
};

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        [
          'babel-plugin-transform-runtime', {
            helpers: true,
            polyfill: true,
            regenerator: true,
          },
        ],
        [
          'babel-plugin-transform-object-rest-spread', {
            useBuiltIns: true
          },
        ],
      ],
      presets: [
        'babel-preset-react',
        ['babel-preset-env', {
          modules: false,
          targets: Object.assign({}, project.targetEnvironment, { uglify: true }),
        }],
      ],
    },
  }],
});

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: project.stylesDir+'/[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__,
});

config.module.rules.push({
  test: /\.(sass|scss)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: __DEV__ ? project.sourcemaps : false,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: project.targetEnvironment.browsers,
            },
            discardComments: {
              removeAll: true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: __DEV__ ? project.sourcemaps : false,
          },
          localIdentName: __DEV__ ? '[path][name]--[local]' : '[hash:base64]',
          url: __DEV__ ? true : false,
        },
      },
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: __DEV__ ? project.sourcemaps : false,
          includePaths: [
            inProjectSrc(project.stylesDir),
          ],
        },
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            inProjectSrc(project.stylesDir+'/base/_grid-settings.scss'),
            inProjectSrc(project.stylesDir+'/base/_variables.scss'),
            inProjectSrc(project.stylesDir+'/base/_mixins.scss'),
            inProjectSrc(project.stylesDir+'/generated/_icons.scss'),
          ],
        },
      },
    ],
  }),
});
config.plugins.push(extractStyles);


// Images
// ------------------------------------
config.module.rules.push({
  test: /\.(png|jpe?g|gif)$/,
  loader: 'url-loader',
  options: {
    limit: 8192,
  },
});
// Optimize images loaded via script (imported in js)
config.module.rules.push({
  test: /\.(png|jpe?g|gif)$/,
  loader: 'image-webpack-loader',
  options: {
    mozjpeg: {
      progressive: true,
      quality: 95,
    },
    gifsicle: {
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 4,
    },
    pngquant: {
      quality: '75-90',
      speed: 3
    },
    svgo:{
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
    }
  },
});

// Fonts
// ------------------------------------
[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0];
  const mimetype = font[1];

  config.module.rules.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: 'fonts/[name].[ext]',
      limit: 10000,
      mimetype,
    },
  });
});

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.tmpl.html'),
  inject: true,
  /*minify: {
    collapseWhitespace: true,
  },*/
}));

// Development Tools
// ------------------------------------
if (__DEV__) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );

  config.devServer = {
    contentBase: inProject(project.srcDir),
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  };
}

// Staging / Production Optimizations
// ------------------------------------
if (__STG__ || __PROD__) {
  // Remove 'outDir' directory if exists
  const pathsToClean = [
    project.outDir
  ];
  const cleanOptions = {
    root: project.basePath,
    verbose: true
  };
  config.plugins.push(
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  );

  // Bundle vendors
  const bundles = ['normalize', 'manifest'];
  if (project.vendors && project.vendors.length) {
    bundles.unshift('vendor');
    config.entry.vendor = project.vendors;
  }
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: bundles }));

  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false,
      compress: {
        drop_console: true,
        drop_debugger: true,
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    })
  );

  config.plugins.push(
    new CopyWebpackPlugin([
      { from: inProject(project.srcDir+'/'+project.i18nDir), to: inProject(project.outDir+'/'+project.i18nDir) },
      { from: inProject(project.srcDir+'/'+project.assetsDir+'/datas'), to: inProject(project.outDir+'/'+project.assetsDir+'/datas') },
      { from: inProject(project.srcDir+'/'+project.assetsDir+'/fonts'), to: inProject(project.outDir+'/'+project.assetsDir+'/fonts') },
      { from: inProject(project.srcDir+'/'+project.assetsDir+'/vendors'), to: inProject(project.outDir+'/'+project.assetsDir+'/vendors') },
      { from: inProject(project.srcDir+'/favicon.ico'), to: inProject(project.outDir+'/') },
    ])
  );
}

module.exports = config;
