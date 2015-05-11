var mojs = require('../js/vendor/mo');

var showInner = {
  showInner: function (el) {
    this.showInnerPlastic(el);
  },
  moveTextEl: function (el, p) {
    p = mojs.easing.cubic.out(p);
    var transform       = `rotate(${90*(1-p)}deg) translateZ(0) translateY(${200*(1-p)}%)`;
    var transformOrigin = `left ${80*(p)}%`
    mojs.h.setPrefixedStyle(el, 'transform', transform);
    mojs.h.setPrefixedStyle(el, 'transform-origin', transformOrigin);
    el.style.opacity = mojs.easing.cubic.out(p);
  },
  prepareDust: function () {
    this.dust1Spriter = new mojs.Spriter({
      el:         this.dust1,
      duration:   300*this.S,
      delay:      275*this.S,
      isRunLess:  true
    });
  },

  showInnerPlastic: function (el) {
    // mojs.h.setPrefixedStyle(this.content, 'transform', `translate3d(-5000px,-5000px,0)`);
    this.content.style.opacity    = 1;
    this.content.style['z-index'] = 2;
    var tween = new mojs.Tween,
        image = el.querySelector('.image'),
        scene = el.querySelector('.shape'),
        shadow     = el.querySelector('#js-shadow'),
        shadowWrap = el.querySelector('#js-shadow-wrap');
    // this.dust.run()
    this.dust1Spriter.run();
    var mp = new mojs.MotionPath({
      path:       { x: -300,  y: -300 },
      curvature:  { x: '75%', y: '50%' },
      offsetX:    300,
      offsetY:    300,
      el:         image,
      duration:   1000*this.S,
      easing:     'cubic.out',
      onPosit:   function (p, x, y, angle) {
        p = mojs.easing.expo.out(mojs.easing.cubic.in(p))
        var rotate    = `rotateX(70deg) rotateZ(${-60*(1-p)}deg)`,
            translate = `translateX(${x}px) translateY(${y}px)`,
            scale     = `scaleY(${2.5 - 1.5*(p)})`
        mojs.h.setPrefixedStyle(shadow, 'transform', `${translate} ${rotate} ${scale}`)
        return `translate(${x}px, ${y}px)`
      },
      // onStart:()=> { this.showClose(); }
    });

    var opacityEasing = mojs.easing.path('M0,0 C0,0 32.1191406,0.314142863 40.1669859,0 C40.1669859,0.165327852 50.9999996,-112.569017 74.0660521,0 C80.8905119,-16.0420643 87.1001393,-19.621745 92.0689049,0 C92.0689049,1.54522552 95.3231688,-14.8615687 100,0'),
        bounceEasing  = mojs.easing.path('M0,100 C28.3125,98.6523445 39.0445328,8.99375039 40.1669859,0 C40.1669859,-0.0485295402 50.9999996,152.873952 74.0660521,0 C80.8905119,21.9365596 87.1001393,26.7923438 92.0689049,0 C92.0689049,-1.92034044 95.3231688,20.3352347 100,0');

    var timeline1 = new mojs.Timeline({
      duration: 800*this.S,
      onComplete: () => { this.showClose(); },
      onUpdate: (p) => {
        var b   = mojs.easing.bounce.out(p);
        var bin = mojs.easing.bounce.in(p);
        var t   = mojs.easing.cubic.out(p);
        var r   = `rotateY(${0 + 90*(1-b)}deg) rotateX(${70*(1-t)}deg) rotateZ(${90*(1-t)}deg)`
        var scale = `scaleX(1) scaleY(1)`;
        var tr    = `${r} ${scale}`;
        mojs.h.setPrefixedStyle(scene, 'transform', tr);
        mojs.h.setPrefixedStyle(scene, 'transform-origin', `${50+50*t}% 100%`);
        scene.style.opacity = mojs.easing.expo.out(p);

        var scale = `scaleX(${opacityEasing(p)})`
        var transform = `translate(${(-300*(mojs.easing.bounce.in(1-p)))-5}px, 2px) ${scale}`;
        mojs.h.setPrefixedStyle(shadowWrap, 'transform', transform);
        shadow.style.opacity = .75*bounceEasing(p);
      }
    });

    var soundTimeline = new mojs.Timeline({
      delay: 300*this.S, onStart: () => { this.bounceSound.play(); }
    });

    tween.add(timeline1, soundTimeline);
    tween.start();
  }
}

export default showInner

