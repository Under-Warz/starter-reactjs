// Singleton
let singleton = Symbol();
let singletonEnforcer = Symbol();

// Consts
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const KEYS = {37: 1, 38: 1, 39: 1, 40: 1};

// Vars
let _that;
let _disable;
let _scrollPos;


class ScrollingHelper {

  //________________________________________________________
  // -                                           CONSTRUCTOR
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw 'cannot construct singleton';
    }
  }


  static getInstance() {
    if (!this[singleton]) {
      this[singleton] = new ScrollingHelper(singletonEnforcer);
    }
    return this[singleton];
  }


  //________________________________________________________
  // -                                       GETTER / SETTER
  get disabled() {
    return _disable;
  }


  //________________________________________________________
  // -                                        PUBLIC METHODS
  disableScroll() {
    _that = this;
    _disable = true;

    // Block scrollbar when moving it
    _scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener('scroll.scrolldisabler', this._scrollTo);

    if (window.addEventListener) { // older FF
      window.addEventListener('DOMMouseScroll', this._preventDefault, false);
    }
    window.onwheel = this._preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this._preventDefault; // older browsers, IE
    window.ontouchmove = this._preventDefault; // mobile
    document.onkeydown = this._preventDefaultForScrollKeys;
  }

  enableScroll() {
    _disable = false;
    _scrollPos = null;

    // Unblock scrollbar when moving it
    window.removeEventListener('scroll.scrolldisabler', this._scrollTo);

    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', this._preventDefault, false);
    }
    window.onwheel = null;
    window.onmousewheel = document.onmousewheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }


  //________________________________________________________
  // -                                       PRIVATE METHODS
  _scrollTo() {
    window.scrollTo(0, _scrollPos);
    e.preventDefault();
  }


  _preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();

    e.returnValue = false;
  }


  _preventDefaultForScrollKeys(e) {
    if (KEYS[e.keyCode]) {
      _that._preventDefault(e);
      return false;
    }
  }

}
export default ScrollingHelper;
