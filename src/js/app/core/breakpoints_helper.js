// Singleton
let singleton = Symbol();
let singletonEnforcer = Symbol();


// Vars
let _breakpoint;


class BreakpointsHelper {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw 'cannot construct singleton';
    }
  }


  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new BreakpointsHelper(singletonEnforcer);
    }
    return this[singleton];
  }


  //________________________________________________________
  // -                                       GETTER / SETTER
  get breakpoint() {
    return _breakpoint.value;
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  init() {
    _breakpoint = {};

    this.onResize();
    this.boundResize = (e) => this.onResize(e);
    window.addEventListener('resize', this.boundResize, false);
  }


  //________________________________________________________
  // -                                       PRIVATE METHODS
  _getBreakpoint() {
    _breakpoint.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '').replace(/\'/g, '');
  }


  //________________________________________________________
  // -                                                EVENTS
  onResize(e) {
    this._getBreakpoint();
  }

}
export default BreakpointsHelper;
