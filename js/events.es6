var Hammer    = require('hammerjs')

class Events {
  add() {
    window.addEventListener('resize', () => {
      this.calcDimentions()
      this.bubleCenter.x = -this.iscroll.x + this.wWidth/2 + this.xOffset
      this.bubleCenter.y = -this.iscroll.y + this.wHeight/2 + this.yOffset
    });
    var hammerDoc = new Hammer(document.body);
    hammerDoc.on('tap', (e) => {
      var el = e.target.parentNode;
      if (this.isOpen) { return e.preventDefault() }
      el.classList.contains('particle') && this.showOnEl(el);
    });
    (new Hammer(this.closeBtn)).on('tap', (e) => { this.closeEl() });

    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, false);

    this.iscroll.on('scroll', ()=> {
      this.bubleCenter.x = -this.iscroll.x + this.wWidth/2 + this.xOffset
      this.bubleCenter.y = -this.iscroll.y + this.wHeight/2 + this.yOffset
      // console.log(this.iscroll.x, this.iscroll.y);
    });

  }
}

export default Events
