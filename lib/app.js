'use strict'

const noop = function () {}
const App = {
  home: function (options, cb = noop) {
    // let body = document.body
    particlesJS.load('particles-js', 'particles.json', function () {
      console.log('particlesJS loaded')

        $('body').removeClass('loading')

    })
  }
}
window.App = App
export { App }