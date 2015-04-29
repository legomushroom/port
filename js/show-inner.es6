var mojs = require('../js/vendor/mo');

class ShowInner {
  showInner (el) {
    var contentEl = el.querySelector('.particle__content');
    this.closeBtn.classList.add('is-show');
    contentEl.classList.add('is-show');

    var tween = new mojs.Tween,
        image = el.querySelector('.image'),
        scene = el.querySelector('.shape');

    var transit = new mojs.Transit({
      parent:       el.querySelector('.project__img'),
      x: 60,         y: 307,
      type:         'circle',
      count:        10,
      fill:         'transparent',
      stroke:       'white',
      strokeWidth:  {10: 0},
      duration:     300*this.S,
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
      duration:     100*this.S,
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
      easing:     'cubic.out'
    });
    var timeline1 = new mojs.Timeline({
      duration: 800*this.S,
      // onStart: () => { scene.style.display = 'block' },
      onUpdate: (p) => {
        var b = mojs.easing.bounce.out(p);
        var t = mojs.easing.cubic.out(p);
        var tr = `rotateY(${0 + 90*(1-b)}deg) rotateX(${70*(1-t)}deg) rotateZ(${90*(1-t)}deg)`
        mojs.h.setPrefixedStyle(scene, 'transform', tr);
        mojs.h.setPrefixedStyle(scene, 'transform-origin', `${50+50*t}% 100%`);
        scene.style.opacity = mojs.easing.expo.out(p);
      }
    });

    var soundTimeline = new mojs.Timeline({
      delay: 300*this.S, onStart: () => { this.bounceSound.play(); }
    });

    tween.add(timeline1, soundTimeline);
    tween.start();

  }
}

export default ShowInner

