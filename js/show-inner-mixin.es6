var mojs = require('../js/vendor/mo');

var showInner = {
  showInner: function (el) {
    this.showClose();
    this.showInnerPlastic(el);
    // this.showInnerTextPrelude(el);
  },
  moveTextEl: function (el, p) {
    p = mojs.easing.cubic.out(p);
    var transform       = `rotate(${90*(1-p)}deg) translateZ(0) translateY(${200*(1-p)}%)`;
    var transformOrigin = `left ${80*(p)}%`
    mojs.h.setPrefixedStyle(el, 'transform', transform);
    mojs.h.setPrefixedStyle(el, 'transform-origin', transformOrigin);
    el.style.opacity = mojs.easing.cubic.out(p);
  }
}

export default showInner

