
class Particle {
  constructor (o) {
    o = o || {};
    this.vars(o)
  }
  vars (o) {
    this.props = {};
    this.el = o.el;
    Object.defineProperty(this, 'scale', {
      default:   1,
      get: () => { return this.scaleValue; },
      set:(scale) => {
        this.scaleValue = Math.max(Math.min(scale, 1), .1);
        this.draw()
      }
    });
  }
  draw () {
    var transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    this.el.style.transform = transform;
  }
}


export default Particle