var mojs      = require('../js/vendor/mo');

var showOnEl = {
  showInnerCircle: function (x, y) {
    var tween = new mojs.Tween;

    var size = Math.min(this.wWidth, this.wHeight);
    this.blobCircle.style.left = `${x}px`
    this.blobCircle.style.top  = `${y}px`
    // console.log(10*mojs.easing.quad.in(size/800))
    var borderWidth = 10*mojs.easing.cubic.in(size/800)
    this.blobCircle.style['border-width'] = `${borderWidth/2}px`

    var blobCircleSize = 30 + 2*borderWidth
    this.blobCircle.style['width']       = `${blobCircleSize}px`
    this.blobCircle.style['height']      = `${blobCircleSize}px`
    this.blobCircle.style['margin-left'] = `${-blobCircleSize/2}px`
    this.blobCircle.style['margin-top']  = `${-blobCircleSize/2}px`
    var blobCircleTm = new mojs.Timeline({
      duration:  500*this.S,
      onStart:() => {this.openSound.play();},
      // easing:     'cubic.out',
      onUpdate:   (p) => {
        var tr = `scale(${30*p}) translateZ(0)`// translate3d(${x}px,${y}px,0)`;
        mojs.h.setPrefixedStyle(this.blobCircle, 'transform', tr);
        // mojs.h.setPrefixedStyle(this.blobCircleI, 'transform', `scale(${2*p}) translateZ(0)`);
        // mojs.h.setPrefixedStyle(this.blobCircleI, 'transform', `scale(${2*p}) translateZ(0)`);
        // var scale = 1/(1+(3*(1-p)));
        this.blobCircle.style.opacity = 1*(mojs.easing.cubic.in(1-p));
      }
    });

    tween.add(blobCircleTm);
    tween.start()
  },

  showOnEl: function (el) {
    // return immediately on edges
    if (el.delta < .2) { return }

    var x = el.x - this.wWidth/2 - this.xOffset,
        y = el.y - this.wHeight/2 - this.yOffset,
        innerEl   = el.querySelector('.particle__inner'),
        contentEl = el.querySelector('.particle__content');
    var tween = new mojs.Tween;

    this.isOpen = true;
    el.style['z-index']  = 20
    this.iscroll.enabled = false;
    this.iscroll.scrollTo(-x,-y, 500*this.S);
    this.showInnerCircle(el.x+75, el.y+75)

    var soundTimeline = new mojs.Timeline({
      delay: 0*this.S, onStart: () => { this.openSound2.play(); } });

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
        var scaleSize = 19*mojs.easing.cubic.in(p)
        scaleSize = Math.max(.75, scaleSize)
        var scale = `scale(${scaleSize}) translateZ(0)`;
            // contentScale = `scale(${1/scaleSize}) translateZ(0)`;
        mojs.h.setPrefixedStyle(innerEl, 'transform', scale);
        // mojs.h.setPrefixedStyle(contentEl, 'transform', contentScale);
        innerEl.style.opacity = .75 + .25*mojs.easing.cubic.out(p)
      },
      onStart:()=> {
        setTimeout(()=> {
          this.content.innerHTML = el.querySelector('.particle__content').innerHTML;
          this.showInner(this.content);
        }, 400)
      }
    });
    
    tween.add(scaleDownTween, soundTimeline, blobTimeline, scaleUpTimeline);
    tween.start();
  }
}

export default showOnEl