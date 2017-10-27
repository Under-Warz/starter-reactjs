// import classes
import i18nextTask from './tasks/i18n_task';
import routesTask from './tasks/routes_task';


class Bootstrapper {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor() {}


  //________________________________________________________
  // -                                         PUBLIC METHOD
  execute() {
    return new Promise((resolve, reject) => {
      Promise.all([i18nextTask(), routesTask()])
        .catch(() => this._notifyFailed(reject))
        .then(() => this._notifyComplete(resolve))
    });
  }


  //________________________________________________________
  // -                                        PRIVATE METHOD
  _notifyComplete(resolve) {
    resolve();
  }


  _notifyFailed(reject) {
    reject(new Error('Error::app.bootstrapper.index'));  
  }

}
export default Bootstrapper;