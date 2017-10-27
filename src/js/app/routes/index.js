// We only need to import the modules necessary for initial render
import RoutesData from '../models/routes_data';
import CoreLayout from '../layouts/CoreLayout';
import SimpleLayout from '../layouts/SimpleLayout';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import CounterRoute from './Counter';
import TodosRoute from './Todos';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const routesData = RoutesData.getInstance();


export const createRoutes = (store) => (
  {
    path: '/',
    childRoutes: [
      {
        component: CoreLayout,
        indexRoute: {
          component: Home
        }
      },
      {
        path: routesData.getRoute('counter'),
        component: CoreLayout,
        indexRoute: CounterRoute(store)
      },
      {
        path: routesData.getRoute('todos'),
        component: CoreLayout,
        indexRoute: TodosRoute(store),
        onEnter: (nextState, replace, cb) => {
          if (store.getState().session.isNotLoggedIn) {
            replace('/');
          }
          cb();
        }
      },
      {
        path: '/*',
        component: SimpleLayout,
        indexRoute: {
          component: NotFound
        }
      }
    ]
  }
);

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
