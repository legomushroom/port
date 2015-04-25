/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _prototypeProperties = function (child, staticProps, instanceProps) {
	  if (staticProps) Object.defineProperties(child, staticProps);
	  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
	};

	var _interopRequire = function (obj) {
	  return obj && (obj["default"] || obj);
	};

	var _core = _interopRequire(__webpack_require__(2));

	var Impulse = __webpack_require__(3);
	var mojs = __webpack_require__(4);
	var mojs2 = __webpack_require__(34);

	var Main = (function () {
	  function Main(o) {
	    this.vars();
	    this.initContainer();
	    this.draw();
	    this.events();
	  }

	  _prototypeProperties(Main, null, {
	    vars: {
	      value: function vars() {
	        this.particlesContainer = document.querySelector("#js-particles");
	        this.particles = document.querySelectorAll(".particle");
	        this.close = document.querySelector("#js-close");
	        this.badge = document.querySelector("#js-badge");
	        this.particlesLength = this.particles.length;
	        var styles = getComputedStyle(this.particlesContainer);
	        this.width = parseInt(styles.width, 10);
	        this.height = parseInt(styles.height, 10);
	        this.radPoint = mojs.helpers.getRadialPoint;
	        this.particleBuffer = null;
	        this.blobBase = 1.6;
	        this.blob = this.blobBase;
	        this.blobShift = this.blobBase;
	        this.isOpen = false;
	        this.calcDimentions();
	        var i = this.particlesLength;
	        while (i--) {
	          var particle = this.particles[i];
	          particle.x = parseInt(particle.getAttribute("data-left"), 10);
	          particle.y = parseInt(particle.getAttribute("data-top"), 10);
	        }
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    events: {
	      value: function events() {
	        var _this = this;
	        window.addEventListener("resize", function () {
	          return _this.calcDimentions();
	        });
	        // document.addEventListener('touchstart', (e) => {
	        document.addEventListener("click", function (e) {
	          var el = e.target.parentNode;
	          if (_this.isOpen) {
	            return e.preventDefault();
	          }
	          el.classList.contains("particle") && _this.showOnEl(el);
	        });
	        this.close.addEventListener("click", function (e) {
	          _this.closeEl();
	        });
	        window.addEventListener("scroll", function (e) {
	          _this.bubleCenter.x = document.body.scrollLeft + _this.wWidth / 2 - 75;
	          _this.bubleCenter.y = document.body.scrollTop + _this.wHeight / 2 - 75;
	        });
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    calcDimentions: {
	      value: function calcDimentions() {
	        this.wWidth = window.innerWidth;
	        this.wHeight = window.innerHeight;
	        this.centerY = this.height / 2 - this.wHeight / 2;
	        this.centerX = this.width / 2 - this.wWidth / 2;
	        this.bubleCenter = { x: this.centerX, y: this.centerY };
	        this.size = 1 * Math.min(Math.sqrt(this.wHeight * this.wHeight), Math.sqrt(this.wWidth * this.wWidth));
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    initContainer: {
	      value: function initContainer() {
	        var it = this;
	        setTimeout(function () {
	          window.scrollTo(it.centerX, it.centerY);
	        }, 1000);
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    draw: {
	      value: function draw() {
	        var origin = "" + this.bubleCenter.x + "px " + this.bubleCenter.y + "px";
	        mojs.helpers.setPrefixedStyle(this.particlesContainer, "perspective-origin", origin);

	        var cnt = 0;
	        var i = this.particlesLength;
	        while (i--) {
	          this.particleBuffer = this.particles[i];
	          var x = Math.abs(this.bubleCenter.x - this.particleBuffer.x);
	          var y = Math.abs(this.bubleCenter.y - this.particleBuffer.y);

	          // var delta = this.size/(Math.sqrt(x*x + y*y)*2.6);
	          var radius = Math.sqrt(x * x + y * y);
	          var a = this.blob - 2 * radius / this.size;
	          var b = this.blobShift - 2 * radius / this.size;
	          // delta = mojs.helpers.clamp(delta, 0.03, 1)
	          var scaleMax = 1;
	          var delta = mojs.helpers.clamp(a, 0.03, scaleMax);
	          delta = mojs2.easing.cubic["in"](delta);
	          delta = mojs.helpers.clamp(delta, 0.03, scaleMax);

	          var deltaShift = mojs.helpers.clamp(b, 0.03, 2 * scaleMax);
	          deltaShift = mojs2.easing.cubic["in"](deltaShift);
	          deltaShift = mojs.helpers.clamp(deltaShift, 0.03, 2 * scaleMax);

	          // this.particleBuffer.querySelector('.particle__inner').textContent = i

	          var isDeltaChanged = this.particleBuffer.prevDelta !== delta;
	          if (isDeltaChanged || this.particleBuffer.prevDeltaShift !== deltaShift) {
	            cnt++;
	            var nDelta = mojs2.easing.expo["in"](1 - delta);
	            var nDeltaShift = mojs2.easing.expo["in"](1 - deltaShift);
	            var translateZ = -125 * nDeltaShift;
	            var transform = "scale(" + delta + ") translateZ(" + translateZ + "px)";
	            mojs.helpers.setPrefixedStyle(this.particleBuffer, "transform", transform);
	            this.particleBuffer.prevDelta = delta;
	            this.particleBuffer.prevDeltaShift = deltaShift;
	            this.particleBuffer.translateZ = translateZ;
	            this.particleBuffer.delta = delta;
	            this.particleBuffer.nDelta = nDelta;
	          }
	          // this.badge.textContent = cnt;
	        }
	        requestAnimationFrame(this.draw.bind(this));
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    closeEl: {
	      value: function closeEl() {},
	      writable: true,
	      enumerable: true,
	      configurable: true
	    },
	    showOnEl: {
	      value: function showOnEl(el) {
	        var _this2 = this;
	        var x = el.x - this.wWidth / 2 + 75;
	        var y = el.y - this.wHeight / 2 + 75;
	        var currX = document.body.scrollLeft;
	        var currY = document.body.scrollTop;
	        var innerEl = el.querySelector(".particle__inner");
	        this.isOpen = true;

	        var burst = new mojs2.Transit({
	          type: "circle",
	          stroke: "white",
	          fill: "transparent",
	          strokeWidth: { 140: 0 },
	          count: 12,
	          opacity: { 0.5: 0 },
	          x: el.x + 75, y: el.y + 75,
	          radius: { 0: this.size },
	          childOptions: {
	            radius: {
	              15: 0
	            }
	          }
	        });


	        var timeline = new mojs2.Timeline({
	          duration: 700,
	          easing: "cubic.out",
	          onUpdate: function (p) {
	            window.scrollTo(x + (currX - x) * (1 - p), y + (currY - y) * (1 - p));
	          }
	        });

	        var timeline2 = new mojs2.Timeline({
	          duration: 300,
	          easing: "expo.out",
	          onUpdate: function (p) {
	            mojs2.h.setPrefixedStyle(innerEl, "transform", "scale(" + (1 - 0.25 * p) + ") translateZ(0)");
	            innerEl.style.opacity = 1 - 0.25 * p;
	          }
	        });
	        var tween = new mojs2.Tween();
	        tween.add(timeline);
	        tween.add(timeline2);
	        tween.start();
	        var innerEl = el.querySelector(".particle__inner");
	        var contentEl = el.querySelector(".particle__content");
	        el.style["z-index"] = 20;
	        var timeline = new mojs2.Timeline({
	          duration: 600,
	          delay: 100,
	          // easing: 'cubic.out',
	          onUpdate: function (p) {
	            _this2.blob = _this2.blobBase + 0.3 * mojs.easing.cubic.out(p);
	            _this2.blobShift = _this2.blobBase + 1 * p;
	          }
	        });

	        var timeline2 = new mojs2.Timeline({
	          duration: 600,
	          delay: 350,
	          // easing: 'cubic.out',
	          onStart: function () {},
	          onUpdate: function (p) {
	            var scaleSize = 15 * mojs2.easing.cubic["in"](p);
	            scaleSize = Math.max(0.75, scaleSize);
	            mojs2.h.setPrefixedStyle(innerEl, "transform", "scale(" + scaleSize + ") translateZ(0)");
	            // mojs2.h.setPrefixedStyle(contentEl, 'transform', `scale(${1/scaleSize})`)
	            innerEl.style.opacity = 0.75 + 0.25 * mojs2.easing.cubic.out(p);
	          },
	          onComplete: function () {
	            _this2.close.classList.add("is-show");
	          }
	        });
	        var tween = new mojs2.Tween();
	        tween.add(timeline);
	        tween.add(timeline2);
	        tween.start();
	      },
	      writable: true,
	      enumerable: true,
	      configurable: true
	    }
	  });

	  return Main;
	})();

	window.app = new Main();
	// this.runBlob()
	// contentEl.style.display = 'block'

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Core.js 0.4.10
	 * https://github.com/zloirock/core-js
	 * License: http://rock.mit-license.org
	 * © 2015 Denis Pushkarev
	 */
	!function(global, framework, undefined){
	'use strict';

	/******************************************************************************
	 * Module : common                                                            *
	 ******************************************************************************/

	  // Shortcuts for [[Class]] & property names
	var OBJECT          = 'Object'
	  , FUNCTION        = 'Function'
	  , ARRAY           = 'Array'
	  , STRING          = 'String'
	  , NUMBER          = 'Number'
	  , REGEXP          = 'RegExp'
	  , DATE            = 'Date'
	  , MAP             = 'Map'
	  , SET             = 'Set'
	  , WEAKMAP         = 'WeakMap'
	  , WEAKSET         = 'WeakSet'
	  , SYMBOL          = 'Symbol'
	  , PROMISE         = 'Promise'
	  , MATH            = 'Math'
	  , ARGUMENTS       = 'Arguments'
	  , PROTOTYPE       = 'prototype'
	  , CONSTRUCTOR     = 'constructor'
	  , TO_STRING       = 'toString'
	  , TO_STRING_TAG   = TO_STRING + 'Tag'
	  , TO_LOCALE       = 'toLocaleString'
	  , HAS_OWN         = 'hasOwnProperty'
	  , FOR_EACH        = 'forEach'
	  , ITERATOR        = 'iterator'
	  , FF_ITERATOR     = '@@' + ITERATOR
	  , PROCESS         = 'process'
	  , CREATE_ELEMENT  = 'createElement'
	  // Aliases global objects and prototypes
	  , Function        = global[FUNCTION]
	  , Object          = global[OBJECT]
	  , Array           = global[ARRAY]
	  , String          = global[STRING]
	  , Number          = global[NUMBER]
	  , RegExp          = global[REGEXP]
	  , Date            = global[DATE]
	  , Map             = global[MAP]
	  , Set             = global[SET]
	  , WeakMap         = global[WEAKMAP]
	  , WeakSet         = global[WEAKSET]
	  , Symbol          = global[SYMBOL]
	  , Math            = global[MATH]
	  , TypeError       = global.TypeError
	  , setTimeout      = global.setTimeout
	  , setImmediate    = global.setImmediate
	  , clearImmediate  = global.clearImmediate
	  , process         = global[PROCESS]
	  , nextTick        = process && process.nextTick
	  , document        = global.document
	  , html            = document && document.documentElement
	  , navigator       = global.navigator
	  , define          = global.define
	  , ArrayProto      = Array[PROTOTYPE]
	  , ObjectProto     = Object[PROTOTYPE]
	  , FunctionProto   = Function[PROTOTYPE]
	  , Infinity        = 1 / 0
	  , DOT             = '.';

	// http://jsperf.com/core-js-isobject
	function isObject(it){
	  return it != null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	// Native function?
	var isNative = ctx(/./.test, /\[native code\]\s*\}\s*$/, 1);

	// Object internal [[Class]] or toStringTag
	// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring
	var buildIn = {
	  Undefined: 1, Null: 1, Array: 1, String: 1, Arguments: 1,
	  Function: 1, Error: 1, Boolean: 1, Number: 1, Date: 1, RegExp:1 
	} , toString = ObjectProto[TO_STRING];
	function setToStringTag(it, tag, stat){
	  if(it && !has(it = stat ? it : it[PROTOTYPE], SYMBOL_TAG))hidden(it, SYMBOL_TAG, tag);
	}
	function cof(it){
	  return it == undefined ? it === undefined
	    ? 'Undefined' : 'Null' : toString.call(it).slice(8, -1);
	}
	function classof(it){
	  var klass = cof(it), tag;
	  return klass == OBJECT && (tag = it[SYMBOL_TAG]) ? has(buildIn, tag) ? '~' + tag : tag : klass;
	}

	// Function
	var call  = FunctionProto.call
	  , apply = FunctionProto.apply
	  , REFERENCE_GET;
	// Partial apply
	function part(/* ...args */){
	  var fn     = assertFunction(this)
	    , length = arguments.length
	    , args   = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((args[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that    = this
	      , _length = arguments.length
	      , i = 0, j = 0, _args;
	    if(!holder && !_length)return invoke(fn, args, that);
	    _args = args.slice();
	    if(holder)for(;length > i; i++)if(_args[i] === _)_args[i] = arguments[j++];
	    while(_length > j)_args.push(arguments[j++]);
	    return invoke(fn, _args, that);
	  }
	}
	// Optional / simple context binding
	function ctx(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    }
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    }
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    }
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	  }
	}
	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	function invoke(fn, args, that){
	  var un = that === undefined;
	  switch(args.length | 0){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	}
	function construct(target, argumentsList /*, newTarget*/){
	  var proto    = assertFunction(arguments.length < 3 ? target : arguments[2])[PROTOTYPE]
	    , instance = create(isObject(proto) ? proto : ObjectProto)
	    , result   = apply.call(target, instance, argumentsList);
	  return isObject(result) ? result : instance;
	}

	// Object:
	var create           = Object.create
	  , getPrototypeOf   = Object.getPrototypeOf
	  , setPrototypeOf   = Object.setPrototypeOf
	  , defineProperty   = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , getOwnDescriptor = Object.getOwnPropertyDescriptor
	  , getKeys          = Object.keys
	  , getNames         = Object.getOwnPropertyNames
	  , getSymbols       = Object.getOwnPropertySymbols
	  , isFrozen         = Object.isFrozen
	  , has              = ctx(call, ObjectProto[HAS_OWN], 2)
	  // Dummy, fix for not array-like ES3 string in es5 module
	  , ES5Object        = Object
	  , Dict;
	function toObject(it){
	  return ES5Object(assertDefined(it));
	}
	function returnIt(it){
	  return it;
	}
	function returnThis(){
	  return this;
	}
	function get(object, key){
	  if(has(object, key))return object[key];
	}
	function ownKeys(it){
	  assertObject(it);
	  return getSymbols ? getNames(it).concat(getSymbols(it)) : getNames(it);
	}
	// 19.1.2.1 Object.assign(target, source, ...)
	var assign = Object.assign || function(target, source){
	  var T = Object(assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = ES5Object(arguments[i++])
	      , keys   = getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	}
	function keyOf(object, el){
	  var O      = toObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	}

	// Array
	// array('str1,str2,str3') => ['str1', 'str2', 'str3']
	function array(it){
	  return String(it).split(',');
	}
	var push    = ArrayProto.push
	  , unshift = ArrayProto.unshift
	  , slice   = ArrayProto.slice
	  , splice  = ArrayProto.splice
	  , indexOf = ArrayProto.indexOf
	  , forEach = ArrayProto[FOR_EACH];
	/*
	 * 0 -> forEach
	 * 1 -> map
	 * 2 -> filter
	 * 3 -> some
	 * 4 -> every
	 * 5 -> find
	 * 6 -> findIndex
	 */
	function createArrayMethod(type){
	  var isMap       = type == 1
	    , isFilter    = type == 2
	    , isSome      = type == 3
	    , isEvery     = type == 4
	    , isFindIndex = type == 6
	    , noholes     = type == 5 || isFindIndex;
	  return function(callbackfn/*, that = undefined */){
	    var O      = Object(assertDefined(this))
	      , that   = arguments[1]
	      , self   = ES5Object(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = isMap ? Array(length) : isFilter ? [] : undefined
	      , val, res;
	    for(;length > index; index++)if(noholes || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(type){
	        if(isMap)result[index] = res;             // map
	        else if(res)switch(type){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(isEvery)return false;           // every
	      }
	    }
	    return isFindIndex ? -1 : isSome || isEvery ? isEvery : result;
	  }
	}
	function createArrayContains(isContains){
	  return function(el /*, fromIndex = 0 */){
	    var O      = toObject(this)
	      , length = toLength(O.length)
	      , index  = toIndex(arguments[1], length);
	    if(isContains && el != el){
	      for(;length > index; index++)if(sameNaN(O[index]))return isContains || index;
	    } else for(;length > index; index++)if(isContains || index in O){
	      if(O[index] === el)return isContains || index;
	    } return !isContains && -1;
	  }
	}
	function generic(A, B){
	  // strange IE quirks mode bug -> use typeof vs isFunction
	  return typeof A == 'function' ? A : B;
	}

	// Math
	var MAX_SAFE_INTEGER = 0x1fffffffffffff // pow(2, 53) - 1 == 9007199254740991
	  , ceil   = Math.ceil
	  , floor  = Math.floor
	  , max    = Math.max
	  , min    = Math.min
	  , random = Math.random
	  , trunc  = Math.trunc || function(it){
	      return (it > 0 ? floor : ceil)(it);
	    }
	// 20.1.2.4 Number.isNaN(number)
	function sameNaN(number){
	  return number != number;
	}
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it) ? 0 : trunc(it);
	}
	// 7.1.15 ToLength
	function toLength(it){
	  return it > 0 ? min(toInteger(it), MAX_SAFE_INTEGER) : 0;
	}
	function toIndex(index, length){
	  var index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	}

	function createReplacer(regExp, replace, isStatic){
	  var replacer = isObject(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(isStatic ? it : this).replace(regExp, replacer);
	  }
	}
	function createPointAt(toString){
	  return function(pos){
	    var s = String(assertDefined(this))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return toString ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? toString ? s.charAt(i) : a
	      : toString ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  }
	}

	// Assertion & errors
	var REDUCE_ERROR = 'Reduce of empty object with no initial value';
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError('Function called on null or undefined');
	  return it;
	}
	function assertFunction(it){
	  assert(isFunction(it), it, ' is not a function!');
	  return it;
	}
	function assertObject(it){
	  assert(isObject(it), it, ' is not an object!');
	  return it;
	}
	function assertInstance(it, Constructor, name){
	  assert(it instanceof Constructor, name, ": use the 'new' operator!");
	}

	// Property descriptors & Symbol
	function descriptor(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  }
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return defineProperty(object, key, descriptor(bitmap, value));
	  } : simpleSet;
	}
	function uid(key){
	  return SYMBOL + '(' + key + ')_' + (++sid + random())[TO_STRING](36);
	}
	function getWellKnownSymbol(name, setter){
	  return (Symbol && Symbol[name]) || (setter ? Symbol : safeSymbol)(SYMBOL + DOT + name);
	}
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC   = !!function(){try{return defineProperty({}, DOT, ObjectProto)}catch(e){}}()
	  , sid    = 0
	  , hidden = createDefiner(1)
	  , set    = Symbol ? simpleSet : hidden
	  , safeSymbol = Symbol || uid;
	function assignHidden(target, src){
	  for(var key in src)hidden(target, key, src[key]);
	  return target;
	}

	var SYMBOL_UNSCOPABLES = getWellKnownSymbol('unscopables')
	  , ArrayUnscopables   = ArrayProto[SYMBOL_UNSCOPABLES] || {}
	  , SYMBOL_SPECIES     = getWellKnownSymbol('species');
	function setSpecies(C){
	  if(framework || !isNative(C))defineProperty(C, SYMBOL_SPECIES, {
	    configurable: true,
	    get: returnThis
	  });
	}

	// Iterators
	var SYMBOL_ITERATOR = getWellKnownSymbol(ITERATOR)
	  , SYMBOL_TAG      = getWellKnownSymbol(TO_STRING_TAG)
	  , SUPPORT_FF_ITER = FF_ITERATOR in ArrayProto
	  , ITER  = safeSymbol('iter')
	  , KEY   = 1
	  , VALUE = 2
	  , Iterators = {}
	  , IteratorPrototype = {}
	  , NATIVE_ITERATORS = SYMBOL_ITERATOR in ArrayProto
	    // Safari define byggy iterators w/o `next`
	  , BUGGY_ITERATORS = 'keys' in ArrayProto && !('next' in [].keys());
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, returnThis);
	function setIterator(O, value){
	  hidden(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  SUPPORT_FF_ITER && hidden(O, FF_ITERATOR, value);
	}
	function createIterator(Constructor, NAME, next, proto){
	  Constructor[PROTOTYPE] = create(proto || IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	}
	function defineIterator(Constructor, NAME, value, DEFAULT){
	  var proto = Constructor[PROTOTYPE]
	    , iter  = get(proto, SYMBOL_ITERATOR) || get(proto, FF_ITERATOR) || (DEFAULT && get(proto, DEFAULT)) || value;
	  if(framework){
	    // Define iterator
	    setIterator(proto, iter);
	    if(iter !== value){
	      var iterProto = getPrototypeOf(iter.call(new Constructor));
	      // Set @@toStringTag to native iterators
	      setToStringTag(iterProto, NAME + ' Iterator', true);
	      // FF fix
	      has(proto, FF_ITERATOR) && setIterator(iterProto, returnThis);
	    }
	  }
	  // Plug for library
	  Iterators[NAME] = iter;
	  // FF & v8 fix
	  Iterators[NAME + ' Iterator'] = returnThis;
	  return iter;
	}
	function defineStdIterators(Base, NAME, Constructor, next, DEFAULT, IS_SET){
	  function createIter(kind){
	    return function(){
	      return new Constructor(this, kind);
	    }
	  }
	  createIterator(Constructor, NAME, next);
	  var entries = createIter(KEY+VALUE)
	    , values  = createIter(VALUE);
	  if(DEFAULT == VALUE)values = defineIterator(Base, NAME, values, 'values');
	  else entries = defineIterator(Base, NAME, entries, 'entries');
	  if(DEFAULT){
	    $define(PROTO + FORCED * BUGGY_ITERATORS, NAME, {
	      entries: entries,
	      keys: IS_SET ? values : createIter(KEY),
	      values: values
	    });
	  }
	}
	function iterResult(done, value){
	  return {value: value, done: !!done};
	}
	function isIterable(it){
	  var O      = Object(it)
	    , Symbol = global[SYMBOL]
	    , hasExt = (Symbol && Symbol[ITERATOR] || FF_ITERATOR) in O;
	  return hasExt || SYMBOL_ITERATOR in O || has(Iterators, classof(O));
	}
	function getIterator(it){
	  var Symbol  = global[SYMBOL]
	    , ext     = it[Symbol && Symbol[ITERATOR] || FF_ITERATOR]
	    , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
	  return assertObject(getIter.call(it));
	}
	function stepCall(fn, value, entries){
	  return entries ? invoke(fn, value) : fn(value);
	}
	function forOf(iterable, entries, fn, that){
	  var iterator = getIterator(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done)if(stepCall(f, step.value, entries) === false)return;
	}

	// core
	var NODE = cof(process) == PROCESS
	  , core = {}
	  , path = framework ? global : core
	  , old  = global.core
	  , exportGlobal
	  // type bitmap
	  , FORCED = 1
	  , GLOBAL = 2
	  , STATIC = 4
	  , PROTO  = 8
	  , BIND   = 16
	  , WRAP   = 32;
	function $define(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & GLOBAL
	    , target   = isGlobal ? global : (type & STATIC)
	        ? global[name] : (global[name] || ObjectProto)[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // there is a similar native
	    own = !(type & FORCED) && target && key in target
	      && (!isFunction(target[key]) || isNative(target[key]));
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    if(type & BIND && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & WRAP && !framework && target[key] == out){
	      exp = function(param){
	        return this instanceof out ? new out(param) : out(param);
	      }
	      exp[PROTOTYPE] = out[PROTOTYPE];
	    } else exp = type & PROTO && isFunction(out) ? ctx(call, out) : out;
	    // export
	    if(exports[key] != out)hidden(exports, key, exp);
	    // extend global
	    if(framework && target && !own){
	      if(isGlobal)target[key] = out;
	      else delete target[key] && hidden(target, key, out);
	    }
	  }
	}
	// CommonJS export
	if(typeof module != 'undefined' && module.exports)module.exports = core;
	// RequireJS export
	else if(isFunction(define) && define.amd)define(function(){return core});
	// Export to global object
	else exportGlobal = true;
	if(exportGlobal || framework){
	  core.noConflict = function(){
	    global.core = old;
	    return core;
	  }
	  global.core = core;
	}

	/******************************************************************************
	 * Module : global                                                            *
	 ******************************************************************************/

	$define(GLOBAL + FORCED, {global: global});

	/******************************************************************************
	 * Module : es6_symbol                                                        *
	 ******************************************************************************/

	// ECMAScript 6 symbols shim
	!function(TAG, SymbolRegistry, AllSymbols, setter){
	  // 19.4.1.1 Symbol([description])
	  if(!isNative(Symbol)){
	    Symbol = function(description){
	      assert(!(this instanceof Symbol), SYMBOL + ' is not a ' + CONSTRUCTOR);
	      var tag = uid(description)
	        , sym = set(create(Symbol[PROTOTYPE]), TAG, tag);
	      AllSymbols[tag] = sym;
	      DESC && setter && defineProperty(ObjectProto, tag, {
	        configurable: true,
	        set: function(value){
	          hidden(this, tag, value);
	        }
	      });
	      return sym;
	    }
	    hidden(Symbol[PROTOTYPE], TO_STRING, function(){
	      return this[TAG];
	    });
	  }
	  $define(GLOBAL + WRAP, {Symbol: Symbol});
	  
	  var symbolStatics = {
	    // 19.4.2.1 Symbol.for(key)
	    'for': function(key){
	      return has(SymbolRegistry, key += '')
	        ? SymbolRegistry[key]
	        : SymbolRegistry[key] = Symbol(key);
	    },
	    // 19.4.2.4 Symbol.iterator
	    iterator: SYMBOL_ITERATOR,
	    // 19.4.2.5 Symbol.keyFor(sym)
	    keyFor: part.call(keyOf, SymbolRegistry),
	    // 19.4.2.10 Symbol.species
	    species: SYMBOL_SPECIES,
	    // 19.4.2.13 Symbol.toStringTag
	    toStringTag: SYMBOL_TAG = getWellKnownSymbol(TO_STRING_TAG, true),
	    // 19.4.2.14 Symbol.unscopables
	    unscopables: SYMBOL_UNSCOPABLES,
	    pure: safeSymbol,
	    set: set,
	    useSetter: function(){setter = true},
	    useSimple: function(){setter = false}
	  };
	  // 19.4.2.2 Symbol.hasInstance
	  // 19.4.2.3 Symbol.isConcatSpreadable
	  // 19.4.2.6 Symbol.match
	  // 19.4.2.8 Symbol.replace
	  // 19.4.2.9 Symbol.search
	  // 19.4.2.11 Symbol.split
	  // 19.4.2.12 Symbol.toPrimitive
	  forEach.call(array('hasInstance,isConcatSpreadable,match,replace,search,split,toPrimitive'),
	    function(it){
	      symbolStatics[it] = getWellKnownSymbol(it);
	    }
	  );
	  $define(STATIC, SYMBOL, symbolStatics);
	  
	  setToStringTag(Symbol, SYMBOL);
	  
	  $define(STATIC + FORCED * !isNative(Symbol), OBJECT, {
	    // 19.1.2.7 Object.getOwnPropertyNames(O)
	    getOwnPropertyNames: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) || result.push(key);
	      return result;
	    },
	    // 19.1.2.8 Object.getOwnPropertySymbols(O)
	    getOwnPropertySymbols: function(it){
	      var names = getNames(toObject(it)), result = [], key, i = 0;
	      while(names.length > i)has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
	      return result;
	    }
	  });
	}(safeSymbol('tag'), {}, {}, true);

	/******************************************************************************
	 * Module : es6                                                               *
	 ******************************************************************************/

	// ECMAScript 6 shim
	!function(RegExpProto, isFinite, tmp, NAME){
	  var RangeError = global.RangeError
	      // 20.1.2.3 Number.isInteger(number)
	    , isInteger = Number.isInteger || function(it){
	        return !isObject(it) && isFinite(it) && floor(it) === it;
	      }
	      // 20.2.2.28 Math.sign(x)
	    , sign = Math.sign || function sign(x){
	        return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	      }
	    , E    = Math.E
	    , pow  = Math.pow
	    , abs  = Math.abs
	    , exp  = Math.exp
	    , log  = Math.log
	    , sqrt = Math.sqrt
	    , fcc  = String.fromCharCode
	    , at   = createPointAt(true);
	  
	  var objectStatic = {
	    // 19.1.3.1 Object.assign(target, source)
	    assign: assign,
	    // 19.1.3.10 Object.is(value1, value2)
	    is: function(x, y){
	      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	    }
	  };
	  // 19.1.3.19 Object.setPrototypeOf(O, proto)
	  // Works with __proto__ only. Old v8 can't works with null proto objects.
	  '__proto__' in ObjectProto && function(buggy, set){
	    try {
	      set = ctx(call, getOwnDescriptor(ObjectProto, '__proto__').set, 2);
	      set({}, ArrayProto);
	    } catch(e){ buggy = true }
	    objectStatic.setPrototypeOf = setPrototypeOf = setPrototypeOf || function(O, proto){
	      assertObject(O);
	      assert(proto === null || isObject(proto), proto, ": can't set as prototype!");
	      if(buggy)O.__proto__ = proto;
	      else set(O, proto);
	      return O;
	    }
	  }();
	  $define(STATIC, OBJECT, objectStatic);
	  
	  // 20.2.2.5 Math.asinh(x)
	  function asinh(x){
	    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
	  }
	  // 20.2.2.14 Math.expm1(x)
	  function expm1(x){
	    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
	  }
	  
	  $define(STATIC, NUMBER, {
	    // 20.1.2.1 Number.EPSILON
	    EPSILON: pow(2, -52),
	    // 20.1.2.2 Number.isFinite(number)
	    isFinite: function(it){
	      return typeof it == 'number' && isFinite(it);
	    },
	    // 20.1.2.3 Number.isInteger(number)
	    isInteger: isInteger,
	    // 20.1.2.4 Number.isNaN(number)
	    isNaN: sameNaN,
	    // 20.1.2.5 Number.isSafeInteger(number)
	    isSafeInteger: function(number){
	      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
	    },
	    // 20.1.2.6 Number.MAX_SAFE_INTEGER
	    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
	    // 20.1.2.10 Number.MIN_SAFE_INTEGER
	    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
	    // 20.1.2.12 Number.parseFloat(string)
	    parseFloat: parseFloat,
	    // 20.1.2.13 Number.parseInt(string, radix)
	    parseInt: parseInt
	  });
	  
	  $define(STATIC, MATH, {
	    // 20.2.2.3 Math.acosh(x)
	    acosh: function(x){
	      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
	    },
	    // 20.2.2.5 Math.asinh(x)
	    asinh: asinh,
	    // 20.2.2.7 Math.atanh(x)
	    atanh: function(x){
	      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
	    },
	    // 20.2.2.9 Math.cbrt(x)
	    cbrt: function(x){
	      return sign(x = +x) * pow(abs(x), 1 / 3);
	    },
	    // 20.2.2.11 Math.clz32(x)
	    clz32: function(x){
	      return (x >>>= 0) ? 32 - x[TO_STRING](2).length : 32;
	    },
	    // 20.2.2.12 Math.cosh(x)
	    cosh: function(x){
	      return (exp(x = +x) + exp(-x)) / 2;
	    },
	    // 20.2.2.14 Math.expm1(x)
	    expm1: expm1,
	    // 20.2.2.16 Math.fround(x)
	    // TODO: fallback for IE9-
	    fround: function(x){
	      return new Float32Array([x])[0];
	    },
	    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	    hypot: function(value1, value2){
	      var sum  = 0
	        , len1 = arguments.length
	        , len2 = len1
	        , args = Array(len1)
	        , larg = -Infinity
	        , arg;
	      while(len1--){
	        arg = args[len1] = +arguments[len1];
	        if(arg == Infinity || arg == -Infinity)return Infinity;
	        if(arg > larg)larg = arg;
	      }
	      larg = arg || 1;
	      while(len2--)sum += pow(args[len2] / larg, 2);
	      return larg * sqrt(sum);
	    },
	    // 20.2.2.18 Math.imul(x, y)
	    imul: function(x, y){
	      var UInt16 = 0xffff
	        , xn = +x
	        , yn = +y
	        , xl = UInt16 & xn
	        , yl = UInt16 & yn;
	      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
	    },
	    // 20.2.2.20 Math.log1p(x)
	    log1p: function(x){
	      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
	    },
	    // 20.2.2.21 Math.log10(x)
	    log10: function(x){
	      return log(x) / Math.LN10;
	    },
	    // 20.2.2.22 Math.log2(x)
	    log2: function(x){
	      return log(x) / Math.LN2;
	    },
	    // 20.2.2.28 Math.sign(x)
	    sign: sign,
	    // 20.2.2.30 Math.sinh(x)
	    sinh: function(x){
	      return (abs(x = +x) < 1) ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
	    },
	    // 20.2.2.33 Math.tanh(x)
	    tanh: function(x){
	      var a = expm1(x = +x)
	        , b = expm1(-x);
	      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	    },
	    // 20.2.2.34 Math.trunc(x)
	    trunc: trunc
	  });
	  // 20.2.1.9 Math[@@toStringTag]
	  setToStringTag(Math, MATH, true);
	  
	  function assertNotRegExp(it){
	    if(cof(it) == REGEXP)throw TypeError();
	  }
	  $define(STATIC, STRING, {
	    // 21.1.2.2 String.fromCodePoint(...codePoints)
	    fromCodePoint: function(x){
	      var res = []
	        , len = arguments.length
	        , i   = 0
	        , code
	      while(len > i){
	        code = +arguments[i++];
	        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	        res.push(code < 0x10000
	          ? fcc(code)
	          : fcc(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	        );
	      } return res.join('');
	    },
	    // 21.1.2.4 String.raw(callSite, ...substitutions)
	    raw: function(callSite){
	      var raw = toObject(callSite.raw)
	        , len = toLength(raw.length)
	        , sln = arguments.length
	        , res = []
	        , i   = 0;
	      while(len > i){
	        res.push(String(raw[i++]));
	        if(i < sln)res.push(String(arguments[i]));
	      } return res.join('');
	    }
	  });
	  $define(PROTO, STRING, {
	    // 21.1.3.3 String.prototype.codePointAt(pos)
	    codePointAt: createPointAt(false),
	    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	    endsWith: function(searchString /*, endPosition = @length */){
	      assertNotRegExp(searchString);
	      var that = String(assertDefined(this))
	        , endPosition = arguments[1]
	        , len = toLength(that.length)
	        , end = endPosition === undefined ? len : min(toLength(endPosition), len);
	      searchString += '';
	      return that.slice(end - searchString.length, end) === searchString;
	    },
	    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
	    includes: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      return !!~String(assertDefined(this)).indexOf(searchString, arguments[1]);
	    },
	    // 21.1.3.13 String.prototype.repeat(count)
	    repeat: function(count){
	      var str = String(assertDefined(this))
	        , res = ''
	        , n   = toInteger(count);
	      if(0 > n || n == Infinity)throw RangeError("Count can't be negative");
	      for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	      return res;
	    },
	    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	    startsWith: function(searchString /*, position = 0 */){
	      assertNotRegExp(searchString);
	      var that  = String(assertDefined(this))
	        , index = toLength(min(arguments[1], that.length));
	      searchString += '';
	      return that.slice(index, index + searchString.length) === searchString;
	    }
	  });
	  // 21.1.3.27 String.prototype[@@iterator]()
	  defineStdIterators(String, STRING, function(iterated){
	    set(this, ITER, {o: String(iterated), i: 0});
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , index = iter.i
	      , point;
	    if(index >= O.length)return iterResult(1);
	    point = at.call(O, index);
	    iter.i += point.length;
	    return iterResult(0, point);
	  });
	  
	  $define(STATIC, ARRAY, {
	    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	    from: function(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	      var O       = Object(assertDefined(arrayLike))
	        , result  = new (generic(this, Array))
	        , mapfn   = arguments[1]
	        , that    = arguments[2]
	        , mapping = mapfn !== undefined
	        , f       = mapping ? ctx(mapfn, that, 2) : undefined
	        , index   = 0
	        , length;
	      if(isIterable(O))for(var iter = getIterator(O), step; !(step = iter.next()).done; index++){
	        result[index] = mapping ? f(step.value, index) : step.value;
	      } else for(length = toLength(O.length); length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	      result.length = index;
	      return result;
	    },
	    // 22.1.2.3 Array.of( ...items)
	    of: function(/* ...args */){
	      var index  = 0
	        , length = arguments.length
	        , result = new (generic(this, Array))(length);
	      while(length > index)result[index] = arguments[index++];
	      result.length = length;
	      return result;
	    }
	  });
	  $define(PROTO, ARRAY, {
	    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	    copyWithin: function(target /* = 0 */, start /* = 0, end = @length */){
	      var O     = Object(assertDefined(this))
	        , len   = toLength(O.length)
	        , to    = toIndex(target, len)
	        , from  = toIndex(start, len)
	        , end   = arguments[2]
	        , fin   = end === undefined ? len : toIndex(end, len)
	        , count = min(fin - from, len - to)
	        , inc   = 1;
	      if(from < to && to < from + count){
	        inc  = -1;
	        from = from + count - 1;
	        to   = to + count - 1;
	      }
	      while(count-- > 0){
	        if(from in O)O[to] = O[from];
	        else delete O[to];
	        to += inc;
	        from += inc;
	      } return O;
	    },
	    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	    fill: function(value /*, start = 0, end = @length */){
	      var O      = Object(assertDefined(this))
	        , length = toLength(O.length)
	        , index  = toIndex(arguments[1], length)
	        , end    = arguments[2]
	        , endPos = end === undefined ? length : toIndex(end, length);
	      while(endPos > index)O[index++] = value;
	      return O;
	    },
	    // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	    find: createArrayMethod(5),
	    // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	    findIndex: createArrayMethod(6)
	  });
	  // 22.1.3.4 Array.prototype.entries()
	  // 22.1.3.13 Array.prototype.keys()
	  // 22.1.3.29 Array.prototype.values()
	  // 22.1.3.30 Array.prototype[@@iterator]()
	  defineStdIterators(Array, ARRAY, function(iterated, kind){
	    set(this, ITER, {o: toObject(iterated), i: 0, k: kind});
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	  }, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , kind  = iter.k
	      , index = iter.i++;
	    if(!O || index >= O.length)return iter.o = undefined, iterResult(1);
	    if(kind == KEY)  return iterResult(0, index);
	    if(kind == VALUE)return iterResult(0, O[index]);
	                     return iterResult(0, [index, O[index]]);
	  }, VALUE);
	  
	  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	  Iterators[ARGUMENTS] = Iterators[ARRAY];
	  
	  // 24.3.3 JSON[@@toStringTag]
	  setToStringTag(global.JSON, 'JSON', true);
	  
	  // Object static methods accept primitives
	  function wrapObjectMethod(key, MODE){
	    var fn  = Object[key]
	      , exp = core[OBJECT][key]
	      , f   = 0
	      , o   = {};
	    if(!exp || isNative(exp)){
	      o[key] =
	        MODE == 1 ? function(it){ return isObject(it) ? fn(it) : it } :
	        MODE == 2 ? function(it){ return isObject(it) ? fn(it) : true } :
	        MODE == 3 ? function(it){ return isObject(it) ? fn(it) : false } :
	        MODE == 4 ? function(it, key){ return fn(toObject(it), key) } :
	                    function(it){ return fn(toObject(it)) }
	      try { fn(DOT) }
	      catch(e){ f = 1}
	      $define(STATIC + FORCED * f, OBJECT, o);
	    }
	  }
	  wrapObjectMethod('freeze', 1);
	  wrapObjectMethod('seal', 1);
	  wrapObjectMethod('preventExtensions', 1);
	  wrapObjectMethod('isFrozen', 2);
	  wrapObjectMethod('isSealed', 2);
	  wrapObjectMethod('isExtensible', 3);
	  wrapObjectMethod('getOwnPropertyDescriptor', 4);
	  wrapObjectMethod('getPrototypeOf');
	  wrapObjectMethod('keys');
	  wrapObjectMethod('getOwnPropertyNames');
	  
	  if(framework){
	    // 19.1.3.6 Object.prototype.toString()
	    tmp[SYMBOL_TAG] = DOT;
	    if(cof(tmp) != DOT)hidden(ObjectProto, TO_STRING, function(){
	      return '[object ' + classof(this) + ']';
	    });
	    
	    // 19.2.4.2 name
	    NAME in FunctionProto || defineProperty(FunctionProto, NAME, {
	      configurable: true,
	      get: function(){
	        var match = String(this).match(/^\s*function ([^ (]*)/)
	          , name  = match ? match[1] : '';
	        has(this, NAME) || defineProperty(this, NAME, descriptor(5, name));
	        return name;
	      },
	      set: function(value){
	        has(this, NAME) || defineProperty(this, NAME, descriptor(0, value));
	      }
	    });
	    
	    // RegExp allows a regex with flags as the pattern
	    if(DESC && !function(){try{return RegExp(/a/g, 'i') == '/a/i'}catch(e){}}()){
	      var _RegExp = RegExp;
	      RegExp = function RegExp(pattern, flags){
	        return new _RegExp(cof(pattern) == REGEXP && flags !== undefined
	          ? pattern.source : pattern, flags);
	      }
	      forEach.call(getNames(_RegExp), function(key){
	        key in RegExp || defineProperty(RegExp, key, {
	          configurable: true,
	          get: function(){ return _RegExp[key] },
	          set: function(it){ _RegExp[key] = it }
	        });
	      });
	      RegExpProto[CONSTRUCTOR] = RegExp;
	      RegExp[PROTOTYPE] = RegExpProto;
	      hidden(global, REGEXP, RegExp);
	    }
	    
	    // 21.2.5.3 get RegExp.prototype.flags()
	    if(/./g.flags != 'g')defineProperty(RegExpProto, 'flags', {
	      configurable: true,
	      get: createReplacer(/^.*\/(\w*)$/, '$1')
	    });
	    
	    // 22.1.3.31 Array.prototype[@@unscopables]
	    forEach.call(array('find,findIndex,fill,copyWithin,entries,keys,values'), function(it){
	      ArrayUnscopables[it] = true;
	    });
	    SYMBOL_UNSCOPABLES in ArrayProto || hidden(ArrayProto, SYMBOL_UNSCOPABLES, ArrayUnscopables);
	  }
	  
	  setSpecies(RegExp);
	  setSpecies(Array);
	}(RegExp[PROTOTYPE], isFinite, {}, 'name');

	/******************************************************************************
	 * Module : immediate                                                         *
	 ******************************************************************************/

	// setImmediate shim
	// Node.js 0.9+ & IE10+ has setImmediate, else:
	isFunction(setImmediate) && isFunction(clearImmediate) || function(ONREADYSTATECHANGE){
	  var postMessage      = global.postMessage
	    , addEventListener = global.addEventListener
	    , MessageChannel   = global.MessageChannel
	    , counter          = 0
	    , queue            = {}
	    , defer, channel, port;
	  setImmediate = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    }
	    defer(counter);
	    return counter;
	  }
	  clearImmediate = function(id){
	    delete queue[id];
	  }
	  function run(id){
	    if(has(queue, id)){
	      var fn = queue[id];
	      delete queue[id];
	      fn();
	    }
	  }
	  function listner(event){
	    run(event.data);
	  }
	  // Node.js 0.8-
	  if(NODE){
	    defer = function(id){
	      nextTick(part.call(run, id));
	    }
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    }
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(document && ONREADYSTATECHANGE in document[CREATE_ELEMENT]('script')){
	    defer = function(id){
	      html.appendChild(document[CREATE_ELEMENT]('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run(id);
	      }
	    }
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(part.call(run, id), 0);
	    }
	  }
	}('onreadystatechange');
	$define(GLOBAL + BIND, {
	  setImmediate:   setImmediate,
	  clearImmediate: clearImmediate
	});

	/******************************************************************************
	 * Module : es6_promise                                                       *
	 ******************************************************************************/

	// ES6 promises shim
	// Based on https://github.com/getify/native-promise-only/
	!function(Promise, test){
	  isFunction(Promise) && isFunction(Promise.resolve)
	  && Promise.resolve(test = new Promise(function(){})) == test
	  || function(asap, DEF){
	    function isThenable(o){
	      var then;
	      if(isObject(o))then = o.then;
	      return isFunction(then) ? then : false;
	    }
	    function notify(def){
	      var chain = def.chain;
	      chain.length && asap(function(){
	        var msg = def.msg
	          , ok  = def.state == 1
	          , i   = 0;
	        while(chain.length > i)!function(react){
	          var cb = ok ? react.ok : react.fail
	            , ret, then;
	          try {
	            if(cb){
	              ret = cb === true ? msg : cb(msg);
	              if(ret === react.P){
	                react.rej(TypeError(PROMISE + '-chain cycle'));
	              } else if(then = isThenable(ret)){
	                then.call(ret, react.res, react.rej);
	              } else react.res(ret);
	            } else react.rej(msg);
	          } catch(err){
	            react.rej(err);
	          }
	        }(chain[i++]);
	        chain.length = 0;
	      });
	    }
	    function resolve(msg){
	      var def = this
	        , then, wrapper;
	      if(def.done)return;
	      def.done = true;
	      def = def.def || def; // unwrap
	      try {
	        if(then = isThenable(msg)){
	          wrapper = {def: def, done: false}; // wrap
	          then.call(msg, ctx(resolve, wrapper, 1), ctx(reject, wrapper, 1));
	        } else {
	          def.msg = msg;
	          def.state = 1;
	          notify(def);
	        }
	      } catch(err){
	        reject.call(wrapper || {def: def, done: false}, err); // wrap
	      }
	    }
	    function reject(msg){
	      var def = this;
	      if(def.done)return;
	      def.done = true;
	      def = def.def || def; // unwrap
	      def.msg = msg;
	      def.state = 2;
	      notify(def);
	    }
	    function getConstructor(C){
	      var S = assertObject(C)[SYMBOL_SPECIES];
	      return S != undefined ? S : C;
	    }
	    // 25.4.3.1 Promise(executor)
	    Promise = function(executor){
	      assertFunction(executor);
	      assertInstance(this, Promise, PROMISE);
	      var def = {chain: [], state: 0, done: false, msg: undefined};
	      hidden(this, DEF, def);
	      try {
	        executor(ctx(resolve, def, 1), ctx(reject, def, 1));
	      } catch(err){
	        reject.call(def, err);
	      }
	    }
	    assignHidden(Promise[PROTOTYPE], {
	      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	      then: function(onFulfilled, onRejected){
	        var S = assertObject(assertObject(this)[CONSTRUCTOR])[SYMBOL_SPECIES];
	        var react = {
	          ok:   isFunction(onFulfilled) ? onFulfilled : true,
	          fail: isFunction(onRejected)  ? onRejected  : false
	        } , P = react.P = new (S != undefined ? S : Promise)(function(resolve, reject){
	          react.res = assertFunction(resolve);
	          react.rej = assertFunction(reject);
	        }), def = this[DEF];
	        def.chain.push(react);
	        def.state && notify(def);
	        return P;
	      },
	      // 25.4.5.1 Promise.prototype.catch(onRejected)
	      'catch': function(onRejected){
	        return this.then(undefined, onRejected);
	      }
	    });
	    assignHidden(Promise, {
	      // 25.4.4.1 Promise.all(iterable)
	      all: function(iterable){
	        var Promise = getConstructor(this)
	          , values  = [];
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, push, values);
	          var remaining = values.length
	            , results   = Array(remaining);
	          if(remaining)forEach.call(values, function(promise, index){
	            Promise.resolve(promise).then(function(value){
	              results[index] = value;
	              --remaining || resolve(results);
	            }, reject);
	          });
	          else resolve(results);
	        });
	      },
	      // 25.4.4.4 Promise.race(iterable)
	      race: function(iterable){
	        var Promise = getConstructor(this);
	        return new Promise(function(resolve, reject){
	          forOf(iterable, false, function(promise){
	            Promise.resolve(promise).then(resolve, reject);
	          });
	        });
	      },
	      // 25.4.4.5 Promise.reject(r)
	      reject: function(r){
	        return new (getConstructor(this))(function(resolve, reject){
	          reject(r);
	        });
	      },
	      // 25.4.4.6 Promise.resolve(x)
	      resolve: function(x){
	        return isObject(x) && DEF in x && getPrototypeOf(x) === this[PROTOTYPE]
	          ? x : new (getConstructor(this))(function(resolve, reject){
	            resolve(x);
	          });
	      }
	    });
	  }(nextTick || setImmediate, safeSymbol('def'));
	  setToStringTag(Promise, PROMISE);
	  setSpecies(Promise);
	  $define(GLOBAL + FORCED * !isNative(Promise), {Promise: Promise});
	}(global[PROMISE]);

	/******************************************************************************
	 * Module : es6_collections                                                   *
	 ******************************************************************************/

	// ECMAScript 6 collections shim
	!function(){
	  var UID   = safeSymbol('uid')
	    , O1    = safeSymbol('O1')
	    , WEAK  = safeSymbol('weak')
	    , LEAK  = safeSymbol('leak')
	    , LAST  = safeSymbol('last')
	    , FIRST = safeSymbol('first')
	    , SIZE  = DESC ? safeSymbol('size') : 'size'
	    , uid   = 0
	    , tmp   = {};
	  
	  function getCollection(C, NAME, methods, commonMethods, isMap, isWeak){
	    var ADDER = isMap ? 'set' : 'add'
	      , proto = C && C[PROTOTYPE]
	      , O     = {};
	    function initFromIterable(that, iterable){
	      if(iterable != undefined)forOf(iterable, isMap, that[ADDER], that);
	      return that;
	    }
	    function fixSVZ(key, chain){
	      var method = proto[key];
	      if(framework)proto[key] = function(a, b){
	        var result = method.call(this, a === 0 ? 0 : a, b);
	        return chain ? this : result;
	      };
	    }
	    if(!isNative(C) || !(isWeak || (!BUGGY_ITERATORS && has(proto, FOR_EACH) && has(proto, 'entries')))){
	      // create collection constructor
	      C = isWeak
	        ? function(iterable){
	            assertInstance(this, C, NAME);
	            set(this, UID, uid++);
	            initFromIterable(this, iterable);
	          }
	        : function(iterable){
	            var that = this;
	            assertInstance(that, C, NAME);
	            set(that, O1, create(null));
	            set(that, SIZE, 0);
	            set(that, LAST, undefined);
	            set(that, FIRST, undefined);
	            initFromIterable(that, iterable);
	          };
	      assignHidden(assignHidden(C[PROTOTYPE], methods), commonMethods);
	      isWeak || defineProperty(C[PROTOTYPE], 'size', {get: function(){
	        return assertDefined(this[SIZE]);
	      }});
	    } else {
	      var Native = C
	        , inst   = new C
	        , chain  = inst[ADDER](isWeak ? {} : -0, 1)
	        , buggyZero;
	      // wrap to init collections from iterable
	      if(!NATIVE_ITERATORS || !C.length){
	        C = function(iterable){
	          assertInstance(this, C, NAME);
	          return initFromIterable(new Native, iterable);
	        }
	        C[PROTOTYPE] = proto;
	        if(framework)proto[CONSTRUCTOR] = C;
	      }
	      isWeak || inst[FOR_EACH](function(val, key){
	        buggyZero = 1 / key === -Infinity;
	      });
	      // fix converting -0 key to +0
	      if(buggyZero){
	        fixSVZ('delete');
	        fixSVZ('has');
	        isMap && fixSVZ('get');
	      }
	      // + fix .add & .set for chaining
	      if(buggyZero || chain !== inst)fixSVZ(ADDER, true);
	    }
	    setToStringTag(C, NAME);
	    setSpecies(C);
	    
	    O[NAME] = C;
	    $define(GLOBAL + WRAP + FORCED * !isNative(C), O);
	    
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    isWeak || defineStdIterators(C, NAME, function(iterated, kind){
	      set(this, ITER, {o: iterated, k: kind});
	    }, function(){
	      var iter  = this[ITER]
	        , kind  = iter.k
	        , entry = iter.l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
	        // or finish the iteration
	        return iter.o = undefined, iterResult(1);
	      }
	      // return step by kind
	      if(kind == KEY)  return iterResult(0, entry.k);
	      if(kind == VALUE)return iterResult(0, entry.v);
	                       return iterResult(0, [entry.k, entry.v]);   
	    }, isMap ? KEY+VALUE : VALUE, !isMap);
	    
	    return C;
	  }
	  
	  function fastKey(it, create){
	    // return primitive with prefix
	    if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
	    // can't set id to frozen object
	    if(isFrozen(it))return 'F';
	    if(!has(it, UID)){
	      // not necessary to add id
	      if(!create)return 'E';
	      // add missing object id
	      hidden(it, UID, ++uid);
	    // return object id with prefix
	    } return 'O' + it[UID];
	  }
	  function getEntry(that, key){
	    // fast case
	    var index = fastKey(key), entry;
	    if(index != 'F')return that[O1][index];
	    // frozen object case
	    for(entry = that[FIRST]; entry; entry = entry.n){
	      if(entry.k == key)return entry;
	    }
	  }
	  function def(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry)entry.v = value;
	    // create new entry
	    else {
	      that[LAST] = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that[LAST],          // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that[FIRST])that[FIRST] = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index != 'F')that[O1][index] = entry;
	    } return that;
	  }

	  var collectionMethods = {
	    // 23.1.3.1 Map.prototype.clear()
	    // 23.2.3.2 Set.prototype.clear()
	    clear: function(){
	      for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
	        entry.r = true;
	        entry.p = entry.n = undefined;
	        delete data[entry.i];
	      }
	      that[FIRST] = that[LAST] = undefined;
	      that[SIZE] = 0;
	    },
	    // 23.1.3.3 Map.prototype.delete(key)
	    // 23.2.3.4 Set.prototype.delete(value)
	    'delete': function(key){
	      var that  = this
	        , entry = getEntry(that, key);
	      if(entry){
	        var next = entry.n
	          , prev = entry.p;
	        delete that[O1][entry.i];
	        entry.r = true;
	        if(prev)prev.n = next;
	        if(next)next.p = prev;
	        if(that[FIRST] == entry)that[FIRST] = next;
	        if(that[LAST] == entry)that[LAST] = prev;
	        that[SIZE]--;
	      } return !!entry;
	    },
	    // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	    // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	    forEach: function(callbackfn /*, that = undefined */){
	      var f = ctx(callbackfn, arguments[1], 3)
	        , entry;
	      while(entry = entry ? entry.n : this[FIRST]){
	        f(entry.v, entry.k, this);
	        // revert to the last existing entry
	        while(entry && entry.r)entry = entry.p;
	      }
	    },
	    // 23.1.3.7 Map.prototype.has(key)
	    // 23.2.3.7 Set.prototype.has(value)
	    has: function(key){
	      return !!getEntry(this, key);
	    }
	  }
	  
	  // 23.1 Map Objects
	  Map = getCollection(Map, MAP, {
	    // 23.1.3.6 Map.prototype.get(key)
	    get: function(key){
	      var entry = getEntry(this, key);
	      return entry && entry.v;
	    },
	    // 23.1.3.9 Map.prototype.set(key, value)
	    set: function(key, value){
	      return def(this, key === 0 ? 0 : key, value);
	    }
	  }, collectionMethods, true);
	  
	  // 23.2 Set Objects
	  Set = getCollection(Set, SET, {
	    // 23.2.3.1 Set.prototype.add(value)
	    add: function(value){
	      return def(this, value = value === 0 ? 0 : value, value);
	    }
	  }, collectionMethods);
	  
	  function defWeak(that, key, value){
	    if(isFrozen(assertObject(key)))leakStore(that).set(key, value);
	    else {
	      has(key, WEAK) || hidden(key, WEAK, {});
	      key[WEAK][that[UID]] = value;
	    } return that;
	  }
	  function leakStore(that){
	    return that[LEAK] || hidden(that, LEAK, new Map)[LEAK];
	  }
	  
	  var weakMethods = {
	    // 23.3.3.2 WeakMap.prototype.delete(key)
	    // 23.4.3.3 WeakSet.prototype.delete(value)
	    'delete': function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this)['delete'](key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]) && delete key[WEAK][this[UID]];
	    },
	    // 23.3.3.4 WeakMap.prototype.has(key)
	    // 23.4.3.4 WeakSet.prototype.has(value)
	    has: function(key){
	      if(!isObject(key))return false;
	      if(isFrozen(key))return leakStore(this).has(key);
	      return has(key, WEAK) && has(key[WEAK], this[UID]);
	    }
	  };
	  
	  // 23.3 WeakMap Objects
	  WeakMap = getCollection(WeakMap, WEAKMAP, {
	    // 23.3.3.3 WeakMap.prototype.get(key)
	    get: function(key){
	      if(isObject(key)){
	        if(isFrozen(key))return leakStore(this).get(key);
	        if(has(key, WEAK))return key[WEAK][this[UID]];
	      }
	    },
	    // 23.3.3.5 WeakMap.prototype.set(key, value)
	    set: function(key, value){
	      return defWeak(this, key, value);
	    }
	  }, weakMethods, true, true);
	  
	  // IE11 WeakMap frozen keys fix
	  if(framework && DESC && new WeakMap([[Object.freeze(tmp), 7]]).get(tmp) != 7){
	    forEach.call(array('delete,has,get,set'), function(key){
	      var method = WeakMap[PROTOTYPE][key];
	      WeakMap[PROTOTYPE][key] = function(a, b){
	        // store frozen objects on leaky map
	        if(isObject(a) && isFrozen(a)){
	          var result = leakStore(this)[key](a, b);
	          return key == 'set' ? this : result;
	        // store all the rest on native weakmap
	        } return method.call(this, a, b);
	      };
	    });
	  }
	  
	  // 23.4 WeakSet Objects
	  WeakSet = getCollection(WeakSet, WEAKSET, {
	    // 23.4.3.1 WeakSet.prototype.add(value)
	    add: function(value){
	      return defWeak(this, value, true);
	    }
	  }, weakMethods, false, true);
	}();

	/******************************************************************************
	 * Module : es6_reflect                                                       *
	 ******************************************************************************/

	!function(){
	  function Enumerate(iterated){
	    var keys = [], key;
	    for(key in iterated)keys.push(key);
	    set(this, ITER, {o: iterated, a: keys, i: 0});
	  }
	  createIterator(Enumerate, OBJECT, function(){
	    var iter = this[ITER]
	      , keys = iter.a
	      , key;
	    do {
	      if(iter.i >= keys.length)return iterResult(1);
	    } while(!((key = keys[iter.i++]) in iter.o));
	    return iterResult(0, key);
	  });
	  
	  function wrap(fn){
	    return function(it){
	      assertObject(it);
	      try {
	        return fn.apply(undefined, arguments), true;
	      } catch(e){
	        return false;
	      }
	    }
	  }
	  
	  function reflectGet(target, propertyKey/*, receiver*/){
	    var receiver = arguments.length < 3 ? target : arguments[2]
	      , desc = getOwnDescriptor(assertObject(target), propertyKey), proto;
	    if(desc)return desc.get ? desc.get.call(receiver) : desc.value;
	    return isObject(proto = getPrototypeOf(target)) ? reflectGet(proto, propertyKey, receiver) : undefined;
	  }
	  function reflectSet(target, propertyKey, V/*, receiver*/){
	    var receiver = arguments.length < 4 ? target : arguments[3]
	      , desc = getOwnDescriptor(assertObject(target), propertyKey), proto;
	    if(desc){
	      if(desc.writable === false)return false;
	      if(desc.set)return desc.set.call(receiver, V), true;
	    }
	    if(isObject(proto = getPrototypeOf(target)))return reflectSet(proto, propertyKey, V, receiver);
	    desc = getOwnDescriptor(receiver, propertyKey) || descriptor(0);
	    desc.value = V;
	    return defineProperty(receiver, propertyKey, desc), true;
	  }
	  var isExtensible = Object.isExtensible || returnIt;
	  
	  var reflect = {
	    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	    apply: ctx(call, apply, 3),
	    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	    construct: construct,
	    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	    defineProperty: wrap(defineProperty),
	    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
	    deleteProperty: function(target, propertyKey){
	      var desc = getOwnDescriptor(assertObject(target), propertyKey);
	      return desc && !desc.configurable ? false : delete target[propertyKey];
	    },
	    // 26.1.5 Reflect.enumerate(target)
	    enumerate: function(target){
	      return new Enumerate(assertObject(target));
	    },
	    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
	    get: reflectGet,
	    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	    getOwnPropertyDescriptor: function(target, propertyKey){
	      return getOwnDescriptor(assertObject(target), propertyKey);
	    },
	    // 26.1.8 Reflect.getPrototypeOf(target)
	    getPrototypeOf: function(target){
	      return getPrototypeOf(assertObject(target));
	    },
	    // 26.1.9 Reflect.has(target, propertyKey)
	    has: function(target, propertyKey){
	      return propertyKey in target;
	    },
	    // 26.1.10 Reflect.isExtensible(target)
	    isExtensible: function(target){
	      return !!isExtensible(assertObject(target));
	    },
	    // 26.1.11 Reflect.ownKeys(target)
	    ownKeys: ownKeys,
	    // 26.1.12 Reflect.preventExtensions(target)
	    preventExtensions: wrap(Object.preventExtensions || returnIt),
	    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	    set: reflectSet
	  }
	  // 26.1.14 Reflect.setPrototypeOf(target, proto)
	  if(setPrototypeOf)reflect.setPrototypeOf = function(target, proto){
	    return setPrototypeOf(assertObject(target), proto), true;
	  };
	  
	  $define(GLOBAL, {Reflect: {}});
	  $define(STATIC, 'Reflect', reflect);
	}();

	/******************************************************************************
	 * Module : es7                                                               *
	 ******************************************************************************/

	!function(){
	  $define(PROTO, ARRAY, {
	    // https://github.com/domenic/Array.prototype.includes
	    includes: createArrayContains(true)
	  });
	  $define(PROTO, STRING, {
	    // https://github.com/mathiasbynens/String.prototype.at
	    at: createPointAt(true)
	  });
	  
	  function createObjectToArray(isEntries){
	    return function(object){
	      var O      = toObject(object)
	        , keys   = getKeys(object)
	        , length = keys.length
	        , i      = 0
	        , result = Array(length)
	        , key;
	      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
	      else while(length > i)result[i] = O[keys[i++]];
	      return result;
	    }
	  }
	  $define(STATIC, OBJECT, {
	    // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-04/apr-9.md#51-objectentries-objectvalues
	    values: createObjectToArray(false),
	    entries: createObjectToArray(true)
	  });
	  $define(STATIC, REGEXP, {
	    // https://gist.github.com/kangax/9698100
	    escape: createReplacer(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
	  });
	}();

	/******************************************************************************
	 * Module : es7_refs                                                          *
	 ******************************************************************************/

	// https://github.com/zenparsing/es-abstract-refs
	!function(REFERENCE){
	  REFERENCE_GET = getWellKnownSymbol(REFERENCE+'Get', true);
	  var REFERENCE_SET = getWellKnownSymbol(REFERENCE+SET, true)
	    , REFERENCE_DELETE = getWellKnownSymbol(REFERENCE+'Delete', true);
	  
	  $define(STATIC, SYMBOL, {
	    referenceGet: REFERENCE_GET,
	    referenceSet: REFERENCE_SET,
	    referenceDelete: REFERENCE_DELETE
	  });
	  
	  hidden(FunctionProto, REFERENCE_GET, returnThis);
	  
	  function setMapMethods(Constructor){
	    if(Constructor){
	      var MapProto = Constructor[PROTOTYPE];
	      hidden(MapProto, REFERENCE_GET, MapProto.get);
	      hidden(MapProto, REFERENCE_SET, MapProto.set);
	      hidden(MapProto, REFERENCE_DELETE, MapProto['delete']);
	    }
	  }
	  setMapMethods(Map);
	  setMapMethods(WeakMap);
	}('reference');

	/******************************************************************************
	 * Module : dom_itarable                                                      *
	 ******************************************************************************/

	!function(NodeList){
	  if(framework && NodeList && !(SYMBOL_ITERATOR in NodeList[PROTOTYPE])){
	    hidden(NodeList[PROTOTYPE], SYMBOL_ITERATOR, Iterators[ARRAY]);
	  }
	  Iterators.NodeList = Iterators[ARRAY];
	}(global.NodeList);

	/******************************************************************************
	 * Module : dict                                                              *
	 ******************************************************************************/

	!function(DICT){
	  Dict = function(iterable){
	    var dict = create(null);
	    if(iterable != undefined){
	      if(isIterable(iterable)){
	        for(var iter = getIterator(iterable), step, value; !(step = iter.next()).done;){
	          value = step.value;
	          dict[value[0]] = value[1];
	        }
	      } else assign(dict, iterable);
	    }
	    return dict;
	  }
	  Dict[PROTOTYPE] = null;
	  
	  function DictIterator(iterated, kind){
	    set(this, ITER, {o: toObject(iterated), a: getKeys(iterated), i: 0, k: kind});
	  }
	  createIterator(DictIterator, DICT, function(){
	    var iter  = this[ITER]
	      , O     = iter.o
	      , keys  = iter.a
	      , kind  = iter.k
	      , key;
	    do {
	      if(iter.i >= keys.length)return iterResult(1);
	    } while(!has(O, key = keys[iter.i++]));
	    if(kind == KEY)  return iterResult(0, key);
	    if(kind == VALUE)return iterResult(0, O[key]);
	                     return iterResult(0, [key, O[key]]);
	  });
	  function createDictIter(kind){
	    return function(it){
	      return new DictIterator(it, kind);
	    }
	  }
	  
	  /*
	   * 0 -> forEach
	   * 1 -> map
	   * 2 -> filter
	   * 3 -> some
	   * 4 -> every
	   * 5 -> find
	   * 6 -> findKey
	   * 7 -> mapPairs
	   */
	  function createDictMethod(type){
	    var isMap    = type == 1
	      , isEvery  = type == 4;
	    return function(object, callbackfn, that /* = undefined */){
	      var f      = ctx(callbackfn, that, 3)
	        , O      = toObject(object)
	        , result = isMap || type == 7 || type == 2 ? new (generic(this, Dict)) : undefined
	        , key, val, res;
	      for(key in O)if(has(O, key)){
	        val = O[key];
	        res = f(val, key, object);
	        if(type){
	          if(isMap)result[key] = res;             // map
	          else if(res)switch(type){
	            case 2: result[key] = val; break      // filter
	            case 3: return true;                  // some
	            case 5: return val;                   // find
	            case 6: return key;                   // findKey
	            case 7: result[res[0]] = res[1];      // mapPairs
	          } else if(isEvery)return false;         // every
	        }
	      }
	      return type == 3 || isEvery ? isEvery : result;
	    }
	  }
	  function createDictReduce(isTurn){
	    return function(object, mapfn, init){
	      assertFunction(mapfn);
	      var O      = toObject(object)
	        , keys   = getKeys(O)
	        , length = keys.length
	        , i      = 0
	        , memo, key, result;
	      if(isTurn)memo = init == undefined ? new (generic(this, Dict)) : Object(init);
	      else if(arguments.length < 3){
	        assert(length, REDUCE_ERROR);
	        memo = O[keys[i++]];
	      } else memo = Object(init);
	      while(length > i)if(has(O, key = keys[i++])){
	        result = mapfn(memo, O[key], key, object);
	        if(isTurn){
	          if(result === false)break;
	        } else memo = result;
	      }
	      return memo;
	    }
	  }
	  var findKey = createDictMethod(6);
	  function includes(object, el){
	    return (el == el ? keyOf(object, el) : findKey(object, sameNaN)) !== undefined;
	  }
	  
	  var dictMethods = {
	    keys:    createDictIter(KEY),
	    values:  createDictIter(VALUE),
	    entries: createDictIter(KEY+VALUE),
	    forEach: createDictMethod(0),
	    map:     createDictMethod(1),
	    filter:  createDictMethod(2),
	    some:    createDictMethod(3),
	    every:   createDictMethod(4),
	    find:    createDictMethod(5),
	    findKey: findKey,
	    mapPairs:createDictMethod(7),
	    reduce:  createDictReduce(false),
	    turn:    createDictReduce(true),
	    keyOf:   keyOf,
	    includes:includes,
	    // Has / get / set own property
	    has: has,
	    get: get,
	    set: createDefiner(0),
	    isDict: function(it){
	      return isObject(it) && getPrototypeOf(it) === Dict[PROTOTYPE];
	    }
	  };
	  
	  if(REFERENCE_GET)for(var key in dictMethods)!function(fn){
	    function method(){
	      for(var args = [this], i = 0; i < arguments.length;)args.push(arguments[i++]);
	      return invoke(fn, args);
	    }
	    fn[REFERENCE_GET] = function(){
	      return method;
	    }
	  }(dictMethods[key]);
	  
	  $define(GLOBAL + FORCED, {Dict: assignHidden(Dict, dictMethods)});
	}('Dict');

	/******************************************************************************
	 * Module : $for                                                              *
	 ******************************************************************************/

	!function(ENTRIES, FN){  
	  function $for(iterable, entries){
	    if(!(this instanceof $for))return new $for(iterable, entries);
	    this[ITER]    = getIterator(iterable);
	    this[ENTRIES] = !!entries;
	  }
	  
	  createIterator($for, 'Wrapper', function(){
	    return this[ITER].next();
	  });
	  var $forProto = $for[PROTOTYPE];
	  setIterator($forProto, function(){
	    return this[ITER]; // unwrap
	  });
	  
	  function createChainIterator(next){
	    function Iter(I, fn, that){
	      this[ITER]    = getIterator(I);
	      this[ENTRIES] = I[ENTRIES];
	      this[FN]      = ctx(fn, that, I[ENTRIES] ? 2 : 1);
	    }
	    createIterator(Iter, 'Chain', next, $forProto);
	    setIterator(Iter[PROTOTYPE], returnThis); // override $forProto iterator
	    return Iter;
	  }
	  
	  var MapIter = createChainIterator(function(){
	    var step = this[ITER].next();
	    return step.done ? step : iterResult(0, stepCall(this[FN], step.value, this[ENTRIES]));
	  });
	  
	  var FilterIter = createChainIterator(function(){
	    for(;;){
	      var step = this[ITER].next();
	      if(step.done || stepCall(this[FN], step.value, this[ENTRIES]))return step;
	    }
	  });
	  
	  assignHidden($forProto, {
	    of: function(fn, that){
	      forOf(this, this[ENTRIES], fn, that);
	    },
	    array: function(fn, that){
	      var result = [];
	      forOf(fn != undefined ? this.map(fn, that) : this, false, push, result);
	      return result;
	    },
	    filter: function(fn, that){
	      return new FilterIter(this, fn, that);
	    },
	    map: function(fn, that){
	      return new MapIter(this, fn, that);
	    }
	  });
	  
	  $for.isIterable  = isIterable;
	  $for.getIterator = getIterator;
	  
	  $define(GLOBAL + FORCED, {$for: $for});
	}('entries', safeSymbol('fn'));

	/******************************************************************************
	 * Module : binding                                                           *
	 ******************************************************************************/

	!function(_, toLocaleString){
	  // Placeholder
	  core._ = path._ = path._ || {};

	  $define(PROTO + FORCED, FUNCTION, {
	    part: part,
	    only: function(numberArguments, that /* = @ */){
	      var fn     = assertFunction(this)
	        , n      = toLength(numberArguments)
	        , isThat = arguments.length > 1;
	      return function(/* ...args */){
	        var length = min(n, arguments.length)
	          , args   = Array(length)
	          , i      = 0;
	        while(length > i)args[i] = arguments[i++];
	        return invoke(fn, args, isThat ? that : this);
	      }
	    }
	  });
	  
	  function tie(key){
	    var that  = this
	      , bound = {};
	    return hidden(that, _, function(key){
	      if(key === undefined || !(key in that))return toLocaleString.call(that);
	      return has(bound, key) ? bound[key] : (bound[key] = ctx(that[key], that, -1));
	    })[_](key);
	  }
	  
	  hidden(path._, TO_STRING, function(){
	    return _;
	  });
	  
	  hidden(ObjectProto, _, tie);
	  DESC || hidden(ArrayProto, _, tie);
	  // IE8- dirty hack - redefined toLocaleString is not enumerable
	}(DESC ? uid('tie') : TO_LOCALE, ObjectProto[TO_LOCALE]);

	/******************************************************************************
	 * Module : object                                                            *
	 ******************************************************************************/

	!function(){
	  function define(target, mixin){
	    var keys   = ownKeys(toObject(mixin))
	      , length = keys.length
	      , i = 0, key;
	    while(length > i)defineProperty(target, key = keys[i++], getOwnDescriptor(mixin, key));
	    return target;
	  };
	  $define(STATIC + FORCED, OBJECT, {
	    isObject: isObject,
	    classof: classof,
	    define: define,
	    make: function(proto, mixin){
	      return define(create(proto), mixin);
	    }
	  });
	}();

	/******************************************************************************
	 * Module : array                                                             *
	 ******************************************************************************/

	$define(PROTO + FORCED, ARRAY, {
	  turn: function(fn, target /* = [] */){
	    assertFunction(fn);
	    var memo   = target == undefined ? [] : Object(target)
	      , O      = ES5Object(this)
	      , length = toLength(O.length)
	      , index  = 0;
	    while(length > index)if(fn(memo, O[index], index++, this) === false)break;
	    return memo;
	  }
	});
	if(framework)ArrayUnscopables.turn = true;

	/******************************************************************************
	 * Module : array_statics                                                     *
	 ******************************************************************************/

	// JavaScript 1.6 / Strawman array statics shim
	!function(arrayStatics){
	  function setArrayStatics(keys, length){
	    forEach.call(array(keys), function(key){
	      if(key in ArrayProto)arrayStatics[key] = ctx(call, ArrayProto[key], length);
	    });
	  }
	  setArrayStatics('pop,reverse,shift,keys,values,entries', 1);
	  setArrayStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	  setArrayStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	                  'reduce,reduceRight,copyWithin,fill,turn');
	  $define(STATIC, ARRAY, arrayStatics);
	}({});

	/******************************************************************************
	 * Module : number                                                            *
	 ******************************************************************************/

	!function(numberMethods){  
	  function NumberIterator(iterated){
	    set(this, ITER, {l: toLength(iterated), i: 0});
	  }
	  createIterator(NumberIterator, NUMBER, function(){
	    var iter = this[ITER]
	      , i    = iter.i++;
	    return i < iter.l ? iterResult(0, i) : iterResult(1);
	  });
	  defineIterator(Number, NUMBER, function(){
	    return new NumberIterator(this);
	  });
	  
	  numberMethods.random = function(lim /* = 0 */){
	    var a = +this
	      , b = lim == undefined ? 0 : +lim
	      , m = min(a, b);
	    return random() * (max(a, b) - m) + m;
	  };

	  forEach.call(array(
	      // ES3:
	      'round,floor,ceil,abs,sin,asin,cos,acos,tan,atan,exp,sqrt,max,min,pow,atan2,' +
	      // ES6:
	      'acosh,asinh,atanh,cbrt,clz32,cosh,expm1,hypot,imul,log1p,log10,log2,sign,sinh,tanh,trunc'
	    ), function(key){
	      var fn = Math[key];
	      if(fn)numberMethods[key] = function(/* ...args */){
	        // ie9- dont support strict mode & convert `this` to object -> convert it to number
	        var args = [+this]
	          , i    = 0;
	        while(arguments.length > i)args.push(arguments[i++]);
	        return invoke(fn, args);
	      }
	    }
	  );
	  
	  $define(PROTO + FORCED, NUMBER, numberMethods);
	}({});

	/******************************************************************************
	 * Module : string                                                            *
	 ******************************************************************************/

	!function(){
	  var escapeHTMLDict = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&apos;'
	  }, unescapeHTMLDict = {}, key;
	  for(key in escapeHTMLDict)unescapeHTMLDict[escapeHTMLDict[key]] = key;
	  $define(PROTO + FORCED, STRING, {
	    escapeHTML:   createReplacer(/[&<>"']/g, escapeHTMLDict),
	    unescapeHTML: createReplacer(/&(?:amp|lt|gt|quot|apos);/g, unescapeHTMLDict)
	  });
	}();

	/******************************************************************************
	 * Module : date                                                              *
	 ******************************************************************************/

	!function(formatRegExp, flexioRegExp, locales, current, SECONDS, MINUTES, HOURS, MONTH, YEAR){
	  function createFormat(prefix){
	    return function(template, locale /* = current */){
	      var that = this
	        , dict = locales[has(locales, locale) ? locale : current];
	      function get(unit){
	        return that[prefix + unit]();
	      }
	      return String(template).replace(formatRegExp, function(part){
	        switch(part){
	          case 's'  : return get(SECONDS);                  // Seconds : 0-59
	          case 'ss' : return lz(get(SECONDS));              // Seconds : 00-59
	          case 'm'  : return get(MINUTES);                  // Minutes : 0-59
	          case 'mm' : return lz(get(MINUTES));              // Minutes : 00-59
	          case 'h'  : return get(HOURS);                    // Hours   : 0-23
	          case 'hh' : return lz(get(HOURS));                // Hours   : 00-23
	          case 'D'  : return get(DATE);                     // Date    : 1-31
	          case 'DD' : return lz(get(DATE));                 // Date    : 01-31
	          case 'W'  : return dict[0][get('Day')];           // Day     : Понедельник
	          case 'N'  : return get(MONTH) + 1;                // Month   : 1-12
	          case 'NN' : return lz(get(MONTH) + 1);            // Month   : 01-12
	          case 'M'  : return dict[2][get(MONTH)];           // Month   : Январь
	          case 'MM' : return dict[1][get(MONTH)];           // Month   : Января
	          case 'Y'  : return get(YEAR);                     // Year    : 2014
	          case 'YY' : return lz(get(YEAR) % 100);           // Year    : 14
	        } return part;
	      });
	    }
	  }
	  function lz(num){
	    return num > 9 ? num : '0' + num;
	  }
	  function addLocale(lang, locale){
	    function split(index){
	      var result = [];
	      forEach.call(array(locale.months), function(it){
	        result.push(it.replace(flexioRegExp, '$' + index));
	      });
	      return result;
	    }
	    locales[lang] = [array(locale.weekdays), split(1), split(2)];
	    return core;
	  }
	  $define(PROTO + FORCED, DATE, {
	    format:    createFormat('get'),
	    formatUTC: createFormat('getUTC')
	  });
	  addLocale(current, {
	    weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
	    months: 'January,February,March,April,May,June,July,August,September,October,November,December'
	  });
	  addLocale('ru', {
	    weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
	    months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,' +
	            'Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
	  });
	  core.locale = function(locale){
	    return has(locales, locale) ? current = locale : current;
	  };
	  core.addLocale = addLocale;
	}(/\b\w\w?\b/g, /:(.*)\|(.*)$/, {}, 'en', 'Seconds', 'Minutes', 'Hours', 'Month', 'FullYear');
	}(typeof self != 'undefined' && self.Math === Math ? self : Function('return this')(), false);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var simulation = __webpack_require__(5)
	var Vector = __webpack_require__(6)
	var Renderer = __webpack_require__(7)
	var defaults = __webpack_require__(15)
	var Spring = __webpack_require__(8)
	var AttachSpring = __webpack_require__(9)
	var Decelerate = __webpack_require__(10)
	var Accelerate = __webpack_require__(11)
	var Drag = __webpack_require__(12)
	var Interact = __webpack_require__(13)
	var Boundary = __webpack_require__(14)
	var Promise = window.Promise || __webpack_require__(16)

	module.exports = Physics

	function Physics(rendererOrEls) {
	  if(!(this instanceof Physics)) {
	    return new Physics(rendererOrEls)
	  }
	  if(typeof rendererOrEls === 'function') {
	    this._render = rendererOrEls
	    this.els = []
	  } else {
	    if(rendererOrEls.length)
	      this.els = [].slice.call(rendererOrEls)
	    else
	      this.els = [rendererOrEls]

	    this._renderer = new Renderer(this.els)
	    this._render = this._renderer.update.bind(this._renderer)
	  }

	  this._position = Vector(0, 0)
	  this._velocity = Vector(0, 0)
	}

	Physics.Boundary = Boundary
	Physics.Boundry = Boundary
	Physics.Vector = Vector
	Physics.Promise = Promise

	Physics.prototype.style = function() {
	  this._renderer.style.apply(this._renderer, arguments)
	  return this
	}

	Physics.prototype.visible = function() {
	  this._renderer.visible.apply(this._renderer, arguments)
	  return this
	}

	Physics.prototype.direction = function(d) {
	  var velocity = this.velocity()
	    , h, v, c

	  if(velocity.x < 0)      h = 'left'
	  else if(velocity.x > 0) h = 'right'

	  if(velocity.y < 0)      v = 'up'
	  else if(velocity.y > 0) v = 'down'

	  var c = h + (v || '').toUpperCase()

	  return d === h || d === v || d === c
	}

	Physics.prototype.forceRender = function() {
	  if(this._renderer) {
	    this._renderer.changed = true
	  }
	}

	Physics.prototype.atRest = function() {
	  var velocity = this.velocity()
	  return velocity.x === 0 && velocity.y === 0
	}

	Physics.prototype._startAnimation = function(animation) {
	  if(this._currentAnimation && this._currentAnimation.running()) {
	    this._currentAnimation.cancel()
	  }
	  this._currentAnimation = animation
	}

	Physics.prototype.velocity = function(x, y) {
	  if(!arguments.length) return this._velocity
	  this._velocity = Vector(x, y)
	  return this
	}

	Physics.prototype.position = function(x, y) {
	  if(!arguments.length) return this._position.clone()
	  this._position = Vector(x, y)
	  this._render(this._position.x, this._position.y)
	  return this
	}

	Physics.prototype.interact = function(opts) {
	  return new Interact(this, opts)
	}

	Physics.prototype.drag = function(opts, start) {
	  return new Drag(this, opts, start)
	}

	Physics.prototype.spring = function(opts) {
	  return new Spring(this, opts)
	}

	Physics.prototype.decelerate = function(opts) {
	  return new Decelerate(this, opts)
	}

	Physics.prototype.accelerate = function(opts) {
	  return new Accelerate(this, opts)
	}

	Physics.prototype.attachSpring = function(attachment, opts) {
	  return new AttachSpring(this, attachment, opts)
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/*! 
		:: mo · js :: motion graphics toolbelt for the web
		Oleg Solomka @LegoMushroom 2015 MIT
		v0.110.0 
	*/

	!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.yes=t()}}(function(){var t;return function e(t,s,r){function i(n,p){if(!s[n]){if(!t[n]){var a="function"==typeof require&&require;if(!p&&a)return require(n,!0);if(o)return o(n,!0);var h=new Error("Cannot find module '"+n+"'");throw h.code="MODULE_NOT_FOUND",h}var u=s[n]={exports:{}};t[n][0].call(u.exports,function(e){var s=t[n][1][e];return i(s?s:e)},u,u.exports,e,t,s,r)}return s[n].exports}for(var o="function"==typeof require&&require,n=0;n<r.length;n++)i(r[n]);return i}({1:[function(t,e){var s,r,i,o,n,p,a=function(t,e){function s(){this.constructor=t}for(var r in e)h.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},h={}.hasOwnProperty;n=t("./shapes/bitsMap"),o=t("./tween/tween"),i=t("./transit"),r=t("./swirl"),p=t("./h"),s=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return a(e,t),e.prototype.skipProps={childOptions:1},e.prototype.defaults={count:5,degree:360,opacity:1,randomAngle:0,randomRadius:0,x:100,y:100,shiftX:0,shiftY:0,easing:"Linear.None",radius:{25:75},radiusX:void 0,radiusY:void 0,angle:0,size:null,sizeGap:0,duration:600,delay:0,onStart:null,onComplete:null,onCompleteChain:null,onUpdate:null,isResetAngles:!1},e.prototype.childDefaults={radius:{7:0},radiusX:void 0,radiusY:void 0,angle:0,opacity:1,onStart:null,onComplete:null,onUpdate:null,points:3,duration:500,delay:0,repeat:0,yoyo:!1,easing:"Linear.None",type:"circle",fill:"deeppink",fillOpacity:1,isSwirl:!1,swirlSize:10,swirlFrequency:3,stroke:"transparent",strokeWidth:0,strokeOpacity:1,strokeDasharray:"",strokeDashoffset:"",strokeLinecap:null},e.prototype.optionsIntersection={radius:1,radiusX:1,radiusY:1,angle:1,opacity:1,onStart:1,onComplete:1,onUpdate:1},e.prototype.run=function(t){var e,s,r,i,o,n,p,a,h,u;if(null!=t&&Object.keys(t).length){for((t.count||(null!=(a=t.childOptions)?a.count:void 0))&&this.h.warn("Sorry, count can not be changed on run"),this.extendDefaults(t),o=Object.keys(t.childOptions||{}),null==(e=this.o).childOptions&&(e.childOptions={}),s=r=0,p=o.length;p>r;s=++r)i=o[s],this.o.childOptions[i]=t.childOptions[i];for(n=this.transits.length;n--;)u=this.transits[n],u.tuneNewOption(this.getOption(n),!0);this.tween.recalcDuration()}if(this.props.randomAngle||this.props.randomRadius)for(n=this.transits.length;n--;)h=this.transits[n],this.props.randomAngle&&h.setProp({angleShift:this.generateRandomAngle()}),this.props.randomRadius&&h.setProp({radiusScale:this.generateRandomRadius()});return this.startTween()},e.prototype.createBit=function(){var t,e,s,i,o;for(this.transits=[],o=[],t=e=0,i=this.props.count;i>=0?i>e:e>i;t=i>=0?++e:--e)s=this.getOption(t),s.ctx=this.ctx,s.index=t,s.isDrawLess=s.isRunLess=s.isTweenLess=!0,this.props.randomAngle&&(s.angleShift=this.generateRandomAngle()),this.props.randomRadius&&(s.radiusScale=this.generateRandomRadius()),o.push(this.transits.push(new r(s)));return o},e.prototype.addBitOptions=function(){var t,e,s,r,i,o,n,p,a,h,u,l,c,d,f,y,g,m;for(c=this.props.count,this.degreeCnt=this.props.degree%360===0?c:c-1||1,g=this.props.degree/this.degreeCnt,d=this.transits,f=[],i=o=0,p=d.length;p>o;i=++o)m=d[i],t=m.props.angleShift,l=this.getSidePoint("start",i*g+t),u=this.getSidePoint("end",i*g+t),m.o.x=this.getDeltaFromPoints("x",l,u),m.o.y=this.getDeltaFromPoints("y",l,u),this.props.isResetAngles||(e=i*g+90,m.o.angle="object"!=typeof m.o.angle?m.o.angle+e+t:(n=Object.keys(m.o.angle),y=n[0],r=m.o.angle[y],h=parseFloat(y)+e+t,a=parseFloat(r)+e+t,s={},s[h]=a,s)),f.push(m.extendDefaults());return f},e.prototype.getSidePoint=function(t,e){var s,r;return r=this.getSideRadius(t),s=this.h.getRadialPoint({radius:r.radius,radiusX:r.radiusX,radiusY:r.radiusY,angle:e,center:{x:this.props.center,y:this.props.center}})},e.prototype.getSideRadius=function(t){return{radius:this.getRadiusByKey("radius",t),radiusX:this.getRadiusByKey("radiusX",t),radiusY:this.getRadiusByKey("radiusY",t)}},e.prototype.getRadiusByKey=function(t,e){return null!=this.deltas[t]?this.deltas[t][e]:null!=this.props[t]?this.props[t]:void 0},e.prototype.getDeltaFromPoints=function(t,e,s){var r;return r={},e[t]===s[t]?r=e[t]:(r[e[t]]=s[t],r)},e.prototype.draw=function(){return this.drawEl()},e.prototype.isNeedsTransform=function(){return this.isPropChanged("shiftX")||this.isPropChanged("shiftY")||this.isPropChanged("angle")},e.prototype.fillTransform=function(){return"rotate("+this.props.angle+"deg) translate("+this.props.shiftX+", "+this.props.shiftY+")"},e.prototype.createTween=function(){var t,s;for(e.__super__.createTween.apply(this,arguments),t=this.transits.length,s=[];t--;)s.push(this.tween.add(this.transits[t].timeline));return s},e.prototype.calcSize=function(){var t,e,s,r,i,o,n;for(s=-1,o=this.transits,t=e=0,r=o.length;r>e;t=++e)n=o[t],n.calcSize(),s<n.props.size&&(s=n.props.size);return i=this.calcMaxRadius(),this.props.size=s+2*i,this.props.size+=2*this.props.sizeGap,this.props.center=this.props.size/2,this.addBitOptions()},e.prototype.getOption=function(t){var e,s,r,i;for(i={},s=Object.keys(this.childDefaults),r=s.length;r--;)e=s[r],i[e]=this.getPropByMod({key:e,i:t,from:this.o.childOptions}),this.optionsIntersection[e]?null==i[e]&&(i[e]=this.getPropByMod({key:e,i:t,from:this.childDefaults})):(null==i[e]&&(i[e]=this.getPropByMod({key:e,i:t,from:this.o})),null==i[e]&&(i[e]=this.getPropByMod({key:e,i:t,from:this.childDefaults})));return i},e.prototype.getPropByMod=function(t){var e,s;return e=null!=(s=t.from||this.o.childOptions)?s[t.key]:void 0,this.h.isArray(e)?e[t.i%e.length]:e},e.prototype.generateRandomAngle=function(){var t,e;return e=parseFloat(this.props.randomAngle),t=e>1?1:0>e?0:void 0,this.h.rand(0,e?360*e:180)},e.prototype.generateRandomRadius=function(){var t,e,s;return e=parseFloat(this.props.randomRadius),t=e>1?1:0>e?0:void 0,s=e?100*(1-e):50,this.h.rand(s,100)/100},e.prototype.then=function(){return this.h.error('Burst\'s "then" method is under consideration, you can vote for it in github repo issues'),this},e}(i),e.exports=s},{"./h":3,"./shapes/bitsMap":9,"./swirl":18,"./transit":19,"./tween/tween":21}],2:[function(t,e){var s,r;s=function(){function t(){}return t.prototype.linear={none:function(t){return t}},t.prototype.quadratic={"in":function(t){return t*t},out:function(t){return t*(2-t)},inout:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},t.prototype.cubic={"in":function(t){return t*t*t},out:function(t){return--t*t*t+1},inout:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},t.prototype.quartic={"in":function(t){return t*t*t*t},out:function(t){return 1- --t*t*t*t},inout:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},t.prototype.quintic={"in":function(t){return t*t*t*t*t},out:function(t){return--t*t*t*t*t+1},inout:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},t.prototype.sinusoidal={"in":function(t){return 1-Math.cos(t*Math.PI/2)},out:function(t){return Math.sin(t*Math.PI/2)},inout:function(t){return.5*(1-Math.cos(Math.PI*t))}},t.prototype.exponential={"in":function(t){return 0===t?0:Math.pow(1024,t-1)},out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},inout:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}},t.prototype.circular={"in":function(t){return 1-Math.sqrt(1-t*t)},out:function(t){return Math.sqrt(1- --t*t)},inout:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},t.prototype.elastic={"in":function(t){var e,s,r;return r=void 0,s=.4,0===t?0:1===t?1:(e=1,r=s/4,-(e*Math.pow(2,10*(t-=1))*Math.sin(2*(t-r)*Math.PI/s)))},out:function(t){var e,s,r;return r=void 0,s=.4,0===t?0:1===t?1:(e=1,r=s/4,e*Math.pow(2,-10*t)*Math.sin(2*(t-r)*Math.PI/s)+1)},inout:function(t){var e,s,r;return r=void 0,s=.4,0===t?0:1===t?1:(e=1,r=s/4,(t*=2)<1?-.5*e*Math.pow(2,10*(t-=1))*Math.sin(2*(t-r)*Math.PI/s):e*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-r)*Math.PI/s)*.5+1)}},t.prototype.back={"in":function(t){var e;return e=1.70158,t*t*((e+1)*t-e)},out:function(t){var e;return e=1.70158,--t*t*((e+1)*t+e)+1},inout:function(t){var e;return e=2.5949095,(t*=2)<1?.5*t*t*((e+1)*t-e):.5*((t-=2)*t*((e+1)*t+e)+2)}},t.prototype.bounce={"in":function(t){return 1-r.bounce.out(1-t)},out:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},inout:function(t){return.5>t?.5*r.bounce["in"](2*t):.5*r.bounce.out(2*t-1)+.5}},t}(),r=new s,e.exports=r},{}],3:[function(t,e){var s,r;s=function(){function t(){this.vars()}return t.prototype.logBadgeCss="background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;",t.prototype.shortColors={transparent:"rgba(0,0,0,0)",aqua:"rgb(0,255,255)",black:"rgb(0,0,0)",blue:"rgb(0,0,255)",fuchsia:"rgb(255,0,255)",gray:"rgb(128,128,128)",green:"rgb(0,128,0)",lime:"rgb(0,255,0)",maroon:"rgb(128,0,0)",navy:"rgb(0,0,128)",olive:"rgb(128,128,0)",purple:"rgb(128,0,128)",red:"rgb(255,0,0)",silver:"rgb(192,192,192)",teal:"rgb(0,128,128)",white:"rgb(255,255,255)",yellow:"rgb(255,255,0)",orange:"rgb(255,128,0)"},t.prototype.chainOptionMap={duration:1,delay:1,repeat:1,easing:1,yoyo:1,onStart:1,onComplete:1,onCompleteChain:1,onUpdate:1,points:1},t.prototype.callbacksMap={onStart:1,onComplete:1,onCompleteChain:1,onUpdate:1},t.prototype.tweenOptionMap={duration:1,delay:1,repeat:1,easing:1,yoyo:1},t.prototype.posPropsMap={x:1,y:1,shiftX:1,shiftY:1,burstX:1,burstY:1,burstShiftX:1,burstShiftY:1},t.prototype.strokeDashPropsMap={strokeDasharray:1,strokeDashoffset:1},t.prototype.RAD_TO_DEG=180/Math.PI,t.prototype.vars=function(){return this.prefix=this.getPrefix(),this.getRemBase(),this.isFF="moz"===this.prefix.lowercase,this.isIE="ms"===this.prefix.lowercase,this.isOldOpera=navigator.userAgent.match(/presto/gim),this.div=document.createElement("div"),document.body.appendChild(this.div)},t.prototype.cloneObj=function(t,e){var s,r,i,o;for(i=Object.keys(t),o={},s=i.length;s--;)r=i[s],null!=e?e[r]||(o[r]=t[r]):o[r]=t[r];return o},t.prototype.extend=function(t,e){var s,r,i;r=[];for(s in e)i=e[s],r.push(null!=t[s]?t[s]:t[s]=e[s]);return r},t.prototype.getRemBase=function(){var t,e;return t=document.querySelector("html"),e=getComputedStyle(t),this.remBase=parseFloat(e.fontSize)},t.prototype.clamp=function(t,e,s){return Math.min(Math.max(t,e),s)},t.prototype.setPrefixedStyle=function(t,e,s){var r;return r=""+this.prefix.css+e,t.style[e]=s,t.style[r]=s},t.prototype.prepareForLog=function(t){return t=Array.prototype.slice.apply(t),t.unshift("::"),t.unshift(this.logBadgeCss),t.unshift("%cmo·js%c"),t},t.prototype.log=function(){return mojs.isDebug!==!1?console.log.apply(console,this.prepareForLog(arguments)):void 0},t.prototype.warn=function(){return mojs.isDebug!==!1?console.warn.apply(console,this.prepareForLog(arguments)):void 0},t.prototype.error=function(){return mojs.isDebug!==!1?console.error.apply(console,this.prepareForLog(arguments)):void 0},t.prototype.parseUnit=function(t){var e,s,r,i,o,n;return"number"==typeof t?o={unit:"px",isStrict:!1,value:t,string:t+"px"}:"string"==typeof t?(i=/px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim,n=null!=(r=t.match(i))?r[0]:void 0,s=!0,n||(n="px",s=!1),e=parseFloat(t),o={unit:n,isStrict:s,value:e,string:""+e+n}):t},t.prototype.bind=function(t,e){var s,r;return r=function(){var r,i;return r=Array.prototype.slice.call(arguments),i=s.concat(r),t.apply(e,i)},s=Array.prototype.slice.call(arguments,2),r},t.prototype.getRadialPoint=function(t){var e,s,r,i;return null==t&&(t={}),null!=t.radius&&null!=t.angle&&null!=t.center?(s=(t.angle-90)*(Math.PI/180),r=null!=t.radiusX?t.radiusX:t.radius,i=null!=t.radiusY?t.radiusY:t.radius,e={x:t.center.x+Math.cos(s)*r,y:t.center.y+Math.sin(s)*i}):void 0},t.prototype.getPrefix=function(){var t,e,s,r;return s=window.getComputedStyle(document.documentElement,""),r=Array.prototype.slice.call(s).join("").match(/-(moz|webkit|ms)-/),e=(r||""===s.OLink&&["","o"])[1],t="WebKit|Moz|MS|O".match(new RegExp("("+e+")","i"))[1],{dom:t,lowercase:e,css:"-"+e+"-",js:e[0].toUpperCase()+e.substr(1)}},t.prototype.strToArr=function(t){var e;return e=[],"number"!=typeof t||isNaN(t)?(t.trim().split(/\s+/gim).forEach(function(t){return function(s){return e.push(t.parseUnit(t.parseIfRand(s)))}}(this)),e):(e.push(this.parseUnit(t)),e)},t.prototype.calcArrDelta=function(t,e){var s,r,i,o,n;for(s=[],r=i=0,o=t.length;o>i;r=++i)n=t[r],s[r]=this.parseUnit(""+(e[r].value-t[r].value)+e[r].unit);return s},t.prototype.isArray=function(t){return t instanceof Array},t.prototype.normDashArrays=function(t,e){var s,r,i,o,n,p,a,h,u,l;if(s=t.length,r=e.length,s>r)for(a=s-r,l=e.length,o=n=0,h=a;h>=0?h>n:n>h;o=h>=0?++n:--n)i=o+l,e.push(this.parseUnit("0"+t[i].unit));else if(r>s)for(a=r-s,l=t.length,o=p=0,u=a;u>=0?u>p:p>u;o=u>=0?++p:--p)i=o+l,t.push(this.parseUnit("0"+e[i].unit));return[t,e]},t.prototype.makeColorObj=function(t){var e,s,r,i,o,n,p,a,h,u,l;return"#"===t[0]&&(h=/^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(t),r={},h&&(n=2===h[1].length?h[1]:h[1]+h[1],i=2===h[2].length?h[2]:h[2]+h[2],s=2===h[3].length?h[3]:h[3]+h[3],r={r:parseInt(n,16),g:parseInt(i,16),b:parseInt(s,16),a:1})),"#"!==t[0]&&(o="r"===t[0]&&"g"===t[1]&&"b"===t[2],o&&(u=t),o||(u=this.shortColors[t]?this.shortColors[t]:(this.div.style.color=t,this.isFF||this.isIE||this.isOldOpera?(l=this.computedStyle(this.div),this.computedStyle(this.div).color):this.div.style.color)),p="^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),",a="\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$",h=new RegExp(p+a,"gi").exec(u),r={},e=parseFloat(h[4]||1),h&&(r={r:parseInt(h[1],10),g:parseInt(h[2],10),b:parseInt(h[3],10),a:null==e||isNaN(e)?1:e})),r},t.prototype.computedStyle=function(t){return getComputedStyle(t)},t.prototype.splitEasing=function(t){var e,s,r;return"function"==typeof t?t:"string"==typeof t&&t.length?(r=t.split("."),e=r[0].toLowerCase()||"linear",s=r[1].toLowerCase()||"none",[e,s]):["linear","none"]},t.prototype.capitalize=function(t){if("string"!=typeof t)throw Error("String expected - nothing to capitalize");return t.charAt(0).toUpperCase()+t.substring(1)},t.prototype.parseRand=function(t){var e,s,r;return s=t.split(/rand\(|\,|\)/),r=this.parseUnit(s[2]),e=this.rand(parseFloat(s[1]),parseFloat(s[2])),r.unit&&s[2].match(r.unit)?e+r.unit:e},t.prototype.parseStagger=function(t,e){var s,r,i,o,n,p;return p=t.split(/stagger\(|\)$/)[1].toLowerCase(),i=p.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim),p=i.length>3?(s=this.parseUnit(this.parseIfRand(i[1])),i[3]):(s=this.parseUnit(0),i[1]),p=this.parseIfRand(p),n=this.parseUnit(p),r=e*n.value+s.value,o=s.isStrict?s.unit:n.isStrict?n.unit:"",o?""+r+o:r},t.prototype.parseIfRand=function(t){return"string"==typeof t&&t.match(/rand\(/)?this.parseRand(t):t},t.prototype.parseDelta=function(t,e){var s,r,i,o,n,p,a,h,u,l;if(h=Object.keys(e)[0],r=e[h],s={start:h},isNaN(parseFloat(h))&&!h.match(/rand\(/)){if("strokeLinecap"===t)return this.warn("Sorry, stroke-linecap property is not animatable yet, using the start("+h+") value instead",e),s;l=this.makeColorObj(h),o=this.makeColorObj(r),s={start:l,end:o,type:"color",delta:{r:o.r-l.r,g:o.g-l.g,b:o.b-l.b,a:o.a-l.a}}}else if("strokeDasharray"===t||"strokeDashoffset"===t){for(u=this.strToArr(h),i=this.strToArr(r),this.normDashArrays(u,i),n=p=0,a=u.length;a>p;n=++p)h=u[n],r=i[n],this.mergeUnits(h,r,t);s={start:u,end:i,delta:this.calcArrDelta(u,i),type:"array"}}else this.chainOptionMap[t]||(this.posPropsMap[t]?(r=this.parseUnit(this.parseIfRand(r)),h=this.parseUnit(this.parseIfRand(h)),this.mergeUnits(h,r,t),s={start:h,end:r,delta:r.value-h.value,type:"unit"}):(r=parseFloat(this.parseIfRand(r)),h=parseFloat(this.parseIfRand(h)),s={start:h,end:r,delta:r-h,type:"number"}));return s},t.prototype.mergeUnits=function(t,e,s){return!e.isStrict&&t.isStrict?(e.unit=t.unit,e.string=""+e.value+e.unit):e.isStrict&&!t.isStrict?(t.unit=e.unit,t.string=""+t.value+t.unit):e.isStrict&&t.isStrict&&e.unit!==t.unit?(t.unit=e.unit,t.string=""+t.value+t.unit,this.warn('Two different units were specified on "'+s+'" delta property, mo · js will fallback to end "'+e.unit+'" unit ')):void 0},t.prototype.rand=function(t,e){return Math.random()*(e-t)+t},t.prototype.isDOM=function(t){var e;return null==t?!1:(e="number"==typeof t.nodeType&&"string"==typeof t.nodeName,"object"==typeof t&&e)},t.prototype.getChildElements=function(t){var e,s,r;for(e=t.childNodes,s=[],r=e.length;r--;)1===e[r].nodeType&&s.unshift(e[r]);return s},t}(),r=new s,e.exports=r},{}],4:[function(e,s){var r;return r={revision:"0.110.0",isDebug:!0,helpers:e("./h"),Bit:e("./shapes/bit"),bitsMap:e("./shapes/bitsMap"),Circle:e("./shapes/circle"),Cross:e("./shapes/cross"),Line:e("./shapes/line"),Rect:e("./shapes/rect"),Polygon:e("./shapes/polygon"),Equal:e("./shapes/equal"),Zigzag:e("./shapes/zigzag"),Burst:e("./burst"),Transit:e("./transit"),Swirl:e("./swirl"),Stagger:e("./stagger"),MotionPath:e("./motion-path"),Timeline:e("./tween/timeline"),Tween:e("./tween/tween"),tweener:e("./tween/tweener"),easing:e("./easing")},"function"==typeof t&&t.amd&&t("mojs",[],function(){return r}),"object"==typeof s&&"object"==typeof s.exports&&(s.exports=r),"undefined"!=typeof window&&null!==window?window.mojs=r:void 0},{"./burst":1,"./easing":2,"./h":3,"./motion-path":5,"./shapes/bit":8,"./shapes/bitsMap":9,"./shapes/circle":10,"./shapes/cross":11,"./shapes/equal":12,"./shapes/line":13,"./shapes/polygon":14,"./shapes/rect":15,"./shapes/zigzag":16,"./stagger":17,"./swirl":18,"./transit":19,"./tween/timeline":20,"./tween/tween":21,"./tween/tweener":22}],5:[function(t,e){var s,r,i,o,n,p=function(t,e){return function(){return t.apply(e,arguments)}};o=t("./h"),n=t("./vendor/resize"),r=t("./tween/timeline"),i=t("./tween/tween"),s=function(){function t(t){this.o=null!=t?t:{},this.calcHeight=p(this.calcHeight,this),this.vars()||this.createTween()}return t.prototype.NS="http://www.w3.org/2000/svg",t.prototype.defaults={delay:0,duration:1e3,easing:null,repeat:0,yoyo:!1,offsetX:0,offsetY:0,angleOffset:null,pathStart:0,pathEnd:1,transformOrigin:null,isAngle:!1,isReverse:!1,isRunLess:!1,isPresetPosition:!0,onStart:null,onComplete:null,onUpdate:null},t.prototype.vars=function(){return this.getScaler=o.bind(this.getScaler,this),this.resize=n,this.props=o.cloneObj(this.defaults),this.extendOptions(this.o),this.history=[o.cloneObj(this.props)],this.postVars()},t.prototype.postVars=function(){return this.props.pathStart=o.clamp(this.props.pathStart,0,1),this.props.pathEnd=o.clamp(this.props.pathEnd,this.props.pathStart,1),this.angle=0,this.onUpdate=this.props.onUpdate,this.el=this.parseEl(this.props.el),this.path=this.getPath(),this.path.getAttribute("d")?(this.len=this.path.getTotalLength(),this.slicedLen=this.len*(this.props.pathEnd-this.props.pathStart),this.startLen=this.props.pathStart*this.len,this.fill=this.props.fill,null!=this.fill&&(this.container=this.parseEl(this.props.fill.container),this.fillRule=this.props.fill.fillRule||"all",this.getScaler(),null!=this.container)?(this.removeEvent(this.container,"onresize",this.getScaler),this.addEvent(this.container,"onresize",this.getScaler)):void 0):(o.error("Path has no coordinates to work with, aborting"),!0)},t.prototype.addEvent=function(t,e,s){return t.addEventListener(e,s,!1)},t.prototype.removeEvent=function(t,e,s){return t.removeEventListener(e,s,!1)},t.prototype.parseEl=function(t){return"string"==typeof t?document.querySelector(t):t instanceof HTMLElement?t:null!=t.setProp?(this.isModule=!0,t):void 0},t.prototype.getPath=function(){var t;return"string"==typeof this.props.path?"m"===this.props.path.charAt(0).toLowerCase()?(t=document.createElementNS(this.NS,"path"),t.setAttributeNS(null,"d",this.props.path),t):document.querySelector(this.props.path):this.props.path.style?this.props.path:void 0},t.prototype.getScaler=function(){var t,e,s;switch(this.cSize={width:this.container.offsetWidth||0,height:this.container.offsetHeight||0},s=this.path.getPointAtLength(0),t=this.path.getPointAtLength(this.len),e={},this.scaler={},e.width=t.x>=s.x?t.x-s.x:s.x-t.x,e.height=t.y>=s.y?t.y-s.y:s.y-t.y,this.fillRule){case"all":return this.calcWidth(e),this.calcHeight(e);case"width":return this.calcWidth(e),this.scaler.y=this.scaler.x;case"height":return this.calcHeight(e),this.scaler.x=this.scaler.y}},t.prototype.calcWidth=function(t){return this.scaler.x=this.cSize.width/t.width,!isFinite(this.scaler.x)&&(this.scaler.x=1)},t.prototype.calcHeight=function(t){return this.scaler.y=this.cSize.height/t.height,!isFinite(this.scaler.y)&&(this.scaler.y=1)},t.prototype.run=function(t){var e,s,r;if(t){e=this.history[0];for(s in t)r=t[s],o.callbacksMap[s]||o.tweenOptionMap[s]?(o.warn('the property "'+s+'" property can not be overridden on run yet'),delete t[s]):this.history[0][s]=r;this.tuneOptions(t)}return this.startTween()},t.prototype.createTween=function(){return this.timeline=new r({duration:this.props.duration,delay:this.props.delay,yoyo:this.props.yoyo,repeat:this.props.repeat,easing:this.props.easing,onStart:function(t){return function(){var e;return null!=(e=t.props.onStart)?e.apply(t):void 0}}(this),onComplete:function(t){return function(){var e;return null!=(e=t.props.onComplete)?e.apply(t):void 0}}(this),onUpdate:function(t){return function(e){return t.setProgress(e)}}(this),onFirstUpdateBackward:function(t){return function(){return t.history.length>1&&t.tuneOptions(t.history[0])}}(this)}),this.tween=new i,this.tween.add(this.timeline),!this.props.isRunLess&&this.startTween(),this.props.isPresetPosition&&this.setProgress(0,!0)},t.prototype.startTween=function(){return setTimeout(function(t){return function(){var e;return null!=(e=t.tween)?e.start():void 0}}(this),1)},t.prototype.setProgress=function(t,e){var s,r,i,n,p,a,h,u,l;return r=this.startLen+(this.props.isReverse?(1-t)*this.slicedLen:t*this.slicedLen),i=this.path.getPointAtLength(r),this.props.isAngle||null!=this.props.angleOffset?(n=this.path.getPointAtLength(r-1),h=i.y-n.y,u=i.x-n.x,s=Math.atan(h/u),!isFinite(s)&&(s=0),this.angle=s*o.RAD_TO_DEG,"function"!=typeof this.props.angleOffset?this.angle+=this.props.angleOffset||0:this.angle=this.props.angleOffset.call(this,this.angle,t)):this.angle=0,a=i.x+this.props.offsetX,l=i.y+this.props.offsetY,this.scaler&&(a*=this.scaler.x,l*=this.scaler.y),this.isModule?this.setModulePosition(a,l):this.setElPosition(a,l),this.props.transformOrigin&&(p="function"==typeof this.props.transformOrigin?this.props.transformOrigin(this.angle,t):this.props.transformOrigin,this.el.style[o.prefix.css+"transform-origin"]=p,this.el.style["transform-origin"]=p),!e&&("function"==typeof this.onUpdate?this.onUpdate(t):void 0)},t.prototype.setElPosition=function(t,e){var s,r;return s=0!==this.angle?"rotate("+this.angle+"deg)":"",r="translate("+t+"px,"+e+"px) "+s,this.el.style[o.prefix.css+"transform"]=r,this.el.style.transform=r},t.prototype.setModulePosition=function(t,e){return this.el.setProp({shiftX:t+"px",shiftY:e+"px",angle:this.angle}),this.el.draw()},t.prototype.extendDefaults=function(t){var e,s,r;s=[];for(e in t)r=t[e],s.push(this[e]=r);return s},t.prototype.extendOptions=function(t){var e,s,r;s=[];for(e in t)r=t[e],s.push(this.props[e]=r);return s},t.prototype.then=function(t){var e,s,i,n,p;n=this.history[this.history.length-1],i={};for(s in n)p=n[s],!o.callbacksMap[s]&&!o.tweenOptionMap[s]||"duration"===s?null==t[s]&&(t[s]=p):null==t[s]&&(t[s]=void 0),o.tweenOptionMap[s]&&(i[s]="duration"!==s?t[s]:null!=t[s]?t[s]:n[s]);return this.history.push(t),e=this,i.onUpdate=function(t){return function(e){return t.setProgress(e)}}(this),i.onStart=function(t){return function(){var e;return null!=(e=t.props.onStart)?e.apply(t):void 0}}(this),i.onComplete=function(t){return function(){var e;return null!=(e=t.props.onComplete)?e.apply(t):void 0}}(this),i.onFirstUpdate=function(){return e.tuneOptions(e.history[this.index])},i.isChained=!t.delay,this.tween.append(new r(i)),this},t.prototype.tuneOptions=function(t){return this.extendOptions(t),this.postVars()},t}(),e.exports=s},{"./h":3,"./tween/timeline":20,"./tween/tween":21,"./vendor/resize":23}],6:[function(){!function(t){var e,s,r;return null==t.performance&&(t.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},null==t.performance.now?(e=(null!=(s=t.performance)&&null!=(r=s.timing)?r.navigationStart:void 0)?performance.timing.navigationStart:Date.now(),t.performance.now=function(){return Date.now()-e}):void 0}(window)},{}],7:[function(){!function(){var t,e,s,r;for(e=0,r=0,s=["ms","moz","webkit","o"];r<s.length&&!window.requestAnimationFrame;)window.requestAnimationFrame=window[s[r]+"RequestAnimationFrame"],t=window[s[r]+"CancelRequestAnimationFrame"],window.cancelAnimationFrame=window[s[r]+"CancelAnimationFrame"]||t,++r;window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var s,r,i;return s=(new Date).getTime(),i=Math.max(0,16-(s-e)),r=window.setTimeout(function(){t(s+i)},i),e=s+i,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}()},{}],8:[function(t,e){var s,r;r=t("../h"),s=function(){function t(t){this.o=null!=t?t:{},this.init()}return t.prototype.ns="http://www.w3.org/2000/svg",t.prototype.type="line",t.prototype.ratio=1,t.prototype.defaults={radius:50,radiusX:void 0,radiusY:void 0,points:3,x:0,y:0,angle:0,stroke:"hotpink","stroke-width":2,"stroke-opacity":1,fill:"transparent","fill-opacity":1,"stroke-dasharray":"","stroke-dashoffset":"","stroke-linecap":""},t.prototype.init=function(){return this.vars(),this.render(),this},t.prototype.vars=function(){return this.o.ctx&&"svg"===this.o.ctx.tagName?this.ctx=this.o.ctx:this.o.el||r.error("You should pass a real context(ctx) to the bit"),this.state={},this.drawMapLength=this.drawMap.length,this.extendDefaults(),this.calcTransform()},t.prototype.calcTransform=function(){var t;return t="rotate("+this.props.angle+", "+this.props.x+", "+this.props.y+")",this.props.transform=""+t},t.prototype.extendDefaults=function(){var t,e,s,r;null==this.props&&(this.props={}),e=this.defaults,s=[];for(t in e)r=e[t],s.push(this.props[t]=null!=this.o[t]?this.o[t]:r);return s},t.prototype.setAttr=function(t,e){var s,r,i,o,n,p;if("object"==typeof t){for(i=Object.keys(t),o=i.length,s=e||this.el,n=[];o--;)r=i[o],p=t[r],n.push(s.setAttribute(r,p));return n}return this.el.setAttribute(t,e)},t.prototype.setProp=function(t,e){var s,r,i;if("object"==typeof t){r=[];for(s in t)i=t[s],r.push(this.props[s]=i);return r}return this.props[t]=e},t.prototype.render=function(){return this.isRendered=!0,null!=this.o.el?(this.el=this.o.el,this.isForeign=!0):(this.el=document.createElementNS(this.ns,this.type||"line"),!this.o.isDrawLess&&this.draw(),this.ctx.appendChild(this.el))},t.prototype.drawMap=["stroke","stroke-width","stroke-opacity","stroke-dasharray","fill","stroke-dashoffset","stroke-linecap","fill-opacity","transform"],t.prototype.draw=function(){var t,e;for(this.props.length=this.getLength(),t=this.drawMapLength;t--;){switch(e=this.drawMap[t]){case"stroke-dasharray":case"stroke-dashoffset":this.castStrokeDash(e)}this.setAttrsIfChanged(e,this.props[e])}return this.state.radius=this.props.radius},t.prototype.castStrokeDash=function(t){var e,s,i,o,n,p,a;if(r.isArray(this.props[t])){for(a="",p=this.props[t],i=o=0,n=p.length;n>o;i=++o)s=p[i],e="%"===s.unit?this.castPercent(s.value):s.value,a+=e+" ";return this.props[t]=a}return"object"==typeof this.props[t]?this.props[t]="%"===this.props[t].unit?this.castPercent(this.props[t].value):this.props[t].value:void 0},t.prototype.castPercent=function(t){return t*(this.props.length/100)},t.prototype.setAttrsIfChanged=function(t,e){var s,r,i,o;if("object"==typeof t){for(r=Object.keys(t),i=r.length,o=[];i--;)s=r[i],e=t[s],o.push(this.setAttrIfChanged(s,e));return o}return null==e&&(e=this.props[t]),this.setAttrIfChanged(t,e)},t.prototype.setAttrIfChanged=function(t,e){return this.isChanged(t,e)?(this.el.setAttribute(t,e),this.state[t]=e):void 0},t.prototype.isChanged=function(t,e){return null==e&&(e=this.props[t]),this.state[t]!==e},t.prototype.getLength=function(){var t;return null!=(null!=(t=this.el)?t.getTotalLength:void 0)&&this.el.getAttribute("d")?this.el.getTotalLength():2*(null!=this.props.radiusX?this.props.radiusX:this.props.radius)},t}(),e.exports=s},{"../h":3}],9:[function(t,e){var s,r,i,o,n,p,a,h,u,l;s=t("./bit"),i=t("./circle"),p=t("./line"),u=t("./zigzag"),h=t("./rect"),a=t("./polygon"),o=t("./cross"),n=t("./equal"),l=t("../h"),r=function(){function t(){}return t.prototype.h=l,t.prototype.map={bit:s,circle:i,line:p,zigzag:u,rect:h,polygon:a,cross:o,equal:n},t.prototype.getBit=function(t){return this.map[t]||this.h.error('no "'+t+'" shape available yet, please choose from this list:',this.map)},t}(),e.exports=new r},{"../h":3,"./bit":8,"./circle":10,"./cross":11,"./equal":12,"./line":13,"./polygon":14,"./rect":15,"./zigzag":16}],10:[function(t,e){var s,r,i=function(t,e){function s(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},o={}.hasOwnProperty;s=t("./bit"),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return i(e,t),e.prototype.type="ellipse",e.prototype.draw=function(){var t,s;return t=null!=this.props.radiusX?this.props.radiusX:this.props.radius,s=null!=this.props.radiusY?this.props.radiusY:this.props.radius,this.setAttrsIfChanged({rx:t,ry:s,cx:this.props.x,cy:this.props.y}),e.__super__.draw.apply(this,arguments)},e.prototype.getLength=function(){var t,e;return t=null!=this.props.radiusX?this.props.radiusX:this.props.radius,e=null!=this.props.radiusY?this.props.radiusY:this.props.radius,2*Math.PI*Math.sqrt((Math.pow(t,2)+Math.pow(e,2))/2)},e}(s),e.exports=r},{"./bit":8}],11:[function(t,e){var s,r,i=function(t,e){function s(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},o={}.hasOwnProperty;s=t("./bit"),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return i(e,t),e.prototype.type="path",e.prototype.draw=function(){var t,s,r,i,o,n,p,a,h;return e.__super__.draw.apply(this,arguments),i=null!=this.props.radiusX?this.props.radiusX:this.props.radius,o=null!=this.props.radiusY?this.props.radiusY:this.props.radius,n=this.props.x-i,p=this.props.x+i,s="M"+n+","+this.props.y+" L"+p+","+this.props.y,a=this.props.y-o,h=this.props.y+o,r="M"+this.props.x+","+a+" L"+this.props.x+","+h,t=s+" "+r,this.setAttr({d:t})},e.prototype.getLength=function(){var t,e;return t=null!=this.props.radiusX?this.props.radiusX:this.props.radius,e=null!=this.props.radiusY?this.props.radiusY:this.props.radius,2*(t+e)},e}(s),e.exports=r},{"./bit":8}],12:[function(t,e){var s,r,i=function(t,e){function s(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},o={}.hasOwnProperty;s=t("./bit"),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return i(e,t),e.prototype.type="path",e.prototype.ratio=1.43,e.prototype.draw=function(){var t,s,r,i,o,n,p,a,h,u,l;if(e.__super__.draw.apply(this,arguments),this.props.points){for(i=null!=this.props.radiusX?this.props.radiusX:this.props.radius,o=null!=this.props.radiusY?this.props.radiusY:this.props.radius,p=this.props.x-i,a=this.props.x+i,t="",l=2*o/(this.props.points-1),u=this.props.y-o,s=r=0,n=this.props.points;n>=0?n>r:r>n;s=n>=0?++r:--r)h=""+(s*l+u),t+="M"+p+", "+h+" L"+a+", "+h+" ";return this.setAttr({d:t})}},e.prototype.getLength=function(){return 2*(null!=this.props.radiusX?this.props.radiusX:this.props.radius)},e}(s),e.exports=r},{"./bit":8}],13:[function(t,e){var s,r,i=function(t,e){function s(){this.constructor=t
	}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},o={}.hasOwnProperty;s=t("./bit"),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return i(e,t),e.prototype.draw=function(){var t;return t=null!=this.props.radiusX?this.props.radiusX:this.props.radius,this.setAttrsIfChanged({x1:this.props.x-t,x2:this.props.x+t,y1:this.props.y,y2:this.props.y}),e.__super__.draw.apply(this,arguments)},e}(s),e.exports=r},{"./bit":8}],14:[function(t,e){var s,r,i,o=function(t,e){function s(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},n={}.hasOwnProperty;s=t("./bit"),i=t("../h"),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return o(e,t),e.prototype.type="path",e.prototype.draw=function(){return this.drawShape(),e.__super__.draw.apply(this,arguments)},e.prototype.drawShape=function(){var t,e,s,r,o,n,p,a,h,u;for(u=360/this.props.points,this.radialPoints=[],s=r=0,a=this.props.points;a>=0?a>r:r>a;s=a>=0?++r:--r)this.radialPoints.push(i.getRadialPoint({radius:this.props.radius,radiusX:this.props.radiusX,radiusY:this.props.radiusY,angle:s*u,center:{x:this.props.x,y:this.props.y}}));for(e="",h=this.radialPoints,s=o=0,n=h.length;n>o;s=++o)p=h[s],t=0===s?"M":"L",e+=""+t+p.x.toFixed(4)+","+p.y.toFixed(4)+" ";return this.setAttr({d:e+="z"})},e.prototype.getLength=function(){return this.el.getTotalLength()},e}(s),e.exports=r},{"../h":3,"./bit":8}],15:[function(t,e){var s,r,i=function(t,e){function s(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},o={}.hasOwnProperty;s=t("./bit"),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return i(e,t),e.prototype.type="rect",e.prototype.ratio=1.43,e.prototype.draw=function(){var t,s;return e.__super__.draw.apply(this,arguments),t=null!=this.props.radiusX?this.props.radiusX:this.props.radius,s=null!=this.props.radiusY?this.props.radiusY:this.props.radius,this.setAttrsIfChanged({width:2*t,height:2*s,x:this.props.x-t,y:this.props.y-s})},e.prototype.getLength=function(){var t,e;return t=null!=this.props.radiusX?this.props.radiusX:this.props.radius,e=null!=this.props.radiusY?this.props.radiusY:this.props.radius,2*t+2*e},e}(s),e.exports=r},{"./bit":8}],16:[function(t,e){var s,r,i=function(t,e){function s(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},o={}.hasOwnProperty;s=t("./bit"),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return i(e,t),e.prototype.type="path",e.prototype.ratio=1.43,e.prototype.draw=function(){var t,s,r,i,o,n,p,a,h,u,l,c,d,f,y,g;if(this.props.points){for(h=null!=this.props.radiusX?this.props.radiusX:this.props.radius,u=null!=this.props.radiusY?this.props.radiusY:this.props.radius,a="",c=2*h/this.props.points,d=2*u/this.props.points,f=this.props["stroke-width"],y=this.props.x-h,g=this.props.y-u,s=p=l=this.props.points;0>=l?0>p:p>0;s=0>=l?++p:--p)r=y+s*c+f,o=g+s*d+f,i=y+(s-1)*c+f,n=g+(s-1)*d+f,t=s===this.props.points?"M":"L",a+=""+t+r+","+o+" l0, -"+d+" l-"+c+", 0";return this.setAttr({d:a}),e.__super__.draw.apply(this,arguments)}},e}(s),e.exports=r},{"./bit":8}],17:[function(t,e){var s,r,i,o,n,p=function(t,e){function s(){this.constructor=t}for(var r in e)a.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},a={}.hasOwnProperty;n=t("./h"),r=t("./tween/timeline"),o=t("./tween/tween"),i=t("./transit"),s=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return p(e,t),e.prototype.isSkipDelta=!0,e.prototype.ownDefaults={delay:"stagger(100)",els:null,fill:"transparent",stroke:["yellow","cyan","deeppink"],strokeDasharray:"100%",strokeDashoffset:{"100%":"0%"},isShowInit:!1,isShowEnd:!1,radius:0,type:"line"},e.prototype.vars=function(){return n.extend(this.ownDefaults,this.defaults),this.defaults=this.ownDefaults,e.__super__.vars.apply(this,arguments),this.parseEls()},e.prototype.extendDefaults=function(t){var e,s,r,i,o;this.props={},this.deltas={},e=t||this.o,r=this.defaults,i=[];for(s in r)o=r[s],i.push(this.props[s]=null!=e[s]?e[s]:this.defaults[s]);return i},e.prototype.parseEls=function(){var t;return this.props.els+""=="[object NodeList]"?this.props.els=Array.prototype.slice.call(this.props.els,0):"string"==typeof this.props.els?(t=document.querySelector(this.props.els),this.props.els=n.getChildElements(t)):n.isDOM(this.props.els)?this.props.els=n.getChildElements(this.props.els):void 0},e.prototype.createBit=function(){var t,e,s,r,o,n;for(this.transits=[],s=this.props.els.length,n=[],t=e=0,o=s;o>=0?o>e:e>o;t=o>=0?++e:--e)r=this.getOption(t),r.index=t,r.isRunLess=!0,n.push(this.transits.push(new i(r)));return n},e.prototype.getOption=function(t){var e,s,r,i;s={},r=this.props;for(e in r)i=r[e],s[e]=this.getPropByMod(e,t);return s.bit=this.getPropByMod("els",t),s},e.prototype.getPropByMod=function(t,e){var s;return s=this.props[t],n.isArray(s)?s[e%s.length]:s},e.prototype.render=function(){return this.createBit(),this.setProgress(0,!0),this.createTween(),this},e.prototype.isDelta=function(){return!1},e.prototype.createTween=function(){var t;for(this.tween=new o,t=-1;t++<this.transits.length-1;)this.tween.add(this.transits[t].tween);return!this.o.isRunLess&&this.startTween()},e.prototype.draw=function(){return this.drawEl()},e}(i),e.exports=s},{"./h":3,"./transit":19,"./tween/timeline":20,"./tween/tween":21}],18:[function(t,e){var s,r,i=function(t,e){function s(){this.constructor=t}for(var r in e)o.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},o={}.hasOwnProperty;r=t("./transit"),s=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return i(e,t),e.prototype.skipPropsDelta={x:1,y:1},e.prototype.vars=function(){return e.__super__.vars.apply(this,arguments),!this.o.isSwirlLess&&this.generateSwirl()},e.prototype.extendDefaults=function(){var t,s,r,i;return e.__super__.extendDefaults.apply(this,arguments),r=this.getPosValue("x"),i=this.getPosValue("y"),t=90+Math.atan(i.delta/r.delta||0)*(180/Math.PI),r.delta<0&&(t+=180),this.positionDelta={radius:Math.sqrt(r.delta*r.delta+i.delta*i.delta),angle:t,x:r,y:i},null==(s=this.o).radiusScale&&(s.radiusScale=1),this.props.angleShift=this.h.parseIfRand(this.o.angleShift||0),this.props.radiusScale=this.h.parseIfRand(this.o.radiusScale)},e.prototype.getPosValue=function(t){var e,s;return e=this.o[t],e&&"object"==typeof e?(s=this.h.parseDelta(t,e),{start:s.start.value,end:s.end.value,delta:s.delta,units:s.end.unit}):(s=parseFloat(e||this.defaults[t]),{start:s,end:s,delta:0,units:"px"})},e.prototype.setProgress=function(t){var s,r,i,o;return s=this.positionDelta.angle,this.o.isSwirl&&(s+=this.getSwirl(t)),r=this.h.getRadialPoint({angle:s,radius:this.positionDelta.radius*t*this.props.radiusScale,center:{x:this.positionDelta.x.start,y:this.positionDelta.y.start}}),i=r.x.toFixed(4),o=r.y.toFixed(4),this.props.x=this.o.ctx?i:i+this.positionDelta.x.units,this.props.y=this.o.ctx?o:o+this.positionDelta.y.units,e.__super__.setProgress.apply(this,arguments)},e.prototype.generateSwirl=function(){var t,e;return this.props.signRand=Math.round(this.h.rand(0,1))?-1:1,null==(t=this.o).swirlSize&&(t.swirlSize=10),null==(e=this.o).swirlFrequency&&(e.swirlFrequency=3),this.props.swirlSize=this.h.parseIfRand(this.o.swirlSize),this.props.swirlFrequency=this.h.parseIfRand(this.o.swirlFrequency)},e.prototype.getSwirl=function(t){return this.props.signRand*this.props.swirlSize*Math.sin(this.props.swirlFrequency*t)},e}(r),e.exports=s},{"./transit":19}],19:[function(t,e){var s,r,i,o,n,p=function(t,e){function s(){this.constructor=t}for(var r in e)a.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},a={}.hasOwnProperty;n=t("./h"),o=t("./shapes/bitsMap"),s=t("./tween/timeline"),i=t("./tween/tween"),r=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return p(e,t),e.prototype.progress=0,e.prototype.defaults={strokeWidth:2,strokeOpacity:1,strokeDasharray:0,strokeDashoffset:0,stroke:"transparent",fill:"deeppink",fillOpacity:"transparent",strokeLinecap:"",points:3,x:0,y:0,shiftX:0,shiftY:0,opacity:1,radius:{0:50},radiusX:void 0,radiusY:void 0,angle:0,size:null,sizeGap:0,onStart:null,onComplete:null,onUpdate:null,duration:500,delay:0,repeat:0,yoyo:!1,easing:"Linear.None"},e.prototype.vars=function(){var t;return null==this.h&&(this.h=n),null==this.lastSet&&(this.lastSet={}),this.index=this.o.index||0,this.extendDefaults(),t=this.h.cloneObj(this.o),this.h.extend(t,this.defaults),this.history=[t],this.isForeign=!!this.o.ctx,this.isForeignBit=!!this.o.bit,this.timelines=[]},e.prototype.render=function(){return this.isRendered||(this.isForeign||this.isForeignBit?(this.ctx=this.o.ctx,this.createBit(),this.calcSize()):(this.ctx=document.createElementNS(this.ns,"svg"),this.ctx.style.position="absolute",this.ctx.style.width="100%",this.ctx.style.height="100%",this.createBit(),this.calcSize(),this.el=document.createElement("div"),this.el.appendChild(this.ctx),(this.o.parent||document.body).appendChild(this.el)),this.isRendered=!0),this.setElStyles(),this.setProgress(0,!0),this.createTween(),this},e.prototype.setElStyles=function(){var t,e,s;return this.isForeign||(s=this.props.size+"px",t=-this.props.size/2+"px",this.el.style.position="absolute",this.el.style.top=this.props.y,this.el.style.left=this.props.x,this.el.style.width=s,this.el.style.height=s,this.el.style["margin-left"]=t,this.el.style["margin-top"]=t,this.el.style.marginLeft=t,this.el.style.marginTop=t),null!=(e=this.el)&&(e.style.opacity=this.props.opacity),this.o.isShowInit?this.show():this.hide()},e.prototype.show=function(){return this.isShown||null==this.el?void 0:(this.el.style.display="block",this.isShown=!0)},e.prototype.hide=function(){return this.isShown!==!1&&null!=this.el?(this.el.style.display="none",this.isShown=!1):void 0},e.prototype.draw=function(){return this.bit.setProp({x:this.origin.x,y:this.origin.y,stroke:this.props.stroke,"stroke-width":this.props.strokeWidth,"stroke-opacity":this.props.strokeOpacity,"stroke-dasharray":this.props.strokeDasharray,"stroke-dashoffset":this.props.strokeDashoffset,"stroke-linecap":this.props.strokeLinecap,fill:this.props.fill,"fill-opacity":this.props.fillOpacity,radius:this.props.radius,radiusX:this.props.radiusX,radiusY:this.props.radiusY,points:this.props.points,transform:this.calcTransform()}),this.bit.draw(),this.drawEl()},e.prototype.drawEl=function(){return null!=this.el?(this.isPropChanged("opacity")&&(this.el.style.opacity=this.props.opacity),!this.isForeign&&(this.isPropChanged("x")&&(this.el.style.left=this.props.x),this.isPropChanged("y")&&(this.el.style.top=this.props.y),this.isNeedsTransform())?this.h.setPrefixedStyle(this.el,"transform",this.fillTransform()):void 0):void 0},e.prototype.fillTransform=function(){return"translate("+this.props.shiftX+", "+this.props.shiftY+")"},e.prototype.isNeedsTransform=function(){var t,e;return t=this.isPropChanged("shiftX"),e=this.isPropChanged("shiftY"),t||e},e.prototype.isPropChanged=function(t){var e;return null==(e=this.lastSet)[t]&&(e[t]={}),this.lastSet[t].value!==this.props[t]?(this.lastSet[t].value=this.props[t],!0):!1},e.prototype.calcTransform=function(){return this.props.transform="rotate("+this.props.angle+","+this.origin.x+","+this.origin.y+")"},e.prototype.calcSize=function(){var t,e,s,r;if(!this.o.size){switch(s=this.calcMaxRadius(),e=this.deltas.strokeWidth,r=null!=e?Math.max(Math.abs(e.start),Math.abs(e.end)):this.props.strokeWidth,this.props.size=2*s+2*r,"function"==typeof(t=this.props.easing).toLowerCase?t.toLowerCase():void 0){case"elastic.out":case"elastic.inout":this.props.size*=1.25;break;case"back.out":case"back.inout":this.props.size*=1.1}return this.props.size*=this.bit.ratio,this.props.size+=2*this.props.sizeGap,this.props.center=this.props.size/2}},e.prototype.calcMaxRadius=function(){var t,e,s;return t=this.getRadiusSize({key:"radius"}),e=this.getRadiusSize({key:"radiusX",fallback:t}),s=this.getRadiusSize({key:"radiusY",fallback:t}),Math.max(e,s)},e.prototype.getRadiusSize=function(t){return null!=this.deltas[t.key]?Math.max(Math.abs(this.deltas[t.key].end),Math.abs(this.deltas[t.key].start)):null!=this.props[t.key]?parseFloat(this.props[t.key]):t.fallback||0},e.prototype.createBit=function(){var t;return t=o.getBit(this.o.type||this.type),this.bit=new t({ctx:this.ctx,el:this.o.bit,isDrawLess:!0}),this.isForeign||this.isForeignBit?this.el=this.bit.el:void 0},e.prototype.setProgress=function(t,e){return e||(this.show(),"function"==typeof this.onUpdate&&this.onUpdate(t)),this.progress=0>t||!t?0:t>1?1:t,this.calcCurrentProps(t),this.calcOrigin(),this.draw(t),this},e.prototype.calcCurrentProps=function(t){var e,s,r,i,o,n,p,a,h,u,l,c,d,f;for(a=Object.keys(this.deltas),h=a.length,l=[];h--;)p=a[h],f=this.deltas[p],l.push(this.props[p]=function(){var p,a,h;switch(f.type){case"array":for(c=[],h=f.delta,o=p=0,a=h.length;a>p;o=++p)n=h[o],r=f.start[o].value+n.value*this.progress,c.push({value:r,unit:n.unit});return c;case"number":return f.start+f.delta*t;case"unit":return d=f.end.unit,""+(f.start.value+f.delta*t)+d;case"color":return u=parseInt(f.start.r+f.delta.r*t,10),i=parseInt(f.start.g+f.delta.g*t,10),s=parseInt(f.start.b+f.delta.b*t,10),e=parseInt(f.start.a+f.delta.a*t,10),"rgba("+u+","+i+","+s+","+e+")"}}.call(this));return l},e.prototype.calcOrigin=function(){return this.origin=this.o.ctx?{x:parseFloat(this.props.x),y:parseFloat(this.props.y)}:{x:this.props.center,y:this.props.center}},e.prototype.extendDefaults=function(t){var e,s,r,i,o,n,p,a,h,u,l,c,d,f;for(null==this.props&&(this.props={}),r=t||this.defaults,null==t&&(this.deltas={}),p=Object.keys(r),a=p.length;a--;)if(n=p[a],s=r[n],null!=(c=this.skipProps)?!c[n]:!0)if(t?(this.o[n]=s,u=s,delete this.deltas[n]):u=null!=this.o[n]?this.o[n]:s,this.isDelta(u))this.isSkipDelta||this.getDelta(n,u);else if("string"==typeof u&&u.match(/stagger/)&&(u=this.h.parseStagger(u,this.index)),"string"==typeof u&&u.match(/rand/)&&(u=this.h.parseRand(u)),this.props[n]=u,"radius"===n&&(null==this.o.radiusX&&(this.props.radiusX=u),null==this.o.radiusY&&(this.props.radiusY=u)),this.h.posPropsMap[n]&&(this.props[n]=this.h.parseUnit(this.props[n]).string),this.h.strokeDashPropsMap[n]){switch(l=this.props[n],f=[],typeof l){case"number":f.push(this.h.parseUnit(l));break;case"string":for(e=this.props[n].split(" "),i=o=0,h=e.length;h>o;i=++o)d=e[i],f.push(this.h.parseUnit(d))}this.props[n]=f}return this.onUpdate=this.props.onUpdate},e.prototype.isDelta=function(t){var e;return e=null!=t&&"object"==typeof t,e=e&&!t.unit,!(!e||this.h.isArray(t)||n.isDOM(t))},e.prototype.getDelta=function(t,e){var s,r;return"x"!==t&&"y"!==t||this.o.ctx||this.h.warn("Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more performant",e),(null!=(r=this.skipPropsDelta)?r[t]:0)?void 0:(s=this.h.parseDelta(t,e,this.defaults[t]),null!=s.type&&(this.deltas[t]=s),this.props[t]=s.start)},e.prototype.mergeThenOptions=function(t,e){var s,r,i,o,n,p,a,h,u;p={};for(o in t)u=t[o],p[o]=!this.h.tweenOptionMap[o]&&!this.h.callbacksMap[o]||"duration"===o?u:"easing"===o?"":void 0;for(n=Object.keys(e),r=n.length;r--;)o=n[r],s=e[o],i="function"==typeof s,this.h.tweenOptionMap[o]||"object"==typeof s||i?p[o]=null!=s?s:t[o]:(a=t[o],null==a&&(a=this.defaults[o]),"radiusX"!==o&&"radiusY"!==o||null!=a||(a=t.radius),"object"==typeof a&&null!=a&&(h=Object.keys(a),a=a[h[0]]),null!=s&&(p[o]={},p[o][a]=s));return p},e.prototype.then=function(t){var e,r,i,o,n,p;if(null!=t&&Object.keys(t)){for(n=this.mergeThenOptions(this.history[this.history.length-1],t),this.history.push(n),i=Object.keys(this.h.tweenOptionMap),e=i.length,p={};e--;)p[i[e]]=n[i[e]];return r=this,o=r.history.length,function(e){return function(){return p.onUpdate=function(t){return e.setProgress(t)},p.onStart=function(){var t;return null!=(t=e.props.onStart)?t.apply(e):void 0},p.onComplete=function(){var t;return null!=(t=e.props.onComplete)?t.apply(e):void 0},p.onFirstUpdate=function(){return r.tuneOptions(r.history[this.index])},p.isChained=!t.delay,e.tween.append(new s(p))}}(this)(o),this}},e.prototype.tuneOptions=function(t){return this.extendDefaults(t),this.calcSize(),this.setElStyles()},e.prototype.createTween=function(){var t;return t=this,this.createTimeline(),this.tween=new i({onComplete:function(t){return function(){var e;return!t.o.isShowEnd&&t.hide(),null!=(e=t.props.onComplete)?e.apply(t):void 0}}(this)}),this.tween.add(this.timeline),!this.o.isRunLess&&this.startTween()},e.prototype.createTimeline=function(){return this.timeline=new s({duration:this.props.duration,delay:this.props.delay,repeat:this.props.repeat,yoyo:this.props.yoyo,easing:this.props.easing,onUpdate:function(t){return function(e){return t.setProgress(e)}}(this),onStart:function(t){return function(){var e;return t.show(),null!=(e=t.props.onStart)?e.apply(t):void 0}}(this),onFirstUpdateBackward:function(t){return function(){return t.history.length>1&&t.tuneOptions(t.history[0])}}(this),onReverseComplete:function(t){return function(){var e;return!t.o.isShowInit&&t.hide(),null!=(e=t.props.onReverseComplete)?e.apply(t):void 0}}(this)})},e.prototype.run=function(t){var e,s,r;if(t&&Object.keys(t).length){if(this.history.length>1)for(s=Object.keys(t),r=s.length;r--;)e=s[r],(n.callbacksMap[e]||n.tweenOptionMap[e])&&(n.warn('the property "'+e+'" property can not be overridden on run with "then" chain yet'),delete t[e]);this.transformHistory(t),this.tuneNewOption(t),t=this.h.cloneObj(this.o),this.h.extend(t,this.defaults),this.history[0]=t,!this.o.isDrawLess&&this.setProgress(0,!0)}return this.startTween()},e.prototype.transformHistory=function(t){var e,s,r,i,o,n,p,a,h,u,l,c;for(o=Object.keys(t),s=-1,n=o.length,e=this.history.length,a=[];++s<n;)i=o[s],r=0,a.push(function(){var s;for(s=[];++r<e;){if(p=this.history[r][i],"object"==typeof p){l=Object.keys(p),h=p[l[0]],delete this.history[r][i][l[0]],"object"==typeof t[i]?(c=Object.keys(t[i]),u=t[i][c[0]],this.history[r][i][u]=h):this.history[r][i][t[i]]=h;break}s.push(this.history[r][i]=t[i])}return s}.call(this));return a},e.prototype.tuneNewOption=function(t,e){return null!=t&&null!=t.type&&t.type!==(this.o.type||this.type)&&(this.h.warn("Sorry, type can not be changed on run"),delete t.type),null!=t&&Object.keys(t).length?(this.extendDefaults(t),this.resetTimeline(),!e&&this.tween.recalcDuration(),this.calcSize(),!e&&this.setElStyles()):void 0},e.prototype.startTween=function(){return setTimeout(function(t){return function(){var e;return null!=(e=t.tween)?e.start():void 0}}(this),1)},e.prototype.resetTimeline=function(){var t,e,s,r,i,o;for(o={},i=Object.keys(this.h.tweenOptionMap),t=e=0,r=i.length;r>e;t=++e)s=i[t],o[s]=this.props[s];return o.onStart=this.props.onStart,o.onComplete=this.props.onComplete,this.timeline.setProp(o)},e.prototype.getBitLength=function(){return this.props.bitLength=this.bit.getLength(),this.props.bitLength},e}(o.map.bit),e.exports=r},{"./h":3,"./shapes/bitsMap":9,"./tween/timeline":20,"./tween/tween":21}],20:[function(t,e){var s,r,i;s=t("../easing"),i=t("../h"),r=function(){function t(t){this.o=null!=t?t:{},this.extendDefaults(),this.vars()}return t.prototype.defaults={duration:600,delay:0,repeat:0,yoyo:!1,easing:"Linear.None",durationElapsed:0,delayElapsed:0,onStart:null,onComplete:null,isChained:!1},t.prototype.vars=function(){return this.h=i,this.props={},this.progress=0,this.prevTime=0,this.calcDimentions()},t.prototype.calcDimentions=function(){var t;return this.props.totalTime=(this.o.repeat+1)*(this.o.duration+this.o.delay),this.props.totalDuration=this.props.totalTime-this.o.delay,t=i.splitEasing(this.o.easing),this.props.easing="function"==typeof t?t:s[t[0]][t[1]]},t.prototype.extendDefaults=function(){return i.extend(this.o,this.defaults),this.onUpdate=this.o.onUpdate},t.prototype.start=function(t){return this.isCompleted=!1,this.isStarted=!1,this.props.startTime=(t||performance.now())+this.o.delay,this.props.endTime=this.props.startTime+this.props.totalDuration,this},t.prototype.update=function(t){var e,s,r,i,o,n,p,a,h,u;if(t>=this.props.startTime&&t<this.props.endTime){if(this.isOnReverseComplete=!1,this.isCompleted=!1,this.isFirstUpdate||(null!=(i=this.o.onFirstUpdate)&&i.apply(this),this.isFirstUpdate=!0),this.isStarted||(null!=(o=this.o.onStart)&&o.apply(this),this.isStarted=!0),s=t-this.props.startTime,s<=this.o.duration)this.setProc(s/this.o.duration);else{for(u=this.props.startTime,r=!1,e=0;t>=u;)r=!r,u+=r?(e++,this.o.duration):this.o.delay;r?(u-=this.o.duration,s=t-u,this.setProc(s/this.o.duration),this.o.yoyo&&this.o.repeat&&this.setProc(e%2===1?this.progress:1-(0===this.progress?1:this.progress))):this.setProc(0)}t<this.prevTime&&!this.isFirstUpdateBackward&&(null!=(n=this.o.onFirstUpdateBackward)&&n.apply(this),this.isFirstUpdateBackward=!0),"function"==typeof this.onUpdate&&this.onUpdate(this.easedProgress)}else t>=this.props.endTime&&!this.isCompleted&&(this.setProc(1),"function"==typeof this.onUpdate&&this.onUpdate(this.easedProgress),null!=(p=this.o.onComplete)&&p.apply(this),this.isCompleted=!0,this.isOnReverseComplete=!1),(t>this.props.endTime||t<this.props.startTime)&&(this.isFirstUpdate=!1),t>this.props.endTime&&(this.isFirstUpdateBackward=!1);return t<this.prevTime&&t<=this.props.startTime&&(this.isFirstUpdateBackward||(null!=(a=this.o.onFirstUpdateBackward)&&a.apply(this),this.isFirstUpdateBackward=!0),this.isOnReverseComplete||(this.isOnReverseComplete=!0,this.setProc(0),!this.o.isChained&&("function"==typeof this.onUpdate?this.onUpdate(this.easedProgress):void 0),null!=(h=this.o.onReverseComplete)&&h.apply(this))),this.prevTime=t},t.prototype.setProc=function(t){return this.progress=t,this.easedProgress=this.props.easing(this.progress)},t.prototype.setProp=function(t,e){var s,r;if("object"==typeof t)for(s in t)r=t[s],this.o[s]=r;else"string"==typeof t&&(this.o[t]=e);return this.calcDimentions()},t}(),e.exports=r},{"../easing":2,"../h":3}],21:[function(t,e){var s,r,i;r=t("../h"),i=t("./tweener"),s=function(){function t(t){this.o=null!=t?t:{},this.vars()}return t.prototype.state="stop",t.prototype.vars=function(){return this.timelines=[],this.props={totalTime:0},this.loop=r.bind(this.loop,this),this.onUpdate=this.o.onUpdate},t.prototype.add=function(){var t;return t=Array.prototype.slice.apply(arguments),this.pushTimelineArray(t)},t.prototype.pushTimelineArray=function(t){var e,s,i,o,n;for(o=[],e=s=0,i=t.length;i>s;e=++s)n=t[e],o.push(r.isArray(n)?this.pushTimelineArray(n):this.pushTimeline(n));return o},t.prototype.pushTimeline=function(t){return this.timelines.push(t),this.props.totalTime=Math.max(t.props.totalTime,this.props.totalTime)},t.prototype.remove=function(t){var e;return e=this.timelines.indexOf(t),-1!==e?this.timelines.splice(e,1):void 0},t.prototype.append=function(t){var e;if(r.isArray(t)){for(e=t.length;e--;)this.appendTimeline(t[e]);return this.recalcDuration()}return t.index=this.timelines.length,this.appendTimeline(t),this.props.totalTime=Math.max(t.props.totalTime,this.props.totalTime)},t.prototype.appendTimeline=function(t){return t.setProp({delay:t.o.delay+this.props.totalTime}),this.timelines.push(t)},t.prototype.recalcDuration=function(){var t,e,s;for(t=this.timelines.length,this.props.totalTime=0,e=[];t--;)s=this.timelines[t],e.push(this.props.totalTime=Math.max(s.props.totalTime,this.props.totalTime));return e},t.prototype.update=function(t){var e,s,r,i;for(t>this.props.endTime&&(t=this.props.endTime),e=-1,s=this.timelines.length-1;e++<s;)this.timelines[e].update(t);return t>=this.props.startTime&&t<this.props.endTime&&"function"==typeof this.onUpdate&&this.onUpdate((t-this.props.startTime)/this.props.totalTime),this.prevTime>t&&t<=this.props.startTime&&null!=(r=this.o.onReverseComplete)&&r.apply(this),this.prevTime=t,t===this.props.endTime?("function"==typeof this.onUpdate&&this.onUpdate(1),null!=(i=this.o.onComplete)&&i.apply(this),!0):void 0},t.prototype.prepareStart=function(){var t;return this.getDimentions(),null!=(t=this.o.onStart)?t.apply(this):void 0},t.prototype.startTimelines=function(t){var e,s;for(e=this.timelines.length,s=[];e--;)s.push(this.timelines[e].start(t||this.props.startTime));return s},t.prototype.start=function(t){return this.setStartTime(t),!t&&i.add(this),this.state="play",this},t.prototype.pause=function(){return this.removeFromTweener(),this.state="pause",this},t.prototype.stop=function(){return this.removeFromTweener(),this.setProgress(0),this.state="stop",this},t.prototype.restart=function(){return this.stop(),this.start()},t.prototype.removeFromTweener=function(){return i.remove(this),this},t.prototype.getDimentions=function(){return this.props.startTime=performance.now(),this.props.endTime=this.props.startTime+this.props.totalTime},t.prototype.setStartTime=function(t){return this.prepareStart(),this.startTimelines(t)},t.prototype.setProgress=function(t){return null==this.props.startTime&&this.setStartTime(),t=Math.max(t,0),t=Math.min(t,1),this.update(this.props.startTime+t*this.props.totalTime)},t}(),e.exports=s},{"../h":3,"./tweener":22}],22:[function(t,e){var s,r,i;t("../polyfills/raf"),t("../polyfills/performance"),r=t("../h"),s=function(){function t(){this.vars()}return t.prototype.vars=function(){return this.tweens=[],this.loop=r.bind(this.loop,this)},t.prototype.loop=function(){var t;if(this.isRunning)return t=performance.now(),this.update(t),this.tweens.length?(requestAnimationFrame(this.loop),this):this.isRunning=!1},t.prototype.startLoop=function(){return this.isRunning?void 0:(this.isRunning=!0,requestAnimationFrame(this.loop))},t.prototype.stopLoop=function(){return this.isRunning=!1},t.prototype.update=function(t){var e,s;for(e=this.tweens.length,s=[];e--;)s.push(this.tweens[e].update(t)===!0?this.remove(e):void 0);return s},t.prototype.add=function(t){return this.tweens.push(t),this.startLoop()},t.prototype.removeAll=function(){return this.tweens.length=0},t.prototype.remove=function(t){var e;return e="number"==typeof t?t:this.tweens.indexOf(t),-1!==e?this.tweens.splice(e,1):void 0},t}(),i=new s,e.exports=i},{"../h":3,"../polyfills/performance":6,"../polyfills/raf":7}],23:[function(e,s){!function(){var e;return e=function(){function t(t){this.o=null!=t?t:{},window.isAnyResizeEventInited||(this.vars(),this.redefineProto())}return t.prototype.vars=function(){return window.isAnyResizeEventInited=!0,this.allowedProtos=[HTMLDivElement,HTMLFormElement,HTMLLinkElement,HTMLBodyElement,HTMLParagraphElement,HTMLFieldSetElement,HTMLLegendElement,HTMLLabelElement,HTMLButtonElement,HTMLUListElement,HTMLOListElement,HTMLLIElement,HTMLHeadingElement,HTMLQuoteElement,HTMLPreElement,HTMLBRElement,HTMLFontElement,HTMLHRElement,HTMLModElement,HTMLParamElement,HTMLMapElement,HTMLTableElement,HTMLTableCaptionElement,HTMLImageElement,HTMLTableCellElement,HTMLSelectElement,HTMLInputElement,HTMLTextAreaElement,HTMLAnchorElement,HTMLObjectElement,HTMLTableColElement,HTMLTableSectionElement,HTMLTableRowElement],this.timerElements={img:1,textarea:1,input:1,embed:1,object:1,svg:1,canvas:1,tr:1,tbody:1,thead:1,tfoot:1,a:1,select:1,option:1,optgroup:1,dl:1,dt:1,br:1,basefont:1,font:1,col:1,iframe:1}},t.prototype.redefineProto=function(){var t,e,s,r;return e=this,r=function(){var r,i,o,n;for(o=this.allowedProtos,n=[],t=r=0,i=o.length;i>r;t=++r)s=o[t],null!=s.prototype&&n.push(function(t){var s,r;return s=t.prototype.addEventListener||t.prototype.attachEvent,function(s){var r;return r=function(){var t;return(this!==window||this!==document)&&(t="onresize"===arguments[0]&&!this.isAnyResizeEventInited,t&&e.handleResize({args:arguments,that:this})),s.apply(this,arguments)},t.prototype.addEventListener?t.prototype.addEventListener=r:t.prototype.attachEvent?t.prototype.attachEvent=r:void 0}(s),r=t.prototype.removeEventListener||t.prototype.detachEvent,function(e){var s;return s=function(){return this.isAnyResizeEventInited=!1,this.iframe&&this.removeChild(this.iframe),e.apply(this,arguments)},t.prototype.removeEventListener?t.prototype.removeEventListener=s:t.prototype.detachEvent?t.prototype.detachEvent=wrappedListener:void 0}(r)}(s));return n}.call(this)},t.prototype.handleResize=function(t){var e,s,r,i,o,n,p;return s=t.that,this.timerElements[s.tagName.toLowerCase()]?this.initTimer(s):(r=document.createElement("iframe"),s.appendChild(r),r.style.width="100%",r.style.height="100%",r.style.position="absolute",r.style.zIndex=-999,r.style.opacity=0,r.style.top=0,r.style.left=0,e=window.getComputedStyle?getComputedStyle(s):s.currentStyle,o=""===s.style.position,n="static"===e.position&&o,i=""===e.position&&""===s.style.position,(n||i)&&(s.style.position="relative"),null!=(p=r.contentWindow)&&(p.onresize=function(t){return function(){return t.dispatchEvent(s)}}(this)),s.iframe=r),s.isAnyResizeEventInited=!0},t.prototype.initTimer=function(t){var e,s;return s=0,e=0,this.interval=setInterval(function(r){return function(){var i,o;return o=t.offsetWidth,i=t.offsetHeight,o!==s||i!==e?(r.dispatchEvent(t),s=o,e=i):void 0}}(this),this.o.interval||62.5)},t.prototype.dispatchEvent=function(t){var e;return document.createEvent?(e=document.createEvent("HTMLEvents"),e.initEvent("onresize",!1,!1),t.dispatchEvent(e)):document.createEventObject?(e=document.createEventObject(),t.fireEvent("onresize",e)):!1},t.prototype.destroy=function(){var t,e,s,r,i,o,n;for(clearInterval(this.interval),this.interval=null,window.isAnyResizeEventInited=!1,e=this,o=this.allowedProtos,n=[],t=s=0,r=o.length;r>s;t=++s)i=o[t],null!=i.prototype&&n.push(function(t){var e;return e=t.prototype.addEventListener||t.prototype.attachEvent,t.prototype.addEventListener?t.prototype.addEventListener=Element.prototype.addEventListener:t.prototype.attachEvent&&(t.prototype.attachEvent=Element.prototype.attachEvent),t.prototype.removeEventListener?t.prototype.removeEventListener=Element.prototype.removeEventListener:t.prototype.detachEvent?t.prototype.detachEvent=Element.prototype.detachEvent:void 0}(i));return n},t}(),"function"==typeof t&&t.amd?t("any-resize-event",[],function(){return new e}):"object"==typeof s&&"object"==typeof s.exports?s.exports=new e:("undefined"!=typeof window&&null!==window&&(window.AnyResizeEvent=e),"undefined"!=typeof window&&null!==window?window.anyResizeEvent=new e:void 0)}()},{}]},{},[4])(4)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Vector = __webpack_require__(6)
	  , bodies = []
	  , raf = __webpack_require__(20)

	function increment(a, b, c, d) {
	  var vec = Vector(0, 0)
	  vec.selfAdd(a)
	  vec.selfAdd(b.add(c).selfMult(2))
	  vec.selfAdd(d)
	  vec.selfMult(1/6)
	  return vec
	}

	var positionVec = Vector(0, 0)
	var velocityVec = Vector(0, 0)

	function evaluate(initial, t, dt, d) {
	  var state = {}

	  state.position = positionVec.setv(d.dx).selfMult(dt).selfAdd(initial.position)
	  state.velocity = velocityVec.setv(d.dv).selfMult(dt).selfAdd(initial.velocity)

	  var next = {
	    dx: state.velocity.clone(),
	    dv: initial.accelerate(state, t).clone()
	  }
	  return next
	}

	var der = { dx: Vector(0, 0), dv: Vector(0, 0) }
	function integrate(state, t, dt) {
	    var a = evaluate( state, t, 0, der )
	    var b = evaluate( state, t, dt*0.5, a )
	    var c = evaluate( state, t, dt*0.5, b )
	    var d = evaluate( state, t, dt, c )

	    var dxdt = increment(a.dx,b.dx,c.dx,d.dx)
	      , dvdt = increment(a.dv,b.dv,c.dv,d.dv)

	    state.position.selfAdd(dxdt.selfMult(dt));
	    state.velocity.selfAdd(dvdt.selfMult(dt));
	}

	var currentTime = Date.now() / 1000
	  , accumulator = 0
	  , t = 0
	  , dt = 0.015

	function simulate() {
	  raf(function() {
	    simulate()
	    var newTime = Date.now() / 1000
	    var frameTime = newTime - currentTime
	    currentTime = newTime

	    if(frameTime > 0.05)
	      frameTime = 0.05


	    accumulator += frameTime

	    var j = 0

	    while(accumulator >= dt) {
	      for(var i = 0 ; i < bodies.length ; i++) {
	        bodies[i].previousPosition = bodies[i].position.clone()
	        integrate(bodies[i], t, dt)
	      }
	      t += dt
	      accumulator -= dt
	    }

	    for(var i = 0 ; i < bodies.length ; i++) {
	      bodies[i].update(accumulator / dt)
	    }
	  }, 16)
	}
	simulate()

	module.exports.addBody = function(body) {
	  bodies.push(body)
	  return body
	}

	module.exports.removeBody = function(body) {
	  var index = bodies.indexOf(body)
	  if(index >= 0)
	    bodies.splice(index, 1)
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Vector

	function Vector(x, y) {
	  if(!(this instanceof Vector))
	    return new Vector(x, y)

	  if(typeof x.x !== 'undefined') {
	    this.x = x.x
	    this.y = x.y
	  } else {
	    this.x = x || 0
	    this.y = y || 0
	  }
	}

	Vector.prototype.equals = function(vec) {
	  return vec.x === this.x && vec.y === this.y
	}

	Vector.prototype.directionEqual = function(vec) {
	  return vec.x > 0 === this.x > 0 && this.y > 0 === vec.y > 0
	}

	Vector.prototype.dot = function (vec) {
	  return this.x * vec.x + this.y * vec.y;
	}

	Vector.prototype.negate = function() {
	  return Vector(this.x, this.y).mult(-1)
	}

	Vector.prototype.norm = function() {
	  return Math.sqrt(this.normsq())
	}

	Vector.prototype.clone = function() {
	  return Vector(this.x, this.y)
	}

	Vector.prototype.normsq = function() {
	  return this.x * this.x + this.y * this.y
	}

	Vector.prototype.normalize = function() {
	    var magnitude = this.norm()

	    if(magnitude === 0) {
	        return this
	    }

	    magnitude = 1 / magnitude

	    this.x *= magnitude
	    this.y *= magnitude

	    return this
	}

	Vector.prototype.mult = function(x, y) {
	  if(x instanceof Vector) {
	    return new Vector(x.x * this.x, x.y * this.y)
	  }
	  if(typeof y === 'undefined') { //scalar
	    return new Vector(x * this.x, x * this.y)
	  }
	  return new Vector(x * this.x, y * this.y)
	}

	Vector.prototype.selfMult = function(x, y) {
	  if(x instanceof Vector) {
	    this.x *= x.x
	    this.y *= x.y
	    return this
	  }
	  if(typeof y === 'undefined') { //scalar
	    this.x *= x
	    this.y *= x
	    return this
	  }
	  this.x *= x
	  this.y *= y
	  return this
	}

	Vector.prototype.selfAdd = function(x, y) {
	  if(typeof x.x !== 'undefined') {
	    this.x += x.x
	    this.y += x.y
	    return this
	  }
	  if(typeof y === 'undefined') { //scalar
	    this.x += x
	    this.y += x
	    return this
	  }
	  this.x += x
	  this.y += y
	  return this
	}

	Vector.prototype.selfSub = function(x, y) {
	  if(typeof x.x !== 'undefined') {
	    this.x -= x.x
	    this.y -= x.y
	    return this
	  }
	  if(typeof y === 'undefined') { //scalar
	    this.x -= x
	    this.y -= x
	    return this
	  }
	  this.x -= x
	  this.y -= y

	  return this
	}

	Vector.prototype.sub = function(x, y) {

	  if(typeof x.x !== 'undefined')
	    return new Vector(this.x - x.x, this.y - x.y)

	  if(typeof y === 'undefined')//scalar
	    return new Vector(this.x - x, this.y - x)

	  return new Vector(this.x - x, this.y - y)
	}

	Vector.prototype.add = function(x, y) {
	  if(typeof x.x !== 'undefined') {
	    return new Vector(this.x + x.x, this.y + x.y)
	  }
	  if(typeof y === 'undefined') { //scalar
	    return new Vector(this.x + x, this.y + x)
	  }
	  return new Vector(this.x + x, this.y + y)
	}

	Vector.prototype.setv = function(vec) {
	  this.x = vec.x
	  this.y = vec.y
	  return this
	}

	Vector.prototype.lerp = function(vector, alpha) {
	  return this.mult(1-alpha).add(vector.mult(alpha))
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var prefixes = ['Webkit', 'Moz', 'Ms', 'ms']
	var calls = []
	var transformProp
	var raf = __webpack_require__(20)
	var floatEqual = __webpack_require__(17).floatEqual

	function loop() {
	  raf(function() {
	    loop()
	    for(var i = calls.length - 1; i >= 0; i--) {
	      calls[i]()
	    }
	  })
	}
	loop()

	function prefixed(prop) {
	  var prefixed
	  for (var i = 0; i < prefixes.length; i++) {
	    prefixed = prefixes[i] + prop[0].toUpperCase() + prop.slice(1)
	    if(typeof document.body.style[prefixed] !== 'undefined')
	      return prefixed
	  }
	  return prop
	}

	var transformsProperties = ['translate', 'translateX', 'translateY', 'translateZ',
	                  'rotate', 'rotateX', 'rotateY', 'rotate3d', 'rotateZ',
	                  'scale', 'scaleX', 'scaleY', 'scaleZ',
	                  'skew', 'skewX', 'skewY', 'skewZ']

	module.exports = Renderer

	function Renderer(els) {
	  if(typeof els.length === 'undefined')
	    els = [els]
	  this.els = els
	  this.styles = {}
	  this.invisibleEls = []
	  this.changed = false
	  calls.push(this.render.bind(this))
	}

	Renderer.prototype.render = function() {
	  if(!this.changed) return

	  if(!transformProp)
	    transformProp = prefixed('transform')
	  var transformsToApply
	    , els = this.els
	    , position = this.currentPosition
	    , styles = this.styles
	    , value
	    , props = Object.keys(styles)
	    , elsLength = els.length
	    , propsLength = props.length
	    , i, j
	    , transforms

	  this.changed = false

	  for(i = 0 ; i < elsLength ; i++) {
	    transformsToApply = []
	    if(this.visibleFn && !this.visibleFn(position, i)) {
	      if(!this.invisibleEls[i]) {
	        els[i].style.webkitTransform = 'translate3d(0, -99999px, 0)'
	      }
	      this.invisibleEls[i] = true
	    } else {
	      this.invisibleEls[i] = false
	      for (j = 0; j < propsLength; j++) {
	        prop = props[j]
	        value = (typeof styles[prop] === 'function') ? styles[prop](position.x, position.y, i) : styles[prop]

	        if(transformsProperties.indexOf(prop) !== -1) {
	          transformsToApply.push(prop + '(' + value + ')')
	        } else {
	          els[i].style[prop] = value
	        }
	      }
	      transforms = transformsToApply.join(' ')
	      transforms += ' translateZ(0)'
	      els[i].style[transformProp] = transforms
	    }
	  }
	}

	Renderer.prototype.style = function(property, value) {
	  if(typeof property === 'object') {
	    for(prop in property) {
	      if(property.hasOwnProperty(prop)) {
	        this.style(prop, property[prop])
	      }
	    }
	  }
	  this.styles[property] = value
	  return this
	}

	Renderer.prototype.visible = function(isVisible) {
	  this.visibleFn = isVisible
	  return this
	}

	Renderer.prototype.update = function(x, y) {
	  if(this.currentPosition) {
	    var equal = floatEqual(x, this.currentPosition.x) && floatEqual(y, this.currentPosition.y)
	    this.changed = this.changed || !equal
	  } else {
	    this.changed = true
	  }
	  this.currentPosition = { x: x, y: y }
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Body = __webpack_require__(18)
	var simulation = __webpack_require__(5)
	var Boundary = __webpack_require__(14)
	var Animation = __webpack_require__(19)

	var Spring = module.exports = Animation({
	  defaultOptions: {
	    tension: 100,
	    damping: 10
	  },
	  onStart: function(velocity, from, to, opts, update) {
	    var body = this._body = new Body(velocity, from, {
	      accelerate: function(state, t) {
	        return state.position.selfSub(to)
	          .selfMult(-opts.tension)
	          .selfSub(state.velocity.mult(opts.damping))
	      },
	      update: function(position, velocity) {
	        if(body.atRest() && body.atPosition(to)) {
	          update.done(to, { x: 0, y: 0 })
	        } else {
	          update.state(position, velocity)
	        }
	      }
	    })
	    simulation.addBody(this._body)
	  },
	  onEnd: function() {
	    simulation.removeBody(this._body)
	  }
	})


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var defaults = __webpack_require__(15)
	  , Vector = __webpack_require__(6)
	  , simulation = __webpack_require__(5)
	  , Body = __webpack_require__(18)

	var defaultOptions = {
	  tension: 100,
	  damping: 10,
	  seperation: 0,
	  offset: { x: 0, y: 0 }
	}

	module.exports = AttachSpring
	function AttachSpring(phys, attachment, opts) {
	  this._phys = phys
	  this._opts = defaults({}, opts || {}, defaultOptions)
	  this._position = phys.position()
	  this._velocity = phys.velocity()
	  if(typeof attachment.position === 'function')
	    this._attachment = attachment.position.bind(attachment)
	  else
	    this._attachment = attachment
	}

	AttachSpring.prototype.position = function(x, y) {
	  if(arguments.length === 0) {
	      return this._position
	  }
	  if(this._body)
	    this._body.position = this._position = Vector(x, y)
	  else
	    this._position = Vector(x, y)
	}

	AttachSpring.prototype.velocity = function(x, y) {
	  if(this._body)
	    this._body.velocity = this._velocity = Vector(x, y)
	  else
	    this._velocity = Vector(x, y)
	}

	AttachSpring.prototype.cancel = function(x, y) {
	  this._running = false
	  simulation.removeBody(this._body)
	}

	AttachSpring.prototype.stop = function(x, y) {
	  this._running = false
	  simulation.removeBody(this._body)
	}

	AttachSpring.prototype.running = function(x, y) {
	  return this._running
	}

	window.unit = 0
	AttachSpring.prototype.start = function() {
	  var attachment = this._attachment
	    , opts = this._opts
	    , phys = this._phys
	    , velocity = this._velocity
	    , position = this._position
	    , that = this

	  phys._startAnimation(this)

	  this._running = true

	  var body = this._body = Body(velocity, position, {
	    accelerate: function(state, t) {
	      var distVec = state.position.selfSub(attachment())
	        , dist = distVec.norm()
	        , distNorm = distVec.normalize()

	      if(distNorm.x === 0 && distNorm.y === 0) {
	        distNorm.x = distNorm.y = 1
	        distNorm.normalize()
	      }
	      var accel = distNorm
	        .selfMult(-opts.tension)
	        .selfMult(dist - opts.seperation)
	        .selfSub(state.velocity.selfMult(opts.damping))

	      return accel
	    },
	    update: function(position, velocity) {
	      that._position = body.position
	      that._velocity = body.velocity
	      if(opts.offset) {
	        var pos = position.add(opts.offset)
	        phys.position(pos)
	      } else {
	        phys.position(position)
	      }
	      phys.velocity(velocity)
	    }
	  })
	  simulation.addBody(body)
	  return this
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Body = __webpack_require__(18)
	var simulation = __webpack_require__(5)
	var Boundary = __webpack_require__(14)
	var Animation = __webpack_require__(19)

	var Decelerate = module.exports = Animation({
	  defaultOptions: {
	    deceleration: 400
	  },
	  onStart: function(velocity, from, to, opts, update, done) {
	    var direction = to.sub(from).normalize()
	      , deceleration = direction.mult(opts.deceleration).negate()
	      , boundary = Boundary({
	      left: Math.min(to.x, from.x),
	      right: Math.max(to.x, from.x),
	      top: Math.min(to.y, from.y),
	      bottom: Math.max(to.y, from.y)
	    })

	    velocity = direction.mult(velocity.norm())

	    this._body = Body(velocity, from, {
	      accelerate: function(s, t) {
	        return deceleration
	      },
	      update: function(position, velocity) {
	        if(!direction.directionEqual(velocity)) {
	          update.cancel(position, { x: 0, y: 0 })
	        } else if(boundary.contains(position)) {
	          update.state(position, velocity)
	        } else {
	          update.done(to, velocity)
	        }
	      }
	    })
	    simulation.addBody(this._body)
	  },

	  onEnd: function() {
	    simulation.removeBody(this._body)
	  }
	})


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Body = __webpack_require__(18)
	var simulation = __webpack_require__(5)
	var Boundary = __webpack_require__(14)
	var Animation = __webpack_require__(19)
	var Vector = __webpack_require__(6)
	var height = __webpack_require__(17).height

	var Accelerate = module.exports = Animation({
	  defaultOptions: {
	    acceleration: 1000,
	    bounce: false,
	    minBounceDistance: 5,
	    damping: 0.2,
	    restitution: 0.2
	  },

	  onStart: function(velocity, from, to, opts, update, done) {
	    var direction = to.sub(from).normalize()
	    if(typeof opts.acceleration === 'number') {
	      var acceleration = direction.mult(opts.acceleration)
	    } else {
	      var acceleration = Vector(opts.acceleration)
	    }
	    var bounceAcceleration = direction.mult(opts.bounceAcceleration || acceleration)
	      , bouncing = false
	      , boundary = Boundary({
	          left: (to.x > from.x) ? -Infinity : to.x,
	          right: (to.x > from.x) ? to.x : Infinity,
	          top: (to.y > from.y) ? -Infinity : to.y,
	          bottom: (to.y > from.y) ? to.y : Infinity
	        })

	    if(to.sub(from).norm() < .001 && velocity.norm() < .001) {
	      return update.done(to, velocity)
	    }

	    var restitution = opts.restitution || opts.damping // TODO remove damping

	    var body = this._body = Body(velocity, from, {
	      accelerate: function(s, t) {
	        if(bouncing)
	          return bounceAcceleration
	        else
	          return acceleration
	      },
	      update: function(position, velocity) {
	        if(boundary.contains(position)) {
	          update.state(position, velocity)
	        } else {
	          if(opts.bounce &&
	             Math.abs(height(bounceAcceleration.norm(), velocity.norm() * restitution, 0)) > opts.minBounceDistance) {
	              bouncing = true
	              body.position = Vector(to)
	              body.velocity.selfMult(-opts.damping)
	              update.state(to, body.velocity)
	          } else {
	            update.done(to, velocity)
	          }
	        }
	      }
	    })
	    simulation.addBody(this._body)
	  },
	  onEnd: function() {
	    simulation.removeBody(this._body)
	  }
	})


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(21)
	  , defaults = __webpack_require__(15)

	var defaultOpts = {}

	module.exports = Drag

	function Drag(phys, opts, start) {
	  var handles

	  this._phys = phys
	  if(typeof opts === 'function') {
	    this._startFn = opts
	    opts = {}
	  } else {
	    this._startFn = start
	  }

	  this._opts = defaults({}, defaultOpts, opts)

	  //Warn of deprecated option
	  if(this._opts.boundry){
	    console.warn("Warning: Misspelled option 'boundry' is being deprecated. Please use 'boundary' instead.");
	    this._opts.boundary = this._opts.boundry;
	    delete this._opts.boundry;
	  }

	  handles = this._opts.handle


	  if(handles && !handles.length) {
	    handles = [handles]
	  } else if(handles && handles.length) {
	    handles = [].slice.call(handles)
	  } else {
	    handles = phys.els
	  }
	  handles.forEach(this._setupHandle, this)
	}

	Emitter(Drag.prototype)

	Drag.prototype.moved = function() {
	  return (this._interaction.distance() > 10)
	}

	Drag.prototype._setupHandle = function(el) {
	  //start events
	  el.addEventListener('touchstart', this._start.bind(this))
	  el.addEventListener('mousedown', this._start.bind(this))

	  //move events
	  el.addEventListener('touchmove', this._move.bind(this))
	  //apply the move event to the window, so it keeps moving,
	  //event if the handle doesn't
	  window.addEventListener('mousemove', this._move.bind(this))

	  //end events
	  el.addEventListener('touchend', this._end.bind(this))
	  window.addEventListener('mouseup', this._end.bind(this))
	}

	Drag.prototype._start = function(evt) {
	  this._startTime = Date.now()
	  evt.preventDefault()
	  this._mousedown = true
	  this._interaction = this._phys.interact({
	    boundary: this._opts.boundary,
	    damping: this._opts.damping,
	    direction: this._opts.direction
	  })
	  var promise = this._interaction.start(evt)
	  this._startFn && this._startFn(promise)
	  this.emit('start', evt)
	}

	Drag.prototype._move = function(evt) {
	  if(!this._mousedown) return
	  evt.preventDefault()

	  this._interaction.update(evt)
	  this.emit('move', evt)
	}

	Drag.prototype._end = function(evt) {
	  if(!this._mousedown) return
	  evt.preventDefault()

	  this._mousedown = false

	  this._interaction.end()
	  this.emit('end', evt)
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var defaults = __webpack_require__(15)
	var Velocity = __webpack_require__(22)
	var Vector = __webpack_require__(6)
	var Promise = __webpack_require__(16)
	var util = __webpack_require__(17)
	var Boundary = __webpack_require__(14)

	module.exports = Interact

	var defaultOpts = {
	  boundary: Boundary({}),
	  damping: 0,
	  direction: 'both'
	}

	function Interact(phys, opts) {
	  this._phys = phys
	  this._running = false
	  this._opts = defaults({}, opts, defaultOpts)

	  //Warn of deprecated option
	  if(this._opts.boundry){
	    console.warn("Warning: Misspelled option 'boundry' is being deprecated. Please use 'boundary' instead.");
	    this._opts.boundary = this._opts.boundry;
	    delete this._opts.boundry;
	  }
	}

	Interact.prototype.position = function(x, y) {
	  var direction = this._opts.direction
	    , boundary = this._opts.boundary
	    , pos = Vector(x, y)

	  if(direction !== 'both' && direction !== 'horizontal') pos.x = 0
	  if(direction !== 'both' && direction !== 'vertical') pos.y = 0

	  this._veloX.updatePosition(pos.x)
	  this._veloY.updatePosition(pos.y)

	  this._phys.velocity(this._veloX.getVelocity(), this._veloY.getVelocity())

	  pos = boundary.applyDamping(pos, this._opts.damping)

	  this._phys.position(pos)

	  return this
	}

	Interact.prototype.update = function(evt) {
	  //for jquery and hammer.js
	  evt = evt.originalEvent || evt
	  var position = util.eventVector(evt).sub(this._startPosition)

	  this.position(position)
	  return this
	}

	Interact.prototype.start = function(evt) {
	  var that = this
	    , evtPosition = evt && util.eventVector(evt)
	    , position = this._phys.position()

	  this._running = true
	  this._phys._startAnimation(this)
	  this._startPosition = evt && evtPosition.sub(position)
	  this._initialPosition = this._phys.position()

	  this._veloX = new Velocity()
	  this._veloY = new Velocity()

	  this.position(position)

	  return this._ended = new Promise(function(res, rej) {
	    that._resolve = res
	    that._reject = rej
	  })
	}

	Interact.prototype.distance = function() {
	  return this._initialPosition.sub(this._phys.position()).norm()
	}

	Interact.prototype.cancel = function() {
	  this._running = false
	  this._reject(new Error('Canceled the interaction'))
	}

	Interact.prototype.running = function() {
	  return this._running
	}

	Interact.prototype.end = function() {
	  this._phys.velocity(this._veloX.getVelocity(), this._veloY.getVelocity())
	  this._resolve({ velocity: this._phys.velocity(), position: this._phys.position() })
	  return this._ended
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Vector = __webpack_require__(6)
	module.exports = Boundary

	function pointBetween(p, p1, p2) {
	  return p >= p1 && p <= p2
	}

	function yIntersect(y, point, direction) {
	  var factor = (y - point.y) / direction.y
	  return point.add(direction.clone().mult(factor))
	}

	function xIntersect(x, point, direction) {
	  var factor = (x - point.x) / direction.x
	  return point.add(direction.clone().mult(factor))
	}

	Boundary.prototype.applyDamping = function(position, damping) {
	  var x = position.x
	    , y = position.y

	  if(x < this.left)
	    x = this.left - (this.left - x) * damping

	  if(y < this.top)
	    y = this.top - (this.top - y) * damping

	  if(x > this.right)
	    x = this.right - (this.right - x) * damping

	  if(y > this.bottom)
	    y = this.bottom - (this.bottom - y) * damping

	  return Vector(x, y)
	}

	function Boundary(boundary) {
	  if(!(this instanceof Boundary))
	    return new Boundary(boundary)

	  this.left = (typeof boundary.left !== 'undefined') ? boundary.left : -Infinity
	  this.right = (typeof boundary.right !== 'undefined') ? boundary.right : Infinity
	  this.top = (typeof boundary.top !== 'undefined') ? boundary.top : -Infinity
	  this.bottom = (typeof boundary.bottom !== 'undefined') ? boundary.bottom : Infinity
	}

	Boundary.prototype.contains = function(pt) {
	  return pt.x >= this.left &&
	         pt.x <= this.right &&
	         pt.y >= this.top &&
	         pt.y <= this.bottom
	}

	Boundary.prototype.nearestIntersect = function(point, velocity) {
	  var direction = Vector(velocity).normalize()
	    , point = Vector(point)
	    , isect
	    , distX
	    , distY

	  if(velocity.y < 0)
	    isect = yIntersect(this.top, point, direction)
	  if(velocity.y > 0)
	    isect = yIntersect(this.bottom, point, direction)

	  if(isect && pointBetween(isect.x, this.left, this.right))
	    return isect

	  if(velocity.x < 0)
	    isect = xIntersect(this.left, point, direction)
	  if(velocity.x > 0)
	    isect = xIntersect(this.right, point, direction)

	  if(isect && pointBetween(isect.y, this.top, this.bottom))
	    return isect

	  //if the velocity is zero, or it didn't intersect any lines (outside the box)
	  //just send it it the nearest boundary
	  distX = (Math.abs(point.x - this.left) < Math.abs(point.x - this.right)) ? this.left : this.right
	  distY = (Math.abs(point.y - this.top) < Math.abs(point.y - this.bottom)) ? this.top : this.bottom

	  return (distX < distY) ? Vector(distX, point.y) : Vector(point.x, distY)
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var keys = __webpack_require__(24),
	    objectTypes = __webpack_require__(25);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object for all destination properties that resolve to `undefined`. Once a
	 * property is set, additional defaults of the same property will be ignored.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Objects
	 * @param {Object} object The destination object.
	 * @param {...Object} [source] The source objects.
	 * @param- {Object} [guard] Allows working with `_.reduce` without using its
	 *  `key` and `object` arguments as sources.
	 * @returns {Object} Returns the destination object.
	 * @example
	 *
	 * var object = { 'name': 'barney' };
	 * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
	 * // => { 'name': 'barney', 'employer': 'slate' }
	 */
	var defaults = function(object, source, guard) {
	  var index, iterable = object, result = iterable;
	  if (!iterable) return result;
	  var args = arguments,
	      argsIndex = 0,
	      argsLength = typeof guard == 'number' ? 2 : args.length;
	  while (++argsIndex < argsLength) {
	    iterable = args[argsIndex];
	    if (iterable && objectTypes[typeof iterable]) {
	    var ownIndex = -1,
	        ownProps = objectTypes[typeof iterable] && keys(iterable),
	        length = ownProps ? ownProps.length : 0;

	    while (++ownIndex < length) {
	      index = ownProps[ownIndex];
	      if (typeof result[index] == 'undefined') result[index] = iterable[index];
	    }
	    }
	  }
	  return result
	};

	module.exports = defaults;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//This file contains then/promise specific extensions to the core promise API

	var Promise = __webpack_require__(23)
	var asap = __webpack_require__(26)

	module.exports = Promise

	/* Static Functions */

	function ValuePromise(value) {
	  this.then = function (onFulfilled) {
	    if (typeof onFulfilled !== 'function') return this
	    return new Promise(function (resolve, reject) {
	      asap(function () {
	        try {
	          resolve(onFulfilled(value))
	        } catch (ex) {
	          reject(ex);
	        }
	      })
	    })
	  }
	}
	ValuePromise.prototype = Object.create(Promise.prototype)

	var TRUE = new ValuePromise(true)
	var FALSE = new ValuePromise(false)
	var NULL = new ValuePromise(null)
	var UNDEFINED = new ValuePromise(undefined)
	var ZERO = new ValuePromise(0)
	var EMPTYSTRING = new ValuePromise('')

	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value

	  if (value === null) return NULL
	  if (value === undefined) return UNDEFINED
	  if (value === true) return TRUE
	  if (value === false) return FALSE
	  if (value === 0) return ZERO
	  if (value === '') return EMPTYSTRING

	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value))
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex)
	      })
	    }
	  }

	  return new ValuePromise(value)
	}

	Promise.from = Promise.cast = function (value) {
	  var err = new Error('Promise.from and Promise.cast are deprecated, use Promise.resolve instead')
	  err.name = 'Warning'
	  console.warn(err.stack)
	  return Promise.resolve(value)
	}

	Promise.denodeify = function (fn, argumentCount) {
	  argumentCount = argumentCount || Infinity
	  return function () {
	    var self = this
	    var args = Array.prototype.slice.call(arguments)
	    return new Promise(function (resolve, reject) {
	      while (args.length && args.length > argumentCount) {
	        args.pop()
	      }
	      args.push(function (err, res) {
	        if (err) reject(err)
	        else resolve(res)
	      })
	      fn.apply(self, args)
	    })
	  }
	}
	Promise.nodeify = function (fn) {
	  return function () {
	    var args = Array.prototype.slice.call(arguments)
	    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
	    try {
	      return fn.apply(this, arguments).nodeify(callback)
	    } catch (ex) {
	      if (callback === null || typeof callback == 'undefined') {
	        return new Promise(function (resolve, reject) { reject(ex) })
	      } else {
	        asap(function () {
	          callback(ex)
	        })
	      }
	    }
	  }
	}

	Promise.all = function () {
	  var calledWithArray = arguments.length === 1 && Array.isArray(arguments[0])
	  var args = Array.prototype.slice.call(calledWithArray ? arguments[0] : arguments)

	  if (!calledWithArray) {
	    var err = new Error('Promise.all should be called with a single array, calling it with multiple arguments is deprecated')
	    err.name = 'Warning'
	    console.warn(err.stack)
	  }

	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([])
	    var remaining = args.length
	    function res(i, val) {
	      try {
	        if (val && (typeof val === 'object' || typeof val === 'function')) {
	          var then = val.then
	          if (typeof then === 'function') {
	            then.call(val, function (val) { res(i, val) }, reject)
	            return
	          }
	        }
	        args[i] = val
	        if (--remaining === 0) {
	          resolve(args);
	        }
	      } catch (ex) {
	        reject(ex)
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i])
	    }
	  })
	}

	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) { 
	    reject(value);
	  });
	}

	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) { 
	    values.forEach(function(value){
	      Promise.resolve(value).then(resolve, reject);
	    })
	  });
	}

	/* Prototype Methods */

	Promise.prototype.done = function (onFulfilled, onRejected) {
	  var self = arguments.length ? this.then.apply(this, arguments) : this
	  self.then(null, function (err) {
	    asap(function () {
	      throw err
	    })
	  })
	}

	Promise.prototype.nodeify = function (callback) {
	  if (typeof callback != 'function') return this

	  this.then(function (value) {
	    asap(function () {
	      callback(null, value)
	    })
	  }, function (err) {
	    asap(function () {
	      callback(err)
	    })
	  })
	}

	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Vector = __webpack_require__(6)

	function vertex(a, b) {
	  return -b / (2 * a)
	}

	function height(a, b, c) {
	  return parabola(a, b, c, vertex(a, b))
	}

	function parabola(a, b, c, x) {
	  return a * x * x + b * x + c
	}

	function eventVector(evt) {
	  return Vector({
	    x: evt.touches && evt.touches[0].pageX || evt.pageX,
	    y: evt.touches && evt.touches[0].pageY || evt.pageY
	  })
	}

	function floatEqual(a, b) {
	  return Math.abs(a - b) < Number.EPSILON
	}

	module.exports.height = height
	module.exports.eventVector = eventVector
	module.exports.floatEqual = floatEqual


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Vector = __webpack_require__(6)

	module.exports = Body

	function Body(vel, from, fns) {
	  if(!(this instanceof Body)) return new Body(vel, from, fns)

	  this.previousPosition = this.position = Vector(from)
	  this.velocity = Vector(vel)
	  this._fns = fns
	}

	Body.prototype.update = function(alpha) {
	  var pos = this.previousPosition.clone().lerp(this.position, alpha)
	  this._fns.update(pos, this.velocity)
	}

	Body.prototype.accelerate = function(state, t) {
	  return this._fns.accelerate(state, t)
	}

	Body.prototype.atRest = function() {
	  return this.velocity.norm() < .01
	}

	Body.prototype.atPosition = function(pos) {
	  //return whether the distance between this.position and pos is less than .1
	  return this.position.sub(Vector(pos)).norm() < .01
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var defaults = __webpack_require__(15)
	  , Promise = window.Promise || __webpack_require__(16)
	  , Boundary = __webpack_require__(14)
	  , Vector = __webpack_require__(6)
	  , Emitter = __webpack_require__(21)

	var proto = {
	  to: function(x, y) {
	    if(x instanceof Boundary)
	      this._to = x
	    else
	      this._to = Vector(x, y)
	    return this
	  },

	  velocity: function(x, y) {
	    this._velocity = Vector(x, y)
	    return this
	  },

	  from: function(x, y) {
	    this._from = Vector(x, y)
	    return this
	  },

	  _updateState: function(position, velocity) {
	    this._phys.position(position)
	    this._phys.velocity(velocity)
	  },

	  cancel: function() {
	    this._onEnd()
	    this._running = false
	    this._reject()
	  },

	  running: function() {
	    return this._running || false
	  },

	  start: function() {
	    var that = this
	      , from = (this._from) ? this._from : this._phys.position()
	      , to = (this._to) ? this._to : this._phys.position()
	      , velocity = (this._velocity) ? this._velocity : this._phys.velocity()
	      , opts = defaults({}, this._opts || {}, this._defaultOpts)

	    var update = {
	      state: function(position, velocity) {
	        that._updateState(position, velocity)
	      },
	      done: function(position, velocity) {
	        that._updateState(position, velocity)
	        that._onEnd()
	        that._running = false
	        that._resolve({ position: position, velocity: velocity })
	      },
	      cancel: function(position, velocity) {
	        that._updateState(position, velocity)
	        that._onEnd()
	        that._running = false
	        that._reject()
	      }
	    }
	    this._phys._startAnimation(this)

	    this._running = true
	    if(to instanceof Boundary)
	      to = to.nearestIntersect(from, velocity)
	    this._onStart(velocity, from, to, opts, update)

	    return that._ended
	  }
	}

	function Animation(callbacks) {
	  var animation = function(phys, opts) {
	    var that = this
	    this._opts = opts
	    this._phys = phys
	    this._onStart = callbacks.onStart
	    this._onEnd = callbacks.onEnd
	    this._defaultOpts = callbacks.defaultOptions

	    this._ended = new Promise(function(resolve, reject) {
	      that._resolve = resolve
	      that._reject = reject
	    })

	    this.start = this.start.bind(this)
	  }

	  Emitter(animation.prototype)
	  animation.prototype = proto

	  return animation
	}





	module.exports = Animation


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(27)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
	  , isNative = true

	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  isNative = false

	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}

	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  if(!isNative) {
	    return raf.call(global, fn)
	  }
	  return raf.call(global, function() {
	    try{
	      fn.apply(this, arguments)
	    } catch(e) {
	      setTimeout(function() { throw e }, 0)
	    }
	  })
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Velocity

	function Velocity() {
	  this.positionQueue = []
	  this.timeQueue = []
	}

	Velocity.prototype.reset = function() {
	  this.positionQueue.splice(0)
	  this.timeQueue.splice(0)
	}

	Velocity.prototype.pruneQueue = function(ms) {
	  //pull old values off of the queue
	  while(this.timeQueue.length && this.timeQueue[0] < (Date.now() - ms)) {
	    this.timeQueue.shift()
	    this.positionQueue.shift()
	  }
	}

	Velocity.prototype.updatePosition = function(position) {
	  this.positionQueue.push(position)
	  this.timeQueue.push(Date.now())
	  this.pruneQueue(50)
	}

	Velocity.prototype.getVelocity = function() {
	  this.pruneQueue(1000)
	  var length = this.timeQueue.length
	  if(length < 2) return 0

	  var distance = this.positionQueue[length-1] - this.positionQueue[0]
	    , time = (this.timeQueue[length-1] - this.timeQueue[0]) / 1000

	  return distance / time
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var asap = __webpack_require__(26)

	module.exports = Promise
	function Promise(fn) {
	  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new')
	  if (typeof fn !== 'function') throw new TypeError('not a function')
	  var state = null
	  var value = null
	  var deferreds = []
	  var self = this

	  this.then = function(onFulfilled, onRejected) {
	    return new Promise(function(resolve, reject) {
	      handle(new Handler(onFulfilled, onRejected, resolve, reject))
	    })
	  }

	  function handle(deferred) {
	    if (state === null) {
	      deferreds.push(deferred)
	      return
	    }
	    asap(function() {
	      var cb = state ? deferred.onFulfilled : deferred.onRejected
	      if (cb === null) {
	        (state ? deferred.resolve : deferred.reject)(value)
	        return
	      }
	      var ret
	      try {
	        ret = cb(value)
	      }
	      catch (e) {
	        deferred.reject(e)
	        return
	      }
	      deferred.resolve(ret)
	    })
	  }

	  function resolve(newValue) {
	    try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.')
	      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
	        var then = newValue.then
	        if (typeof then === 'function') {
	          doResolve(then.bind(newValue), resolve, reject)
	          return
	        }
	      }
	      state = true
	      value = newValue
	      finale()
	    } catch (e) { reject(e) }
	  }

	  function reject(newValue) {
	    state = false
	    value = newValue
	    finale()
	  }

	  function finale() {
	    for (var i = 0, len = deferreds.length; i < len; i++)
	      handle(deferreds[i])
	    deferreds = null
	  }

	  doResolve(fn, resolve, reject)
	}


	function Handler(onFulfilled, onRejected, resolve, reject){
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null
	  this.resolve = resolve
	  this.reject = reject
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, onFulfilled, onRejected) {
	  var done = false;
	  try {
	    fn(function (value) {
	      if (done) return
	      done = true
	      onFulfilled(value)
	    }, function (reason) {
	      if (done) return
	      done = true
	      onRejected(reason)
	    })
	  } catch (ex) {
	    if (done) return
	    done = true
	    onRejected(ex)
	  }
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(28),
	    isObject = __webpack_require__(29),
	    shimKeys = __webpack_require__(30);

	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	/**
	 * Creates an array composed of the own enumerable property names of an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property names.
	 * @example
	 *
	 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  if (!isObject(object)) {
	    return [];
	  }
	  return nativeKeys(object);
	};

	module.exports = keys;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to determine if values are of the language type Object */
	var objectTypes = {
	  'boolean': false,
	  'function': true,
	  'object': true,
	  'number': false,
	  'string': false,
	  'undefined': false
	};

	module.exports = objectTypes;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, setImmediate) {
	// Use the fastest possible means to execute a task in a future turn
	// of the event loop.

	// linked list of tasks (single, with head node)
	var head = {task: void 0, next: null};
	var tail = head;
	var flushing = false;
	var requestFlush = void 0;
	var isNodeJS = false;

	function flush() {
	    /* jshint loopfunc: true */

	    while (head.next) {
	        head = head.next;
	        var task = head.task;
	        head.task = void 0;
	        var domain = head.domain;

	        if (domain) {
	            head.domain = void 0;
	            domain.enter();
	        }

	        try {
	            task();

	        } catch (e) {
	            if (isNodeJS) {
	                // In node, uncaught exceptions are considered fatal errors.
	                // Re-throw them synchronously to interrupt flushing!

	                // Ensure continuation if the uncaught exception is suppressed
	                // listening "uncaughtException" events (as domains does).
	                // Continue in next event to avoid tick recursion.
	                if (domain) {
	                    domain.exit();
	                }
	                setTimeout(flush, 0);
	                if (domain) {
	                    domain.enter();
	                }

	                throw e;

	            } else {
	                // In browsers, uncaught exceptions are not fatal.
	                // Re-throw them asynchronously to avoid slow-downs.
	                setTimeout(function() {
	                   throw e;
	                }, 0);
	            }
	        }

	        if (domain) {
	            domain.exit();
	        }
	    }

	    flushing = false;
	}

	if (typeof process !== "undefined" && process.nextTick) {
	    // Node.js before 0.9. Note that some fake-Node environments, like the
	    // Mocha test runner, introduce a `process` global without a `nextTick`.
	    isNodeJS = true;

	    requestFlush = function () {
	        process.nextTick(flush);
	    };

	} else if (typeof setImmediate === "function") {
	    // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
	    if (typeof window !== "undefined") {
	        requestFlush = setImmediate.bind(window, flush);
	    } else {
	        requestFlush = function () {
	            setImmediate(flush);
	        };
	    }

	} else if (typeof MessageChannel !== "undefined") {
	    // modern browsers
	    // http://www.nonblocking.io/2011/06/windownexttick.html
	    var channel = new MessageChannel();
	    channel.port1.onmessage = flush;
	    requestFlush = function () {
	        channel.port2.postMessage(0);
	    };

	} else {
	    // old browsers
	    requestFlush = function () {
	        setTimeout(flush, 0);
	    };
	}

	function asap(task) {
	    tail = tail.next = {
	        task: task,
	        domain: isNodeJS && process.domain,
	        next: null
	    };

	    if (!flushing) {
	        flushing = true;
	        requestFlush();
	    }
	};

	module.exports = asap;


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31), __webpack_require__(32).setImmediate))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.6.3
	(function() {
	  var getNanoSeconds, hrtime, loadTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(this);

	/*
	//@ sourceMappingURL=performance-now.map
	*/

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(25);

	/**
	 * Checks if `value` is the language type of Object.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // check if the value is the ECMAScript language type of Object
	  // http://es5.github.io/#x8
	  // and avoid a V8 bug
	  // http://code.google.com/p/v8/issues/detail?id=2291
	  return !!(value && objectTypes[typeof value]);
	}

	module.exports = isObject;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(25);

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Native method shortcuts */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which produces an array of the
	 * given object's own enumerable property names.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property names.
	 */
	var shimKeys = function(object) {
	  var index, iterable = object, result = [];
	  if (!iterable) return result;
	  if (!(objectTypes[typeof object])) return result;
	    for (index in iterable) {
	      if (hasOwnProperty.call(iterable, index)) {
	        result.push(index);
	      }
	    }
	  return result
	};

	module.exports = shimKeys;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    draining = true;
	    var currentQueue;
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        var i = -1;
	        while (++i < len) {
	            currentQueue[i]();
	        }
	        len = queue.length;
	    }
	    draining = false;
	}
	process.nextTick = function (fun) {
	    queue.push(fun);
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(31).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32).setImmediate, __webpack_require__(32).clearImmediate))

/***/ },
/* 33 */,
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {/*! 
		:: mo · js :: motion graphics toolbelt for the web
		Oleg Solomka @LegoMushroom 2015 MIT
		0.114.4 
	*/

	(function(f){
	if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.yes = f()}})(function(){var define,module,exports;return (function e(t,n,r){
	function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	(function (global){
	var BezierEasing, bezierEasing, h,
	  indexOf = [].indexOf || 
	function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	h = require('./h');

	/**
	 * Copyright (c) 2014 Gaëtan Renaudeau http://goo.gl/El3k7u
	 * Adopted from https://github.com/gre/bezier-easing
	 */

	BezierEasing = (function() {
	  function BezierEasing(o) {
	    this.vars();
	    return this.generate;
	  }

	  BezierEasing.prototype.vars = function() {
	    return this.generate = h.bind(this.generate, this);
	  };

	  BezierEasing.prototype.generate = function(mX1, mY1, mX2, mY2) {
	    var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, _precomputed, arg, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, j, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute, str;
	    if (arguments.length < 4) {
	      return this.error('Bezier function expects 4 arguments');
	    }
	    for (i = j = 0; j < 4; i = ++j) {
	      arg = arguments[i];
	      if (typeof arg !== "number" || isNaN(arg) || !isFinite(arg)) {
	        return this.error('Bezier function expects 4 arguments');
	      }
	    }
	    if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
	      return this.error('Bezier x values should be > 0 and < 1');
	    }
	    NEWTON_ITERATIONS = 4;
	    NEWTON_MIN_SLOPE = 0.001;
	    SUBDIVISION_PRECISION = 0.0000001;
	    SUBDIVISION_MAX_ITERATIONS = 10;
	    kSplineTableSize = 11;
	    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
	    float32ArraySupported = indexOf.call(global, 'Float32Array') >= 0;
	    A = function(aA1, aA2) {
	      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
	    };
	    B = function(aA1, aA2) {
	      return 3.0 * aA2 - 6.0 * aA1;
	    };
	    C = function(aA1) {
	      return 3.0 * aA1;
	    };
	    calcBezier = function(aT, aA1, aA2) {
	      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
	    };
	    getSlope = function(aT, aA1, aA2) {
	      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	    };
	    newtonRaphsonIterate = function(aX, aGuessT) {
	      var currentSlope, currentX;
	      i = 0;
	      while (i < NEWTON_ITERATIONS) {
	        currentSlope = getSlope(aGuessT, mX1, mX2);

	        /* istanbul ignore if */
	        if (currentSlope === 0.0) {
	          return aGuessT;
	        }
	        currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	        aGuessT -= currentX / currentSlope;
	        ++i;
	      }
	      return aGuessT;
	    };
	    calcSampleValues = function() {
	      i = 0;
	      while (i < kSplineTableSize) {
	        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	        ++i;
	      }
	    };

	    binarySubdivide = function(aX, aA, aB) {
	      var currentT, currentX, isBig;
	      currentX = void 0;
	      currentT = void 0;
	      i = 0;
	      while (true) {
	        currentT = aA + (aB - aA) / 2.0;
	        currentX = calcBezier(currentT, mX1, mX2) - aX;
	        if (currentX > 0.0) {
	          aB = currentT;
	        } else {
	          aA = currentT;
	        }
	        isBig = Math.abs(currentX) > SUBDIVISION_PRECISION;
	        if (!(isBig && ++i < SUBDIVISION_MAX_ITERATIONS)) {
	          break;
	        }
	      }
	      return currentT;
	    };
	    getTForX = function(aX) {
	      var currentSample, delta, dist, guessForT, initialSlope, intervalStart, lastSample;
	      intervalStart = 0.0;
	      currentSample = 1;
	      lastSample = kSplineTableSize - 1;
	      while (currentSample !== lastSample && mSampleValues[currentSample] <= aX) {
	        intervalStart += kSampleStepSize;
	        ++currentSample;
	      }
	      --currentSample;
	      delta = mSampleValues[currentSample + 1] - mSampleValues[currentSample];
	      dist = (aX - mSampleValues[currentSample]) / delta;
	      guessForT = intervalStart + dist * kSampleStepSize;
	      initialSlope = getSlope(guessForT, mX1, mX2);
	      if (initialSlope >= NEWTON_MIN_SLOPE) {
	        return newtonRaphsonIterate(aX, guessForT);
	      } else {

	        if (initialSlope === 0.0) {
	          return guessForT;
	        } else {
	          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
	        }
	      }
	    };
	    precompute = function() {
	      var _precomputed;
	      _precomputed = true;
	      if (mX1 !== mY1 || mX2 !== mY2) {
	        calcSampleValues();
	      }
	    };
	    mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
	    _precomputed = false;
	    f = function(aX) {
	      if (!_precomputed) {
	        precompute();
	      }
	      if (mX1 === mY1 && mX2 === mY2) {
	        return aX;
	      }
	      if (aX === 0) {
	        return 0;
	      }
	      if (aX === 1) {
	        return 1;
	      }
	      return calcBezier(getTForX(aX), mY1, mY2);
	    };
	    str = "bezier(" + [mX1, mY1, mX2, mY2] + ")";
	    f.toStr = function() {
	      return str;
	    };
	    return f;
	  };

	  BezierEasing.prototype.error = function(msg) {
	    return h.error(msg);
	  };

	  return BezierEasing;

	})();

	bezierEasing = new BezierEasing;

	module.exports = bezierEasing;

	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"./h":4}],2:[function(require,module,exports){

	var Burst, Swirl, Transit, Tween, bitsMap, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	bitsMap = require('./shapes/bitsMap');

	Tween = require('./tween/tween');

	Transit = require('./transit');

	Swirl = require('./swirl');

	h = require('./h');

	Burst = (function(superClass) {
	  extend(Burst, superClass);

	  function Burst() {
	    return Burst.__super__.constructor.apply(this, arguments);
	  }

	  Burst.prototype.skipProps = {
	    childOptions: 1
	  };

	  Burst.prototype.defaults = {
	    count: 5,
	    degree: 360,
	    opacity: 1,
	    randomAngle: 0,
	    randomRadius: 0,
	    x: 100,
	    y: 100,
	    shiftX: 0,
	    shiftY: 0,
	    easing: 'Linear.None',
	    radius: {
	      25: 75
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    angle: 0,
	    size: null,
	    sizeGap: 0,
	    duration: 600,
	    delay: 0,
	    onStart: null,
	    onComplete: null,
	    onCompleteChain: null,
	    onUpdate: null,
	    isResetAngles: false
	  };

	  Burst.prototype.childDefaults = {
	    radius: {
	      7: 0
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    angle: 0,
	    opacity: 1,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null,
	    points: 3,
	    duration: 500,
	    delay: 0,
	    repeat: 0,
	    yoyo: false,
	    easing: 'Linear.None',
	    type: 'circle',
	    fill: 'deeppink',
	    fillOpacity: 1,
	    isSwirl: false,
	    swirlSize: 10,
	    swirlFrequency: 3,
	    stroke: 'transparent',
	    strokeWidth: 0,
	    strokeOpacity: 1,
	    strokeDasharray: '',
	    strokeDashoffset: '',
	    strokeLinecap: null
	  };

	  Burst.prototype.optionsIntersection = {
	    radius: 1,
	    radiusX: 1,
	    radiusY: 1,
	    angle: 1,
	    opacity: 1,
	    onStart: 1,
	    onComplete: 1,
	    onUpdate: 1
	  };

	  Burst.prototype.run = function(o) {
	    var base, i, j, key, keys, len, len1, option, ref, ref1, tr;
	    if ((o != null) && Object.keys(o).length) {
	      if (o.count || ((ref = o.childOptions) != null ? ref.count : void 0)) {
	        this.h.warn('Sorry, count can not be changed on run');
	      }
	      this.extendDefaults(o);
	      keys = Object.keys(o.childOptions || {});
	      if ((base = this.o).childOptions == null) {
	        base.childOptions = {};
	      }
	      for (i = j = 0, len1 = keys.length; j < len1; i = ++j) {
	        key = keys[i];
	        this.o.childOptions[key] = o.childOptions[key];
	      }
	      len = this.transits.length;
	      while (len--) {
	        option = this.getOption(len);
	        if ((((ref1 = o.childOptions) != null ? ref1.angle : void 0) == null) && (o.angleShift == null)) {
	          option.angle = this.transits[len].o.angle;
	        } else if (!o.isResetAngles) {
	          option.angle = this.getBitAngle(option.angle, len);
	        }
	        this.transits[len].tuneNewOption(option, true);
	      }
	      this.tween.recalcDuration();
	    }
	    if (this.props.randomAngle || this.props.randomRadius) {
	      len = this.transits.length;
	      while (len--) {
	        tr = this.transits[len];
	        this.props.randomAngle && tr.setProp({
	          angleShift: this.generateRandomAngle()
	        });
	        this.props.randomRadius && tr.setProp({
	          radiusScale: this.generateRandomRadius()
	        });
	      }
	    }
	    return this.startTween();
	  };

	  Burst.prototype.createBit = function() {
	    var i, j, option, ref, results;
	    this.transits = [];
	    results = [];
	    for (i = j = 0, ref = this.props.count; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      option = this.getOption(i);
	      option.ctx = this.ctx;
	      option.index = i;
	      option.isDrawLess = option.isRunLess = option.isTweenLess = true;
	      this.props.randomAngle && (option.angleShift = this.generateRandomAngle());
	      this.props.randomRadius && (option.radiusScale = this.generateRandomRadius());
	      results.push(this.transits.push(new Swirl(option)));
	    }
	    return results;
	  };

	  Burst.prototype.addBitOptions = function() {
	    var aShift, i, j, len1, pointEnd, pointStart, points, ref, results, step, transit;
	    points = this.props.count;
	    this.degreeCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
	    step = this.props.degree / this.degreeCnt;
	    ref = this.transits;
	    results = [];
	    for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	      transit = ref[i];
	      aShift = transit.props.angleShift || 0;
	      pointStart = this.getSidePoint('start', i * step + aShift);
	      pointEnd = this.getSidePoint('end', i * step + aShift);
	      transit.o.x = this.getDeltaFromPoints('x', pointStart, pointEnd);
	      transit.o.y = this.getDeltaFromPoints('y', pointStart, pointEnd);
	      if (!this.props.isResetAngles) {
	        transit.o.angle = this.getBitAngle(transit.o.angle, i);
	      }
	      results.push(transit.extendDefaults());
	    }
	    return results;
	  };

	  Burst.prototype.getBitAngle = function(angle, i) {
	    var angleAddition, angleShift, curAngleShift, degCnt, delta, end, keys, newEnd, newStart, points, start, step;
	    points = this.props.count;
	    degCnt = this.props.degree % 360 === 0 ? points : points - 1 || 1;
	    step = this.props.degree / degCnt;
	    angleAddition = i * step + 90;
	    angleShift = this.transits[i].props.angleShift || 0;
	    angle = typeof angle !== 'object' ? angle + angleAddition + angleShift : (keys = Object.keys(angle), start = keys[0], end = angle[start], curAngleShift = angleAddition + angleShift, newStart = parseFloat(start) + curAngleShift, newEnd = parseFloat(end) + curAngleShift, delta = {}, delta[newStart] = newEnd, delta);
	    return angle;
	  };

	  Burst.prototype.getSidePoint = function(side, angle) {
	    var pointStart, sideRadius;
	    sideRadius = this.getSideRadius(side);
	    return pointStart = this.h.getRadialPoint({
	      radius: sideRadius.radius,
	      radiusX: sideRadius.radiusX,
	      radiusY: sideRadius.radiusY,
	      angle: angle,
	      center: {
	        x: this.props.center,
	        y: this.props.center
	      }
	    });
	  };

	  Burst.prototype.getSideRadius = function(side) {
	    return {
	      radius: this.getRadiusByKey('radius', side),
	      radiusX: this.getRadiusByKey('radiusX', side),
	      radiusY: this.getRadiusByKey('radiusY', side)
	    };
	  };

	  Burst.prototype.getRadiusByKey = function(key, side) {
	    if (this.deltas[key] != null) {
	      return this.deltas[key][side];
	    } else if (this.props[key] != null) {
	      return this.props[key];
	    }
	  };

	  Burst.prototype.getDeltaFromPoints = function(key, pointStart, pointEnd) {
	    var delta;
	    delta = {};
	    if (pointStart[key] === pointEnd[key]) {
	      return delta = pointStart[key];
	    } else {
	      delta[pointStart[key]] = pointEnd[key];
	      return delta;
	    }
	  };

	  Burst.prototype.draw = function(progress) {
	    return this.drawEl();
	  };

	  Burst.prototype.isNeedsTransform = function() {
	    return this.isPropChanged('shiftX') || this.isPropChanged('shiftY') || this.isPropChanged('angle');
	  };

	  Burst.prototype.fillTransform = function() {
	    return "rotate(" + this.props.angle + "deg) translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
	  };

	  Burst.prototype.createTween = function() {
	    var i, results;
	    Burst.__super__.createTween.apply(this, arguments);
	    i = this.transits.length;
	    results = [];
	    while (i--) {
	      results.push(this.tween.add(this.transits[i].timeline));
	    }
	    return results;
	  };

	  Burst.prototype.calcSize = function() {
	    var i, j, largestSize, len1, radius, ref, transit;
	    largestSize = -1;
	    ref = this.transits;
	    for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	      transit = ref[i];
	      transit.calcSize();
	      if (largestSize < transit.props.size) {
	        largestSize = transit.props.size;
	      }
	    }
	    radius = this.calcMaxRadius();
	    this.props.size = largestSize + 2 * radius;
	    this.props.size += 2 * this.props.sizeGap;
	    this.props.center = this.props.size / 2;
	    return this.addBitOptions();
	  };

	  Burst.prototype.getOption = function(i) {
	    var key, keys, len, option;
	    option = {};
	    keys = Object.keys(this.childDefaults);
	    len = keys.length;
	    while (len--) {
	      key = keys[len];
	      option[key] = this.getPropByMod({
	        key: key,
	        i: i,
	        from: this.o.childOptions
	      });
	      if (this.optionsIntersection[key]) {
	        if (option[key] == null) {
	          option[key] = this.getPropByMod({
	            key: key,
	            i: i,
	            from: this.childDefaults
	          });
	        }
	        continue;
	      }
	      if (option[key] == null) {
	        option[key] = this.getPropByMod({
	          key: key,
	          i: i,
	          from: this.o
	        });
	      }
	      if (option[key] == null) {
	        option[key] = this.getPropByMod({
	          key: key,
	          i: i,
	          from: this.childDefaults
	        });
	      }
	    }
	    return option;
	  };

	  Burst.prototype.getPropByMod = function(o) {
	    var prop, ref;
	    prop = (ref = o.from || this.o.childOptions) != null ? ref[o.key] : void 0;
	    if (this.h.isArray(prop)) {
	      return prop[o.i % prop.length];
	    } else {
	      return prop;
	    }
	  };

	  Burst.prototype.generateRandomAngle = function(i) {
	    var randdomness, randomness;
	    randomness = parseFloat(this.props.randomAngle);
	    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
	    return this.h.rand(0, randomness ? randomness * 360 : 180);
	  };

	  Burst.prototype.generateRandomRadius = function(i) {
	    var randdomness, randomness, start;
	    randomness = parseFloat(this.props.randomRadius);
	    randdomness = randomness > 1 ? 1 : randomness < 0 ? 0 : void 0;
	    start = randomness ? (1 - randomness) * 100 : (1 - .5) * 100;
	    return this.h.rand(start, 100) / 100;
	  };

	  Burst.prototype.then = function(o) {
	    this.h.error("Burst's \"then\" method is under consideration, you can vote for it in github repo issues");
	    return this;
	  };

	  return Burst;

	})(Transit);

	module.exports = Burst;

	},{"./h":4,"./shapes/bitsMap":10,"./swirl":19,"./transit":20,"./tween/tween":22}],3:[function(require,module,exports){
	var Easing, bezier, easing;

	bezier = require('./bezier-easing');

	Easing = (function() {
	  function Easing() {}

	  Easing.prototype.bezier = bezier;

	  Easing.prototype.linear = {
	    none: function(k) {
	      return k;
	    }
	  };

	  Easing.prototype.ease = {
	    "in": bezier.apply(Easing, [0.42, 0, 1, 1]),
	    out: bezier.apply(Easing, [0, 0, 0.58, 1]),
	    inout: bezier.apply(Easing, [0.42, 0, 0.58, 1])
	  };

	  Easing.prototype.quad = {
	    "in": bezier.apply(Easing, [0.55, 0.085, 0.68, 0.53]),
	    out: bezier.apply(Easing, [0.25, 0.46, 0.45, 0.94]),
	    inout: bezier.apply(Easing, [0.455, 0.03, 0.515, 0.955])
	  };

	  Easing.prototype.cubic = {
	    "in": bezier.apply(Easing, [0.55, 0.055, 0.675, 0.19]),
	    out: bezier.apply(Easing, [0.215, 0.61, 0.355, 1]),
	    inout: bezier.apply(Easing, [0.645, 0.045, 0.355, 1])
	  };

	  Easing.prototype.quart = {
	    "in": bezier.apply(Easing, [0.895, 0.03, 0.685, 0.22]),
	    out: bezier.apply(Easing, [0.165, 0.84, 0.44, 1]),
	    inout: bezier.apply(Easing, [0.77, 0, 0.175, 1])
	  };

	  Easing.prototype.quint = {
	    "in": bezier.apply(Easing, [0.895, 0.03, 0.685, 0.22]),
	    out: bezier.apply(Easing, [0.165, 0.84, 0.44, 1]),
	    inout: bezier.apply(Easing, [0.77, 0, 0.175, 1])
	  };

	  Easing.prototype.sin = {
	    "in": bezier.apply(Easing, [0.47, 0, 0.745, 0.715]),
	    out: bezier.apply(Easing, [0.39, 0.575, 0.565, 1]),
	    inout: bezier.apply(Easing, [0.445, 0.05, 0.55, 0.95])
	  };

	  Easing.prototype.expo = {
	    "in": bezier.apply(Easing, [0.95, 0.05, 0.795, 0.035]),
	    out: bezier.apply(Easing, [0.19, 1, 0.22, 1]),
	    inout: bezier.apply(Easing, [1, 0, 0, 1])
	  };

	  Easing.prototype.circ = {
	    "in": bezier.apply(Easing, [0.6, 0.04, 0.98, 0.335]),
	    out: bezier.apply(Easing, [0.075, 0.82, 0.165, 1]),
	    inout: bezier.apply(Easing, [0.785, 0.135, 0.15, 0.86])
	  };

	  Easing.prototype.back = {
	    "in": bezier.apply(Easing, [0.6, 0, 0.735, 0.045]),
	    out: bezier.apply(Easing, [0.175, 0.885, 0.32, 1]),
	    inout: bezier.apply(Easing, [0.68, 0, 0.265, 1])
	  };

	  Easing.prototype.elastic = {
	    "in": function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	    },
	    out: function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
	    },
	    inout: function(k) {
	      var a, p, s;
	      s = void 0;
	      p = 0.4;
	      if (k === 0) {
	        return 0;
	      }
	      if (k === 1) {
	        return 1;
	      }
	      a = 1;
	      s = p / 4;
	      if ((k *= 2) < 1) {
	        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	      }
	      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	    }
	  };

	  Easing.prototype.bounce = {
	    "in": function(k) {
	      return 1 - easing.bounce.out(1 - k);
	    },
	    out: function(k) {
	      if (k < (1 / 2.75)) {
	        return 7.5625 * k * k;
	      } else if (k < (2 / 2.75)) {
	        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	      } else if (k < (2.5 / 2.75)) {
	        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	      } else {
	        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	      }
	    },
	    inout: function(k) {
	      if (k < 0.5) {
	        return easing.bounce["in"](k * 2) * 0.5;
	      }
	      return easing.bounce.out(k * 2 - 1) * 0.5 + 0.5;
	    }
	  };

	  return Easing;

	})();

	easing = new Easing;

	module.exports = easing;

	},{"./bezier-easing":1}],4:[function(require,module,exports){
	var Helpers, h;

	Helpers = (function() {
	  Helpers.prototype.logBadgeCss = 'background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;';

	  Helpers.prototype.shortColors = {
	    transparent: 'rgba(0,0,0,0)',
	    aqua: 'rgb(0,255,255)',
	    black: 'rgb(0,0,0)',
	    blue: 'rgb(0,0,255)',
	    fuchsia: 'rgb(255,0,255)',
	    gray: 'rgb(128,128,128)',
	    green: 'rgb(0,128,0)',
	    lime: 'rgb(0,255,0)',
	    maroon: 'rgb(128,0,0)',
	    navy: 'rgb(0,0,128)',
	    olive: 'rgb(128,128,0)',
	    purple: 'rgb(128,0,128)',
	    red: 'rgb(255,0,0)',
	    silver: 'rgb(192,192,192)',
	    teal: 'rgb(0,128,128)',
	    white: 'rgb(255,255,255)',
	    yellow: 'rgb(255,255,0)',
	    orange: 'rgb(255,128,0)'
	  };

	  Helpers.prototype.chainOptionMap = {
	    duration: 1,
	    delay: 1,
	    repeat: 1,
	    easing: 1,
	    yoyo: 1,
	    onStart: 1,
	    onComplete: 1,
	    onCompleteChain: 1,
	    onUpdate: 1,
	    points: 1
	  };

	  Helpers.prototype.callbacksMap = {
	    onStart: 1,
	    onComplete: 1,
	    onCompleteChain: 1,
	    onUpdate: 1
	  };

	  Helpers.prototype.tweenOptionMap = {
	    duration: 1,
	    delay: 1,
	    repeat: 1,
	    easing: 1,
	    yoyo: 1
	  };

	  Helpers.prototype.posPropsMap = {
	    x: 1,
	    y: 1,
	    shiftX: 1,
	    shiftY: 1,
	    burstX: 1,
	    burstY: 1,
	    burstShiftX: 1,
	    burstShiftY: 1
	  };

	  Helpers.prototype.strokeDashPropsMap = {
	    strokeDasharray: 1,
	    strokeDashoffset: 1
	  };

	  Helpers.prototype.RAD_TO_DEG = 180 / Math.PI;

	  function Helpers() {
	    this.vars();
	  }

	  Helpers.prototype.vars = function() {
	    var ua;
	    this.prefix = this.getPrefix();
	    this.getRemBase();
	    this.isFF = this.prefix.lowercase === 'moz';
	    this.isIE = this.prefix.lowercase === 'ms';
	    ua = navigator.userAgent;
	    this.isOldOpera = ua.match(/presto/gim);
	    this.isSafari = ua.indexOf('Safari') > -1;
	    this.isChrome = ua.indexOf('Chrome') > -1;
	    this.isOpera = ua.toLowerCase().indexOf("op") > -1;
	    this.isChrome && this.isSafari && (this.isSafari = false);
	    (ua.match(/PhantomJS/gim)) && (this.isSafari = false);
	    this.isChrome && this.isOpera && (this.isChrome = false);
	    this.uniqIDs = -1;
	    this.div = document.createElement('div');
	    return document.body.appendChild(this.div);
	  };

	  Helpers.prototype.cloneObj = function(obj, exclude) {
	    var i, key, keys, newObj;
	    keys = Object.keys(obj);
	    newObj = {};
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (exclude != null) {
	        if (!exclude[key]) {
	          newObj[key] = obj[key];
	        }
	      } else {
	        newObj[key] = obj[key];
	      }
	    }
	    return newObj;
	  };

	  Helpers.prototype.extend = function(objTo, objFrom) {
	    var key, value;
	    for (key in objFrom) {
	      value = objFrom[key];
	      if (objTo[key] == null) {
	        objTo[key] = objFrom[key];
	      }
	    }
	    return objTo;
	  };

	  Helpers.prototype.getRemBase = function() {
	    var html, style;
	    html = document.querySelector('html');
	    style = getComputedStyle(html);
	    return this.remBase = parseFloat(style.fontSize);
	  };

	  Helpers.prototype.clamp = function(value, min, max) {
	    return Math.min(Math.max(value, min), max);
	  };

	  Helpers.prototype.setPrefixedStyle = function(el, name, value) {
	    var prefixedName;
	    prefixedName = "" + this.prefix.css + name;
	    el.style[name] = value;
	    return el.style[prefixedName] = value;
	  };

	  Helpers.prototype.prepareForLog = function(args) {
	    args = Array.prototype.slice.apply(args);
	    args.unshift('::');
	    args.unshift(this.logBadgeCss);
	    args.unshift('%cmo·js%c');
	    return args;
	  };

	  Helpers.prototype.log = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.log.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.warn = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.warn.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.error = function() {
	    if (mojs.isDebug === false) {
	      return;
	    }
	    return console.error.apply(console, this.prepareForLog(arguments));
	  };

	  Helpers.prototype.parseUnit = function(value) {
	    var amount, isStrict, ref, regex, returnVal, unit;
	    if (typeof value === 'number') {
	      return returnVal = {
	        unit: 'px',
	        isStrict: false,
	        value: value,
	        string: value + "px"
	      };
	    } else if (typeof value === 'string') {
	      regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin/gim;
	      unit = (ref = value.match(regex)) != null ? ref[0] : void 0;
	      isStrict = true;
	      if (!unit) {
	        unit = 'px';
	        isStrict = false;
	      }
	      amount = parseFloat(value);
	      return returnVal = {
	        unit: unit,
	        isStrict: isStrict,
	        value: amount,
	        string: "" + amount + unit
	      };
	    }
	    return value;
	  };

	  Helpers.prototype.bind = function(func, context) {
	    var bindArgs, wrapper;
	    wrapper = function() {
	      var args, unshiftArgs;
	      args = Array.prototype.slice.call(arguments);
	      unshiftArgs = bindArgs.concat(args);
	      return func.apply(context, unshiftArgs);
	    };
	    bindArgs = Array.prototype.slice.call(arguments, 2);
	    return wrapper;
	  };

	  Helpers.prototype.getRadialPoint = function(o) {
	    var point, radAngle, radiusX, radiusY;
	    if (o == null) {
	      o = {};
	    }
	    if ((o.radius == null) || (o.angle == null) || (o.center == null)) {
	      return;
	    }
	    radAngle = (o.angle - 90) * (Math.PI / 180);
	    radiusX = o.radiusX != null ? o.radiusX : o.radius;
	    radiusY = o.radiusY != null ? o.radiusY : o.radius;
	    return point = {
	      x: o.center.x + (Math.cos(radAngle) * radiusX),
	      y: o.center.y + (Math.sin(radAngle) * radiusY)
	    };
	  };

	  Helpers.prototype.getPrefix = function() {
	    var dom, pre, styles, v;
	    styles = window.getComputedStyle(document.documentElement, "");
	    v = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/);
	    pre = (v || (styles.OLink === "" && ["", "o"]))[1];
	    dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
	    return {
	      dom: dom,
	      lowercase: pre,
	      css: "-" + pre + "-",
	      js: pre[0].toUpperCase() + pre.substr(1)
	    };
	  };

	  Helpers.prototype.strToArr = function(string) {
	    var arr;
	    arr = [];
	    if (typeof string === 'number' && !isNaN(string)) {
	      arr.push(this.parseUnit(string));
	      return arr;
	    }
	    string.trim().split(/\s+/gim).forEach((function(_this) {
	      return function(str) {
	        return arr.push(_this.parseUnit(_this.parseIfRand(str)));
	      };
	    })(this));
	    return arr;
	  };

	  Helpers.prototype.calcArrDelta = function(arr1, arr2) {
	    var delta, i, j, len, num;
	    delta = [];
	    for (i = j = 0, len = arr1.length; j < len; i = ++j) {
	      num = arr1[i];
	      delta[i] = this.parseUnit("" + (arr2[i].value - arr1[i].value) + arr2[i].unit);
	    }
	    return delta;
	  };

	  Helpers.prototype.isArray = function(variable) {
	    return variable instanceof Array;
	  };

	  Helpers.prototype.normDashArrays = function(arr1, arr2) {
	    var arr1Len, arr2Len, currItem, i, j, k, lenDiff, ref, ref1, startI;
	    arr1Len = arr1.length;
	    arr2Len = arr2.length;
	    if (arr1Len > arr2Len) {
	      lenDiff = arr1Len - arr2Len;
	      startI = arr2.length;
	      for (i = j = 0, ref = lenDiff; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	        currItem = i + startI;
	        arr2.push(this.parseUnit("0" + arr1[currItem].unit));
	      }
	    } else if (arr2Len > arr1Len) {
	      lenDiff = arr2Len - arr1Len;
	      startI = arr1.length;
	      for (i = k = 0, ref1 = lenDiff; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
	        currItem = i + startI;
	        arr1.push(this.parseUnit("0" + arr2[currItem].unit));
	      }
	    }
	    return [arr1, arr2];
	  };

	  Helpers.prototype.makeColorObj = function(color) {
	    var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor, style;
	    if (color[0] === '#') {
	      result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
	      colorObj = {};
	      if (result) {
	        r = result[1].length === 2 ? result[1] : result[1] + result[1];
	        g = result[2].length === 2 ? result[2] : result[2] + result[2];
	        b = result[3].length === 2 ? result[3] : result[3] + result[3];
	        colorObj = {
	          r: parseInt(r, 16),
	          g: parseInt(g, 16),
	          b: parseInt(b, 16),
	          a: 1
	        };
	      }
	    }
	    if (color[0] !== '#') {
	      isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
	      if (isRgb) {
	        rgbColor = color;
	      }
	      if (!isRgb) {
	        rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.isFF || this.isIE || this.isOldOpera ? (style = this.computedStyle(this.div), this.computedStyle(this.div).color) : this.div.style.color) : this.shortColors[color];
	      }
	      regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
	      regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
	      result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor);
	      colorObj = {};
	      alpha = parseFloat(result[4] || 1);
	      if (result) {
	        colorObj = {
	          r: parseInt(result[1], 10),
	          g: parseInt(result[2], 10),
	          b: parseInt(result[3], 10),
	          a: (alpha != null) && !isNaN(alpha) ? alpha : 1
	        };
	      }
	    }
	    return colorObj;
	  };

	  Helpers.prototype.computedStyle = function(el) {
	    return getComputedStyle(el);
	  };

	  Helpers.prototype.splitEasing = function(string) {
	    var firstPart, secondPart, split;
	    if (typeof string === 'function') {
	      return string;
	    }
	    if (typeof string === 'string' && string.length) {
	      split = string.split('.');
	      firstPart = split[0].toLowerCase() || 'linear';
	      secondPart = split[1].toLowerCase() || 'none';
	      return [firstPart, secondPart];
	    } else {
	      return ['linear', 'none'];
	    }
	  };

	  Helpers.prototype.capitalize = function(str) {
	    if (typeof str !== 'string') {
	      throw Error('String expected - nothing to capitalize');
	    }
	    return str.charAt(0).toUpperCase() + str.substring(1);
	  };

	  Helpers.prototype.parseRand = function(string) {
	    var rand, randArr, units;
	    randArr = string.split(/rand\(|\,|\)/);
	    units = this.parseUnit(randArr[2]);
	    rand = this.rand(parseFloat(randArr[1]), parseFloat(randArr[2]));
	    if (units.unit && randArr[2].match(units.unit)) {
	      return rand + units.unit;
	    } else {
	      return rand;
	    }
	  };

	  Helpers.prototype.parseStagger = function(string, index) {
	    var base, number, splittedValue, unit, unitValue, value;
	    value = string.split(/stagger\(|\)$/)[1].toLowerCase();
	    splittedValue = value.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim);
	    value = splittedValue.length > 3 ? (base = this.parseUnit(this.parseIfRand(splittedValue[1])), splittedValue[3]) : (base = this.parseUnit(0), splittedValue[1]);
	    value = this.parseIfRand(value);
	    unitValue = this.parseUnit(value);
	    number = index * unitValue.value + base.value;
	    unit = base.isStrict ? base.unit : unitValue.isStrict ? unitValue.unit : '';
	    if (unit) {
	      return "" + number + unit;
	    } else {
	      return number;
	    }
	  };

	  Helpers.prototype.parseIfRand = function(str) {
	    if (typeof str === 'string' && str.match(/rand\(/)) {
	      return this.parseRand(str);
	    } else {
	      return str;
	    }
	  };

	  Helpers.prototype.parseDelta = function(key, value) {
	    var delta, end, endArr, endColorObj, i, j, len, start, startArr, startColorObj;
	    start = Object.keys(value)[0];
	    end = value[start];
	    delta = {
	      start: start
	    };
	    if (isNaN(parseFloat(start)) && !start.match(/rand\(/)) {
	      if (key === 'strokeLinecap') {
	        this.warn("Sorry, stroke-linecap property is not animatable yet, using the start(" + start + ") value instead", value);
	        return delta;
	      }
	      startColorObj = this.makeColorObj(start);
	      endColorObj = this.makeColorObj(end);
	      delta = {
	        start: startColorObj,
	        end: endColorObj,
	        type: 'color',
	        delta: {
	          r: endColorObj.r - startColorObj.r,
	          g: endColorObj.g - startColorObj.g,
	          b: endColorObj.b - startColorObj.b,
	          a: endColorObj.a - startColorObj.a
	        }
	      };
	    } else if (key === 'strokeDasharray' || key === 'strokeDashoffset') {
	      startArr = this.strToArr(start);
	      endArr = this.strToArr(end);
	      this.normDashArrays(startArr, endArr);
	      for (i = j = 0, len = startArr.length; j < len; i = ++j) {
	        start = startArr[i];
	        end = endArr[i];
	        this.mergeUnits(start, end, key);
	      }
	      delta = {
	        start: startArr,
	        end: endArr,
	        delta: this.calcArrDelta(startArr, endArr),
	        type: 'array'
	      };
	    } else {
	      if (!this.chainOptionMap[key]) {
	        if (this.posPropsMap[key]) {
	          end = this.parseUnit(this.parseIfRand(end));
	          start = this.parseUnit(this.parseIfRand(start));
	          this.mergeUnits(start, end, key);
	          delta = {
	            start: start,
	            end: end,
	            delta: end.value - start.value,
	            type: 'unit'
	          };
	        } else {
	          end = parseFloat(this.parseIfRand(end));
	          start = parseFloat(this.parseIfRand(start));
	          delta = {
	            start: start,
	            end: end,
	            delta: end - start,
	            type: 'number'
	          };
	        }
	      }
	    }
	    return delta;
	  };

	  Helpers.prototype.mergeUnits = function(start, end, key) {
	    if (!end.isStrict && start.isStrict) {
	      end.unit = start.unit;
	      return end.string = "" + end.value + end.unit;
	    } else if (end.isStrict && !start.isStrict) {
	      start.unit = end.unit;
	      return start.string = "" + start.value + start.unit;
	    } else if (end.isStrict && start.isStrict) {
	      if (end.unit !== start.unit) {
	        start.unit = end.unit;
	        start.string = "" + start.value + start.unit;
	        return this.warn("Two different units were specified on \"" + key + "\" delta property, mo · js will fallback to end \"" + end.unit + "\" unit ");
	      }
	    }
	  };

	  Helpers.prototype.rand = function(min, max) {
	    return (Math.random() * (max - min)) + min;
	  };

	  Helpers.prototype.isDOM = function(o) {
	    var isNode;
	    if (o == null) {
	      return false;
	    }
	    isNode = typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
	    return typeof o === 'object' && isNode;
	  };

	  Helpers.prototype.getChildElements = function(element) {
	    var childNodes, children, i;
	    childNodes = element.childNodes;
	    children = [];
	    i = childNodes.length;
	    while (i--) {
	      if (childNodes[i].nodeType === 1) {
	        children.unshift(childNodes[i]);
	      }
	    }
	    return children;
	  };

	  Helpers.prototype.delta = function(start, end) {
	    var isType1, isType2, obj, type1, type2;
	    type1 = typeof start;
	    type2 = typeof end;
	    isType1 = type1 === 'string' || type1 === 'number' && !isNaN(start);
	    isType2 = type2 === 'string' || type2 === 'number' && !isNaN(end);
	    if (!isType1 || !isType2) {
	      this.error("delta method expects Strings or Numbers at input but got - " + start + ", " + end);
	      return;
	    }
	    obj = {};
	    obj[start] = end;
	    return obj;
	  };

	  Helpers.prototype.getUniqID = function() {
	    return ++this.uniqIDs;
	  };

	  return Helpers;

	})();

	h = new Helpers;

	module.exports = h;

	},{}],5:[function(require,module,exports){
	var mojs;

	mojs = {
	  revision: '0.114.4',
	  isDebug: true,
	  helpers: require('./h'),
	  Bit: require('./shapes/bit'),
	  bitsMap: require('./shapes/bitsMap'),
	  Circle: require('./shapes/circle'),
	  Cross: require('./shapes/cross'),
	  Line: require('./shapes/line'),
	  Rect: require('./shapes/rect'),
	  Polygon: require('./shapes/polygon'),
	  Equal: require('./shapes/equal'),
	  Zigzag: require('./shapes/zigzag'),
	  Burst: require('./burst'),
	  Transit: require('./transit'),
	  Swirl: require('./swirl'),
	  Stagger: require('./stagger'),
	  MotionPath: require('./motion-path'),
	  Timeline: require('./tween/timeline'),
	  Tween: require('./tween/tween'),
	  tweener: require('./tween/tweener'),
	  easing: require('./easing')
	};

	mojs.h = mojs.helpers;

	mojs.delta = mojs.h.delta;

	if ((typeof define === "function") && define.amd) {
	  define("mojs", [], function() {
	    return mojs;
	  });
	}

	if ((typeof module === "object") && (typeof module.exports === "object")) {
	  module.exports = mojs;
	}

	return typeof window !== "undefined" && window !== null ? window.mojs = mojs : void 0;

	},{"./burst":2,"./easing":3,"./h":4,"./motion-path":6,"./shapes/bit":9,"./shapes/bitsMap":10,"./shapes/circle":11,"./shapes/cross":12,"./shapes/equal":13,"./shapes/line":14,"./shapes/polygon":15,"./shapes/rect":16,"./shapes/zigzag":17,"./stagger":18,"./swirl":19,"./transit":20,"./tween/timeline":21,"./tween/tween":22,"./tween/tweener":23}],6:[function(require,module,exports){
	var MotionPath, Timeline, Tween, easing, h, resize,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	h = require('./h');

	easing = require('./easing');

	resize = require('./vendor/resize');

	Timeline = require('./tween/timeline');

	Tween = require('./tween/tween');

	MotionPath = (function() {
	  MotionPath.prototype.NS = 'http://www.w3.org/2000/svg';

	  MotionPath.prototype.defaults = {
	    path: null,
	    curvature: {
	      x: '75%',
	      y: '50%'
	    },
	    delay: 0,
	    duration: 1000,
	    easing: null,
	    repeat: 0,
	    yoyo: false,
	    offsetX: 0,
	    offsetY: 0,
	    angleOffset: null,
	    pathStart: 0,
	    pathEnd: 1,
	    motionBlur: 0,
	    transformOrigin: null,
	    isAngle: false,
	    isReverse: false,
	    isRunLess: false,
	    isPresetPosition: true,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null
	  };

	  function MotionPath(o1) {
	    this.o = o1 != null ? o1 : {};
	    this.calcHeight = bind(this.calcHeight, this);
	    if (this.vars()) {
	      return;
	    }
	    this.createTween();
	    this;
	  }

	  MotionPath.prototype.vars = function() {
	    this.getScaler = h.bind(this.getScaler, this);
	    this.resize = resize;
	    this.props = h.cloneObj(this.defaults);
	    this.extendOptions(this.o);
	    this.isMotionBlurReset = h.isSafari || h.isIE;
	    this.isMotionBlurReset && (this.props.motionBlur = 0);
	    this.history = [h.cloneObj(this.props)];
	    return this.postVars();
	  };

	  MotionPath.prototype.curveToPath = function(o) {
	    var angle, curvature, curvatureX, curvatureY, curvePoint, curveXPoint, dX, dY, endPoint, path, percent, radius, start;
	    path = document.createElementNS(this.NS, 'path');
	    start = o.start;
	    endPoint = {
	      x: start.x + o.shift.x,
	      y: start.x + o.shift.y
	    };
	    curvature = o.curvature;
	    dX = o.shift.x;
	    dY = o.shift.y;
	    radius = Math.sqrt(dX * dX + dY * dY);
	    percent = radius / 100;
	    angle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	    if (o.shift.x < 0) {
	      angle = angle + 180;
	    }
	    curvatureX = h.parseUnit(curvature.x);
	    curvatureX = curvatureX.unit === '%' ? curvatureX.value * percent : curvatureX.value;
	    curveXPoint = h.getRadialPoint({
	      center: {
	        x: start.x,
	        y: start.y
	      },
	      radius: curvatureX,
	      angle: angle
	    });
	    curvatureY = h.parseUnit(curvature.y);
	    curvatureY = curvatureY.unit === '%' ? curvatureY.value * percent : curvatureY.value;
	    curvePoint = h.getRadialPoint({
	      center: {
	        x: curveXPoint.x,
	        y: curveXPoint.y
	      },
	      radius: curvatureY,
	      angle: angle + 90
	    });
	    path.setAttribute('d', "M" + start.x + "," + start.y + " Q" + curvePoint.x + "," + curvePoint.y + " " + endPoint.x + "," + endPoint.y);
	    return path;
	  };

	  MotionPath.prototype.postVars = function() {
	    this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
	    this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
	    this.angle = 0;
	    this.speedX = 0;
	    this.speedY = 0;
	    this.blurX = 0;
	    this.blurY = 0;
	    this.prevCoords = {};
	    this.blurAmount = 20;
	    this.props.motionBlur = h.clamp(this.props.motionBlur, 0, 1);
	    this.onUpdate = this.props.onUpdate;
	    this.el = this.parseEl(this.props.el);
	    this.props.motionBlur > 0 && this.createFilter();
	    this.path = this.getPath();
	    if (!this.path.getAttribute('d')) {
	      h.error('Path has no coordinates to work with, aborting');
	      return true;
	    }
	    this.len = this.path.getTotalLength();
	    this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart);
	    this.startLen = this.props.pathStart * this.len;
	    this.fill = this.props.fill;
	    if (this.fill != null) {
	      this.container = this.parseEl(this.props.fill.container);
	      this.fillRule = this.props.fill.fillRule || 'all';
	      this.getScaler();
	      if (this.container != null) {
	        this.removeEvent(this.container, 'onresize', this.getScaler);
	        return this.addEvent(this.container, 'onresize', this.getScaler);
	      }
	    }
	  };

	  MotionPath.prototype.addEvent = function(el, type, handler) {
	    return el.addEventListener(type, handler, false);
	  };

	  MotionPath.prototype.removeEvent = function(el, type, handler) {
	    return el.removeEventListener(type, handler, false);
	  };

	  MotionPath.prototype.createFilter = function() {
	    var div, svg;
	    div = document.createElement('div');
	    this.filterID = "filter-" + (h.getUniqID());
	    div.innerHTML = "<svg id=\"svg-" + this.filterID + "\"\n    style=\"visibility:hidden; width:0px; height:0px\">\n  <filter id=\"" + this.filterID + "\" y=\"-20\" x=\"-20\" width=\"40\" height=\"40\">\n    <feOffset\n      id=\"blur-offset\" in=\"SourceGraphic\"\n      dx=\"0\" dy=\"0\" result=\"offset2\"></feOffset>\n    <feGaussianblur\n      id=\"blur\" in=\"offset2\"\n      stdDeviation=\"0,0\" result=\"blur2\"></feGaussianblur>\n    <feMerge>\n      <feMergeNode in=\"SourceGraphic\"></feMergeNode>\n      <feMergeNode in=\"blur2\"></feMergeNode>\n    </feMerge>\n  </filter>\n</svg>";
	    svg = div.querySelector("#svg-" + this.filterID);
	    this.filter = svg.querySelector('#blur');
	    this.filterOffset = svg.querySelector('#blur-offset');
	    document.body.insertBefore(svg, document.body.firstChild);
	    this.el.style['filter'] = "url(#" + this.filterID + ")";
	    return this.el.style[h.prefix.css + "filter"] = "url(#" + this.filterID + ")";
	  };

	  MotionPath.prototype.parseEl = function(el) {
	    if (typeof el === 'string') {
	      return document.querySelector(el);
	    }
	    if (el instanceof HTMLElement) {
	      return el;
	    }
	    if (el.setProp != null) {
	      this.isModule = true;
	      return el;
	    }
	  };

	  MotionPath.prototype.getPath = function() {
	    var path;
	    if (typeof this.props.path === 'string') {
	      if (this.props.path.charAt(0).toLowerCase() === 'm') {
	        path = document.createElementNS(this.NS, 'path');
	        path.setAttributeNS(null, 'd', this.props.path);
	        return path;
	      } else {
	        return document.querySelector(this.props.path);
	      }
	    }
	    if (this.props.path.style) {
	      return this.props.path;
	    }
	    if (this.props.path.x || this.props.path.y) {
	      return this.curveToPath({
	        start: {
	          x: 0,
	          y: 0
	        },
	        shift: {
	          x: this.props.path.x || 0,
	          y: this.props.path.y || 0
	        },
	        curvature: {
	          x: this.props.curvature.x || this.defaults.curvature.x,
	          y: this.props.curvature.y || this.defaults.curvature.y
	        }
	      });
	    }
	  };

	  MotionPath.prototype.getScaler = function() {
	    var end, size, start;
	    this.cSize = {
	      width: this.container.offsetWidth || 0,
	      height: this.container.offsetHeight || 0
	    };
	    start = this.path.getPointAtLength(0);
	    end = this.path.getPointAtLength(this.len);
	    size = {};
	    this.scaler = {};
	    size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
	    size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
	    switch (this.fillRule) {
	      case 'all':
	        this.calcWidth(size);
	        return this.calcHeight(size);
	      case 'width':
	        this.calcWidth(size);
	        return this.scaler.y = this.scaler.x;
	      case 'height':
	        this.calcHeight(size);
	        return this.scaler.x = this.scaler.y;
	    }
	  };

	  MotionPath.prototype.calcWidth = function(size) {
	    this.scaler.x = this.cSize.width / size.width;
	    return !isFinite(this.scaler.x) && (this.scaler.x = 1);
	  };

	  MotionPath.prototype.calcHeight = function(size) {
	    this.scaler.y = this.cSize.height / size.height;
	    return !isFinite(this.scaler.y) && (this.scaler.y = 1);
	  };

	  MotionPath.prototype.run = function(o) {
	    var fistItem, key, value;
	    if (o) {
	      fistItem = this.history[0];
	      for (key in o) {
	        value = o[key];
	        if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	          h.warn("the property \"" + key + "\" property can not be overridden on run yet");
	          delete o[key];
	        } else {
	          this.history[0][key] = value;
	        }
	      }
	      this.tuneOptions(o);
	    }
	    return this.startTween();
	  };

	  MotionPath.prototype.createTween = function() {
	    this.timeline = new Timeline({
	      duration: this.props.duration,
	      delay: this.props.delay,
	      yoyo: this.props.yoyo,
	      repeat: this.props.repeat,
	      easing: this.props.easing,
	      onStart: (function(_this) {
	        return function() {
	          var ref;
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onComplete: (function(_this) {
	        return function() {
	          var ref;
	          _this.props.motionBlur && _this.setBlur({
	            blur: {
	              x: 0,
	              y: 0
	            },
	            offset: {
	              x: 0,
	              y: 0
	            }
	          });
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onUpdate: (function(_this) {
	        return function(p) {
	          return _this.setProgress(p);
	        };
	      })(this),
	      onFirstUpdateBackward: (function(_this) {
	        return function() {
	          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	        };
	      })(this)
	    });
	    this.tween = new Tween;
	    this.tween.add(this.timeline);
	    !this.props.isRunLess && this.startTween();
	    return this.props.isPresetPosition && this.setProgress(0, true);
	  };

	  MotionPath.prototype.startTween = function() {
	    return setTimeout(((function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.tween) != null ? ref.start() : void 0;
	      };
	    })(this)), 1);
	  };

	  MotionPath.prototype.setProgress = function(p, isInit) {
	    var atan, isTransformFunOrigin, len, point, prevPoint, props, tOrigin, x, x1, x2, y;
	    props = this.props;
	    len = this.startLen + (!props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
	    point = this.path.getPointAtLength(len);
	    isTransformFunOrigin = typeof props.transformOrigin === 'function';
	    if (props.isAngle || (props.angleOffset != null) || isTransformFunOrigin) {
	      prevPoint = this.path.getPointAtLength(len - 1);
	      x1 = point.y - prevPoint.y;
	      x2 = point.x - prevPoint.x;
	      atan = Math.atan(x1 / x2);
	      !isFinite(atan) && (atan = 0);
	      this.angle = atan * h.RAD_TO_DEG;
	      if ((typeof props.angleOffset) !== 'function') {
	        this.angle += props.angleOffset || 0;
	      } else {
	        this.angle = props.angleOffset.call(this, this.angle, p);
	      }
	    } else {
	      this.angle = 0;
	    }
	    x = point.x + this.props.offsetX;
	    y = point.y + this.props.offsetY;
	    this.props.motionBlur && this.makeMotionBlur(x, y);
	    if (this.scaler) {
	      x *= this.scaler.x;
	      y *= this.scaler.y;
	    }
	    if (this.isModule) {
	      this.setModulePosition(x, y);
	    } else {
	      this.setElPosition(x, y);
	    }
	    if (this.props.transformOrigin) {
	      tOrigin = !isTransformFunOrigin ? this.props.transformOrigin : this.props.transformOrigin(this.angle, p);
	      this.el.style[h.prefix.css + "transform-origin"] = tOrigin;
	      this.el.style['transform-origin'] = tOrigin;
	    }
	    return !isInit && (typeof this.onUpdate === "function" ? this.onUpdate(p) : void 0);
	  };

	  MotionPath.prototype.setElPosition = function(x, y) {
	    var rotate, transform;
	    rotate = this.angle !== 0 ? "rotate(" + this.angle + "deg)" : '';
	    transform = "translate(" + x + "px," + y + "px) " + rotate;
	    this.el.style[h.prefix.css + "transform"] = transform;
	    return this.el.style['transform'] = transform;
	  };

	  MotionPath.prototype.setModulePosition = function(x, y) {
	    this.el.setProp({
	      shiftX: x + "px",
	      shiftY: y + "px",
	      angle: this.angle
	    });
	    return this.el.draw();
	  };

	  MotionPath.prototype.makeMotionBlur = function(x, y) {
	    var absoluteAngle, coords, dX, dY, signX, signY, tailAngle;
	    tailAngle = 0;
	    signX = 1;
	    signY = 1;
	    if ((this.prevCoords.x == null) || (this.prevCoords.y == null)) {
	      this.speedX = 0;
	      this.speedY = 0;
	    } else {
	      dX = x - this.prevCoords.x;
	      dY = y - this.prevCoords.y;
	      if (dX > 0) {
	        signX = -1;
	      }
	      if (signX < 0) {
	        signY = -1;
	      }
	      this.speedX = Math.abs(dX);
	      this.speedY = Math.abs(dY);
	      tailAngle = Math.atan(dY / dX) * (180 / Math.PI) + 90;
	    }
	    absoluteAngle = tailAngle - this.angle;
	    coords = this.angToCoords(absoluteAngle);
	    this.blurX = h.clamp((this.speedX / 16) * this.props.motionBlur, 0, 1);
	    this.blurY = h.clamp((this.speedY / 16) * this.props.motionBlur, 0, 1);
	    this.setBlur({
	      blur: {
	        x: 3 * this.blurX * this.blurAmount * Math.abs(coords.x),
	        y: 3 * this.blurY * this.blurAmount * Math.abs(coords.y)
	      },
	      offset: {
	        x: 3 * signX * this.blurX * coords.x * this.blurAmount,
	        y: 3 * signY * this.blurY * coords.y * this.blurAmount
	      }
	    });
	    this.prevCoords.x = x;
	    return this.prevCoords.y = y;
	  };

	  MotionPath.prototype.setBlur = function(o) {
	    if (!this.isMotionBlurReset) {
	      this.filter.setAttribute('stdDeviation', o.blur.x + "," + o.blur.y);
	      this.filterOffset.setAttribute('dx', o.offset.x);
	      return this.filterOffset.setAttribute('dy', o.offset.y);
	    }
	  };

	  MotionPath.prototype.extendDefaults = function(o) {
	    var key, results, value;
	    results = [];
	    for (key in o) {
	      value = o[key];
	      results.push(this[key] = value);
	    }
	    return results;
	  };

	  MotionPath.prototype.extendOptions = function(o) {
	    var key, results, value;
	    results = [];
	    for (key in o) {
	      value = o[key];
	      results.push(this.props[key] = value);
	    }
	    return results;
	  };

	  MotionPath.prototype.then = function(o) {
	    var it, key, opts, prevOptions, value;
	    prevOptions = this.history[this.history.length - 1];
	    opts = {};
	    for (key in prevOptions) {
	      value = prevOptions[key];
	      if (!h.callbacksMap[key] && !h.tweenOptionMap[key] || key === 'duration') {
	        if (o[key] == null) {
	          o[key] = value;
	        }
	      } else {
	        if (o[key] == null) {
	          o[key] = void 0;
	        }
	      }
	      if (h.tweenOptionMap[key]) {
	        opts[key] = key !== 'duration' ? o[key] : o[key] != null ? o[key] : prevOptions[key];
	      }
	    }
	    this.history.push(o);
	    it = this;
	    opts.onUpdate = (function(_this) {
	      return function(p) {
	        return _this.setProgress(p);
	      };
	    })(this);
	    opts.onStart = (function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	      };
	    })(this);
	    opts.onComplete = (function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	      };
	    })(this);
	    opts.onFirstUpdate = function() {
	      return it.tuneOptions(it.history[this.index]);
	    };
	    opts.isChained = !o.delay;
	    this.tween.append(new Timeline(opts));
	    return this;
	  };

	  MotionPath.prototype.tuneOptions = function(o) {
	    this.extendOptions(o);
	    return this.postVars();
	  };

	  MotionPath.prototype.angToCoords = function(angle) {
	    var radAngle, x, y;
	    angle = angle % 360;
	    radAngle = ((angle - 90) * Math.PI) / 180;
	    x = Math.cos(radAngle);
	    y = Math.sin(radAngle);
	    x = x < 0 ? Math.max(x, -0.7) : Math.min(x, .7);
	    y = y < 0 ? Math.max(y, -0.7) : Math.min(y, .7);
	    return {
	      x: x * 1.428571429,
	      y: y * 1.428571429
	    };
	  };

	  return MotionPath;

	})();

	module.exports = MotionPath;

	},{"./easing":3,"./h":4,"./tween/timeline":21,"./tween/tween":22,"./vendor/resize":24}],7:[function(require,module,exports){

	(function(root) {
	  var offset, ref, ref1;
	  if (root.performance == null) {
	    root.performance = {};
	  }
	  Date.now = Date.now || function() {
	    return (new Date).getTime();
	  };
	  if (root.performance.now == null) {
	    offset = ((ref = root.performance) != null ? (ref1 = ref.timing) != null ? ref1.navigationStart : void 0 : void 0) ? performance.timing.navigationStart : Date.now();
	    return root.performance.now = function() {
	      return Date.now() - offset;
	    };
	  }
	})(window);

	},{}],8:[function(require,module,exports){

	(function() {
	  var k, lastTime, vendors, x;
	  lastTime = 0;
	  x = 0;
	  vendors = ["ms", "moz", "webkit", "o"];
	  while (x < vendors.length && !window.requestAnimationFrame) {
	    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
	    k = window[vendors[x] + "CancelRequestAnimationFrame"];
	    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || k;
	    ++x;
	  }
	  if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function(callback, element) {
	      var currTime, id, timeToCall;
	      currTime = new Date().getTime();
	      timeToCall = Math.max(0, 16 - (currTime - lastTime));
	      id = window.setTimeout(function() {
	        callback(currTime + timeToCall);
	      }, timeToCall);
	      lastTime = currTime + timeToCall;
	      return id;
	    };
	  }
	  if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function(id) {
	      clearTimeout(id);
	    };
	  }
	})();

	},{}],9:[function(require,module,exports){
	var Bit, h;

	h = require('../h');

	Bit = (function() {
	  Bit.prototype.ns = 'http://www.w3.org/2000/svg';

	  Bit.prototype.type = 'line';

	  Bit.prototype.ratio = 1;

	  Bit.prototype.defaults = {
	    radius: 50,
	    radiusX: void 0,
	    radiusY: void 0,
	    points: 3,
	    x: 0,
	    y: 0,
	    angle: 0,
	    'stroke': 'hotpink',
	    'stroke-width': 2,
	    'stroke-opacity': 1,
	    'fill': 'transparent',
	    'fill-opacity': 1,
	    'stroke-dasharray': '',
	    'stroke-dashoffset': '',
	    'stroke-linecap': ''
	  };

	  function Bit(o) {
	    this.o = o != null ? o : {};
	    this.init();
	    this;
	  }

	  Bit.prototype.init = function() {
	    this.vars();
	    this.render();
	    return this;
	  };

	  Bit.prototype.vars = function() {
	    if (this.o.ctx && this.o.ctx.tagName === 'svg') {
	      this.ctx = this.o.ctx;
	    } else if (!this.o.el) {
	      h.error('You should pass a real context(ctx) to the bit');
	    }
	    this.state = {};
	    this.drawMapLength = this.drawMap.length;
	    this.extendDefaults();
	    return this.calcTransform();
	  };

	  Bit.prototype.calcTransform = function() {
	    var rotate;
	    rotate = "rotate(" + this.props.angle + ", " + this.props.x + ", " + this.props.y + ")";
	    return this.props.transform = "" + rotate;
	  };

	  Bit.prototype.extendDefaults = function() {
	    var key, ref, results, value;
	    if (this.props == null) {
	      this.props = {};
	    }
	    ref = this.defaults;
	    results = [];
	    for (key in ref) {
	      value = ref[key];
	      results.push(this.props[key] = this.o[key] != null ? this.o[key] : value);
	    }
	    return results;
	  };

	  Bit.prototype.setAttr = function(attr, value) {
	    var el, key, keys, len, results, val;
	    if (typeof attr === 'object') {
	      keys = Object.keys(attr);
	      len = keys.length;
	      el = value || this.el;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        val = attr[key];
	        results.push(el.setAttribute(key, val));
	      }
	      return results;
	    } else {
	      return this.el.setAttribute(attr, value);
	    }
	  };

	  Bit.prototype.setProp = function(attr, value) {
	    var key, results, val;
	    if (typeof attr === 'object') {
	      results = [];
	      for (key in attr) {
	        val = attr[key];
	        results.push(this.props[key] = val);
	      }
	      return results;
	    } else {
	      return this.props[attr] = value;
	    }
	  };

	  Bit.prototype.render = function() {
	    this.isRendered = true;
	    if (this.o.el != null) {
	      this.el = this.o.el;
	      return this.isForeign = true;
	    } else {
	      this.el = document.createElementNS(this.ns, this.type || 'line');
	      !this.o.isDrawLess && this.draw();
	      return this.ctx.appendChild(this.el);
	    }
	  };

	  Bit.prototype.drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];

	  Bit.prototype.draw = function() {
	    var len, name;
	    this.props.length = this.getLength();
	    len = this.drawMapLength;
	    while (len--) {
	      name = this.drawMap[len];
	      switch (name) {
	        case 'stroke-dasharray':
	        case 'stroke-dashoffset':
	          this.castStrokeDash(name);
	      }
	      this.setAttrsIfChanged(name, this.props[name]);
	    }
	    return this.state.radius = this.props.radius;
	  };

	  Bit.prototype.castStrokeDash = function(name) {
	    var cast, dash, i, j, len1, ref, stroke;
	    if (h.isArray(this.props[name])) {
	      stroke = '';
	      ref = this.props[name];
	      for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	        dash = ref[i];
	        cast = dash.unit === '%' ? this.castPercent(dash.value) : dash.value;
	        stroke += cast + " ";
	      }
	      return this.props[name] = stroke;
	    }
	    if (typeof this.props[name] === 'object') {
	      return this.props[name] = this.props[name].unit === '%' ? this.castPercent(this.props[name].value) : this.props[name].value;
	    }
	  };

	  Bit.prototype.castPercent = function(percent) {
	    return percent * (this.props.length / 100);
	  };

	  Bit.prototype.setAttrsIfChanged = function(name, value) {
	    var key, keys, len, results;
	    if (typeof name === 'object') {
	      keys = Object.keys(name);
	      len = keys.length;
	      results = [];
	      while (len--) {
	        key = keys[len];
	        value = name[key];
	        results.push(this.setAttrIfChanged(key, value));
	      }
	      return results;
	    } else {
	      if (value == null) {
	        value = this.props[name];
	      }
	      return this.setAttrIfChanged(name, value);
	    }
	  };

	  Bit.prototype.setAttrIfChanged = function(name, value) {
	    if (this.isChanged(name, value)) {
	      this.el.setAttribute(name, value);
	      return this.state[name] = value;
	    }
	  };

	  Bit.prototype.isChanged = function(name, value) {
	    if (value == null) {
	      value = this.props[name];
	    }
	    return this.state[name] !== value;
	  };

	  Bit.prototype.getLength = function() {
	    var ref;
	    if ((((ref = this.el) != null ? ref.getTotalLength : void 0) != null) && this.el.getAttribute('d')) {
	      return this.el.getTotalLength();
	    } else {
	      return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	    }
	  };

	  return Bit;

	})();

	module.exports = Bit;

	},{"../h":4}],10:[function(require,module,exports){
	var Bit, BitsMap, Circle, Cross, Equal, Line, Polygon, Rect, Zigzag, h;

	Bit = require('./bit');

	Circle = require('./circle');

	Line = require('./line');

	Zigzag = require('./zigzag');

	Rect = require('./rect');

	Polygon = require('./polygon');

	Cross = require('./cross');

	Equal = require('./equal');

	h = require('../h');

	BitsMap = (function() {
	  function BitsMap() {}

	  BitsMap.prototype.h = h;

	  BitsMap.prototype.map = {
	    bit: Bit,
	    circle: Circle,
	    line: Line,
	    zigzag: Zigzag,
	    rect: Rect,
	    polygon: Polygon,
	    cross: Cross,
	    equal: Equal
	  };

	  BitsMap.prototype.getBit = function(name) {
	    return this.map[name] || this.h.error("no \"" + name + "\" shape available yet, please choose from this list:", this.map);
	  };

	  return BitsMap;

	})();

	module.exports = new BitsMap;

	},{"../h":4,"./bit":9,"./circle":11,"./cross":12,"./equal":13,"./line":14,"./polygon":15,"./rect":16,"./zigzag":17}],11:[function(require,module,exports){

	var Bit, Circle,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = require('./bit');

	Circle = (function(superClass) {
	  extend(Circle, superClass);

	  function Circle() {
	    return Circle.__super__.constructor.apply(this, arguments);
	  }

	  Circle.prototype.type = 'ellipse';

	  Circle.prototype.draw = function() {
	    var rx, ry;
	    rx = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    ry = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    this.setAttrsIfChanged({
	      rx: rx,
	      ry: ry,
	      cx: this.props.x,
	      cy: this.props.y
	    });
	    return Circle.__super__.draw.apply(this, arguments);
	  };

	  Circle.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * Math.PI * Math.sqrt((Math.pow(radiusX, 2) + Math.pow(radiusY, 2)) / 2);
	  };

	  return Circle;

	})(Bit);

	module.exports = Circle;

	},{"./bit":9}],12:[function(require,module,exports){

	var Bit, Cross,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = require('./bit');

	Cross = (function(superClass) {
	  extend(Cross, superClass);

	  function Cross() {
	    return Cross.__super__.constructor.apply(this, arguments);
	  }

	  Cross.prototype.type = 'path';

	  Cross.prototype.draw = function() {
	    var d, line1, line2, radiusX, radiusY, x1, x2, y1, y2;
	    Cross.__super__.draw.apply(this, arguments);
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    x1 = this.props.x - radiusX;
	    x2 = this.props.x + radiusX;
	    line1 = "M" + x1 + "," + this.props.y + " L" + x2 + "," + this.props.y;
	    y1 = this.props.y - radiusY;
	    y2 = this.props.y + radiusY;
	    line2 = "M" + this.props.x + "," + y1 + " L" + this.props.x + "," + y2;
	    d = line1 + " " + line2;
	    return this.setAttr({
	      d: d
	    });
	  };

	  Cross.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * (radiusX + radiusY);
	  };

	  return Cross;

	})(Bit);

	module.exports = Cross;

	},{"./bit":9}],13:[function(require,module,exports){

	var Bit, Equal,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = require('./bit');

	Equal = (function(superClass) {
	  extend(Equal, superClass);

	  function Equal() {
	    return Equal.__super__.constructor.apply(this, arguments);
	  }

	  Equal.prototype.type = 'path';

	  Equal.prototype.ratio = 1.43;

	  Equal.prototype.draw = function() {
	    var d, i, j, radiusX, radiusY, ref, x1, x2, y, yStart, yStep;
	    Equal.__super__.draw.apply(this, arguments);
	    if (!this.props.points) {
	      return;
	    }
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    x1 = this.props.x - radiusX;
	    x2 = this.props.x + radiusX;
	    d = '';
	    yStep = 2 * radiusY / (this.props.points - 1);
	    yStart = this.props.y - radiusY;
	    for (i = j = 0, ref = this.props.points; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      y = "" + (i * yStep + yStart);
	      d += "M" + x1 + ", " + y + " L" + x2 + ", " + y + " ";
	    }
	    return this.setAttr({
	      d: d
	    });
	  };

	  Equal.prototype.getLength = function() {
	    return 2 * (this.props.radiusX != null ? this.props.radiusX : this.props.radius);
	  };

	  return Equal;

	})(Bit);

	module.exports = Equal;

	},{"./bit":9}],14:[function(require,module,exports){

	var Bit, Line,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = require('./bit');

	Line = (function(superClass) {
	  extend(Line, superClass);

	  function Line() {
	    return Line.__super__.constructor.apply(this, arguments);
	  }

	  Line.prototype.draw = function() {
	    var radiusX;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    this.setAttrsIfChanged({
	      x1: this.props.x - radiusX,
	      x2: this.props.x + radiusX,
	      y1: this.props.y,
	      y2: this.props.y
	    });
	    return Line.__super__.draw.apply(this, arguments);
	  };

	  return Line;

	})(Bit);

	module.exports = Line;

	},{"./bit":9}],15:[function(require,module,exports){

	var Bit, Polygon, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = require('./bit');

	h = require('../h');

	Polygon = (function(superClass) {
	  extend(Polygon, superClass);

	  function Polygon() {
	    return Polygon.__super__.constructor.apply(this, arguments);
	  }

	  Polygon.prototype.type = 'path';

	  Polygon.prototype.draw = function() {
	    this.drawShape();
	    return Polygon.__super__.draw.apply(this, arguments);
	  };

	  Polygon.prototype.drawShape = function() {
	    var char, d, i, j, k, len, point, ref, ref1, step;
	    step = 360 / this.props.points;
	    this.radialPoints = [];
	    for (i = j = 0, ref = this.props.points; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      this.radialPoints.push(h.getRadialPoint({
	        radius: this.props.radius,
	        radiusX: this.props.radiusX,
	        radiusY: this.props.radiusY,
	        angle: i * step,
	        center: {
	          x: this.props.x,
	          y: this.props.y
	        }
	      }));
	    }
	    d = '';
	    ref1 = this.radialPoints;
	    for (i = k = 0, len = ref1.length; k < len; i = ++k) {
	      point = ref1[i];
	      char = i === 0 ? 'M' : 'L';
	      d += "" + char + (point.x.toFixed(4)) + "," + (point.y.toFixed(4)) + " ";
	    }
	    return this.setAttr({
	      d: d += 'z'
	    });
	  };

	  Polygon.prototype.getLength = function() {
	    return this.el.getTotalLength();
	  };

	  return Polygon;

	})(Bit);

	module.exports = Polygon;

	},{"../h":4,"./bit":9}],16:[function(require,module,exports){

	var Bit, Rect,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = require('./bit');

	Rect = (function(superClass) {
	  extend(Rect, superClass);

	  function Rect() {
	    return Rect.__super__.constructor.apply(this, arguments);
	  }

	  Rect.prototype.type = 'rect';

	  Rect.prototype.ratio = 1.43;

	  Rect.prototype.draw = function() {
	    var radiusX, radiusY;
	    Rect.__super__.draw.apply(this, arguments);
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return this.setAttrsIfChanged({
	      width: 2 * radiusX,
	      height: 2 * radiusY,
	      x: this.props.x - radiusX,
	      y: this.props.y - radiusY
	    });
	  };

	  Rect.prototype.getLength = function() {
	    var radiusX, radiusY;
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    return 2 * radiusX + 2 * radiusY;
	  };

	  return Rect;

	})(Bit);

	module.exports = Rect;

	},{"./bit":9}],17:[function(require,module,exports){

	var Bit, Zigzag,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Bit = require('./bit');

	Zigzag = (function(superClass) {
	  extend(Zigzag, superClass);

	  function Zigzag() {
	    return Zigzag.__super__.constructor.apply(this, arguments);
	  }

	  Zigzag.prototype.type = 'path';

	  Zigzag.prototype.ratio = 1.43;

	  Zigzag.prototype.draw = function() {
	    var char, i, iX, iX2, iY, iY2, j, points, radiusX, radiusY, ref, stepX, stepY, strokeWidth, xStart, yStart;
	    if (!this.props.points) {
	      return;
	    }
	    radiusX = this.props.radiusX != null ? this.props.radiusX : this.props.radius;
	    radiusY = this.props.radiusY != null ? this.props.radiusY : this.props.radius;
	    points = '';
	    stepX = 2 * radiusX / this.props.points;
	    stepY = 2 * radiusY / this.props.points;
	    strokeWidth = this.props['stroke-width'];
	    xStart = this.props.x - radiusX;
	    yStart = this.props.y - radiusY;
	    for (i = j = ref = this.props.points; ref <= 0 ? j < 0 : j > 0; i = ref <= 0 ? ++j : --j) {
	      iX = xStart + i * stepX + strokeWidth;
	      iY = yStart + i * stepY + strokeWidth;
	      iX2 = xStart + (i - 1) * stepX + strokeWidth;
	      iY2 = yStart + (i - 1) * stepY + strokeWidth;
	      char = i === this.props.points ? 'M' : 'L';
	      points += "" + char + iX + "," + iY + " l0, -" + stepY + " l-" + stepX + ", 0";
	    }
	    this.setAttr({
	      d: points
	    });
	    return Zigzag.__super__.draw.apply(this, arguments);
	  };

	  return Zigzag;

	})(Bit);

	module.exports = Zigzag;

	},{"./bit":9}],18:[function(require,module,exports){

	var Stagger, Timeline, Transit, Tween, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	h = require('./h');

	Timeline = require('./tween/timeline');

	Tween = require('./tween/tween');

	Transit = require('./transit');

	Stagger = (function(superClass) {
	  extend(Stagger, superClass);

	  function Stagger() {
	    return Stagger.__super__.constructor.apply(this, arguments);
	  }

	  Stagger.prototype.isSkipDelta = true;

	  Stagger.prototype.ownDefaults = {
	    delay: 'stagger(100)',
	    els: null,
	    fill: 'transparent',
	    stroke: ['yellow', 'cyan', 'deeppink'],
	    strokeDasharray: '100%',
	    strokeDashoffset: {
	      '100%': '0%'
	    },
	    isShowInit: false,
	    isShowEnd: false,
	    radius: 0,
	    type: 'line'
	  };

	  Stagger.prototype.vars = function() {
	    h.extend(this.ownDefaults, this.defaults);
	    this.defaults = this.ownDefaults;
	    Stagger.__super__.vars.apply(this, arguments);
	    return this.parseEls();
	  };

	  Stagger.prototype.extendDefaults = function(o) {
	    var fromObj, key, ref, results, value;
	    this.props = {};
	    this.deltas = {};
	    fromObj = o || this.o;
	    ref = this.defaults;
	    results = [];
	    for (key in ref) {
	      value = ref[key];
	      results.push(this.props[key] = fromObj[key] != null ? fromObj[key] : this.defaults[key]);
	    }
	    return results;
	  };

	  Stagger.prototype.parseEls = function() {
	    var els;
	    if (this.props.els + '' === '[object NodeList]') {
	      return this.props.els = Array.prototype.slice.call(this.props.els, 0);
	    } else if (typeof this.props.els === 'string') {
	      els = document.querySelector(this.props.els);
	      return this.props.els = h.getChildElements(els);
	    } else if (h.isDOM(this.props.els)) {
	      return this.props.els = h.getChildElements(this.props.els);
	    }
	  };

	  Stagger.prototype.createBit = function() {
	    var i, j, len, option, ref, results;
	    this.transits = [];
	    len = this.props.els.length;
	    results = [];
	    for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	      option = this.getOption(i);
	      option.index = i;
	      option.isRunLess = true;
	      results.push(this.transits.push(new Transit(option)));
	    }
	    return results;
	  };

	  Stagger.prototype.getOption = function(i) {
	    var key, option, ref, value;
	    option = {};
	    ref = this.props;
	    for (key in ref) {
	      value = ref[key];
	      option[key] = this.getPropByMod(key, i);
	    }
	    option.bit = this.getPropByMod('els', i);
	    return option;
	  };

	  Stagger.prototype.getPropByMod = function(name, i) {
	    var prop;
	    prop = this.props[name];
	    if (h.isArray(prop)) {
	      return prop[i % prop.length];
	    } else {
	      return prop;
	    }
	  };

	  Stagger.prototype.render = function() {
	    this.createBit();
	    this.setProgress(0, true);
	    this.createTween();
	    return this;
	  };

	  Stagger.prototype.isDelta = function() {
	    return false;
	  };

	  Stagger.prototype.createTween = function() {
	    var i;
	    this.tween = new Tween;
	    i = -1;
	    while (i++ < this.transits.length - 1) {
	      this.tween.add(this.transits[i].tween);
	    }
	    return !this.o.isRunLess && this.startTween();
	  };

	  Stagger.prototype.draw = function() {
	    return this.drawEl();
	  };

	  return Stagger;

	})(Transit);

	module.exports = Stagger;

	},{"./h":4,"./transit":20,"./tween/timeline":21,"./tween/tween":22}],19:[function(require,module,exports){

	var Swirl, Transit,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Transit = require('./transit');

	Swirl = (function(superClass) {
	  extend(Swirl, superClass);

	  function Swirl() {
	    return Swirl.__super__.constructor.apply(this, arguments);
	  }

	  Swirl.prototype.skipPropsDelta = {
	    x: 1,
	    y: 1
	  };

	  Swirl.prototype.vars = function() {
	    Swirl.__super__.vars.apply(this, arguments);
	    return !this.o.isSwirlLess && this.generateSwirl();
	  };

	  Swirl.prototype.extendDefaults = function() {
	    var angle, base, x, y;
	    Swirl.__super__.extendDefaults.apply(this, arguments);
	    x = this.getPosValue('x');
	    y = this.getPosValue('y');
	    angle = 90 + Math.atan((y.delta / x.delta) || 0) * (180 / Math.PI);
	    if (x.delta < 0) {
	      angle += 180;
	    }
	    this.positionDelta = {
	      radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
	      angle: angle,
	      x: x,
	      y: y
	    };
	    if ((base = this.o).radiusScale == null) {
	      base.radiusScale = 1;
	    }
	    this.props.angleShift = this.h.parseIfRand(this.o.angleShift || 0);
	    return this.props.radiusScale = this.h.parseIfRand(this.o.radiusScale);
	  };

	  Swirl.prototype.getPosValue = function(name) {
	    var optVal, val;
	    optVal = this.o[name];
	    if (optVal && typeof optVal === 'object') {
	      val = this.h.parseDelta(name, optVal);
	      return {
	        start: val.start.value,
	        end: val.end.value,
	        delta: val.delta,
	        units: val.end.unit
	      };
	    } else {
	      val = parseFloat(optVal || this.defaults[name]);
	      return {
	        start: val,
	        end: val,
	        delta: 0,
	        units: 'px'
	      };
	    }
	  };

	  Swirl.prototype.setProgress = function(progress) {
	    var angle, point, x, y;
	    angle = this.positionDelta.angle;
	    if (this.o.isSwirl) {
	      angle += this.getSwirl(progress);
	    }
	    point = this.h.getRadialPoint({
	      angle: angle,
	      radius: this.positionDelta.radius * progress * this.props.radiusScale,
	      center: {
	        x: this.positionDelta.x.start,
	        y: this.positionDelta.y.start
	      }
	    });
	    x = point.x.toFixed(4);
	    y = point.y.toFixed(4);
	    this.props.x = this.o.ctx ? x : x + this.positionDelta.x.units;
	    this.props.y = this.o.ctx ? y : y + this.positionDelta.y.units;
	    return Swirl.__super__.setProgress.apply(this, arguments);
	  };

	  Swirl.prototype.generateSwirl = function() {
	    var base, base1;
	    this.props.signRand = Math.round(this.h.rand(0, 1)) ? -1 : 1;
	    if ((base = this.o).swirlSize == null) {
	      base.swirlSize = 10;
	    }
	    if ((base1 = this.o).swirlFrequency == null) {
	      base1.swirlFrequency = 3;
	    }
	    this.props.swirlSize = this.h.parseIfRand(this.o.swirlSize);
	    return this.props.swirlFrequency = this.h.parseIfRand(this.o.swirlFrequency);
	  };

	  Swirl.prototype.getSwirl = function(progress) {
	    return this.props.signRand * this.props.swirlSize * Math.sin(this.props.swirlFrequency * progress);
	  };

	  return Swirl;

	})(Transit);

	module.exports = Swirl;

	},{"./transit":20}],20:[function(require,module,exports){

	var Timeline, Transit, Tween, bitsMap, h,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	h = require('./h');

	bitsMap = require('./shapes/bitsMap');

	Timeline = require('./tween/timeline');

	Tween = require('./tween/tween');

	Transit = (function(superClass) {
	  extend(Transit, superClass);

	  function Transit() {
	    return Transit.__super__.constructor.apply(this, arguments);
	  }

	  Transit.prototype.progress = 0;

	  Transit.prototype.defaults = {
	    strokeWidth: 2,
	    strokeOpacity: 1,
	    strokeDasharray: 0,
	    strokeDashoffset: 0,
	    stroke: 'transparent',
	    fill: 'deeppink',
	    fillOpacity: 'transparent',
	    strokeLinecap: '',
	    points: 3,
	    x: 0,
	    y: 0,
	    shiftX: 0,
	    shiftY: 0,
	    opacity: 1,
	    radius: {
	      0: 50
	    },
	    radiusX: void 0,
	    radiusY: void 0,
	    angle: 0,
	    size: null,
	    sizeGap: 0,
	    onStart: null,
	    onComplete: null,
	    onUpdate: null,
	    duration: 500,
	    delay: 0,
	    repeat: 0,
	    yoyo: false,
	    easing: 'Linear.None'
	  };

	  Transit.prototype.vars = function() {
	    var o;
	    if (this.h == null) {
	      this.h = h;
	    }
	    if (this.lastSet == null) {
	      this.lastSet = {};
	    }
	    this.index = this.o.index || 0;
	    this.extendDefaults();
	    o = this.h.cloneObj(this.o);
	    this.h.extend(o, this.defaults);
	    this.history = [o];
	    this.isForeign = !!this.o.ctx;
	    this.isForeignBit = !!this.o.bit;
	    return this.timelines = [];
	  };

	  Transit.prototype.render = function() {
	    if (!this.isRendered) {
	      if (!this.isForeign && !this.isForeignBit) {
	        this.ctx = document.createElementNS(this.ns, 'svg');
	        this.ctx.style.position = 'absolute';
	        this.ctx.style.width = '100%';
	        this.ctx.style.height = '100%';
	        this.createBit();
	        this.calcSize();
	        this.el = document.createElement('div');
	        this.el.appendChild(this.ctx);
	        (this.o.parent || document.body).appendChild(this.el);
	      } else {
	        this.ctx = this.o.ctx;
	        this.createBit();
	        this.calcSize();
	      }
	      this.isRendered = true;
	    }
	    this.setElStyles();
	    this.setProgress(0, true);
	    this.createTween();
	    return this;
	  };

	  Transit.prototype.setElStyles = function() {
	    var marginSize, ref, size;
	    if (!this.isForeign) {
	      size = this.props.size + "px";
	      marginSize = (-this.props.size / 2) + "px";
	      this.el.style.position = 'absolute';
	      this.el.style.top = this.props.y;
	      this.el.style.left = this.props.x;
	      this.el.style.width = size;
	      this.el.style.height = size;
	      this.el.style['margin-left'] = marginSize;
	      this.el.style['margin-top'] = marginSize;
	      this.el.style['marginLeft'] = marginSize;
	      this.el.style['marginTop'] = marginSize;
	    }
	    if ((ref = this.el) != null) {
	      ref.style.opacity = this.props.opacity;
	    }
	    if (this.o.isShowInit) {
	      return this.show();
	    } else {
	      return this.hide();
	    }
	  };

	  Transit.prototype.show = function() {
	    if (this.isShown || (this.el == null)) {
	      return;
	    }
	    this.el.style.display = 'block';
	    return this.isShown = true;
	  };

	  Transit.prototype.hide = function() {
	    if ((this.isShown === false) || (this.el == null)) {
	      return;
	    }
	    this.el.style.display = 'none';
	    return this.isShown = false;
	  };

	  Transit.prototype.draw = function() {
	    this.bit.setProp({
	      x: this.origin.x,
	      y: this.origin.y,
	      stroke: this.props.stroke,
	      'stroke-width': this.props.strokeWidth,
	      'stroke-opacity': this.props.strokeOpacity,
	      'stroke-dasharray': this.props.strokeDasharray,
	      'stroke-dashoffset': this.props.strokeDashoffset,
	      'stroke-linecap': this.props.strokeLinecap,
	      fill: this.props.fill,
	      'fill-opacity': this.props.fillOpacity,
	      radius: this.props.radius,
	      radiusX: this.props.radiusX,
	      radiusY: this.props.radiusY,
	      points: this.props.points,
	      transform: this.calcTransform()
	    });
	    this.bit.draw();
	    return this.drawEl();
	  };

	  Transit.prototype.drawEl = function() {
	    if (this.el == null) {
	      return;
	    }
	    this.isPropChanged('opacity') && (this.el.style.opacity = this.props.opacity);
	    if (!this.isForeign) {
	      this.isPropChanged('x') && (this.el.style.left = this.props.x);
	      this.isPropChanged('y') && (this.el.style.top = this.props.y);
	      if (this.isNeedsTransform()) {
	        return this.h.setPrefixedStyle(this.el, 'transform', this.fillTransform());
	      }
	    }
	  };

	  Transit.prototype.fillTransform = function() {
	    return "translate(" + this.props.shiftX + ", " + this.props.shiftY + ")";
	  };

	  Transit.prototype.isNeedsTransform = function() {
	    var isX, isY;
	    isX = this.isPropChanged('shiftX');
	    isY = this.isPropChanged('shiftY');
	    return isX || isY;
	  };

	  Transit.prototype.isPropChanged = function(name) {
	    var base;
	    if ((base = this.lastSet)[name] == null) {
	      base[name] = {};
	    }
	    if (this.lastSet[name].value !== this.props[name]) {
	      this.lastSet[name].value = this.props[name];
	      return true;
	    } else {
	      return false;
	    }
	  };

	  Transit.prototype.calcTransform = function() {
	    return this.props.transform = "rotate(" + this.props.angle + "," + this.origin.x + "," + this.origin.y + ")";
	  };

	  Transit.prototype.calcSize = function() {
	    var base, dStroke, radius, stroke;
	    if (this.o.size) {
	      return;
	    }
	    radius = this.calcMaxRadius();
	    dStroke = this.deltas['strokeWidth'];
	    stroke = dStroke != null ? Math.max(Math.abs(dStroke.start), Math.abs(dStroke.end)) : this.props.strokeWidth;
	    this.props.size = 2 * radius + 2 * stroke;
	    switch (typeof (base = this.props.easing).toLowerCase === "function" ? base.toLowerCase() : void 0) {
	      case 'elastic.out':
	      case 'elastic.inout':
	        this.props.size *= 1.25;
	        break;
	      case 'back.out':
	      case 'back.inout':
	        this.props.size *= 1.1;
	    }
	    this.props.size *= this.bit.ratio;
	    this.props.size += 2 * this.props.sizeGap;
	    return this.props.center = this.props.size / 2;
	  };

	  Transit.prototype.calcMaxRadius = function() {
	    var selfSize, selfSizeX, selfSizeY;
	    selfSize = this.getRadiusSize({
	      key: 'radius'
	    });
	    selfSizeX = this.getRadiusSize({
	      key: 'radiusX',
	      fallback: selfSize
	    });
	    selfSizeY = this.getRadiusSize({
	      key: 'radiusY',
	      fallback: selfSize
	    });
	    return Math.max(selfSizeX, selfSizeY);
	  };

	  Transit.prototype.getRadiusSize = function(o) {
	    if (this.deltas[o.key] != null) {
	      return Math.max(Math.abs(this.deltas[o.key].end), Math.abs(this.deltas[o.key].start));
	    } else if (this.props[o.key] != null) {
	      return parseFloat(this.props[o.key]);
	    } else {
	      return o.fallback || 0;
	    }
	  };

	  Transit.prototype.createBit = function() {
	    var bitClass;
	    bitClass = bitsMap.getBit(this.o.type || this.type);
	    this.bit = new bitClass({
	      ctx: this.ctx,
	      el: this.o.bit,
	      isDrawLess: true
	    });
	    if (this.isForeign || this.isForeignBit) {
	      return this.el = this.bit.el;
	    }
	  };

	  Transit.prototype.setProgress = function(progress, isShow) {
	    if (!isShow) {
	      this.show();
	      if (typeof this.onUpdate === "function") {
	        this.onUpdate(progress);
	      }
	    }
	    this.progress = progress < 0 || !progress ? 0 : progress > 1 ? 1 : progress;
	    this.calcCurrentProps(progress);
	    this.calcOrigin();
	    this.draw(progress);
	    return this;
	  };

	  Transit.prototype.calcCurrentProps = function(progress) {
	    var a, b, dash, g, i, item, key, keys, len, r, results, stroke, units, value;
	    keys = Object.keys(this.deltas);
	    len = keys.length;
	    results = [];
	    while (len--) {
	      key = keys[len];
	      value = this.deltas[key];
	      results.push(this.props[key] = (function() {
	        var k, len1, ref;
	        switch (value.type) {
	          case 'array':
	            stroke = [];
	            ref = value.delta;
	            for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
	              item = ref[i];
	              dash = value.start[i].value + item.value * this.progress;
	              stroke.push({
	                value: dash,
	                unit: item.unit
	              });
	            }
	            return stroke;
	          case 'number':
	            return value.start + value.delta * progress;
	          case 'unit':
	            units = value.end.unit;
	            return "" + (value.start.value + value.delta * progress) + units;
	          case 'color':
	            r = parseInt(value.start.r + value.delta.r * progress, 10);
	            g = parseInt(value.start.g + value.delta.g * progress, 10);
	            b = parseInt(value.start.b + value.delta.b * progress, 10);
	            a = parseInt(value.start.a + value.delta.a * progress, 10);
	            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	        }
	      }).call(this));
	    }
	    return results;
	  };

	  Transit.prototype.calcOrigin = function() {
	    return this.origin = this.o.ctx ? {
	      x: parseFloat(this.props.x),
	      y: parseFloat(this.props.y)
	    } : {
	      x: this.props.center,
	      y: this.props.center
	    };
	  };

	  Transit.prototype.extendDefaults = function(o) {
	    var array, defaultsValue, fromObject, i, k, key, keys, len, len1, optionsValue, property, ref, unit, value;
	    if (this.props == null) {
	      this.props = {};
	    }
	    fromObject = o || this.defaults;
	    (o == null) && (this.deltas = {});
	    keys = Object.keys(fromObject);
	    len = keys.length;
	    while (len--) {
	      key = keys[len];
	      defaultsValue = fromObject[key];
	      if ((ref = this.skipProps) != null ? ref[key] : void 0) {
	        continue;
	      }
	      if (o) {
	        this.o[key] = defaultsValue;
	        optionsValue = defaultsValue;
	        delete this.deltas[key];
	      } else {
	        optionsValue = this.o[key] != null ? this.o[key] : defaultsValue;
	      }
	      if (!this.isDelta(optionsValue)) {
	        if (typeof optionsValue === 'string') {
	          if (optionsValue.match(/stagger/)) {
	            optionsValue = this.h.parseStagger(optionsValue, this.index);
	          }
	        }
	        if (typeof optionsValue === 'string') {
	          if (optionsValue.match(/rand/)) {
	            optionsValue = this.h.parseRand(optionsValue);
	          }
	        }
	        this.props[key] = optionsValue;
	        if (key === 'radius') {
	          if (this.o.radiusX == null) {
	            this.props.radiusX = optionsValue;
	          }
	          if (this.o.radiusY == null) {
	            this.props.radiusY = optionsValue;
	          }
	        }
	        if (this.h.posPropsMap[key]) {
	          this.props[key] = this.h.parseUnit(this.props[key]).string;
	        }
	        if (this.h.strokeDashPropsMap[key]) {
	          property = this.props[key];
	          value = [];
	          switch (typeof property) {
	            case 'number':
	              value.push(this.h.parseUnit(property));
	              break;
	            case 'string':
	              array = this.props[key].split(' ');
	              for (i = k = 0, len1 = array.length; k < len1; i = ++k) {
	                unit = array[i];
	                value.push(this.h.parseUnit(unit));
	              }
	          }
	          this.props[key] = value;
	        }
	        continue;
	      }
	      this.isSkipDelta || this.getDelta(key, optionsValue);
	    }
	    return this.onUpdate = this.props.onUpdate;
	  };

	  Transit.prototype.isDelta = function(optionsValue) {
	    var isObject;
	    isObject = (optionsValue != null) && (typeof optionsValue === 'object');
	    isObject = isObject && !optionsValue.unit;
	    return !(!isObject || this.h.isArray(optionsValue) || h.isDOM(optionsValue));
	  };

	  Transit.prototype.getDelta = function(key, optionsValue) {
	    var delta, ref;
	    if ((key === 'x' || key === 'y') && !this.o.ctx) {
	      this.h.warn('Consider to animate shiftX/shiftY properties instead of x/y, as it would be much more performant', optionsValue);
	    }
	    if ((ref = this.skipPropsDelta) != null ? ref[key] : void 0) {
	      return;
	    }
	    delta = this.h.parseDelta(key, optionsValue, this.defaults[key]);
	    if (delta.type != null) {
	      this.deltas[key] = delta;
	    }
	    return this.props[key] = delta.start;
	  };

	  Transit.prototype.mergeThenOptions = function(start, end) {
	    var endValue, i, isFunction, key, keys, o, startKey, startKeys, value;
	    o = {};
	    for (key in start) {
	      value = start[key];
	      if (!this.h.tweenOptionMap[key] && !this.h.callbacksMap[key] || key === 'duration') {
	        o[key] = value;
	      } else {
	        o[key] = key === 'easing' ? '' : void 0;
	      }
	    }
	    keys = Object.keys(end);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      endValue = end[key];
	      isFunction = typeof endValue === 'function';
	      if (this.h.tweenOptionMap[key] || typeof endValue === 'object' || isFunction) {
	        o[key] = endValue != null ? endValue : start[key];
	        continue;
	      }
	      startKey = start[key];
	      if (startKey == null) {
	        startKey = this.defaults[key];
	      }
	      if ((key === 'radiusX' || key === 'radiusY') && (startKey == null)) {
	        startKey = start.radius;
	      }
	      if (typeof startKey === 'object' && (startKey != null)) {
	        startKeys = Object.keys(startKey);
	        startKey = startKey[startKeys[0]];
	      }
	      if (endValue != null) {
	        o[key] = {};
	        o[key][startKey] = endValue;
	      }
	    }
	    return o;
	  };

	  Transit.prototype.then = function(o) {
	    var i, it, keys, len, merged, opts;
	    if ((o == null) || !Object.keys(o)) {
	      return;
	    }
	    merged = this.mergeThenOptions(this.history[this.history.length - 1], o);
	    this.history.push(merged);
	    keys = Object.keys(this.h.tweenOptionMap);
	    i = keys.length;
	    opts = {};
	    while (i--) {
	      opts[keys[i]] = merged[keys[i]];
	    }
	    it = this;
	    len = it.history.length;
	    (function(_this) {
	      return (function(len) {
	        opts.onUpdate = function(p) {
	          return _this.setProgress(p);
	        };
	        opts.onStart = function() {
	          var ref;
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	        opts.onComplete = function() {
	          var ref;
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	        opts.onFirstUpdate = function() {
	          return it.tuneOptions(it.history[this.index]);
	        };
	        opts.isChained = !o.delay;
	        return _this.tween.append(new Timeline(opts));
	      });
	    })(this)(len);
	    return this;
	  };

	  Transit.prototype.tuneOptions = function(o) {
	    this.extendDefaults(o);
	    this.calcSize();
	    return this.setElStyles();
	  };

	  Transit.prototype.createTween = function() {
	    var it;
	    it = this;
	    this.createTimeline();
	    this.tween = new Tween({
	      onComplete: (function(_this) {
	        return function() {
	          var ref;
	          !_this.o.isShowEnd && _this.hide();
	          return (ref = _this.props.onComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this)
	    });
	    this.tween.add(this.timeline);
	    return !this.o.isRunLess && this.startTween();
	  };

	  Transit.prototype.createTimeline = function() {
	    return this.timeline = new Timeline({
	      duration: this.props.duration,
	      delay: this.props.delay,
	      repeat: this.props.repeat,
	      yoyo: this.props.yoyo,
	      easing: this.props.easing,
	      onUpdate: (function(_this) {
	        return function(p) {
	          return _this.setProgress(p);
	        };
	      })(this),
	      onStart: (function(_this) {
	        return function() {
	          var ref;
	          _this.show();
	          return (ref = _this.props.onStart) != null ? ref.apply(_this) : void 0;
	        };
	      })(this),
	      onFirstUpdateBackward: (function(_this) {
	        return function() {
	          return _this.history.length > 1 && _this.tuneOptions(_this.history[0]);
	        };
	      })(this),
	      onReverseComplete: (function(_this) {
	        return function() {
	          var ref;
	          !_this.o.isShowInit && _this.hide();
	          return (ref = _this.props.onReverseComplete) != null ? ref.apply(_this) : void 0;
	        };
	      })(this)
	    });
	  };

	  Transit.prototype.run = function(o) {
	    var key, keys, len;
	    if (o && Object.keys(o).length) {
	      if (this.history.length > 1) {
	        keys = Object.keys(o);
	        len = keys.length;
	        while (len--) {
	          key = keys[len];
	          if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
	            h.warn("the property \"" + key + "\" property can not be overridden on run with \"then\" chain yet");
	            delete o[key];
	          }
	        }
	      }
	      this.transformHistory(o);
	      this.tuneNewOption(o);
	      o = this.h.cloneObj(this.o);
	      this.h.extend(o, this.defaults);
	      this.history[0] = o;
	      !this.o.isDrawLess && this.setProgress(0, true);
	    }
	    return this.startTween();
	  };

	  Transit.prototype.transformHistory = function(o) {
	    var historyLen, i, j, key, keys, len, optionRecord, results, value, value2, valueKeys, valueKeys2;
	    keys = Object.keys(o);
	    i = -1;
	    len = keys.length;
	    historyLen = this.history.length;
	    results = [];
	    while (++i < len) {
	      key = keys[i];
	      j = 0;
	      results.push((function() {
	        var results1;
	        results1 = [];
	        while (++j < historyLen) {
	          optionRecord = this.history[j][key];
	          if (typeof optionRecord === 'object') {
	            valueKeys = Object.keys(optionRecord);
	            value = optionRecord[valueKeys[0]];
	            delete this.history[j][key][valueKeys[0]];
	            if (typeof o[key] === 'object') {
	              valueKeys2 = Object.keys(o[key]);
	              value2 = o[key][valueKeys2[0]];
	              this.history[j][key][value2] = value;
	            } else {
	              this.history[j][key][o[key]] = value;
	            }
	            break;
	          } else {
	            results1.push(this.history[j][key] = o[key]);
	          }
	        }
	        return results1;
	      }).call(this));
	    }
	    return results;
	  };

	  Transit.prototype.tuneNewOption = function(o, isForeign) {
	    if ((o != null) && (o.type != null) && o.type !== (this.o.type || this.type)) {
	      this.h.warn('Sorry, type can not be changed on run');
	      delete o.type;
	    }
	    if ((o != null) && Object.keys(o).length) {
	      this.extendDefaults(o);
	      this.resetTimeline();
	      !isForeign && this.tween.recalcDuration();
	      this.calcSize();
	      return !isForeign && this.setElStyles();
	    }
	  };

	  Transit.prototype.startTween = function() {
	    return setTimeout(((function(_this) {
	      return function() {
	        var ref;
	        return (ref = _this.tween) != null ? ref.start() : void 0;
	      };
	    })(this)), 1);
	  };

	  Transit.prototype.resetTimeline = function() {
	    var i, k, key, len1, ref, timelineOptions;
	    timelineOptions = {};
	    ref = Object.keys(this.h.tweenOptionMap);
	    for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
	      key = ref[i];
	      timelineOptions[key] = this.props[key];
	    }
	    timelineOptions.onStart = this.props.onStart;
	    timelineOptions.onComplete = this.props.onComplete;
	    return this.timeline.setProp(timelineOptions);
	  };

	  Transit.prototype.getBitLength = function() {
	    this.props.bitLength = this.bit.getLength();
	    return this.props.bitLength;
	  };

	  return Transit;

	})(bitsMap.map.bit);

	module.exports = Transit;

	},{"./h":4,"./shapes/bitsMap":10,"./tween/timeline":21,"./tween/tween":22}],21:[function(require,module,exports){
	var Easing, Timeline, h;

	Easing = require('../easing');

	h = require('../h');

	Timeline = (function() {
	  Timeline.prototype.defaults = {
	    duration: 600,
	    delay: 0,
	    repeat: 0,
	    yoyo: false,
	    easing: 'Linear.None',
	    durationElapsed: 0,
	    delayElapsed: 0,
	    onStart: null,
	    onComplete: null,
	    isChained: false
	  };

	  function Timeline(o) {
	    this.o = o != null ? o : {};
	    this.extendDefaults();
	    this.vars();
	    this;
	  }

	  Timeline.prototype.vars = function() {
	    this.h = h;
	    this.props = {};
	    this.progress = 0;
	    this.prevTime = 0;
	    return this.calcDimentions();
	  };

	  Timeline.prototype.calcDimentions = function() {
	    var easing;
	    this.props.totalTime = (this.o.repeat + 1) * (this.o.duration + this.o.delay);
	    this.props.totalDuration = this.props.totalTime - this.o.delay;
	    easing = h.splitEasing(this.o.easing);
	    return this.props.easing = typeof easing === 'function' ? easing : Easing[easing[0]][easing[1]];
	  };

	  Timeline.prototype.extendDefaults = function() {
	    h.extend(this.o, this.defaults);
	    return this.onUpdate = this.o.onUpdate;
	  };

	  Timeline.prototype.start = function(time) {
	    this.isCompleted = false;
	    this.isStarted = false;
	    this.props.startTime = (time || performance.now()) + this.o.delay;
	    this.props.endTime = this.props.startTime + this.props.totalDuration;
	    return this;
	  };

	  Timeline.prototype.update = function(time) {
	    var cnt, elapsed, isFlip, ref, ref1, ref2, ref3, ref4, ref5, start;
	    if ((time >= this.props.startTime) && (time < this.props.endTime)) {
	      this.isOnReverseComplete = false;
	      this.isCompleted = false;
	      if (!this.isFirstUpdate) {
	        if ((ref = this.o.onFirstUpdate) != null) {
	          ref.apply(this);
	        }
	        this.isFirstUpdate = true;
	      }
	      if (!this.isStarted) {
	        if ((ref1 = this.o.onStart) != null) {
	          ref1.apply(this);
	        }
	        this.isStarted = true;
	      }
	      elapsed = time - this.props.startTime;
	      if (elapsed <= this.o.duration) {
	        this.setProc(elapsed / this.o.duration);
	      } else {
	        start = this.props.startTime;
	        isFlip = false;
	        cnt = 0;
	        while (start <= time) {
	          isFlip = !isFlip;
	          start += isFlip ? (cnt++, this.o.duration) : this.o.delay;
	        }
	        if (isFlip) {
	          start = start - this.o.duration;
	          elapsed = time - start;
	          this.setProc(elapsed / this.o.duration);
	          if (this.o.yoyo && this.o.repeat) {
	            this.setProc(cnt % 2 === 1 ? this.progress : 1 - (this.progress === 0 ? 1 : this.progress));
	          }
	        } else {
	          this.setProc(0);
	        }
	      }
	      if (time < this.prevTime && !this.isFirstUpdateBackward) {
	        if ((ref2 = this.o.onFirstUpdateBackward) != null) {
	          ref2.apply(this);
	        }
	        this.isFirstUpdateBackward = true;
	      }
	      if (typeof this.onUpdate === "function") {
	        this.onUpdate(this.easedProgress);
	      }
	    } else {
	      if (time >= this.props.endTime && !this.isCompleted) {
	        this.setProc(1);
	        if (typeof this.onUpdate === "function") {
	          this.onUpdate(this.easedProgress);
	        }
	        if ((ref3 = this.o.onComplete) != null) {
	          ref3.apply(this);
	        }
	        this.isCompleted = true;
	        this.isOnReverseComplete = false;
	      }
	      if (time > this.props.endTime || time < this.props.startTime) {
	        this.isFirstUpdate = false;
	      }
	      if (time > this.props.endTime) {
	        this.isFirstUpdateBackward = false;
	      }
	    }
	    if (time < this.prevTime && time <= this.props.startTime) {
	      if (!this.isFirstUpdateBackward) {
	        if ((ref4 = this.o.onFirstUpdateBackward) != null) {
	          ref4.apply(this);
	        }
	        this.isFirstUpdateBackward = true;
	      }
	      if (!this.isOnReverseComplete) {
	        this.isOnReverseComplete = true;
	        this.setProc(0);
	        !this.o.isChained && (typeof this.onUpdate === "function" ? this.onUpdate(this.easedProgress) : void 0);
	        if ((ref5 = this.o.onReverseComplete) != null) {
	          ref5.apply(this);
	        }
	      }
	    }
	    return this.prevTime = time;
	  };

	  Timeline.prototype.setProc = function(p) {
	    this.progress = p;
	    return this.easedProgress = this.props.easing(this.progress);
	  };

	  Timeline.prototype.setProp = function(obj, value) {
	    var key, val;
	    if (typeof obj === 'object') {
	      for (key in obj) {
	        val = obj[key];
	        this.o[key] = val;
	      }
	    } else if (typeof obj === 'string') {
	      this.o[obj] = value;
	    }
	    return this.calcDimentions();
	  };

	  return Timeline;

	})();

	module.exports = Timeline;

	},{"../easing":3,"../h":4}],22:[function(require,module,exports){
	var Tween, h, t;

	h = require('../h');

	t = require('./tweener');

	Tween = (function() {
	  Tween.prototype.state = 'stop';

	  function Tween(o) {
	    this.o = o != null ? o : {};
	    this.vars();
	    this;
	  }

	  Tween.prototype.vars = function() {
	    this.timelines = [];
	    this.props = {
	      totalTime: 0
	    };
	    this.loop = h.bind(this.loop, this);
	    return this.onUpdate = this.o.onUpdate;
	  };

	  Tween.prototype.add = function() {
	    var timeline;
	    timeline = Array.prototype.slice.apply(arguments);
	    return this.pushTimelineArray(timeline);
	  };

	  Tween.prototype.pushTimelineArray = function(array) {
	    var i, j, len1, results, tm;
	    results = [];
	    for (i = j = 0, len1 = array.length; j < len1; i = ++j) {
	      tm = array[i];
	      if (h.isArray(tm)) {
	        results.push(this.pushTimelineArray(tm));
	      } else {
	        results.push(this.pushTimeline(tm));
	      }
	    }
	    return results;
	  };

	  Tween.prototype.pushTimeline = function(timeline) {
	    this.timelines.push(timeline);
	    return this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime);
	  };

	  Tween.prototype.remove = function(timeline) {
	    var index;
	    index = this.timelines.indexOf(timeline);
	    if (index !== -1) {
	      return this.timelines.splice(index, 1);
	    }
	  };

	  Tween.prototype.append = function(timeline) {
	    var i;
	    if (!h.isArray(timeline)) {
	      timeline.index = this.timelines.length;
	      this.appendTimeline(timeline);
	      return this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime);
	    } else {
	      i = timeline.length;
	      while (i--) {
	        this.appendTimeline(timeline[i]);
	      }
	      return this.recalcDuration();
	    }
	  };

	  Tween.prototype.appendTimeline = function(timeline) {
	    timeline.setProp({
	      delay: timeline.o.delay + this.props.totalTime
	    });
	    return this.timelines.push(timeline);
	  };

	  Tween.prototype.recalcDuration = function() {
	    var len, results, timeline;
	    len = this.timelines.length;
	    this.props.totalTime = 0;
	    results = [];
	    while (len--) {
	      timeline = this.timelines[len];
	      results.push(this.props.totalTime = Math.max(timeline.props.totalTime, this.props.totalTime));
	    }
	    return results;
	  };

	  Tween.prototype.update = function(time) {
	    var i, len, ref, ref1;
	    if (time > this.props.endTime) {
	      time = this.props.endTime;
	    }
	    i = -1;
	    len = this.timelines.length - 1;
	    while (i++ < len) {
	      this.timelines[i].update(time);
	    }
	    if (time >= this.props.startTime && time < this.props.endTime) {
	      if (typeof this.onUpdate === "function") {
	        this.onUpdate((time - this.props.startTime) / this.props.totalTime);
	      }
	    }
	    if (this.prevTime > time && time <= this.props.startTime) {
	      if ((ref = this.o.onReverseComplete) != null) {
	        ref.apply(this);
	      }
	    }
	    this.prevTime = time;
	    if (time === this.props.endTime) {
	      if (typeof this.onUpdate === "function") {
	        this.onUpdate(1);
	      }
	      if ((ref1 = this.o.onComplete) != null) {
	        ref1.apply(this);
	      }
	      return true;
	    }
	  };

	  Tween.prototype.prepareStart = function() {
	    var ref;
	    this.getDimentions();
	    return (ref = this.o.onStart) != null ? ref.apply(this) : void 0;
	  };

	  Tween.prototype.startTimelines = function(time) {
	    var i, results;
	    i = this.timelines.length;
	    results = [];
	    while (i--) {
	      results.push(this.timelines[i].start(time || this.props.startTime));
	    }
	    return results;
	  };

	  Tween.prototype.start = function(time) {
	    this.setStartTime(time);
	    !time && t.add(this);
	    this.state = 'play';
	    return this;
	  };

	  Tween.prototype.pause = function() {
	    this.removeFromTweener();
	    this.state = 'pause';
	    return this;
	  };

	  Tween.prototype.stop = function() {
	    this.removeFromTweener();
	    this.setProgress(0);
	    this.state = 'stop';
	    return this;
	  };

	  Tween.prototype.restart = function() {
	    this.stop();
	    return this.start();
	  };

	  Tween.prototype.removeFromTweener = function() {
	    t.remove(this);
	    return this;
	  };

	  Tween.prototype.getDimentions = function() {
	    this.props.startTime = performance.now();
	    return this.props.endTime = this.props.startTime + this.props.totalTime;
	  };

	  Tween.prototype.setStartTime = function(time) {
	    this.prepareStart();
	    return this.startTimelines(time);
	  };

	  Tween.prototype.setProgress = function(progress) {
	    if (this.props.startTime == null) {
	      this.setStartTime();
	    }
	    progress = Math.max(progress, 0);
	    progress = Math.min(progress, 1);
	    return this.update(this.props.startTime + progress * this.props.totalTime);
	  };

	  return Tween;

	})();

	module.exports = Tween;

	},{"../h":4,"./tweener":23}],23:[function(require,module,exports){
	var Tweener, h, i, t;

	require('../polyfills/raf');

	require('../polyfills/performance');

	h = require('../h');

	i = 0;

	Tweener = (function() {
	  function Tweener() {
	    this.vars();
	    this;
	  }

	  Tweener.prototype.vars = function() {
	    this.tweens = [];
	    return this.loop = h.bind(this.loop, this);
	  };

	  Tweener.prototype.loop = function() {
	    var time;
	    if (!this.isRunning) {
	      return false;
	    }
	    time = performance.now();
	    this.update(time);
	    if (!this.tweens.length) {
	      return this.isRunning = false;
	    }
	    requestAnimationFrame(this.loop);
	    return this;
	  };

	  Tweener.prototype.startLoop = function() {
	    if (this.isRunning) {
	      return;
	    }
	    this.isRunning = true;
	    return requestAnimationFrame(this.loop);
	  };

	  Tweener.prototype.stopLoop = function() {
	    return this.isRunning = false;
	  };

	  Tweener.prototype.update = function(time) {
	    var results;
	    i = this.tweens.length;
	    results = [];
	    while (i--) {
	      if (this.tweens[i].update(time) === true) {
	        results.push(this.remove(i));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };

	  Tweener.prototype.add = function(tween) {
	    this.tweens.push(tween);
	    return this.startLoop();
	  };

	  Tweener.prototype.removeAll = function() {
	    return this.tweens.length = 0;
	  };

	  Tweener.prototype.remove = function(tween) {
	    var index;
	    index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);
	    if (index !== -1) {
	      return this.tweens.splice(index, 1);
	    }
	  };

	  return Tweener;

	})();

	t = new Tweener;

	module.exports = t;

	},{"../h":4,"../polyfills/performance":7,"../polyfills/raf":8}],24:[function(require,module,exports){

	/*!
	  LegoMushroom @legomushroom http://legomushroom.com
	  MIT License 2014
	 */

	(function() {
	  var Main;
	  Main = (function() {
	    function Main(o) {
	      this.o = o != null ? o : {};
	      if (window.isAnyResizeEventInited) {
	        return;
	      }
	      this.vars();
	      this.redefineProto();
	    }

	    Main.prototype.vars = function() {
	      window.isAnyResizeEventInited = true;
	      this.allowedProtos = [HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLImageElement, HTMLTableCellElement, HTMLSelectElement, HTMLInputElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLObjectElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement];
	      return this.timerElements = {
	        img: 1,
	        textarea: 1,
	        input: 1,
	        embed: 1,
	        object: 1,
	        svg: 1,
	        canvas: 1,
	        tr: 1,
	        tbody: 1,
	        thead: 1,
	        tfoot: 1,
	        a: 1,
	        select: 1,
	        option: 1,
	        optgroup: 1,
	        dl: 1,
	        dt: 1,
	        br: 1,
	        basefont: 1,
	        font: 1,
	        col: 1,
	        iframe: 1
	      };
	    };

	    Main.prototype.redefineProto = function() {
	      var i, it, proto, t;
	      it = this;
	      return t = (function() {
	        var j, len, ref, results;
	        ref = this.allowedProtos;
	        results = [];
	        for (i = j = 0, len = ref.length; j < len; i = ++j) {
	          proto = ref[i];
	          if (proto.prototype == null) {
	            continue;
	          }
	          results.push((function(proto) {
	            var listener, remover;
	            listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	            (function(listener) {
	              var wrappedListener;
	              wrappedListener = function() {
	                var option;
	                if (this !== window || this !== document) {
	                  option = arguments[0] === 'onresize' && !this.isAnyResizeEventInited;
	                  option && it.handleResize({
	                    args: arguments,
	                    that: this
	                  });
	                }
	                return listener.apply(this, arguments);
	              };
	              if (proto.prototype.addEventListener) {
	                return proto.prototype.addEventListener = wrappedListener;
	              } else if (proto.prototype.attachEvent) {
	                return proto.prototype.attachEvent = wrappedListener;
	              }
	            })(listener);
	            remover = proto.prototype.removeEventListener || proto.prototype.detachEvent;
	            return (function(remover) {
	              var wrappedRemover;
	              wrappedRemover = function() {
	                this.isAnyResizeEventInited = false;
	                this.iframe && this.removeChild(this.iframe);
	                return remover.apply(this, arguments);
	              };
	              if (proto.prototype.removeEventListener) {
	                return proto.prototype.removeEventListener = wrappedRemover;
	              } else if (proto.prototype.detachEvent) {
	                return proto.prototype.detachEvent = wrappedListener;
	              }
	            })(remover);
	          })(proto));
	        }
	        return results;
	      }).call(this);
	    };

	    Main.prototype.handleResize = function(args) {
	      var computedStyle, el, iframe, isEmpty, isNoPos, isStatic, ref;
	      el = args.that;
	      if (!this.timerElements[el.tagName.toLowerCase()]) {
	        iframe = document.createElement('iframe');
	        el.appendChild(iframe);
	        iframe.style.width = '100%';
	        iframe.style.height = '100%';
	        iframe.style.position = 'absolute';
	        iframe.style.zIndex = -999;
	        iframe.style.opacity = 0;
	        iframe.style.top = 0;
	        iframe.style.left = 0;
	        computedStyle = window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
	        isNoPos = el.style.position === '';
	        isStatic = computedStyle.position === 'static' && isNoPos;
	        isEmpty = computedStyle.position === '' && el.style.position === '';
	        if (isStatic || isEmpty) {
	          el.style.position = 'relative';
	        }
	        if ((ref = iframe.contentWindow) != null) {
	          ref.onresize = (function(_this) {
	            return function(e) {
	              return _this.dispatchEvent(el);
	            };
	          })(this);
	        }
	        el.iframe = iframe;
	      } else {
	        this.initTimer(el);
	      }
	      return el.isAnyResizeEventInited = true;
	    };

	    Main.prototype.initTimer = function(el) {
	      var height, width;
	      width = 0;
	      height = 0;
	      return this.interval = setInterval((function(_this) {
	        return function() {
	          var newHeight, newWidth;
	          newWidth = el.offsetWidth;
	          newHeight = el.offsetHeight;
	          if (newWidth !== width || newHeight !== height) {
	            _this.dispatchEvent(el);
	            width = newWidth;
	            return height = newHeight;
	          }
	        };
	      })(this), this.o.interval || 62.5);
	    };

	    Main.prototype.dispatchEvent = function(el) {
	      var e;
	      if (document.createEvent) {
	        e = document.createEvent('HTMLEvents');
	        e.initEvent('onresize', false, false);
	        return el.dispatchEvent(e);
	      } else if (document.createEventObject) {
	        e = document.createEventObject();
	        return el.fireEvent('onresize', e);
	      } else {
	        return false;
	      }
	    };

	    Main.prototype.destroy = function() {
	      var i, it, j, len, proto, ref, results;
	      clearInterval(this.interval);
	      this.interval = null;
	      window.isAnyResizeEventInited = false;
	      it = this;
	      ref = this.allowedProtos;
	      results = [];
	      for (i = j = 0, len = ref.length; j < len; i = ++j) {
	        proto = ref[i];
	        if (proto.prototype == null) {
	          continue;
	        }
	        results.push((function(proto) {
	          var listener;
	          listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
	          if (proto.prototype.addEventListener) {
	            proto.prototype.addEventListener = Element.prototype.addEventListener;
	          } else if (proto.prototype.attachEvent) {
	            proto.prototype.attachEvent = Element.prototype.attachEvent;
	          }
	          if (proto.prototype.removeEventListener) {
	            return proto.prototype.removeEventListener = Element.prototype.removeEventListener;
	          } else if (proto.prototype.detachEvent) {
	            return proto.prototype.detachEvent = Element.prototype.detachEvent;
	          }
	        })(proto));
	      }
	      return results;
	    };

	    return Main;

	  })();
	  if ((typeof define === "function") && define.amd) {
	    return define("any-resize-event", [], function() {
	      return new Main;
	    });
	  } else if ((typeof module === "object") && (typeof module.exports === "object")) {
	    return module.exports = new Main;
	  } else {
	    if (typeof window !== "undefined" && window !== null) {
	      window.AnyResizeEvent = Main;
	    }
	    return typeof window !== "undefined" && window !== null ? window.anyResizeEvent = new Main : void 0;
	  }
	})();

	},{}]},{},[5])(5)
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);