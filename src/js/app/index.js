// import vendors
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

// import classes
import BreakpointsHelper from './core/breakpoints_helper';
import Bootstrapper from './bootstrapper';
import createStore from './store/createStore';
import * as CssUtils from './utils/css_utils';

// import styles
import '../../styles/main';


class App {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor() {
    FastClick.attach(document.body);

    this._init();
  }


  //________________________________________________________
  // -                                       PRIVATE METHODS
  _init() {
    if (Modernizr.touchevents)
      CssUtils.addClass(document.querySelector('html'), 'touch');
    else
      CssUtils.addClass(document.querySelector('html'), 'no-touch');

    BreakpointsHelper.getInstance().init();

    this._bootstrapper = new Bootstrapper();

    Promise.resolve(this._bootstrapper.execute())
      .catch(() => this._build(false))
      .then(() => this._build(true))
  }


  _build(success) {
    if (!success) {
      console.error('Error while loading bootstrapper files.');
      return;
    }

    // Store Initialization
    // ------------------------------------
    const store = createStore(window.__INITIAL_STATE__);

    // Render Setup
    // ------------------------------------
    const MOUNT_NODE = document.getElementById('root');

    let render = () => {
      const App = require('./components/App').default;
      const routes = require('./routes/index').default(store);

      ReactDOM.render(
        <App store={store} routes={routes} />,
        MOUNT_NODE
      );

      // Development Tools
      // ------------------------------------
      if (__DEV__) {
        if (module.hot) {
          const renderApp = render;
          const renderError = (error) => {
            const RedBox = require('redbox-react').default;

            ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
          };

          // Wrap render in try/catch
          render = () => {
            try {
              renderApp();
            } catch(e) {
              console.error(e);
              renderError(e);
            }
          };

          // setup hot module replacement
          module.hot.accept([
            './components/App',
            './routes/index',
          ], () =>
            setTimeout(() => {
              ReactDOM.unmountComponentAtNode(MOUNT_NODE);
              render();
            })
          );
        }
      }
    }

    // ========================================================
    // Render
    // ========================================================
    render();
  }

}
export default App;
