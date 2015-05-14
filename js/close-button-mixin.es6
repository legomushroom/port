var mojs = require('mo-js');

var showCloseButton = {  
  initClose: function () {
    var dur = 400*this.S;
    var closeOption = {
      parent:       document.querySelector('#js-close-btn'),
      type:         'circle',
      radius:       {0: 15},
      fill:         'transparent',
      stroke:       'white',
      strokeWidth:  {5:0},
      x: '50%',     y: '50%',
      duration:     dur,
      isRunLess:   true
    }
    this.closeCircle = new mojs.Transit(closeOption);

    var closeCrossOption = {
      type:         'cross',
      delay:        (.4*dur),
      angle:        45,
      strokeWidth:  2,
      radius:       {0:8},
      isShowEnd:    true,
      onStart: () => { this.closeSound.play(); }
    };
    mojs.h.extend(closeCrossOption, closeOption);
    this.closeCross = new mojs.Transit(closeCrossOption);

    var closeBurstOption = {
      type:         'line',
      radius:       {0: 30},
      strokeWidth:  {4:0},
      delay:        (.4*dur),
      childOptions: { radius: {5:0} },
    }
    mojs.h.extend(closeBurstOption, closeOption);
    this.closeBurst = new mojs.Burst(closeBurstOption);

    var closeOption2 = {
      parent:       document.querySelector('#js-close-btn'),
      type:         'circle',
      radius:       {0: 10},
      fill:         'transparent',
      stroke:       'white',
      strokeWidth:  {5:0},
      x: '-20%',     y: '-50%',
      isRunLess:    true,
      delay:        (.7*dur),
      duration:     400*this.S,
      onStart: () => { this.closeSound2.play(); }
    }
    this.closeCircle2 = new mojs.Transit(closeOption2);

    var closeOption3 = {
      x: '80%',     y: '-30%',
      radius:       {0: 6},
      delay:        (1.1*dur),
      duration:     300*this.S,
      onStart: () => { this.closeSound3.play(); }
    }
    mojs.h.extend(closeOption3, closeOption2);
    this.closeCircle3 = new mojs.Transit(closeOption3);

    var closeOption4 = {
      x: '50%',     y: '130%',
      radius:       {0: 4},
      delay:        (.9*dur),
      duration:     200*this.S,
      onStart: () => { this.closeSound3.play(); }
    }
    mojs.h.extend(closeOption4, closeOption2);
    this.closeCircle4 = new mojs.Transit(closeOption4);

    this.showCloseBtnTween = new mojs.Tween;
    this.showCloseBtnTween.add(
      this.closeCircle.tween,  this.closeCircle2.tween,
      this.closeCircle3.tween, this.closeCircle4.tween,
      this.closeCross.tween,   this.closeBurst.tween
    );
    
  },
  showClose: function () {
    this.closeBtn.classList.add('is-show'); this.showCloseBtnTween.start();
  },
  initHideClose: function () {
    this.hideBurst = new mojs.Burst({
      x: '50%',     y: '50%',
      parent:       this.closeBtn,
      radius:       {0: 100},
      type:         'circle',
      fill:         'white',
      degree:       25,
      isSwirl:      true,
      randomRadius: 1,
      isRunLess:    true,
      childOptions: { radius: {'rand(12,5)':0} },
      duration:     500*this.S,
      onUpdate: (p) => {
        p = mojs.easing.cubic.in(p);
        mojs.h.setPrefixedStyle(this.closeCross.el, 'transform', `scale(${1-p})`)
      },
      onStart:    () => { this.closeBtnSound.play(); },
      onComplete: () => {
        this.closeBtn.classList.remove('is-show');
        mojs.h.setPrefixedStyle(this.closeCross.el, 'transform', `none`);
      }
    });
    this.hideCircle = new mojs.Transit({
      x: '50%',         y: '50%',
      parent:           this.closeBtn,
      type:             'circle',
      radius:           {0: 15},
      fill:             'transparent',
      stroke:           'white',
      strokeWidth:      { 8:0 },
      isRunLess:        true,
      duration:         500*this.S
    });
  },
  hideClose: function () { this.hideBurst.run(); this.hideCircle.run(); }
}

export default showCloseButton