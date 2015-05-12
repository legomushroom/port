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
    this.ext   = this.isCanPlayMP3() ? 'mp3' : 'wav';
    this.isIOS = this.isIOSSafari();
    this.isIE  = this.isIE();
    !this.isTabletMobile && document.body.classList.add('desktop');
    this.progressStep = (150/this.maxLoadCnt) * (1/16);
    this.openSound       = new Howl({ urls: [`sounds/open-bubble-2.${this.ext}`], onload: this.updateProgress.bind(this)});
    this.openSound2      = new Howl({ urls: [`sounds/open-bubble-3.${this.ext}`], rate: .15, onload: this.updateProgress.bind(this)});
    this.bounceSound     = new Howl({ urls: [`sounds/bounce.${this.ext}`] });
    this.closeSound      = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .5, onload: this.updateProgress.bind(this) });
    this.closeSound2     = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .75, onload: this.updateProgress.bind(this) });
    this.closeSound3     = new Howl({ urls: [`sounds/bubble-single-1.${this.ext}`], rate: .85, onload: this.updateProgress.bind(this) });
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
    this.badge        = document.querySelector('#js-badge');
    this.content      = document.querySelector('#js-content');
    this.contentI     = document.querySelector('#js-content-inner');
    this.dustWrap     = document.querySelector('#js-dust-wrap');
    this.curtain      = document.querySelector('#js-curtain');
    this.progress     = document.querySelector('#js-progress');
    this.progressGrad = document.querySelector('#js-progress-gradient');
    this.particlesLength = this.particles.length;
    var styles = getComputedStyle(this.particlesContainer);
    this.width = parseInt(styles.width, 10); this.height = parseInt(styles.height,10);
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
  isCanPlayMP3: function () {
    var userAgent = navigator.userAgent;
    return !(userAgent.indexOf("Opera") && (userAgent.indexOf('firefox') > -1));
  },
  isIOSSafari:  function () {
    var userAgent = navigator.userAgent;
    return !!(userAgent.match(/iPad/i) || userAgent.match(/iPhone/i));
  },
  isIE: function () {
    return !!(window.navigator.msPointerEnabled && !window.PointerEvent);
  },
  isMobile: (function () {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  })(),
  isTabletMobile: (function () {
    var isTouchDevice = function() {  return 'ontouchstart' in window || 'onmsgesturechange' in window; };
    var isDesktop = window.screenX != 0 && !isTouchDevice() ? true : false;
    return !isDesktop;
  })()
}

mojs.h.extend(main, events);
mojs.h.extend(main, showOnEl);
mojs.h.extend(main, hideEl);
mojs.h.extend(main, showInner);
mojs.h.extend(main, closeButton);
window.app = main.init()
