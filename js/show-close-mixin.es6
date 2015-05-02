var mojs = require('../js/vendor/mo')

var showClose = {
  initClose: function () {
    var dur = 400;
    var closeOption = {
      parent:       document.querySelector('#js-close-btn'),
      type:         'circle',
      radius:       {0: 15},
      fill:         'transparent',
      stroke:       'white',
      strokeWidth:  {5:0},
      x: '50%',     y: '50%',
      duration:     dur,
      isRunLess:   true,
    }
    this.closeCircle = new mojs.Transit(closeOption);

    var closeCrossOption = {
      type:         'cross',
      delay:        (.4*dur),
      angle:        45,
      strokeWidth:  2,
      radius:       {0:8},
      isShowEnd:    true,
      onStart: () => {
        this.closeSound.play();
      }
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

  },
  showClose: function () {
    this.closeBtn.classList.add('is-show');
    this.closeCircle.run(); this.closeCross.run(); this.closeBurst.run();
  },
  hideClose: function () { this.closeBtn.style.display = 'none'; }
}


export default showClose