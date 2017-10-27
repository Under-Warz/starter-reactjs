// Singleton
let singleton = Symbol();
let singletonEnforcer = Symbol();

let _routes;

class RoutesData {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw 'cannot construct singleton';
    }
  }


  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new RoutesData(singletonEnforcer);
    }
    return this[singleton];
  }


  //________________________________________________________
  // -                                       GETTER / SETTER
  set routes(data) {
    _routes = data;
  }


  get routes() {
    return _routes;
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  getRoute(slug, lang = null) {
    lang = (lang === null) ? window.config.locale : lang;
    return _routes[lang][slug];
  }

}
export default RoutesData;