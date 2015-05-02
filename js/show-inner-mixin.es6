var mojs = require('../js/vendor/mo');
// var ShowCloseModule = require('./show-close-mixin');
// var showCloseModule = new ShowCloseModule;
// showCloseModule.initClose()

var showInner = {
  showInner:            function (el) {
    // this.showClose();
    // this.showInnerText();
    this.showInnerTextPrelude(el);
  },
  showInnerTextPrelude: function (el) {
    var texts = el.querySelectorAll('.project-text-line__inner');
    var yShift = 10, xShift = 10;
    el.querySelector('.particle__content').style.display = 'block'
    this.showClose();
    var textLineOption = {
      parent:       el.querySelector('.project__text'),
      x: -25+xShift,y: 104+yShift,
      duration:     500*this.S,
      stroke:       'cyan',
      strokeWidth:  {'rand(6, 14)': 0},
      radius:       170,
      easing:       'cubic.in',
      strokeDasharray: '100%',
      strokeLinecap:   'round',
      strokeDashoffset: { '100%': '-100%' },
      delay: 'rand(200, 500)'
    }
    var scissorsSoundDelay = 350;
    var lineBigOption = {
      y: 15+yShift, x: -45+xShift, radius: 120, strokeDashoffset: { '100%': '-100%' },
      strokeWidth: {30: 0},
      onUpdate: (p) => { this.moveTextEl(texts[0], p); },
      onComplete: () => {
      this.showInnerPlastic(el);
        
      }
      }
    mojs.h.extend(lineBigOption, textLineOption);
    var line1 = new mojs.Transit(lineBigOption);    

    var line0Option = {
      y: 122+yShift, radius: 50, strokeDashoffset: { '-100%': '100%' },
      onUpdate: (p) => { this.moveTextEl(texts[4], p); }
    }
    mojs.h.extend(line0Option, textLineOption);
    var line0 = new mojs.Transit(line0Option);    

    var line1Option = { y: 98+yShift, onUpdate: (p) => { this.moveTextEl(texts[3], p);}}
    mojs.h.extend(line1Option, textLineOption);
    var line1 = new mojs.Transit(line1Option);

    var line2Option = {
      y: 73+yShift, radius: 80, strokeDashoffset:{'-100%':'100%'},
      onUpdate: (p) => { this.moveTextEl(texts[2], p); }
    }
    mojs.h.extend(line2Option, textLineOption);
    var line2 = new mojs.Transit(line2Option);

    var line3Option = {
      y: 73+yShift, radius: 70, x: 180+xShift, strokeDashoffset:{'100%':'-100%'},
    }
    mojs.h.extend(line3Option, textLineOption);
    var line3 = new mojs.Transit(line3Option);

    var line4Option = {
      y: 50+yShift, radius: 150, strokeDashoffset: { '-100%': '100%' },
      onUpdate: (p) => { this.moveTextEl(texts[1], p); }
    }
    mojs.h.extend(line4Option, textLineOption);
    var line4 = new mojs.Transit(line4Option);

    setTimeout(()=> {
      this.metaSound.play();
    }, 500);
  },
  moveTextEl: function (el, p) {
    p = mojs.easing.cubic.out(p);
    var transform       = `rotate(${90*(1-p)}deg) translateZ(0) translateY(${200*(1-p)}%)`;
    var transformOrigin = `left ${80*(p)}%`
    mojs.h.setPrefixedStyle(el, 'transform', transform);
    mojs.h.setPrefixedStyle(el, 'transform-origin', transformOrigin);
    el.style.opacity = mojs.easing.cubic.out(p);
  },
  showInnerPlastic: function (el) {
    var contentEl = el.querySelector('.particle__content');
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
      duration:     275*this.S,
      delay:        300*this.S,
      radiusX:      {20: 100},
      radiusY:      {5: 10},
      opacity:      {1:0},
      strokeDasharray: '50% 200%'
    }).then({
      shiftX:       {'-75': '-75'},
      duration:     150*this.S,
      radiusX:      {15: 80},
      radiusY:      {4: 8},
      strokeWidth:  {8: 0},
      opacity:      {.8:0}
    }).then({
      shiftX:       {'-80': '-80'},
      duration:     75*this.S,
      radiusX:      {12: 60},
      radiusY:      {3: 7},
      strokeWidth:  {4: 0},
      opacity:      {.6:0}
    }).then({
      shiftX:       {'-85': '-85'},
      duration:     50*this.S,
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

