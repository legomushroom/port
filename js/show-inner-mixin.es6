var mojs = require('../js/vendor/mo');

var showInner = {
  showInner: function (el) {
    this.showClose();
    this.showInnerPlastic(el);
    // this.showInnerTextPrelude(el);
  },
  showInnerTextPrelude: function (el) {

    var text = el.querySelector('.project__text');

    // var burst = new mojs.Burst({
    //   parent:       text,
    //   type:         'circle',
    //   degree:       45,
    //   randomRadius:  1,
    //   fill:         'cyan',
    //   x: -5,        y: 70,
    //   radius:       {0: 200},
    //   angle:        -15,
    //   isSwirl:      true,
    //   delay:        500*this.S,
    //   onStart:      () => {this.closeSound.play()}
    // });

    var texts = el.querySelectorAll('.project-text-line__inner');
    var yShift = 10, xShift = 10;
    el.querySelector('.particle__content').style.display = 'block'

    this.showClose();
    var textLineOption = {
      parent:       text,
      x: -25+xShift,y: 104+yShift,
      duration:     500*this.S,
      stroke:       'cyan',
      strokeWidth:  {'rand(6, 14)': 0},
      radius:       170,
      easing:       'cubic.in',
      strokeDasharray: '100%',
      strokeLinecap:   'round',
      strokeDashoffset: { '100%': '-100%' },
      delay: 'rand(0, 300)'
    }
    var scissorsSoundDelay = 350;
    var lineBigOption = {
      y: 15+yShift, x: -45+xShift, radius: 120, strokeDashoffset: { '100%': '-100%' },
      strokeWidth: {30: 0},
      onUpdate: (p) => { this.moveTextEl(texts[0], p); },
      onComplete: () => {
        this.showInnerPlastic(el);
      }
      }
    mojs.h.extend(lineBigOption, textLineOption);
    var line1 = new mojs.Transit(lineBigOption);    

    var line0Option = {
      y: 122+yShift, radius: 50, strokeDashoffset: { '-100%': '100%' },
      onUpdate: (p) => { this.moveTextEl(texts[4], p); }
    }
    mojs.h.extend(line0Option, textLineOption);
    var line0 = new mojs.Transit(line0Option);    

    var line1Option = { y: 98+yShift, onUpdate: (p) => { this.moveTextEl(texts[3], p);}}
    mojs.h.extend(line1Option, textLineOption);
    var line1 = new mojs.Transit(line1Option);

    var line2Option = {
      y: 73+yShift, radius: 80, strokeDashoffset:{'-100%':'100%'},
      onUpdate: (p) => { this.moveTextEl(texts[2], p); }
    }
    mojs.h.extend(line2Option, textLineOption);
    var line2 = new mojs.Transit(line2Option);

    var line3Option = {
      y: 73+yShift, radius: 70, x: 180+xShift, strokeDashoffset:{'100%':'-100%'},
    }
    mojs.h.extend(line3Option, textLineOption);
    var line3 = new mojs.Transit(line3Option);

    var line4Option = {
      y: 50+yShift, radius: 150, strokeDashoffset: { '-100%': '100%' },
      onUpdate: (p) => { this.moveTextEl(texts[1], p); }
    }
    mojs.h.extend(line4Option, textLineOption);
    var line4 = new mojs.Transit(line4Option);

    setTimeout(()=> {
      this.metaSound.play();
    }, 500);
  },
  moveTextEl: function (el, p) {
    p = mojs.easing.cubic.out(p);
    var transform       = `rotate(${90*(1-p)}deg) translateZ(0) translateY(${200*(1-p)}%)`;
    var transformOrigin = `left ${80*(p)}%`
    mojs.h.setPrefixedStyle(el, 'transform', transform);
    mojs.h.setPrefixedStyle(el, 'transform-origin', transformOrigin);
    el.style.opacity = mojs.easing.cubic.out(p);
  }
}

export default showInner

