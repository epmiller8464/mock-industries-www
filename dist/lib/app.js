'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var noop = function noop() {};
var App = {
  home: function home(options) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    // let body = document.body
    particlesJS.load('particles-js', 'particles.json', function () {
      console.log('particlesJS loaded');

      $('body').removeClass('loading');
    });
  }
};
window.App = App;
exports.App = App;
//# sourceMappingURL=app.js.map