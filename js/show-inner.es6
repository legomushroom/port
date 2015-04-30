var mojs = require('../js/vendor/mo');

class ShowInner {
  showInner (el, ctx) {
    this.showInnerText(el, ctx);
  }

  showInnerText (el, ctx) {
    var texts = el.querySelectorAll('.project-text-line__inner');
    var timeline = new mojs.Timeline({
      duration: 500*ctx.S,
      onComplete:() => { this.showInnerPlastic(el, ctx); },
      onUpdate: (p)=> {
        p = mojs.easing.cubic.out(p);
        var transform       = `rotate(${90*(1-p)}deg) translateZ(0)`;
        var transformOrigin = `left ${30*(p)}%`
        var len = texts.length;
        for (var i = 0; i < texts.length; i++) {
          mojs.h.setPrefixedStyle(texts[i], 'transform', transform);
          mojs.h.setPrefixedStyle(texts[i], 'transform-origin', transformOrigin);
          texts[i].style.opacity = mojs.easing.cubic.out(p)
        };
      }
    });
    var tween = new mojs.Tween;
    tween.add(timeline);
    tween.start();
  }
  showInnerPlastic (el, ctx) {
    var contentEl = el.querySelector('.particle__content');
    ctx.closeBtn.classList.add('is-show');
    contentEl.classList.add('is-show');

    var tween = new mojs.Tween,
        image = el.querySelector('.image'),
        scene = el.querySelector('.shape'),
        shadow     = el.querySelector('#js-shadow'),
        shadowWrap = el.querySelector('#js-shadow-wrap');

    var transit = new mojs.Transit({
      parent:       el.querySelector('.project__img'),
      x: 60,         y: 307,
      type:         'circle',
      count:        10,
      fill:         'transparent',
      stroke:       'white',
      strokeWidth:  {10: 0},
      duration:     275*ctx.S,
      delay:        300*ctx.S,
      radiusX:      {20: 100},
      radiusY:      {5: 10},
      opacity:      {1:0},
      strokeDasharray: '50% 200%'
    }).then({
      shiftX:       {'-75': '-75'},
      duration:     150*ctx.S,
      radiusX:      {15: 80},
      radiusY:      {4: 8},
      strokeWidth:  {8: 0},
      opacity:      {.8:0}
    }).then({
      shiftX:       {'-80': '-80'},
      duration:     75*ctx.S,
      radiusX:      {12: 60},
      radiusY:      {3: 7},
      strokeWidth:  {4: 0},
      opacity:      {.6:0}
    }).then({
      shiftX:       {'-85': '-85'},
      duration:     50*ctx.S,
      radiusX:      {11: 55},
      radiusY:      {2: 6},
      strokeWidth:  {2: 0},
      opacity:      {.4:0}
    });

    var mp = new mojs.MotionPath({
      path:       { x: -300,  y: -300 },
      curvature:  { x: '75%', y: '50%' },
      offsetX:    300,
      offsetY:    300,
      el:         image,
      duration:   1000*ctx.S,
      easing:     'cubic.out',
      onPosit:   function (p, x, y, angle) {
        p = mojs.easing.expo.out(mojs.easing.cubic.in(p))
        var rotate    = `rotateX(70deg) rotateZ(${-60*(1-p)}deg)`,
            translate = `translateX(${x}px) translateY(${y}px)`,
            scale     = `scaleY(${2.5 - 1.5*(p)})`
        mojs.h.setPrefixedStyle(shadow, 'transform', `${translate} ${rotate} ${scale}`)
        return `translate(${x}px, ${y}px)`
      }
    });

    var opacityEasing = mojs.easing.path('M0,0 C0,0 32.1191406,0.314142863 40.1669859,0 C40.1669859,0.165327852 50.9999996,-112.569017 74.0660521,0 C80.8905119,-16.0420643 87.1001393,-19.621745 92.0689049,0 C92.0689049,1.54522552 95.3231688,-14.8615687 100,0'),
        bounceEasing  = mojs.easing.path('M0,100 C28.3125,98.6523445 39.0445328,8.99375039 40.1669859,0 C40.1669859,-0.0485295402 50.9999996,152.873952 74.0660521,0 C80.8905119,21.9365596 87.1001393,26.7923438 92.0689049,0 C92.0689049,-1.92034044 95.3231688,20.3352347 100,0');

    var timeline1 = new mojs.Timeline({
      duration: 800*ctx.S,
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
      delay: 300*ctx.S, onStart: () => { ctx.bounceSound.play(); }
    });

    tween.add(timeline1, soundTimeline);
    tween.start();
  }
}

export default ShowInner

