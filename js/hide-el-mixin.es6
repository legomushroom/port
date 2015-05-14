var hideOnEl = {
  closeEl: function () {
    this.iscroll.enabled = true; this.isOpen = false; this.hideClose()

    var innerEl           = this.currentEl.querySelector('.particle__inner'),
        scaleDownTween    = new mojs.Tween;

    var scaleDownTimeline = new mojs.Timeline({
      duration: 500*this.S,
      onUpdate: (p)=> {
        var np = 1-p, npe = mojs.easing.cubic.inout(np),
            scaleSize = .75+18*npe, scale = `scale(${scaleSize}) translateZ(0)`;

        mojs.h.setPrefixedStyle(innerEl, 'transform', scale);
        mojs.h.setPrefixedStyle(this.content, 'transform', `scale(${npe}) translateZ(0)`);
      }
    });

    var scaleDownSoundTimeline = new mojs.Timeline({
      delay: 0*this.S, onStart: () => { this.closeScaleSound.play() }
    });

    var scaleUpTimeline = new mojs.Timeline({
      duration: 1000*this.S,
      onUpdate: (p)=> {
        var scaleSize = .75 + .25*mojs.easing.elastic.out(p),
            scale = `scale(${scaleSize}) translateZ(0)`;
        mojs.h.setPrefixedStyle(innerEl, 'transform', scale);
      },
      onComplete: () => {
        if (this.isOpen) {
          return mojs.h.setPrefixedStyle(this.content, 'transform', `translate3d(-5000px,-5000px,0)`);
        }
        mojs.h.setPrefixedStyle(this.content, 'transform', `translate3d(-5000px,-5000px,0)`);
      }
    });
    scaleDownTween.add(scaleDownTimeline); scaleDownTween.append(scaleUpTimeline);

    var blobTween = new mojs.Tween;
    var blobShiftDownTimeline = new mojs.Timeline({
      duration: 1200*this.S, delay: 300*this.S,
      onUpdate: (p)=> {
        if (this.isOpen) { return }
        this.blobShift = this.blobBase + (1-mojs.easing.elastic.out(p));
      }
    });
    var blobDownTimeline = new mojs.Timeline({
      duration: 2100*this.S, delay: 0*this.S,
      onUpdate: (p)=> {
        if (this.isOpen) { return }
        this.blob = this.blobBase + .3*(1-mojs.easing.elastic.out(p));
      }
    });
    
    blobTween.add(blobShiftDownTimeline, blobDownTimeline, scaleDownSoundTimeline)
    
    this.jellyTween = new mojs.Tween;
    this.jellyTween.add(scaleDownTween, blobTween);
    this.jellyTween.start();
  }
}


export default hideOnEl