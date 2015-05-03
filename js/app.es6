// var Impulse   = require('impulse')
var mojs      = require('../js/vendor/mo')
var Iscroll   = require('../js/vendor/iscroll-probe')
var Howl      = require('howler').Howl

var events    = require('./events-mixin')
var showOnEl  = require('./show-on-el-mixin')
var showInner = require('./show-inner-mixin');
var showClose = require('./show-close-mixin');
var showInnerPlastic = require('./show-inner-plastic-mixin');


// var showOnElModule = new ShowOnEl;
// var ShowInner = require('./show-inner');

var main = {
  init: function(o) {
    this.vars(); this.initContainer(); this.initClose()
    this.draw(); this.events()
    
    // setTimeout(()=>{
    //   this.showInnerCircle()
    //   // var showInnerModule = new ShowInner;
    //   // var el = document.querySelector('.particle.is-open');
    //   // showInnerModule.showInner(el, this);
    // }, 1000)
    return this;
  },
  // showOnEl: function (el) { showOnElModule.show.apply(this, [el]) },
  initContainer: function () {
    this.iscroll = new Iscroll('#js-wrapper', {
      scrollX: true, freeScroll: true, mouseWheel: true, probeType: 3
    });
    var x = -this.centerX + this.wWidth/2 + this.xOffset,
        y = -this.centerY + this.wHeight/2 + this.yOffset;
    this.iscroll.scrollTo(x, y, 10);
    // console.log(this.iscroll.maxScrollY = -3000)
  },
  vars: function() {
    this.particlesContainer = document.querySelector('#scroller');
    this.particles = document.querySelectorAll('.particle');
    this.S = 1;
    this.openSound      = new Howl({ urls: ['sounds/open-bubble-2.wav'] });
    this.openSound2     = new Howl({ urls: ['sounds/open-bubble-3.wav'], rate: .15 });
    this.bounceSound    = new Howl({ urls: ['sounds/bounce-2.wav'] });
    this.closeSound     = new Howl({ urls: ['sounds/bubble-single-1.wav'], rate: .5 });
    this.metaSound      = new Howl({ urls: ['sounds/open-bubble.wav'], rate: 1.5});

    this.particleRadius = getComputedStyle(this.particles[0]).width;
    this.particleRadius = parseInt(this.particleRadius, 10)/2;
    this.closeBtn     = document.querySelector('#js-close-btn');
    this.blobCircle   = document.querySelector('#js-blob-circle');
    this.blobCircleI  = document.querySelector('#js-blob-circle-inner');
    this.badge        = document.querySelector('#js-badge');
    this.content      = document.querySelector('#js-content');
    this.particlesLength = this.particles.length;
    var styles     = getComputedStyle(this.particlesContainer);
    this.width     = parseInt(styles.width, 10);
    this.height    = parseInt(styles.height,10);    
    this.radPoint = mojs.helpers.getRadialPoint;
    this.particleBuffer = null; this.isOpen = false;
    this.blobBase = 1.6; this.blob = this.blobBase; this.blobShift = this.blobBase;
    this.calcDimentions()
    this.xOffset = this.particleRadius + 25;
    this.yOffset = 1.4*this.particleRadius;
    var i = this.particlesLength;
    while(i--) {
      var particle = this.particles[i];
      particle.x = parseInt(particle.getAttribute('data-left'), 10);
      particle.y = parseInt(particle.getAttribute('data-top'),  10);
    }
  },
  draw: function() {
    var origin = `${this.bubleCenter.x}px ${this.bubleCenter.y}px`
    mojs.helpers.setPrefixedStyle(this.particlesContainer, 'perspective-origin', origin)

    var cnt = 0;
    var i = this.particlesLength;
    while(i--) {
      this.particleBuffer = this.particles[i];
      var x = Math.abs(this.bubleCenter.x-this.particleBuffer.x),
          y = Math.abs(this.bubleCenter.y-this.particleBuffer.y),
          radius = Math.sqrt(x*x + y*y),
          a = this.blob - (2*radius)/this.size,
          b = this.blobShift - (2*radius)/this.size,
          scaleMax = 1,
          delta = mojs.helpers.clamp(a, 0.03, scaleMax);


      delta = (mojs.easing.cubic.in(delta))
      delta = mojs.helpers.clamp(delta, 0.03, scaleMax)

      var deltaShift = mojs.helpers.clamp(b, 0.03, 2*scaleMax)
      deltaShift = (mojs.easing.cubic.in(deltaShift))
      deltaShift = mojs.helpers.clamp(deltaShift, 0.03, 2*scaleMax)      

      // this.particleBuffer.querySelector('.particle__inner').textContent = i

      var isDeltaChanged = this.particleBuffer.prevDelta !== delta
      if (isDeltaChanged || this.particleBuffer.prevDeltaShift !== deltaShift) {
        cnt++;
        var nDelta = mojs.easing.expo.in(1-delta),
            nDeltaShift = mojs.easing.cubic.in(1-deltaShift),
            translateZ = -150*(nDeltaShift),
            transform = `scale(${delta}) translateZ(${translateZ}px)`;
        mojs.helpers.setPrefixedStyle(this.particleBuffer, 'transform', transform);
        this.particleBuffer.prevDelta = delta
        this.particleBuffer.prevDeltaShift = deltaShift
        this.particleBuffer.translateZ = translateZ
        this.particleBuffer.delta  = delta; this.particleBuffer.nDelta = nDelta
      }
    }
    requestAnimationFrame(this.draw.bind(this));
  },
  calcDimentions: function () {
    this.wWidth  = window.innerWidth; this.wHeight = window.innerHeight;
    this.centerY = this.height/2 - this.wHeight/2;
    this.centerX = this.width/2  - this.wWidth/2;
    this.bubleCenter = { x: this.centerX, y: this.centerY }
    var x = Math.sqrt(this.wHeight*this.wHeight),
        y = Math.sqrt(this.wWidth*this.wWidth);
    this.size = 1*Math.min(x, y)
  }
}

mojs.h.extend(main, events);
mojs.h.extend(main, showOnEl);
mojs.h.extend(main, showInner);
mojs.h.extend(main, showClose);
mojs.h.extend(main, showInnerPlastic);
window.app = main.init()
