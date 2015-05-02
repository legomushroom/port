var mojs      = require('../js/vendor/mo');

var showOnEl = {
  showInnerCircle: function () {
    var tween = new mojs.Tween;

    var blobCircleTm = new mojs.Timeline({
      duration:  500*this.S,
      // easing:     'cubic.out',
      onUpdate:   (p) => {
        mojs.h.setPrefixedStyle(this.blobCircle, 'transform', `scale(${30*p}) translateZ(0)`);
        // mojs.h.setPrefixedStyle(this.blobCircleI, 'transform', `scale(${2*p}) translateZ(0)`);
        // var scale = 1/(1+(3*(1-p)));
        this.blobCircle.style.opacity = 1*(mojs.easing.cubic.in(1-p));
      }
    });

    tween.add(blobCircleTm);
    tween.start()


    var burst = new mojs.Transit({
      parent:       this.particlesContainer,
      x: '34%',     y: '39%',
      type:         'circle',
      stroke:       'white',
      fill:         'transparent',
      strokeWidth:  {40: 0},
      count:        12,
      opacity:      {.5:0},
      radius:       {0:this.size},
      isRunLess:    true,
      childOptions: { radius: { 15: 0 } },
      duration:     500*this.S,
      onStart:() => {this.openSound.play();}
    });
    burst.el.style['z-index'] = 1;
    // burst.run();
  },

  showOnEl: function (el) {
    var x = el.x - this.wWidth/2 - this.xOffset,
        y = el.y - this.wHeight/2 - this.yOffset,
        innerEl   = el.querySelector('.particle__inner'),
        contentEl = el.querySelector('.particle__content');
    var tween = new mojs.Tween;

    this.isOpen = true;
    el.style['z-index']  = 20
    this.iscroll.enabled = false;
    this.iscroll.scrollTo(-x,-y, 500*this.S);

    // var burst = new mojs.Transit({
    //   parent:       this.particlesContainer,
    //   x: '50%',     y: '50%',
    //   type:         'circle',
    //   stroke:       'white',
    //   fill:         'transparent',
    //   strokeWidth:  {40: 0},
    //   count:        12,
    //   opacity:      {.5:0},
    //   radius:       {0:this.size},
    //   isRunLess:    true,
    //   childOptions: { radius: { 15: 0 } },
    //   duration:     500*this.S,
    //   onStart:() => {this.openSound.play();}
    // });
    // burst.el.style['z-index'] = 1;
    // burst.run();

    var soundTimeline = new mojs.Timeline({
      delay: 50*this.S, onStart: () => { this.openSound2.play(); }
    });

    var scaleDownTween = new mojs.Timeline({
      duration: 300*this.S, easing: 'expo.out',
      onUpdate: (p)=> {
        mojs.h.setPrefixedStyle(innerEl, 'transform', `scale(${1-.25*p}) translateZ(0)`);
        innerEl.style.opacity = 1-.25*p;
      }
    });

    var blobTimeline = new mojs.Timeline({
      duration: 600*this.S, delay: 100*this.S,
      onUpdate: (p)=> {
        this.blob = this.blobBase + .3*(mojs.easing.cubic.out(p));
        this.blobShift = this.blobBase + 1*(p);
      }
    });

    var scaleUpTimeline = new mojs.Timeline({
      duration: 600*this.S, delay: 350*this.S,
      onUpdate: (p)=> {
        var scaleSize = 15*mojs.easing.cubic.in(p)
        scaleSize = Math.max(.75, scaleSize)
        var scale = `scale(${scaleSize}) translateZ(0)`;
            // contentScale = `scale(${1/scaleSize}) translateZ(0)`;
        mojs.h.setPrefixedStyle(innerEl, 'transform', scale);
        // mojs.h.setPrefixedStyle(contentEl, 'transform', contentScale);
        innerEl.style.opacity = .75 + .25*mojs.easing.cubic.out(p)
      },
      onStart:()=> {
        setTimeout(()=> {
          this.showInner(el, this);
        }, 400)
      }
    });
    
    tween.add(scaleDownTween, soundTimeline, blobTimeline, scaleUpTimeline, blobCircleTm);
    tween.start();
  }
}

export default showOnEl