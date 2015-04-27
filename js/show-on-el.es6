var mojs      = require('../js/vendor/mo')

class ShowOnEl {
  show (el) {
    var x = el.x - this.wWidth/2 + 75
    var y = el.y - this.wHeight/2 + 75
    var currX = document.body.scrollLeft
    var currY = document.body.scrollTop
    var innerEl = el.querySelector('.particle__inner')
    this.isOpen = true;

    var burst = new mojs.Transit({
      type: 'circle',
      stroke: 'white',
      fill: 'transparent',
      strokeWidth: {40: 0},
      count: 12,
      opacity: {.5:0},
      x: el.x+75, y: el.y+75,
      radius: {0:this.size},
      childOptions: {
        radius: {
          15: 0
        }
      }
    });

    var timeline = new mojs.Timeline({
      duration: 700,
      easing: 'cubic.out',
      onUpdate: (p)=> {
        window.scrollTo(x + (currX-x)*(1-p), y + (currY-y)*(1-p));
      }
    });

    var timeline2 = new mojs.Timeline({
      duration: 300,
      easing: 'expo.out',
      onUpdate: (p)=> {
        mojs.h.setPrefixedStyle(innerEl, 'transform', `scale(${1-.25*p}) translateZ(0)`)
        innerEl.style.opacity = 1-.25*p
      }
    });
    var tween = new mojs.Tween;
    tween.add(timeline);
    tween.add(timeline2);
    tween.start();
    var innerEl = el.querySelector('.particle__inner')
    var contentEl = el.querySelector('.particle__content')
    el.style['z-index'] = 20
    var timeline = new mojs.Timeline({
      duration: 600,
      delay: 100,
      // easing: 'cubic.out',
      onUpdate: (p)=> {
        this.blob = this.blobBase + .3*(mojs.easing.cubic.out(p));
        this.blobShift = this.blobBase + 1*(p);
      }
    });

    var timeline2 = new mojs.Timeline({
      duration: 600,
      delay: 350,
      onUpdate: (p)=> {
        var scaleSize = 15*mojs.easing.cubic.in(p)
        scaleSize = Math.max(.75, scaleSize)
        var scale = `scale(${scaleSize}) translateZ(0)`;
        mojs.h.setPrefixedStyle(innerEl, 'transform', scale)
        innerEl.style.opacity = .75 + .25*mojs.easing.cubic.out(p)
      },
      onComplete:()=> {
        this.close.classList.add('is-show')
      }
    });
    var tween = new mojs.Tween;
    tween.add(timeline);
    tween.add(timeline2);
    tween.start();
  }
}

export default ShowOnEl