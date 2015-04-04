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
    this.bubleCenter.x = document.body.scrollLeft + this.wWidth/2 - 90;
    this.bubleCenter.y = document.body.scrollTop  + this.wHeight/2 - 90;

    var i = this.particlesLength;
    while(i--) {
      this.particleBuffer = this.particles[i];
      var x = Math.abs(this.bubleCenter.x-this.particleBuffer.x)
      var y = Math.abs(this.bubleCenter.y-this.particleBuffer.y)
      var delta = Math.sqrt(2448400)/(Math.sqrt(x*x + y*y)*6)
      delta = Math.min(delta, 1);
      delta = Math.max(delta, 0.1);
      delta = mojs.easing.quadratic.in(mojs.easing.quadratic.in(delta))
      delta = Math.max(delta, 0.01);
      if (this.particleBuffer.prevDelta !== delta){
        var transform = `scale(${delta}) translateZ(0)`;
        this.particleBuffer.style.transform = transform;
        this.particleBuffer.prevDelta = delta
      }
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


