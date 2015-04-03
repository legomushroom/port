// import Particle from './particle'

// var p = new Particle({
//   el: document.createElement('div')
// });

// p.scale = 2
// console.log(p.scale)

class Main {
  constructor(o) {
    this.vars()
    this.createParticles()
    this.draw()
    this.listenScroll()
  }
  vars() {
    // Create a physics instance which uses the Verlet integration method
    this.physics = new Physics();
    this.physics.integrator  = new Verlet();
    this.particles      = document.querySelectorAll('.particle');
    // this.avoidMouse     = new Attraction();
    this.pullToCenter   = new Attraction();
    this.collision      = new Collision();
    this.PARTICLE_SIZE  = 75;
    this.PARTICLE_PERCENT  = this.PARTICLE_SIZE/100;
    this.GAP = 15
    this.PARTICLE_SIZE_G= this.PARTICLE_SIZE + this.GAP;
    this.CENTER_SIZE    = 2.12*this.PARTICLE_SIZE;
    // this.CENTER_SIZE    = 3*this.PARTICLE_SIZE;
    this.width = 1*1440; this.height = 1*800
    this.centerX = this.width/2
    this.centerY = this.height/2

    this.centerXOrigin = this.width/2
    this.centerYOrigin = this.height/2
    this.radPoint = mojs.helpers.getRadialPoint
  }
  createParticles() {
    var circles = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102];
    var j = 0;
    for ( var k = 0; k < circles.length; k++ ) {
      var circle = circles[k];
      j++; shift = 1-shift;

      var count = circle, angleStep = 360/circle, shift = 0
      for ( var i = 0; i < circle; i++ ) {
        var radius = 2*j*this.PARTICLE_SIZE_G;
        var pos = this.radPoint({angle: i*angleStep, radius: radius,
          center:{x: this.width/2, y:this.height/2}
          });

        var position = new Vector( pos.x, pos.y );
        var particle = new Particle( .1 );
        particle.setRadius( this.PARTICLE_SIZE_G );
        particle.moveTo( position );
        // Make it collidable
        this.collision.pool.push( particle );
        // Apply behaviours
        particle.behaviours.push( this.pullToCenter, this.collision );
        // particle.behaviours.push( this.avoidMouse, this.pullToCenter, this.collision );
        // Add to the simulation
        this.physics.particles.push( particle );
      }

    }
    // Allow particle collisions to make things interesting
    this.pullToCenter.target.x = this.width / 2;
    this.pullToCenter.target.y = this.height / 2;
    this.pullToCenter.strength = 5;

    // this.avoidMouse.target.x = this.width / 2;
    // this.avoidMouse.target.y = this.height / 2;
    // this.avoidMouse.strength = -10000;
    // this.avoidMouse.setRadius( this.CENTER_SIZE );
  }
  draw() {
    this.physics.step();
    
    // Render particles
    for ( var i = 0, n = this.physics.particles.length; i < n; i++ ) {
        var particle = this.physics.particles[i];

        // var delta = (this.width/3)/Math.abs(this.centerX - particle.pos.x)
        // delta = Math.min(delta, 1);
        // delta = Math.max(delta, 0.1);

        // var delta2 = (this.height/3)/Math.abs(this.centerY - particle.pos.y)
        // delta2 = Math.min(delta2, 1);
        // delta2 = Math.max(delta2, 0.1);

        var x = Math.abs(this.centerX - particle.pos.x)
        var y = Math.abs(this.centerY - particle.pos.y)
        var delta = Math.sqrt(2448400)/(Math.sqrt(x*x + y*y)*6)
        delta = Math.min(delta, 1);
        delta = Math.max(delta, 0.1);
        // console.log(delta)

        delta = mojs.easing.exponential.in(delta)

        particle.radius2 = this.PARTICLE_SIZE_G*delta
        // particle.radius2 = this.PARTICLE_SIZE_G*delta2

        var transform = `translate(${particle.pos.x}px, ${particle.pos.y}px) scale(${delta})`;
        this.particles[i].style.transform = transform;
        // this.particles[i].style.width = `${2*particle.radius2 - 2*this.GAP}px`;
        // this.particles[i].style.height = `${2*particle.radius2 - 2*this.GAP}px`;
        // this.particles[i].style['margin-left'] = `${-particle.radius2/2}px`;
        // this.particles[i].style['margin-top'] = `${-particle.radius2/2}px`;
    }
    requestAnimationFrame(this.draw.bind(this));
  }
  listenScroll() {
    var it = this;
    document.addEventListener('scroll', function (){
      it.centerY = window.pageYOffset + it.centerYOrigin;
      it.centerX = window.pageXOffset + it.centerXOrigin;
    });
  }
  saveParticles () {
    return
    var parts = [];
    for (var i = 0; i < this.physics.particles.length; i++) {
      parts.push({
        x: this.physics.particles[i].pos.x,
        y: this.physics.particles[i].pos.y,
      });
    };
    console.log(JSON.stringify(parts));
  }
}

window.app = new Main



setTimeout(function () {
  window.app.saveParticles()
}, 20000)


