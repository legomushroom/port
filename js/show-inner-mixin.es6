var mojs = require('mo-js');

var showInner = {

  moveTextEl: function (el, p) {
    p = mojs.easing.cubic.out(p);
    var transform       = `rotate(${90*(1-p)}deg) translateZ(0) translateY(${200*(1-p)}%)`,
        transformOrigin = `left ${80*(p)}%`;
    mojs.h.setPrefixedStyle(el, 'transform',        transform);
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
    this.dust2Spriter = new mojs.Spriter({
      el:         this.dust2,
      duration:   200*this.S,
      delay:      575*this.S,
      isRunLess:  true
    });
    this.dust3Spriter = new mojs.Spriter({
      el:         this.dust3,
      duration:   100*this.S,
      delay:      725*this.S,
      isRunLess:  true
    });
    // this.dust4Spriter = new mojs.Spriter({
    //   el:         this.dust4,
    //   duration:   50*this.S,
    //   delay:      800*this.S,
    //   isRunLess:  true
    // });
  },

  runDust: function () {
    if (this.isTabletMobile || this.isIE) { return };
    this.dust1Spriter.run(); this.dust2Spriter.run();
    this.dust3Spriter.run();
    // this.dust4Spriter.run();
  },

  showInnerPlastic: function (el) {
    var tween      = new mojs.Tween,
        image      = el.querySelector('.image'),
        scene      = el.querySelector('.shape'),
        shadow     = el.querySelector('#js-shadow'),
        shadowWrap = el.querySelector('#js-shadow-wrap');
    
    this.runDust();

    var mp = new mojs.MotionPath({
      path:       { x: -300,  y: -300 },
      curvature:  { x: '75%', y: '50%' },
      offsetX:    300,
      offsetY:    300,
      el:         image,
      duration:   (this.isIE) ? 200*this.S : 1000*this.S,
      easing:     'cubic.out',
      onPosit:   function (p, x, y, angle) {
        p = mojs.easing.expo.out(mojs.easing.cubic.in(p))
        var rotate    = `rotateX(70deg) rotateZ(${-60*(1-p)}deg)`,
            translate = `translateX(${x}px) translateY(${y}px)`,
            scale     = `scaleY(${2.5 - 1.5*(p)})`
        mojs.h.setPrefixedStyle(shadow, 'transform', `${translate} ${rotate} ${scale}`)
        return `translate3d(${x}px, ${y}px, 0)`;
      },
    });

    var opacityEasing = mojs.easing.path('M0,0 C0,0 32.1191406,0.314142863 40.1669859,0 C40.1669859,0.165327852 50.9999996,-112.569017 74.0660521,0 C80.8905119,-16.0420643 87.1001393,-19.621745 92.0689049,0 C92.0689049,1.54522552 95.3231688,-14.8615687 100,0'),
        bounceEasing  = mojs.easing.path('M0,100 C28.3125,98.6523445 39.0445328,8.99375039 40.1669859,0 C40.1669859,-0.0485295402 50.9999996,152.873952 74.0660521,0 C80.8905119,21.9365596 87.1001393,26.7923438 92.0689049,0 C92.0689049,-1.92034044 95.3231688,20.3352347 100,0');

    var timeline1 = new mojs.Timeline({
      duration: (this.isIE) ? 200*this.S : 800*this.S,
      onStart: ()=> {
        mojs.h.setPrefixedStyle(this.content, 'transform', `translate3d(0,0,0)`);
      },
      onComplete: () => { this.showClose(); },
      onUpdate: (p) => {
        var b      = mojs.easing.bounce.out(p), bin   = mojs.easing.bounce.in(p),
            t      = mojs.easing.cubic.out(p),
            rotate = `rotateY(${90*(1-b)}deg) rotateX(${70*(1-t)}deg) rotateZ(${90*(1-t)}deg)`,
            scale     = `scaleX(${opacityEasing(p)})`,
            transform = `translate(${(-300*(mojs.easing.bounce.in(1-p)))-5}px, 2px) ${scale}`;
        mojs.h.setPrefixedStyle(scene,      'transform', `${rotate}`);
        mojs.h.setPrefixedStyle(scene,      'transform-origin', `${50+50*t}% 100%`);
        mojs.h.setPrefixedStyle(shadowWrap, 'transform', transform);
        scene.style.opacity  = mojs.easing.expo.out(p);
        shadow.style.opacity = .75*bounceEasing(p);
      }
    });

    var soundTimeline = new mojs.Timeline({
      delay: 300*this.S, onStart: () => {
        if (this.isIE) { return }; this.bounceSound.play();
      }
    });

    tween.add(timeline1, soundTimeline);
    tween.start();
  }
}

export default showInner

