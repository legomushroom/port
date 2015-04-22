var Impulse = require('impulse')
var mojs    = require('mo-js')

// import Particle from './particle'

// var p = new Particle({
//   el: document.createElement('div')
// });

// p.scale = 2
// console.log(p.scale)

class Main {
  constructor(o) {
    this.vars()
    this.initContainer()
    this.draw()
  }
  vars() {
    this.particlesContainer = document.querySelector('#js-particles');
    this.particles = document.querySelectorAll('.particle');
    this.badge = document.querySelector('#js-badge');
    this.particlesLength = this.particles.length;
    var styles     = getComputedStyle(this.particlesContainer);
    this.width     = parseInt(styles.width, 10);
    this.height    = parseInt(styles.height,10);
    this.radPoint = mojs.helpers.getRadialPoint;
    this.particleBuffer = null;
    this.calcDimentions()
    window.addEventListener('resize', () => this.calcDimentions())
    // document.addEventListener('mouseout', (e) => this.jelly(e) );

    var i = this.particlesLength;
    while(i--) {
      var particle = this.particles[i];
      particle.x = parseInt(particle.getAttribute('data-left'), 10);
      particle.y = parseInt(particle.getAttribute('data-top'),  10);
    }
  }
  jelly (e) {
    var el = e.target;
    if (el.classList.contains('particle')) {
      el = el.childNode
    } else if (!el.classList.contains('particle__inner')) {
      return
    }
    var tween = new mojs.Tween;
    var coef1 = 0; var coef2 = 0; var angle = 0
    var timeline = new mojs.Timeline({
      duration: 1500,
      easing:   'elastic.out',
      onStart: function () {
        coef1 = mojs.helpers.rand(-2,2)/10;
        coef2 = .2*Math.random();
      },
      onUpdate: function (p) {
        var np = 1-p;
        var transform = `scale(${1+(coef1*np)},${(1-coef2)+(coef2*p)}) translateZ(0)`;
        if (!el) return
        mojs.helpers.setPrefixedStyle(el, 'transform', transform);
        // console.log(p)
      }
    });
    tween.add(timeline)
    tween.start()

  }
  calcDimentions () {
    this.wWidth    = window.innerWidth;
    this.wHeight   = window.innerHeight;
    this.centerY   = this.height/2 - this.wHeight/2;
    this.centerX   = this.width/2 - this.wWidth/2;
    this.bubleCenter = { x: this.centerX, y: this.centerY }
    // this.size = Math.sqrt((this.wHeight*this.wHeight) + (this.wWidth*this.wWidth)*(this.wHeight/this.wWidth))
    this.size = Math.min(Math.sqrt(this.wHeight*this.wHeight), Math.sqrt(this.wWidth*this.wWidth))
  }
  initContainer () {
    var it = this;
    setTimeout(function () {
      window.scrollTo(it.centerX, it.centerY);
    },1000)
  }
  draw() {
    this.bubleCenter.x = document.body.scrollLeft + this.wWidth/2 - 75;
    this.bubleCenter.y = document.body.scrollTop  + this.wHeight/2 - 75;

    var origin = `${this.bubleCenter.x}px ${this.bubleCenter.y}px`
    mojs.helpers.setPrefixedStyle(this.particlesContainer, 'perspective-origin', origin)

    var cnt = 0;
    var i = this.particlesLength;
    while(i--) {
      this.particleBuffer = this.particles[i];
      var x = Math.abs(this.bubleCenter.x-this.particleBuffer.x)
      var y = Math.abs(this.bubleCenter.y-this.particleBuffer.y)

      var delta = this.size/(Math.sqrt(x*x + y*y)*2.6);
      var radius = Math.sqrt(x*x + y*y);
      // this.badge.textContent = delta
      var shift = (delta > 1.4) ? (delta-1.4)/14 : 0
      shift = mojs.helpers.clamp(shift, 0, 1.006)
      delta = mojs.helpers.clamp(delta, 0, 1)
      // delta = (mojs.easing.cubic.in(delta))
      delta = (mojs.easing.exponential.in(delta))
      delta = (mojs.easing.quadratic.out(delta))
      // delta = (mojs.easing.back.in(delta))
      delta = Math.max(delta, 0.03);
      // delta += mojs.easing.cubic.out(shift)
      // delta = delta.toFixed(5);
      // this.particleBuffer.children[0].textContent = delta
      if (this.particleBuffer.prevDelta !== delta) {
        cnt++;
        var nDelta = mojs.easing.exponential.in(1-delta);
        var translateZ = -175*(nDelta);
        var transform = `scale(${delta}) translateZ(${translateZ}px)`;
        mojs.helpers.setPrefixedStyle(this.particleBuffer, 'transform', transform);
        this.particleBuffer.prevDelta = delta
        this.particleBuffer.translateZ = translateZ
        this.particleBuffer.delta  = delta
        this.particleBuffer.nDelta = nDelta
      }
      // this.badge.textContent = cnt;
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.app = new Main

