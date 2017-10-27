const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** The full path to the project's root directory */
  basePath: __dirname,
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The name of the directory containing the application source code */
  jsDir: 'js',
  /** The name of the directory containing the application source code */
  stylesDir: 'styles',
  /** The name of the directory containing the internationalization files */
  i18nDir: 'i18n',
  /** The name of the directory containing the assets of the project */
  assetsDir: 'assets',
  /** The file name of the application's entry point */
  main: 'main',
  /** The name of the directory i which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/',
  /** Whether to generate sourcemaps */
  sourcemaps: true,
  /** A hash map of keys that the compiler should treat as external to the projects */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {},
  /** hashmap of target environments the code must run in (see https://github.com/babel/babel-preset-env#targets */
  targetEnvironment: {
    browsers: [
      'chrome >= 43',
      'firefox >= 39',
      'ie >= 9',
      'edge >= 12',
      'safari >= 8',
    ]
  },
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router',
  ],
};