var Impulse = require('impulse')
var mojs    = require('mo-js')
var mojs2   = require('../js/vendor/mo')

class Main {
  constructor(o) {
    this.vars()
    this.initContainer()
    this.draw()
    this.events()
    // this.runBlob()
  }
  vars() {
    this.particlesContainer = document.querySelector('#js-particles');
    this.particles = document.querySelectorAll('.particle');
    this.close = document.querySelector('#js-close');
    this.badge = document.querySelector('#js-badge');
    this.particlesLength = this.particles.length;
    var styles     = getComputedStyle(this.particlesContainer);
    this.width     = parseInt(styles.width, 10);
    this.height    = parseInt(styles.height,10);
    this.radPoint = mojs.helpers.getRadialPoint;
    this.particleBuffer = null;
    this.blobBase = 1.6;
    this.blob = this.blobBase;
    this.blobShift = this.blobBase;
    this.isOpen = false;
    this.calcDimentions()
    var i = this.particlesLength;
    while(i--) {
      var particle = this.particles[i];
      particle.x = parseInt(particle.getAttribute('data-left'), 10);
      particle.y = parseInt(particle.getAttribute('data-top'),  10);
    }
  }

  events(){
    window.addEventListener('resize', () => this.calcDimentions())
    // document.addEventListener('touchstart', (e) => {
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

  calcDimentions () {
    this.wWidth    = window.innerWidth;
    this.wHeight   = window.innerHeight;
    this.centerY   = this.height/2 - this.wHeight/2;
    this.centerX   = this.width/2 - this.wWidth/2;
    this.bubleCenter = { x: this.centerX, y: this.centerY }
    this.size = 1*Math.min(Math.sqrt(this.wHeight*this.wHeight), Math.sqrt(this.wWidth*this.wWidth))
  }
  initContainer () {
    var it = this;
    setTimeout(function () {
      window.scrollTo(it.centerX, it.centerY);
    },1000)
  }
  draw() {
    var origin = `${this.bubleCenter.x}px ${this.bubleCenter.y}px`
    mojs.helpers.setPrefixedStyle(this.particlesContainer, 'perspective-origin', origin)

    var cnt = 0;
    var i = this.particlesLength;
    while(i--) {
      this.particleBuffer = this.particles[i];
      var x = Math.abs(this.bubleCenter.x-this.particleBuffer.x)
      var y = Math.abs(this.bubleCenter.y-this.particleBuffer.y)

      // var delta = this.size/(Math.sqrt(x*x + y*y)*2.6);
      var radius = Math.sqrt(x*x + y*y);
      var a = this.blob - (2*radius)/this.size
      var b = this.blobShift - (2*radius)/this.size
      // delta = mojs.helpers.clamp(delta, 0.03, 1)
      var scaleMax = 1
      var delta = mojs.helpers.clamp(a, 0.03, scaleMax)
      delta = (mojs2.easing.cubic.in(delta))
      delta = mojs.helpers.clamp(delta, 0.03, scaleMax)

      var deltaShift = mojs.helpers.clamp(b, 0.03, 2*scaleMax)
      deltaShift = (mojs2.easing.cubic.in(deltaShift))
      deltaShift = mojs.helpers.clamp(deltaShift, 0.03, 2*scaleMax)

      // this.particleBuffer.querySelector('.particle__inner').textContent = i

      var isDeltaChanged = this.particleBuffer.prevDelta !== delta
      if (isDeltaChanged || this.particleBuffer.prevDeltaShift !== deltaShift) {
        cnt++;
        var nDelta = mojs2.easing.expo.in(1-delta);
        var nDeltaShift = mojs2.easing.expo.in(1-deltaShift);
        var translateZ = -125*(nDeltaShift);
        var transform = `scale(${delta}) translateZ(${translateZ}px)`;
        mojs.helpers.setPrefixedStyle(this.particleBuffer, 'transform', transform);
        this.particleBuffer.prevDelta = delta
        this.particleBuffer.prevDeltaShift = deltaShift
        this.particleBuffer.translateZ = translateZ
        this.particleBuffer.delta  = delta
        this.particleBuffer.nDelta = nDelta
      }
      // this.badge.textContent = cnt;
    }
    requestAnimationFrame(this.draw.bind(this));
  }
  closeEl() {

  }
  showOnEl(el) {
    var x = el.x - this.wWidth/2 + 75
    var y = el.y - this.wHeight/2 + 75
    var currX = document.body.scrollLeft
    var currY = document.body.scrollTop
    var innerEl = el.querySelector('.particle__inner')
    this.isOpen = true;

    var burst = new mojs2.Transit({
      type: 'circle',
      stroke: 'white',
      fill: 'transparent',
      strokeWidth: {140: 0},
      count: 12,
      opacity: {.5:0},
      x: el.x+75, y: el.y+75,
      radius: {0:this.size},
      childOptions: {
        radius: {
          15: 0
        }
      }
    });
    
    var timeline = new mojs2.Timeline({
      duration: 700,
      easing: 'cubic.out',
      onUpdate: (p)=> {
        window.scrollTo(x + (currX-x)*(1-p), y + (currY-y)*(1-p));
      }
    });

    var timeline2 = new mojs2.Timeline({
      duration: 300,
      easing: 'expo.out',
      onUpdate: (p)=> {
        mojs2.h.setPrefixedStyle(innerEl, 'transform', `scale(${1-.25*p}) translateZ(0)`)
        innerEl.style.opacity = 1-.25*p
      }
    });
    var tween = new mojs2.Tween;
    tween.add(timeline);
    tween.add(timeline2);
    tween.start();
    var innerEl = el.querySelector('.particle__inner')
    var contentEl = el.querySelector('.particle__content')
    el.style['z-index'] = 20
    var timeline = new mojs2.Timeline({
      duration: 600,
      delay: 100,
      // easing: 'cubic.out',
      onUpdate: (p)=> {
        this.blob = this.blobBase + .3*(mojs.easing.cubic.out(p));
        this.blobShift = this.blobBase + 1*(p);
      }
    });

    var timeline2 = new mojs2.Timeline({
      duration: 600,
      delay: 350,
      // easing: 'cubic.out',
      onStart:()=> {
        // contentEl.style.display = 'block'
      },
      onUpdate: (p)=> {
        var scaleSize = 15*mojs2.easing.cubic.in(p)
        scaleSize = Math.max(.75, scaleSize)
        mojs2.h.setPrefixedStyle(innerEl, 'transform', `scale(${scaleSize}) translateZ(0)`)
        // mojs2.h.setPrefixedStyle(contentEl, 'transform', `scale(${1/scaleSize})`)
        innerEl.style.opacity = .75 + .25*mojs2.easing.cubic.out(p)
      },
      onComplete:()=> {
        this.close.classList.add('is-show')
      }
    });
    var tween = new mojs2.Tween;
    tween.add(timeline);
    tween.add(timeline2);
    tween.start();
  }
}

window.app = new Main
