class Events {
  add() {
    window.addEventListener('resize', () => this.calcDimentions())
    document.addEventListener('click', (e) => {
      var el = e.target.parentNode;
      if (this.isOpen) { return e.preventDefault() }
      el.classList.contains('particle') && this.showOnEl(el);
    });
    this.close.addEventListener('click', (e) => {
      this.closeEl()
    });
    window.addEventListener('scroll', (e) => {
      this.bubleCenter.x = document.body.scrollLeft + this.wWidth/2 - 75;
      this.bubleCenter.y = document.body.scrollTop  + this.wHeight/2 - 75;
    });
  }
}

export default Events
