// var Impulse   = require('impulse')
require('classlist-polyfill')
var mojs      = require('../js/vendor/mo')
var Iscroll   = require('../js/vendor/iscroll-probe')
var Howl      = require('howler').Howl

var events        = require('./events-mixin');
var showOnEl      = require('./show-on-el-mixin');
var hideEl        = require('./hide-el-mixin');
var showInner     = require('./show-inner-mixin');
var closeButton   = require('./close-button-mixin');

var main = {
  init: function(o) {
    this.vars(); this.initContainer(); this.initClose(); this.initHideClose();
    this.prepareSprites(); this.events(); this.draw();
    setInterval(() => { this.updateProgress(false) }, 10)
    return this;
  },
  initContainer: function () {
    this.iscroll = new Iscroll('#js-wrapper', {
      scrollX: true, freeScroll: true, mouseWheel: true, probeType: 3
    });
    var x = -this.centerX + this.wWidth/2  + this.xOffset,
        y = -this.centerY + this.wHeight/2 + this.yOffset;
    this.iscroll.scrollTo(x, y, 10);
  },
  vars: function() {
    this.particlesContainer = document.querySelector('#scroller');
    this.particles = document.querySelectorAll('.particle');
    this.S = 1; this.loadCnt = 0; this.maxLoadCnt = 8;
    this.BLOB_DURATION = 500;
    this.ext = this.isCanPlayMP3() ? 'mp3' : 'wav';
    this.isIOS = this.isIOSSafari();
    this.isIE  = this.isIE(); this.isIE && document.body.classList.add('ie');
    this.progressStep = (150/this.maxLoadCnt) * (1/16);
    this.openSound      = new Howl({ urls: [`sounds/open-bubble-2.${this.ext}`], onload: this.updateProgress.bind(this)});
    this.openSound2     = new Howl({ urls: [`sounds/open-bubble-3.${this.ext}`], rate: .15, onload: this.updateProgress.bind(this)});
    this.bounceSound    = new Howl({ urls: [`sounds/bounce.${this.ext}`] });
    this.closeSound     = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .5, onload: this.updateProgress.bind(this) });
    this.closeSound2    = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .75, onload: this.updateProgress.bind(this) });
    this.closeSound3    = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .85, onload: this.updateProgress.bind(this) });
    // this.metaSound      = new Howl({ urls: [`sounds/open-bubble.${this.ext}`], rate: 2});
    this.closeScaleSound = new Howl({ urls: [`sounds/open-bubble-3.${this.ext}`], rate: .25, onload: this.updateProgress.bind(this) });
    this.closeBtnSound   = new Howl({ urls: [`sounds/open-bubble-3.${this.ext}`], rate: 1, onload: this.updateProgress.bind(this) });
    this.loadImage('css/i/mojs-logo.png');
    this.particleRadius = getComputedStyle(this.particles[0]).width;
    this.particleRadius = parseInt(this.particleRadius, 10)/2;
    this.closeBtn     = document.querySelector('#js-close-btn');
    this.closeBtnI    = document.querySelector('#js-close-btn-inner');
    this.blobCircle   = document.querySelector('#js-blob-circle');
    this.blobEllipses = this.blobCircle.querySelectorAll('#js-blob-circle-ellipse')
    this.dust1        = document.querySelector('#js-dust-1');
    this.dust2        = document.querySelector('#js-dust-2');
    this.dust3        = document.querySelector('#js-dust-3');
    this.dust4        = document.querySelector('#js-dust-4');
    // this.blobCircleW  = document.querySelector('#js-blob-circle-wrap');
    // this.blobCircleI  = document.querySelector('#js-blob-circle-inner');
    this.badge        = document.querySelector('#js-badge');
    this.content      = document.querySelector('#js-content');
    this.contentI     = document.querySelector('#js-content-inner');
    this.dustWrap     = document.querySelector('#js-dust-wrap');
    this.curtain      = document.querySelector('#js-curtain');
    this.progress     = document.querySelector('#js-progress');
    this.progressGrad = document.querySelector('#js-progress-gradient');
    this.particlesLength = this.particles.length;
    var styles        = getComputedStyle(this.particlesContainer);
    this.width        = parseInt(styles.width, 10);
    this.height       = parseInt(styles.height,10);    
    this.radPoint     = mojs.helpers.getRadialPoint;
    this.particleBuffer = null; this.isOpen = false;
    this.blobBase     = 1.6; this.blob = this.blobBase; this.blobShift = this.blobBase;
    this.prepareDust(); this.calcDimentions()
    this.xOffset      = this.particleRadius + 25;
    this.yOffset      = 1.4*this.particleRadius;
    var i = this.particlesLength;
    while(i--) {
      var particle = this.particles[i];
      particle.x = parseInt(particle.getAttribute('data-left'), 10);
      particle.y = parseInt(particle.getAttribute('data-top'),  10);
    }
  },
  draw: function() {
    var origin = `${this.bubleCenter.x}px ${this.bubleCenter.y}px`,
        h = mojs.h, inEasing = mojs.easing.cubic.in;
    h.setPrefixedStyle(this.particlesContainer, 'perspective-origin', origin)

    var i = this.particlesLength;
    while(i--) {
      this.particleBuffer = this.particles[i];
      var x = Math.abs(this.bubleCenter.x-this.particleBuffer.x),
          y = Math.abs(this.bubleCenter.y-this.particleBuffer.y),
          radius = Math.sqrt(x*x + y*y),
          a      = this.blob - (2*radius)/this.size,
          b      = this.blobShift - (2*radius)/this.size, scaleMax = 1;

      var delta = mojs.helpers.clamp(inEasing(a), 0.03, scaleMax),
          deltaShift = h.clamp((inEasing(b)), 0.03, scaleMax);

      var isDeltaChanged = this.particleBuffer.prevDelta !== delta;
      if (isDeltaChanged || this.particleBuffer.prevDeltaShift !== deltaShift) {
      // cnt++;
      var translateZ = -150*(inEasing(1-deltaShift)),
          transform  = `scale(${delta}) translateZ(${translateZ}px)`;
      h.setPrefixedStyle(this.particleBuffer, 'transform', transform);
      this.particleBuffer.prevDelta      = delta;
      this.particleBuffer.prevDeltaShift = deltaShift;
      }
    }
    // this.badge.textContent = cnt;
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
  },
  start: function () {
    this.curtain.classList.add('is-hide');
    this.startBlob();
  },
  startBlob: function () {
    var tween = new mojs.Tween;
    var t = new mojs.Timeline({
      duration: 1200*this.S,
      onUpdate: (p)=> {
        this.blob = this.blobBase + .3*(1-mojs.easing.elastic.out(p));
      }
    });

    var centerX = this.bubleCenter.x,
        centerY = this.bubleCenter.y;
    var t2 = new mojs.Timeline({
      duration: 1200*this.S, delay: 0*this.S,
      onUpdate: (p)=> {
        this.blobShift = this.blobBase + .5*(1-mojs.easing.elastic.out(p));
      },
      onStart: () => { this.closeScaleSound.play() }
    });
    tween.add(t, t2);
    tween.start();
  },
  updateProgress: function (isReturn = true) {
    if (isReturn) {return}
    var shift = (this.maxLoadCnt - ++this.loadCnt)*this.progressStep;
    this.progress.style.width = `${shift}rem`;
    mojs.h.setPrefixedStyle(this.progressGrad, 'transform', `translateX(-${(this.loadCnt*this.progressStep/1.3)}rem)`);
    (this.loadCnt === this.maxLoadCnt) && this.start();
  },
  loadImage: function (url) {
    let image = new Image;
    image.addEventListener('load',  this.updateProgress.bind(this), false);
    image.addEventListener('error', this.updateProgress.bind(this), false);
    image.src = url;
  },
  isCanPlayMP3: function () { return !navigator.userAgent.indexOf("Opera"); },
  isIOSSafari:  function () {
    var userAgent = navigator.userAgent;
    return !!(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i));
  },
  isIE: function () {
    return !!(window.navigator.msPointerEnabled && !window.PointerEvent);
  }
}

mojs.h.extend(main, events);
mojs.h.extend(main, showOnEl);
mojs.h.extend(main, hideEl);
mojs.h.extend(main, showInner);
mojs.h.extend(main, closeButton);
window.app = main.init()
