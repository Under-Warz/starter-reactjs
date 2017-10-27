import { injectReducer } from '../../store/reducers';

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use require callback to define
        dependencies for bundling   */
    
    const Counter = require('../../views/Counter').default;
    const reducer = require('../../reducers/counter').default;

    /*  Add the reducer to the store on key 'counter'  */
    injectReducer(store, { key: 'counter', reducer });

    /*  Return getComponent   */
    cb(null, Counter);
  }
});