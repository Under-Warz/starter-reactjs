import { injectReducer } from '../../store/reducers';

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use require callback to define
        dependencies for bundling   */

    const Todos = require('../../views/Todos').default;
    const reducer = require('../../reducers/todos').default;
    
    /*  Add the reducer to the store on key 'todos'  */
    injectReducer(store, { key: 'todos', reducer });

    /*  Return getComponent   */
    cb(null, Todos);
  }
});