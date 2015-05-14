
require('classlist-polyfill');
var mojs          = require('mo-js');
var Iscroll       = require('../js/vendor/iscroll-probe');
var Howl          = require('howler').Howl;
var Hammer        = require('hammerjs');

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
    this.S = 1; this.loadCnt = 0; this.maxLoadCnt = 8;
    this.BLOB_DURATION = 500;
    this.ext   = this.isCanPlayMP3() ? 'mp3' : 'wav';
    this.isIE  = this.isIE();
    this.isIOS = !!(/(iPad|iPhone|iPod)/g.test( navigator.userAgent ));
    !this.isIOS && document.body.classList.add('ios');
    !this.isTabletMobile && document.body.classList.add('desktop');
    this.progressStep = (150/this.maxLoadCnt) * (1/16);

    this.getDOMElements();
    
    this.particleRadius  = parseInt(getComputedStyle(this.particles[0]).width, 10)/2;
    this.particlesLength = this.particles.length;
    
    this.radPoint     = mojs.helpers.getRadialPoint;
    this.particleBuffer = null; this.isOpen = false;
    this.blobBase     = 1.6; this.blob = this.blobBase; this.blobShift = this.blobBase;
    this.xOffset      = this.particleRadius + 25;
    this.yOffset      = 1.4*this.particleRadius;

    var styles = getComputedStyle(this.particlesContainer);
    this.width = parseInt(styles.width, 10); this.height = parseInt(styles.height,10);
    
    this.prepareDust(); this.calcDimentions(); this.loadAssets();

    var i = this.particlesLength; 
    while(i--) {
      var particle = this.particles[i];
      particle.x = parseInt(particle.getAttribute('data-left'), 10);
      particle.y = parseInt(particle.getAttribute('data-top'),  10);
    }

  },
  getDOMElements: function () {
    this.particlesContainer = document.querySelector('#scroller');
    this.particles    = document.querySelectorAll('.particle');
    this.closeBtn     = document.querySelector('#js-close-btn');
    this.blobCircle   = document.querySelector('#js-blob-circle');
    this.blobEllipses = this.blobCircle.querySelectorAll('#js-blob-circle-ellipse')
    this.dust1        = document.querySelector('#js-dust-1');
    this.dust2        = document.querySelector('#js-dust-2');
    this.dust3        = document.querySelector('#js-dust-3');
    this.dust4        = document.querySelector('#js-dust-4');
    this.content      = document.querySelector('#js-content');
    this.curtain      = document.querySelector('#js-curtain');
    this.progress     = document.querySelector('#js-progress');
    this.progressGrad = document.querySelector('#js-progress-gradient');
  },
  draw: function() {
    var origin = `${this.bubleCenter.x}px ${this.bubleCenter.y}px`,
        h = mojs.h, inEasing = mojs.easing.cubic.in, i = this.particlesLength;
    
    h.setPrefixedStyle(this.particlesContainer, 'perspective-origin', origin);

    while(i--) {
      this.particleBuffer = this.particles[i];
      var x      = Math.abs(this.bubleCenter.x-this.particleBuffer.x),
          y      = Math.abs(this.bubleCenter.y-this.particleBuffer.y),
          radius = Math.sqrt(x*x + y*y),
          a      = this.blob - (2*radius)/this.size,
          b      = this.blobShift - (2*radius)/this.size, scaleMax = 1;

      var delta = mojs.helpers.clamp(inEasing(a), 0.03, scaleMax),
          deltaShift = h.clamp((inEasing(b)), 0.03, scaleMax),
          isDeltaChanged = this.particleBuffer.prevDelta !== delta;

      if (isDeltaChanged || this.particleBuffer.prevDeltaShift !== deltaShift) {
      var translateZ = -150*(inEasing(1-deltaShift)),
          transform  = `scale(${delta}) translateZ(${translateZ}px)`;
      h.setPrefixedStyle(this.particleBuffer, 'transform', transform);
      this.particleBuffer.prevDelta      = delta;
      this.particleBuffer.prevDeltaShift = deltaShift;
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
  },
  start: function () { this.curtain.classList.add('is-hide'); this.startBlob(); },
  startBlob: function () {
    var tween = new mojs.Tween;
    var t = new mojs.Timeline({
      duration: 1200*this.S,
      onUpdate: (p)=> {
        this.blob = this.blobBase + .3*(1-mojs.easing.elastic.out(p));
      }
    });

    var centerX = this.bubleCenter.x, centerY = this.bubleCenter.y;

    var t2 = new mojs.Timeline({
      duration: 1200*this.S, delay: 0*this.S,
      onUpdate: (p)=> {
        this.blobShift = this.blobBase + .5*(1-mojs.easing.elastic.out(p));
      },
      onStart: () => { this.closeScaleSound.play() }
    });
    tween.add(t, t2); tween.start();
  },
  updateProgress: function (isReturn = true) {
    if (isReturn) {return}
    var shift = (this.maxLoadCnt - ++this.loadCnt)*this.progressStep;
    this.progress.style.width = `${shift}rem`;
    mojs.h.setPrefixedStyle(this.progressGrad, 'transform', `translateX(-${(this.loadCnt*this.progressStep/1.3)}rem)`);
    (this.loadCnt === this.maxLoadCnt) && this.start();
  },
  loadAssets: function () {
    this.openSound       = new Howl({ urls: [`sounds/open-bubble-2.${this.ext}`], onload: this.updateProgress.bind(this)});
    this.openSound2      = new Howl({ urls: [`sounds/open-bubble-3.${this.ext}`], rate: .15, onload: this.updateProgress.bind(this)});
    this.bounceSound     = new Howl({ urls: [`sounds/bounce.${this.ext}`] });
    this.closeSound      = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .5, onload: this.updateProgress.bind(this) });
    this.closeSound2     = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .75, onload: this.updateProgress.bind(this) });
    this.closeSound3     = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .85, onload: this.updateProgress.bind(this) });
    this.closeScaleSound = new Howl({ urls: [`sounds/open-bubble-3.${this.ext}`], rate: .25, onload: this.updateProgress.bind(this) });
    this.closeBtnSound   = new Howl({ urls: [`sounds/open-bubble-3.${this.ext}`], rate: 1, onload: this.updateProgress.bind(this) });
    this.loadImage('css/i/mojs-logo.png');
  },
  loadImage: function (url) {
    var image = new Image;
    image.addEventListener('load',  this.updateProgress.bind(this), false);
    image.addEventListener('error', this.updateProgress.bind(this), false);
    image.src = url;
  },
  isCanPlayMP3: function () {
    var userAgent = navigator.userAgent;
    return !(userAgent.indexOf("Opera") && (userAgent.indexOf('firefox') > -1));
  },
  isIE: function () {
    return !!(window.navigator.msPointerEnabled && !window.PointerEvent);
  },
  isTabletMobile: (function () {
    return !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  })(),
  setBubblePosition: function () {
    this.bubleCenter.x = -this.iscroll.x + this.wWidth/2  + this.xOffset;
    this.bubleCenter.y = -this.iscroll.y + this.wHeight/2 + this.yOffset;
  },
  events: function () {
    window.addEventListener('resize', () => {
      this.calcDimentions(); this.setBubblePosition()
    });
    (new Hammer(document.body)).on('tap', (e) => {
      var el = e.target.parentNode;
      if (this.isOpen) { return e.preventDefault() }
      if (el.classList.contains('particle')) { this.showOnEl(el);}
      else if (el.parentNode.classList.contains('particle')) {
        this.showOnEl(el.parentNode);
      }
    });
    (new Hammer(this.closeBtn)).on('tap', this.closeEl.bind(this));
    document.addEventListener('touchmove', function (e) {e.preventDefault();}, false);
    this.iscroll.on('scroll', this.setBubblePosition.bind(this));
  }

}

mojs.h.extend(main, showOnEl);
mojs.h.extend(main, hideEl);
mojs.h.extend(main, showInner);
mojs.h.extend(main, closeButton);
main.init()
