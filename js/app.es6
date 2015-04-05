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
    // this.createParticles()
    this.draw()
    // this.listenScroll()
  }
  vars() {
    this.particlesContainer = document.querySelector('#js-particles');
    this.particles = document.querySelectorAll('.particle');
    this.badge = document.querySelector('#js-badge');
    this.particlesLength = this.particles.length;
    var styles     = getComputedStyle(this.particlesContainer);
    this.width     = parseInt(styles.width, 10);
    this.height    = parseInt(styles.height,10);
    this.wWidth    = window.innerWidth;
    this.wHeight   = window.innerHeight;
    this.centerY   = this.height/2 - this.wHeight/2;
    this.centerX   = this.width/2 - this.wWidth/2;
    this.radPoint = mojs.helpers.getRadialPoint;
    this.bubleCenter = { x: this.centerX, y: this.centerY }
    this.particleBuffer = null;

    var i = this.particlesLength;
    while(i--) {
      var particle = this.particles[i];
      particle.x = parseInt(particle.getAttribute('data-left'), 10);
      particle.y = parseInt(particle.getAttribute('data-top'),  10);
    }
//     // Create a physics instance which uses the Verlet integration method
//     this.physics = new Physics();
//     this.physics.integrator  = new Verlet();
//     this.particlesContainer      = document.querySelectorAll('.particle');
//     // this.avoidMouse     = new Attraction();
//     this.pullToCenter   = new Attraction();
//     this.collision      = new Collision();
//     this.PARTICLE_SIZE  = 75;
//     this.PARTICLE_PERCENT  = this.PARTICLE_SIZE/100;
//     this.GAP = 15
//     this.PARTICLE_SIZE_G= this.PARTICLE_SIZE + this.GAP;
//     this.CENTER_SIZE    = 2.12*this.PARTICLE_SIZE;
//     // this.CENTER_SIZE    = 3*this.PARTICLE_SIZE;
//     this.width = 1*1440; this.height = 1*800
//     this.centerX = this.width/2
//     this.centerY = this.height/2

//     this.centerXOrigin = this.width/2
//     this.centerYOrigin = this.height/2
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
      var delta = Math.sqrt(2448400)/(Math.sqrt(x*x + y*y)*5)
      var radius = Math.sqrt(x*x + y*y)
      // this.badge.textContent = delta
      // this.particleBuffer.textContent = delta
      delta = Math.min(delta, 1.0);
      delta = Math.max(delta, 0);
      delta = (mojs.easing.exponential.in(delta))
      delta = delta.toFixed(2)
      delta = Math.max(delta, 0.03);
      if (this.particleBuffer.prevDelta !== delta){
        cnt++;
        // get angle
        // var dX = this.particleBuffer.x-this.bubleCenter.x
        // var dY = this.particleBuffer.y-this.bubleCenter.y
        // var angle = (Math.atan(dY/dX)*(180/Math.PI))-90
        // if (this.bubleCenter.x-this.particleBuffer.x < 0){
        //   angle = 180 + angle;
        // }
        // var point = this.radPoint({
        //   angle: angle,
        //   radius: radius + 80*(1-mojs.easing.cubic.in(delta)),
        //   center: { x: this.bubleCenter.x, y: this.bubleCenter.y}
        // });
        
        // var xShift = this.particleBuffer.x - point.x;
        // var yShift = this.particleBuffer.y - point.y;
        // var translate = `translate3d(${xShift}px, ${yShift}px, 0)`
        var nDelta = mojs.easing.exponential.in(1-delta)
        var transform = `scale(${delta}) translateZ(${-150*(nDelta)}px)`;
        mojs.helpers.setPrefixedStyle(this.particleBuffer, 'transform', transform);
        // this.particleBuffer.style.left = point.x + 'px'
        // this.particleBuffer.style.top = point.y + 'px'
        // this.particleBuffer.textContent = angle.toFixed(2)
        // this.particleBuffer.style.transform = transform;
        this.particleBuffer.prevDelta = delta
      }

      // this.badge.textContent = cnt;
    }

//         // var delta2 = (this.height/3)/Math.abs(this.centerY - particle.pos.y)
//         // delta2 = Math.min(delta2, 1);
//         // delta2 = Math.max(delta2, 0.1);

//         var x = Math.abs(this.centerX - particle.pos.x)
//         var y = Math.abs(this.centerY - particle.pos.y)
//         var delta = Math.sqrt(2448400)/(Math.sqrt(x*x + y*y)*6)
//         delta = Math.min(delta, 1);
//         delta = Math.max(delta, 0.1);
//         // console.log(delta)

//         delta = mojs.easing.quadratic.in(mojs.easing.exponential.in(delta))

//         particle.radius2 = this.PARTICLE_SIZE_G*delta
//         // particle.radius2 = this.PARTICLE_SIZE_G*delta2

//         var transform = `translate(${particle.pos.x}px, ${particle.pos.y}px) scale(${delta})`;
//         this.particlesContainer[i].style.transform = transform;
//         // this.particlesContainer[i].style.width = `${2*particle.radius2 - 2*this.GAP}px`;
//         // this.particlesContainer[i].style.height = `${2*particle.radius2 - 2*this.GAP}px`;
//         // this.particlesContainer[i].style['margin-left'] = `${-particle.radius2/2}px`;
//         // this.particlesContainer[i].style['margin-top'] = `${-particle.radius2/2}px`;
//     }
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.app = new Main



// setTimeout(function () {
//   window.app.saveParticles()
// }, 20000)


