var Hammer    = require('hammerjs')

var events = {
  events: function () {
    window.addEventListener('resize', () => {
      this.calcDimentions(); this.setBubblePosition()
    });
    (new Hammer(document.body)).on('tap', (e) => {
      var el = e.target.parentNode;
      if (this.isOpen) { return e.preventDefault() }
      if (el.classList.contains('particle')) { this.showOnEl(el);}
      else if (el.parentNode.classList.contains('particle')) {
        this.showOnEl(el.parentNode);
      }
    });
    (new Hammer(this.closeBtn)).on('tap', this.closeEl.bind(this));
    document.addEventListener('touchmove', function (e) {e.preventDefault();}, false);
    this.iscroll.on('scroll', this.setBubblePosition.bind(this));
  },
  setBubblePosition: function () {
    this.bubleCenter.x = -this.iscroll.x + this.wWidth/2  + this.xOffset;
    this.bubleCenter.y = -this.iscroll.y + this.wHeight/2 + this.yOffset;
  }
}

export default events
