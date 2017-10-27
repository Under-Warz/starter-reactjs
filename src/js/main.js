import App from './app/index';

function _onLoad(e) {
  new App();
}

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function() {};

window.addEventListener('load', _onLoad);