(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Game = require('./javascript/game');

var game = new Game();

},{"./javascript/game":6}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

var Animation = function (_EventEmitter) {
    _inherits(Animation, _EventEmitter);

    function Animation(width, height) {
        _classCallCheck(this, Animation);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Animation).call(this));

        _this.width = width;
        _this.height = height;
        _this.rotation = 0;

        _this.frames = [];
        _this.t = 0;
        _this.index = 0;

        return _this;
    }

    _createClass(Animation, [{
        key: 'addFrame',
        value: function addFrame(src, duration, width, height) {
            var frame = {};
            frame.img = new Image();
            frame.img.src = src;
            frame.duration = duration;
            frame.width = width;
            frame.height = height;
            this.frames.push(frame);
        }
    }, {
        key: 'start',
        value: function start() {
            this.t = 0;
            this.index - 0;
        }
    }, {
        key: 'update',
        value: function update(time) {
            this.t += time;
            if (this.t > this.frames[this.index].duration) {
                this.index++;
                this.t = 0;
            }
            if (this.index >= this.frames.length) {
                this.emit('loop');
                this.index = 0;
            }
        }
    }, {
        key: 'draw',
        value: function draw(renderer, x, y) {
            var originX = arguments.length <= 3 || arguments[3] === undefined ? this.width / 2 : arguments[3];
            var originY = arguments.length <= 4 || arguments[4] === undefined ? this.height / 2 : arguments[4];

            var frame = this.frames[this.index];
            renderer.context.translate(x + originX, y + originY);
            renderer.context.rotate(this.rotation);
            renderer.context.drawImage(frame.img, -originX, -originY, frame.width || this.width, frame.height || this.height);
            renderer.context.rotate(-this.rotation);
            renderer.context.translate(-(x + originX), -(y + originY));
        }
    }]);

    return Animation;
}(EventEmitter);

module.exports = Animation;

},{"events":12}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioManager = function () {
    function AudioManager(element, loopTime) {
        _classCallCheck(this, AudioManager);

        this.element = element;
        this.loopTime = loopTime;
        if (this.loopTime != null) {
            this.element.addEventListener("ended", this.loop.bind(this));
        }
    }

    _createClass(AudioManager, [{
        key: "play",
        value: function play() {
            this.element.play();
        }
    }, {
        key: "interruptPlay",
        value: function interruptPlay() {
            this.stop();
            this.play();
        }
    }, {
        key: "pause",
        value: function pause() {
            this.element.pause();
        }
    }, {
        key: "stop",
        value: function stop() {
            this.element.pause();
            this.element.currentTime = 0;
        }
    }, {
        key: "loop",
        value: function loop() {
            this.play();
            this.element.currentTime = this.loopTime;
        }
    }]);

    return AudioManager;
}();

module.exports = AudioManager;

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
    function Camera(renderer) {
        _classCallCheck(this, Camera);

        this.renderer = renderer;
        this.x = 0;
        this.y = 0;
        this.scale = {
            x: 0.5,
            y: 0.5
        };
    }

    _createClass(Camera, [{
        key: "transform",
        value: function transform() {
            this.renderer.context.translate(this.renderer.canvas.width / 2 - this.x * this.scale.x, this.renderer.canvas.height / 2 - this.y * this.scale.y);

            this.renderer.context.scale(this.scale.x, this.scale.y);
        }
    }, {
        key: "translate",
        value: function translate(pos) {
            return {
                x: pos.x - (this.x - this.renderer.canvas.width) * this.scale.x,
                y: pos.y - this.y + this.renderer.canvas.height / 2
            };
        }
    }, {
        key: "left",
        get: function get() {
            return this.x - this.width / 2;
        }
    }, {
        key: "right",
        get: function get() {
            return this.x + this.width / 2;
        }
    }, {
        key: "top",
        get: function get() {
            return this.y - this.height / 2;
        }
    }, {
        key: "bottom",
        get: function get() {
            return this.y + this.height / 2;
        }
    }, {
        key: "width",
        get: function get() {
            return this.renderer.canvas.width / this.scale.x;
        }
    }, {
        key: "height",
        get: function get() {
            return this.renderer.canvas.height / this.scale.y;
        }
    }]);

    return Camera;
}();

module.exports = Camera;

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
    function Entity() {
        _classCallCheck(this, Entity);

        this.x = 10;
        this.y = 10;
        this.width = 50;
        this.height = 50;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.acceleration = {
            x: 0,
            y: 0
        };
    }

    _createClass(Entity, [{
        key: "draw",
        value: function draw(renderer) {
            renderer.context.fillStyle = "black";
            renderer.context.fillRect(this.x, this.y, this.width, this.height);
        }
    }, {
        key: "update",
        value: function update(game, time) {
            this.velocity.x += this.acceleration.x * time;
            this.velocity.y += this.acceleration.y * time;

            this.x += this.velocity.x * time * game.world.pixelsPerMeter;
            this.y += this.velocity.y * time * game.world.pixelsPerMeter;
        }
    }]);

    return Entity;
}();

module.exports = Entity;

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = require('./render.js');
var Player = require('./player.js');
var World = require('./world.js');
var Input = require('./input.js');
var AudioManager = require('./audio.js');

var TWEEN = require('tween.js');

var Game = function () {
    function Game() {
        var _this = this;

        _classCallCheck(this, Game);

        this.reset();

        this.renderer = new Renderer(this);
        this.input = new Input(this);

        this.roverboardTrack = new AudioManager(document.getElementById("roverboardTrack"), 9.9);
        this.roverboardTrack.element.volume = 0;
        this.hoverswordTrack = new AudioManager(document.getElementById("hoverswordTrack"), 9.9);
        this.hoverswordTrack.element.volume = 0.1;
        this.menuTrack = new AudioManager(document.getElementById("menuTrack"), 0);
        this.menuTrack.element.volume = 0.1;

        this.sounds = {};
        this.sounds.gameOver = new AudioManager(document.getElementById("bummer"));

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                _this.track.pause();
            } else {
                _this.track.play();
            }
        });

        this.introPos = -this.renderer.canvas.width;

        requestAnimationFrame(this.update.bind(this));
        this.started = false;

        this.menuTrack.play();
        this.track = this.menuTrack;
    }

    _createClass(Game, [{
        key: 'reset',
        value: function reset() {
            this.entities = [];
            this.player = new Player();

            this.entities.push(this.player);

            this.world = new World(this);

            this.dying = false;
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (this.startTween) {
                return;
            }
            new TWEEN.Tween(this.menuTrack.element).to({ volume: 0 }, 2000).start();
            new TWEEN.Tween(this.roverboardTrack.element).to({ volume: 0.1 }, 2000).start();
            this.roverboardTrack.play();
            this.track = this.roverboardTrack;
            this.startTween = new TWEEN.Tween(this).to({ introPos: this.renderer.canvas.width }, 4000).onComplete(function () {
                _this2.started = true;
            }).start();
        }
    }, {
        key: 'update',
        value: function update(currentTime) {
            var _this3 = this;

            requestAnimationFrame(this.update.bind(this));

            if (this.dying) {
                return;
            }

            if (!this.lastTime) {
                this.lastTime = currentTime;
            }

            var time = (currentTime - this.lastTime) / 1000;
            if (time > 0.5) {
                time = 0.016;
            }
            this.lastTime = currentTime;

            this.renderer.draw();

            TWEEN.update();

            if (!this.started) {
                this.renderer.camera.x = this.introPos;
                this.renderer.camera.y = this.player.y;
                return;
            }

            this.renderer.update(time);

            this.world.update(time);
            this.entities.forEach(function (ent) {
                return ent.update(_this3, time);
            });

            if (this.player.y > 6000) {
                this.dying = true;
                this.sounds.gameOver.play();
                setTimeout(function () {
                    _this3.reset();
                }, 2000);
            }

            if (this.track === this.roverboardTrack) {
                this.hoverswordTrack.element.currentTime = this.roverboardTrack.element.currentTime;
                this.hoverswordTrack.pause();
            } else if (this.track === this.hoverswordTrack) {
                this.roverboardTrack.element.currentTime = this.hoverswordTrack.element.currentTime;
                this.roverboardTrack.pause();
            }
        }
    }]);

    return Game;
}();

module.exports = Game;

},{"./audio.js":3,"./input.js":7,"./player.js":9,"./render.js":10,"./world.js":11,"tween.js":13}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = require('./player.js');

var Input = function () {
    function Input(game) {
        var _this = this;

        _classCallCheck(this, Input);

        this.keys = {};

        this.game = game;
        document.body.addEventListener("keydown", function (event) {
            return _this.onKeyDown(event);
        });
        document.body.addEventListener("keyup", function (event) {
            return _this.onKeyUp(event);
        });
        document.body.addEventListener("click", function (event) {
            return _this.onClick(event);
        });
        game.renderer.canvas.addEventListener("mousemove", function (event) {
            return _this.onMouseMove(event);
        });
    }

    _createClass(Input, [{
        key: "onKeyDown",
        value: function onKeyDown(event) {
            if (event.code === "KeyA" || event.code === "ArrowLeft") {
                this.leftDown();
            }
            if (event.code === "KeyD" || event.code === "ArrowRight") {
                this.rightDown();
            }
            if (event.code === "KeyW" || event.code === "ArrowUp" || event.code == "Space") {
                this.upDown();
            }
            if (event.code === "KeyS" || event.code === "ArrowDown") {
                this.downDown();
            }
            if (event.code === "KeyQ") {
                this.game.player.manualBark();
            }
            if (event.code == "ShiftLeft") {
                this.shift();
            }

            if (event.code == "Space" || event.code === "KeyW" || event.code === "ArrowUp") {
                this.jump();
            }

            //console.log(event.code);
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(event) {
            if (event.code === "KeyA" || event.code === "ArrowLeft") {
                this.leftUp();
            }
            if (event.code === "KeyD" || event.code === "ArrowRight") {
                this.rightUp();
            }
            if (event.code === "KeyW" || event.code === "ArrowUp") {
                this.upUp();
            }
            if (event.code === "KeyS" || event.code === "ArrowDown") {
                this.downUp();
            }
            if (event.code === "KeyR") {
                this.game.reset();
            }

            //console.log(event.code);
        }
    }, {
        key: "onMouseMove",
        value: function onMouseMove(event) {
            var rect = event.target.getBoundingClientRect();
            var offsetX = event.clientX - rect.left;
            var offsetY = event.clientY - rect.top;

            this.mouseX = offsetX;
            this.mouseY = offsetY;
        }
    }, {
        key: "onClick",
        value: function onClick(event) {
            if (!this.game.started) {
                this.game.start();
            }
        }
    }, {
        key: "jump",
        value: function jump() {
            this.game.player.jump();
        }
    }, {
        key: "shift",
        value: function shift() {
            this.game.player.shift();
        }
    }, {
        key: "leftDown",
        value: function leftDown() {
            this.game.player.left = true;
        }
    }, {
        key: "rightDown",
        value: function rightDown() {
            this.game.player.right = true;
        }
    }, {
        key: "upDown",
        value: function upDown() {
            this.game.player.up = true;
        }
    }, {
        key: "downDown",
        value: function downDown() {
            this.game.player.down = true;
        }
    }, {
        key: "leftUp",
        value: function leftUp() {
            this.game.player.left = false;
        }
    }, {
        key: "rightUp",
        value: function rightUp() {
            this.game.player.right = false;
        }
    }, {
        key: "upUp",
        value: function upUp() {
            this.game.player.up = false;
        }
    }, {
        key: "downUp",
        value: function downUp() {
            this.game.player.down = false;
        }
    }]);

    return Input;
}();

module.exports = Input;

},{"./player.js":9}],8:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
    function Particle(x, y, angle, color, lifespan) {
        _classCallCheck(this, Particle);

        this.x = x;
        this.y = y;
        this.speed = 10;
        this.angle = angle;
        this.color = color;
        this.lifespan = lifespan;
    }

    _createClass(Particle, [{
        key: "update",
        value: function update(time) {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);

            this.lifespan -= time;
            if (this.lifespan < 0) {
                return false;
            }
            return true;
        }
    }, {
        key: "draw",
        value: function draw(renderer) {
            renderer.context.globalAlpha = this.lifespan * 4;
            renderer.context.strokeStyle = this.color;
            renderer.context.lineWidth = 3;
            renderer.context.beginPath();
            renderer.context.moveTo(this.x, this.y);
            renderer.context.lineTo(this.x + Math.cos(this.angle) * this.speed, this.y + Math.sin(this.angle) * this.speed);
            renderer.context.stroke();
            renderer.context.globalAlpha = 1;
        }
    }]);

    return Particle;
}();

module.exports = Particle;

},{}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entity = require('./entity.js');
var Animation = require('./animation.js');
var AudioManager = require('./audio.js');

var TWEEN = require('tween.js');

var Player = function (_Entity) {
    _inherits(Player, _Entity);

    function Player() {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this));

        _this.y = 380;
        _this.speed = 0;
        _this.shiftCD = 0;
        _this.form = "rover";

        _this.width = 300;
        _this.height = 239;

        _this.birdFly = new Animation(_this.width / 2, _this.height / 2);
        _this.birdFly.addFrame("./images/bird1.png", 0.15);
        _this.birdFly.addFrame("./images/bird2.png", 0.1);
        _this.birdFly.addFrame("./images/bird3.png", 0.15);
        _this.birdFly.addFrame("./images/bird2.png", 0.1);

        _this.sounds = {};
        _this.sounds.clink = new AudioManager(document.getElementById("metalClink"));
        _this.sounds.bark = new AudioManager(document.getElementById("bark"));
        _this.sounds.bark.element.volume = 0.1;
        _this.sounds.hoversword = new AudioManager(document.getElementById("hoversword"));
        _this.sounds.roverboard = new AudioManager(document.getElementById("roverboard"));

        _this.sounds.chirps = [];
        _this.sounds.chirps.push(new AudioManager(document.getElementById("birdsong1")));
        _this.sounds.chirps.push(new AudioManager(document.getElementById("birdsong2")));
        _this.sounds.chirps.push(new AudioManager(document.getElementById("birdsong3")));

        _this.sounds.nice = [];
        _this.sounds.nice.push(new AudioManager(document.getElementById("radical")));
        _this.sounds.nice.push(new AudioManager(document.getElementById("wicked")));
        _this.sounds.nice.push(new AudioManager(document.getElementById("dude")));

        _this.sounds.grind = new AudioManager(document.getElementById("grind"));
        _this.sounds.grind.element.volume = 0.4;
        _this.sounds.grind_launch = new AudioManager(document.getElementById("grind_launch"));

        _this.sword = new Animation(_this.width, 34 * 2);
        _this.sword.addFrame("./images/sword.png", 1);

        _this.dog = new Animation(_this.width, 220);
        _this.dog.addFrame("./images/dog_wag_full1.png", 0.1);
        _this.dog.addFrame("./images/dog_wag_full2.png", 0.08);
        _this.dog.addFrame("./images/dog_wag_full3.png", 0.1);
        _this.dog.addFrame("./images/dog_wag_full2.png", 0.08);

        _this.barkAnimation = new Animation(_this.width, 220);
        _this.barkAnimation.addFrame("./images/bark2.png", 0.1);

        _this.shapeshift = new Animation(_this.width, 220);
        _this.shapeshift.addFrame("./images/shapeshift_1.png", 0.08);
        _this.shapeshift.addFrame("./images/shapeshift_2.png", 0.08);
        _this.shapeshift.addFrame("./images/shapeshift_3.png", 0.08, _this.width / 2, _this.width / 2);
        _this.shapeshift.addFrame("./images/shapeshift_4.png", 0.08, _this.width / 2, _this.width / 2);
        _this.shapeshift.addFrame("./images/shapeshift_5.png", 0.08, _this.width / 2, _this.height / 2);
        _this.shapeshift.addFrame("./images/shapeshift_6.png", 0.08, _this.width / 2, _this.height / 2);

        _this.shapeshiftReverse = new Animation(_this.width, 220);
        _this.shapeshiftReverse.addFrame("./images/shapeshift_6.png", 0.08, _this.width / 2, _this.height / 2);
        _this.shapeshiftReverse.addFrame("./images/shapeshift_5.png", 0.08, _this.width / 2, _this.height / 2);
        _this.shapeshiftReverse.addFrame("./images/shapeshift_4.png", 0.08, _this.width / 2, _this.width / 2);
        _this.shapeshiftReverse.addFrame("./images/shapeshift_3.png", 0.08, _this.width / 2, _this.width / 2);
        _this.shapeshiftReverse.addFrame("./images/shapeshift_2.png", 0.08);
        _this.shapeshiftReverse.addFrame("./images/shapeshift_1.png", 0.08);

        _this.rotation = Math.PI;

        _this.barkTimes = [23.98, 24.28, 24.58, 25.18, 25.48, 25.78, 26.38, 26.83, 27.28, 27.88, 28.48, 47.97, 48.27, 48.57, 49.17, 49.47, 49.77, 50.37, 50.82, 50.97, 51.27, 51.57, 52.02, 52.17, 52.47, 67.16, 67.46, 67.76, 68.36, 68.66, 68.96, 69.56, 70.01, 70.16, 70.46, 70.76, 71.21, 71.36, 71.66, 71.96, 72.41, 72.86, 74.36, 74.81, 75.26];

        _this.currentAnim = _this.dog;
        return _this;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update(game, time) {
            var _this2 = this;

            this.shiftCD -= time;

            if (this.form === "bird") {
                this.birdUpdate(game, time);
            }
            _get(Object.getPrototypeOf(Player.prototype), 'update', this).call(this, game, time);
            if (this.form == "rover") {
                this.dogUpdate(game, time);
            }

            if (this.left) {
                this.x -= 1.5 * game.world.pixelsPerMeter * time;
            }
            if (this.right) {
                this.x += 1.5 * game.world.pixelsPerMeter * time;
            }
            if (this.x <= 0) {
                this.x = 0.01;
            }
            if (this.x + this.width > game.renderer.camera.right) {
                this.x = game.renderer.camera.right - this.width;
            }
            if (this.speed < 0) {
                this.speed = 0;
            }

            var speedFactor = 1 + this.speed / 100;
            this.currentAnim.update(time * speedFactor);

            this.barkTimes.forEach(function (bark) {
                if (Math.abs(game.roverboardTrack.element.currentTime - bark) < 0.02) {
                    _this2.bark();
                }
            });

            if (!this.onGround) {
                this.sounds.grind.pause();
            }

            // fuck it
            this.game = game;
        }
    }, {
        key: 'draw',
        value: function draw(renderer) {
            if (this.form == "rover") {
                this.sword.rotation = this.rotation + Math.PI;
                var swordY = this.y + this.height - this.sword.height + 15;
                this.sword.draw(renderer, this.x, swordY);
                this.currentAnim.rotation = this.sword.rotation;
                this.currentAnim.draw(renderer, this.x + 40, this.y + this.height - this.currentAnim.height + 10, this.currentAnim.width / 2 - 40, this.currentAnim.height - this.sword.height / 2 + 5);
            } else {
                this.currentAnim.draw(renderer, this.x, this.y);
                this.sword.draw(renderer, this.x + this.width / 2, this.y + this.height / 2, 0);
            }
        }
    }, {
        key: 'jump',
        value: function jump() {
            var groundDist = this.game.world.findFloor(this.x + this.width / 2) - (this.y + this.height);
            if (this.form == "rover" && groundDist <= 25 && groundDist >= -25 && !this.game.world.getPit(this.x + this.width / 2)) {
                this.velocity.y = -10;
                this.sounds.grind_launch.play();
            }
        }
    }, {
        key: 'bark',
        value: function bark() {
            var _this3 = this;

            if (this.form === "rover") {
                if (this.currentAnim === this.barkAnimation) {
                    return;
                }
                this.currentAnim = this.barkAnimation;
                this.barkAnimation.once('loop', function () {
                    if (_this3.form === "rover") {
                        _this3.currentAnim = _this3.dog;
                    }
                });
            }
        }
    }, {
        key: 'manualBark',
        value: function manualBark() {
            if (this.form === "rover" && this.currentAnim !== this.barkAnimation) {
                this.sounds.bark.interruptPlay();
                this.bark();
            } else if (this.form === "bird") {
                if (this.currentChirp) {
                    this.currentChirp.stop();
                }
                this.currentChirp = this.sounds.chirps[Math.round((this.sounds.chirps.length - 1) * Math.random())];
                this.currentChirp.play();
            }
        }
    }, {
        key: 'dogUpdate',
        value: function dogUpdate(game, time) {
            this.acceleration.y = game.world.gravity;

            var floor = game.world.checkForFloor(this);
            var leftY = game.world.findFloor(this.x);
            var rightY = game.world.findFloor(this.x + this.width);

            if (floor) {
                if (!this.onGround) {
                    this.sounds.grind.play();
                    if (this.wasFlipping) {
                        this.sounds.nice[Math.round((this.sounds.nice.length - 1) * Math.random())].play();
                        this.speed *= 1.3;
                    }
                }
                this.wasFlipping = false;
                this.onGround = true;
                this.y = floor - this.height;
                this.velocity.y = 4;

                this.groundAngle = Math.atan2(leftY - rightY, this.x - (this.x + this.width));

                this.rotation = this.groundAngle;

                game.renderer.emitSpark(this.x + this.width / 2 + 15, this.y + this.height, this.groundAngle);
            } else {
                if (!this.onGround) {
                    this.sounds.grind.pause();
                }
                var normalized = Math.atan2(Math.sin(this.rotation), Math.cos(this.rotation));
                if (normalized > Math.PI * 0.25 && normalized < Math.PI * 0.75) {
                    this.wasFlipping = true;
                }
                this.onGround = false;
            }

            if (this.onGround) {
                if (this.right) {
                    this.speed += time * 2;
                } else if (this.left) {
                    this.speed -= time * 2;
                } else {
                    this.speed += time * 2;
                }
            } else {
                if (Math.abs(leftY - (this.y + this.height)) > 20 && Math.abs(rightY - (this.y + this.height)) > 20) {
                    if (this.left) {
                        this.rotation -= 0.06;
                    } else if (this.right) {
                        this.rotation += 0.06;
                    }
                }
            }
        }
    }, {
        key: 'birdUpdate',
        value: function birdUpdate(game, time) {
            this.acceleration.y = game.world.gravity * 0.5;
            if (this.up) {
                this.velocity.y -= 0.5 * game.world.pixelsPerMeter * time;
            }
            if (this.down) {
                this.velocity.y += 0.5 * game.world.pixelsPerMeter * time;
            }
            if (this.velocity.y >= 0.2 * game.world.pixelsPerMeter) {
                this.velocity.y = 0.2 * game.world.pixelsPerMeter;
            }
            if (this.velocity.y <= -0.2 * game.world.pixelsPerMeter) {
                this.velocity.y = -0.2 * game.world.pixelsPerMeter;
            }
            this.speed *= 0.995;
            if (game.world.checkForFloor(this) && this.velocity.y >= 0) {
                this.transform();
            }
            if (this.speed <= 1) {
                this.transform();
            }
            var translated = this.game.renderer.camera.translate(this);
            var swordAngle = Math.PI + Math.atan2(translated.y - this.game.input.mouseY, translated.x - this.game.input.mouseX);
            //this.sword.rotation = swordAngle;
            this.onGround = false;
        }
    }, {
        key: 'transform',
        value: function transform() {
            var _this4 = this;

            if (this.form == "rover") {
                this.jump();
                this.form = "bird";
                document.title = "HOVERSWORD";
                this.width /= 2;
                this.height /= 2;
                this.swordSwing = new TWEEN.Tween(this.sword).to({ rotation: Math.PI / 2 + 0.45 }, 200).start();

                this.currentAnim = this.shapeshift;
                this.shapeshift.once('loop', function () {
                    _this4.currentAnim = _this4.birdFly;
                });

                this.sounds.hoversword.play();

                setTimeout(function () {
                    _this4.game.hoverswordTrack.play();
                    _this4.game.roverboardTrack.pause();
                    _this4.game.track = _this4.game.hoverswordTrack;
                }, 200);
            } else {
                this.form = "rover";
                document.title = "ROVERBOARD";
                this.width *= 2;
                this.height *= 2;

                if (this.currentChirp) {
                    this.currentChirp.stop();
                }

                this.currentAnim = this.shapeshiftReverse;
                this.shapeshiftReverse.once('loop', function () {
                    _this4.currentAnim = _this4.dog;
                });

                this.rotation = Math.PI;

                this.sounds.roverboard.play();

                setTimeout(function () {
                    _this4.game.roverboardTrack.play();
                    _this4.game.hoverswordTrack.pause();
                    _this4.game.track = _this4.game.roverboardTrack;
                }, 200);
            }
            this.wasFlipping = false;
            this.shiftCD = 1;
        }
    }, {
        key: 'shift',
        value: function shift() {
            if (this.shiftCD <= 0 && this.speed > 1) {
                this.transform();
            }
        }
    }]);

    return Player;
}(Entity);

module.exports = Player;

},{"./animation.js":2,"./audio.js":3,"./entity.js":5,"tween.js":13}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = require('./camera.js');
var Particle = require('./particle.js');

var Renderer = function () {
    function Renderer(game) {
        var _this = this;

        _classCallCheck(this, Renderer);

        this.game = game;

        this.camera = new Camera(this);

        this.score = document.createElement("span");
        this.score.classList.add("ui");
        this.score.classList.add("score");
        this.score.textContent = 'Score: 0';

        this.highScore = "0" || localStorage.getItem("highScore");
        this.highScoreSpan = document.createElement("span");
        this.highScoreSpan.classList.add("ui");
        this.highScoreSpan.classList.add("highScore");
        this.highScoreSpan.textContent = 'High Score: 0';

        this.canvas = document.createElement("canvas");
        this.canvas.width = 1280;
        this.canvas.height = 752;

        this.context = this.canvas.getContext("2d");

        this.parallax = [];
        this.parallax.push(this.loadPattern("./images/bg/trees.png"));
        this.parallax.push(this.loadPattern("./images/bg/hill.png"));
        this.parallax.push(this.loadPattern("./images/bg/clouds.png"));
        this.parallax.push(this.loadPattern("./images/bg/sunset.png"));

        this.particles = [];

        Promise.all(this.parallax).then(function (patterns) {
            _this.parallax = patterns;
        });

        this.backgroundHeight = this.canvas.height;

        this.loadImage("./images/intro.png").then(function (img) {
            _this.intro = img;
        });

        document.body.appendChild(this.canvas);
        document.body.appendChild(this.score);
        document.body.appendChild(this.highScoreSpan);
    }

    _createClass(Renderer, [{
        key: 'loadImage',
        value: function loadImage(src) {
            var img = new Image();
            img.src = src;
            return new Promise(function (resolve) {
                img.addEventListener("load", function () {
                    resolve(img);
                });
            });
        }
    }, {
        key: 'loadPattern',
        value: function loadPattern(src) {
            var _this2 = this;

            return this.loadImage(src).then(function (img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.width * 4;
                canvas.height = img.height;
                var context = canvas.getContext("2d");
                for (var i = 0; i < 4; i++) {
                    context.drawImage(img, i * img.width, 0);
                }
                canvas.x = -_this2.canvas.width * 2;
                return canvas;
            });
        }
    }, {
        key: 'emitSpark',
        value: function emitSpark(x, y, angle) {
            for (var i = 0; i < 5; i++) {
                this.particles.push(new Particle(x + Math.random() * 5, y - Math.random() * 5, angle - Math.PI / 8 * Math.random(), "gold", Math.random() / 2));
            }
        }
    }, {
        key: 'drawParallaxPattern',
        value: function drawParallaxPattern(pattern, index, override) {
            var heightFactor = this.game.player.y / 60;
            if (heightFactor > 100) {
                heightFactor = 100;
            }
            var backgroundY = this.camera.top - heightFactor;
            if (override) {
                pattern.x = -this.canvas.width * 4 + (0 - this.game.introPos) / (index + 1);
            } else {
                pattern.x -= this.game.player.speed / (index + 1);
            }
            if (pattern.x <= -this.camera.width * 3) {
                pattern.x = this.camera.left;
            }
            this.context.drawImage(pattern, pattern.x, backgroundY, this.camera.width * 4, this.backgroundHeight / this.camera.scale.y * 1.15);
        }
    }, {
        key: 'update',
        value: function update(time) {
            var _this3 = this;

            this.camera.x = 0 + this.camera.width / 2;
            this.camera.y = this.game.player.y;
            if (this.camera.y > 5000) {
                this.camera.y = 5000;
            }
            this.particles.forEach(function (part, index) {
                if (!part.update(time)) {
                    _this3.particles.splice(index, 1);
                }
            });
        }
    }, {
        key: 'draw',
        value: function draw() {
            var _this4 = this;

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.save();

            var scoreInt = parseInt((this.game.world.xPos / 100).toFixed(0));
            this.score.textContent = "Score: " + scoreInt.toLocaleString();
            this.updateHighScore();
            this.highScoreSpan.textContent = "High Score: " + this.highScore.toLocaleString();

            this.camera.transform();
            if (!this.parallax[0].then) {
                for (var i = this.parallax.length; i--; i > 0) {
                    this.drawParallaxPattern(this.parallax[i], i);
                }
            }

            if (!this.game.started) {
                if (!this.parallax[0].then) {
                    for (var _i = this.parallax.length; _i--; _i > 0) {
                        this.drawParallaxPattern(this.parallax[_i], _i, this.game.introPos);
                    }
                }
                if (this.intro) {
                    this.context.drawImage(this.intro, -this.camera.width, this.camera.top, this.camera.width, this.camera.height);
                }
            }
            this.game.entities.forEach(function (ent) {
                ent.draw(_this4);
            });

            this.game.world.draw(this);

            this.particles.forEach(function (part, index) {
                part.draw(_this4);
            });

            this.context.restore();
        }
    }, {
        key: 'updateHighScore',
        value: function updateHighScore() {
            var newHS = parseInt((this.game.world.xPos / 100).toFixed(0));
            if (newHS > this.highScore) this.highScore = newHS;
            localStorage.setItem("highScore", this.highScore);
        }
    }]);

    return Renderer;
}();

module.exports = Renderer;

},{"./camera.js":4,"./particle.js":8}],11:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
    function World(game) {
        _classCallCheck(this, World);

        this.game = game;
        this.gravity = 9.8;
        this.pixelsPerMeter = 50;
        this.xPos = 0;
        this.highScore = 0 || localStorage.getItem("highScore");

        this.adjustment = 0;
        this.adjustmentCD = 0;

        this.stability = 1; //seconds

        this.poleCD = 0;
        this.poleMap = [];
        this.pitCD = 1000;

        this.pit = false;

        this.heightMap = [];

        for (var i = 0; i < 640; i++) {
            this.heightMap[i] = { y: 620 };
        }
        this.heightMap[15].pole = true;
    }

    _createClass(World, [{
        key: "findFloor",
        value: function findFloor(x) {
            x /= 4;
            if (x < 0) {
                x = 0;
            } else if (x >= this.heightMap.length) {
                x = this.heightMap.length - 1;
            }
            var floor = this.heightMap[Math.round(x)];
            return floor.y;
        }
    }, {
        key: "getPit",
        value: function getPit(x) {
            x /= 4;
            if (x < 0) {
                x = 0;
            } else if (x >= this.heightMap.length) {
                x = this.heightMap.length - 1;
            }
            var floor = this.heightMap[Math.round(x)];
            return floor.pit;
        }
    }, {
        key: "checkForFloor",
        value: function checkForFloor(ent) {
            var floor = this.heightMap[Math.round((ent.x + ent.width / 2) / 4)];
            if (floor.pit) {
                return false;
            }

            var leftY = this.findFloor(ent.x);
            var rightY = this.findFloor(ent.x + ent.width);
            var angle = Math.atan2(leftY - rightY, ent.x - (ent.x + ent.width));
            var diff = ent.rotation - angle;
            diff = Math.atan2(Math.sin(diff), Math.cos(diff));

            if (Math.abs(diff) > Math.PI * 0.4) {
                return false;
            }
            if (ent.y + ent.height >= floor.y && ent.y + ent.height * 1 / 4 <= floor.y) {
                return floor.y;
            }
            return false;
        }
    }, {
        key: "update",
        value: function update(time) {
            this.adjustmentCD -= time;
            if (this.adjustmentCD <= 0) {
                this.adjustment *= 0.8;
                this.adjustment += Math.random() * 0.6 - 0.3;
                if (this.adjustment < -1) {
                    this.adjustment = -1;
                }
                if (this.adjustment > 1) {
                    this.adjustment = 1;
                }

                this.adjustmentCD = this.stability;
            }

            this.xPos += this.game.player.speed;
            for (var i = 0; i < this.game.player.speed; i++) {
                this.stream();
            }
        }
    }, {
        key: "stream",
        value: function stream(time) {
            this.heightMap.shift();
            this.poleMap.shift();

            var last = {};
            last.y = this.heightMap[this.heightMap.length - 1].y;

            this.pitCD -= 1;
            if (this.pitLength > 0) {
                last.pit = true;
                this.pitLength--;
            } else {
                last.y -= this.adjustment;
                if (last.y > 5000) {
                    last.y = 5000;
                }
            }
            if (this.pitCD <= 0) {
                last.pit = true;
                this.pitCD = 4500 + Math.random() * 1000;
                this.pitLength = 300 + Math.random() * 1400 + Math.random() * 500 * this.game.player.speed / 250;
            }

            this.poleCD--;
            if (this.poleCD <= 0) {
                last.pole = true;
                this.poleCD = 400;
            } else {
                this.poleMap.push(null);
            }

            this.heightMap.push(last);
        }
    }, {
        key: "draw",
        value: function draw(renderer) {
            var _this = this;

            renderer.context.strokeStyle = "black";
            renderer.context.lineWidth = 10;
            renderer.context.beginPath();
            var lastPole = 0;
            this.heightMap.forEach(function (pos, x) {
                x *= 4;
                var height = pos.y;
                if (!pos.pit) {
                    if (_this.pit == true) {
                        _this.pit = false;
                        renderer.context.beginPath();
                    }
                    renderer.context.lineTo(x, height);
                    if (pos.pole) {
                        renderer.context.moveTo(x, _this.game.renderer.camera.bottom);
                        renderer.context.lineTo(x, height);
                        lastPole = x;
                    }
                } else {
                    if (_this.pit == false) {
                        _this.pit = true;
                        renderer.context.stroke();
                    }
                }
            });
            renderer.context.stroke();
            this.pit = false;
        }
    }]);

    return World;
}();

module.exports = World;

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],13:[function(require,module,exports){
/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

// Include a performance.now polyfill
(function () {

	if ('performance' in window === false) {
		window.performance = {};
	}

	// IE 8
	Date.now = (Date.now || function () {
		return new Date().getTime();
	});

	if ('now' in window.performance === false) {
		var offset = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart
		                                                                                    : Date.now();

		window.performance.now = function () {
			return Date.now() - offset;
		};
	}

})();

var TWEEN = TWEEN || (function () {

	var _tweens = [];

	return {

		getAll: function () {

			return _tweens;

		},

		removeAll: function () {

			_tweens = [];

		},

		add: function (tween) {

			_tweens.push(tween);

		},

		remove: function (tween) {

			var i = _tweens.indexOf(tween);

			if (i !== -1) {
				_tweens.splice(i, 1);
			}

		},

		update: function (time) {

			if (_tweens.length === 0) {
				return false;
			}

			var i = 0;

			time = time !== undefined ? time : window.performance.now();

			while (i < _tweens.length) {

				if (_tweens[i].update(time)) {
					i++;
				} else {
					_tweens.splice(i, 1);
				}

			}

			return true;

		}
	};

})();

TWEEN.Tween = function (object) {

	var _object = object;
	var _valuesStart = {};
	var _valuesEnd = {};
	var _valuesStartRepeat = {};
	var _duration = 1000;
	var _repeat = 0;
	var _yoyo = false;
	var _isPlaying = false;
	var _reversed = false;
	var _delayTime = 0;
	var _startTime = null;
	var _easingFunction = TWEEN.Easing.Linear.None;
	var _interpolationFunction = TWEEN.Interpolation.Linear;
	var _chainedTweens = [];
	var _onStartCallback = null;
	var _onStartCallbackFired = false;
	var _onUpdateCallback = null;
	var _onCompleteCallback = null;
	var _onStopCallback = null;

	// Set all starting values present on the target object
	for (var field in object) {
		_valuesStart[field] = parseFloat(object[field], 10);
	}

	this.to = function (properties, duration) {

		if (duration !== undefined) {
			_duration = duration;
		}

		_valuesEnd = properties;

		return this;

	};

	this.start = function (time) {

		TWEEN.add(this);

		_isPlaying = true;

		_onStartCallbackFired = false;

		_startTime = time !== undefined ? time : window.performance.now();
		_startTime += _delayTime;

		for (var property in _valuesEnd) {

			// Check if an Array was provided as property value
			if (_valuesEnd[property] instanceof Array) {

				if (_valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (_valuesStart[property] === undefined) {
				continue;
			}

			_valuesStart[property] = _object[property];

			if ((_valuesStart[property] instanceof Array) === false) {
				_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			_valuesStartRepeat[property] = _valuesStart[property] || 0;

		}

		return this;

	};

	this.stop = function () {

		if (!_isPlaying) {
			return this;
		}

		TWEEN.remove(this);
		_isPlaying = false;

		if (_onStopCallback !== null) {
			_onStopCallback.call(_object);
		}

		this.stopChainedTweens();
		return this;

	};

	this.stopChainedTweens = function () {

		for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
			_chainedTweens[i].stop();
		}

	};

	this.delay = function (amount) {

		_delayTime = amount;
		return this;

	};

	this.repeat = function (times) {

		_repeat = times;
		return this;

	};

	this.yoyo = function (yoyo) {

		_yoyo = yoyo;
		return this;

	};


	this.easing = function (easing) {

		_easingFunction = easing;
		return this;

	};

	this.interpolation = function (interpolation) {

		_interpolationFunction = interpolation;
		return this;

	};

	this.chain = function () {

		_chainedTweens = arguments;
		return this;

	};

	this.onStart = function (callback) {

		_onStartCallback = callback;
		return this;

	};

	this.onUpdate = function (callback) {

		_onUpdateCallback = callback;
		return this;

	};

	this.onComplete = function (callback) {

		_onCompleteCallback = callback;
		return this;

	};

	this.onStop = function (callback) {

		_onStopCallback = callback;
		return this;

	};

	this.update = function (time) {

		var property;
		var elapsed;
		var value;

		if (time < _startTime) {
			return true;
		}

		if (_onStartCallbackFired === false) {

			if (_onStartCallback !== null) {
				_onStartCallback.call(_object);
			}

			_onStartCallbackFired = true;

		}

		elapsed = (time - _startTime) / _duration;
		elapsed = elapsed > 1 ? 1 : elapsed;

		value = _easingFunction(elapsed);

		for (property in _valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (_valuesStart[property] === undefined) {
				continue;
			}

			var start = _valuesStart[property] || 0;
			var end = _valuesEnd[property];

			if (end instanceof Array) {

				_object[property] = _interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.startsWith('+') || end.startsWith('-')) {
						end = start + parseFloat(end, 10);
					} else {
						end = parseFloat(end, 10);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					_object[property] = start + (end - start) * value;
				}

			}

		}

		if (_onUpdateCallback !== null) {
			_onUpdateCallback.call(_object, value);
		}

		if (elapsed === 1) {

			if (_repeat > 0) {

				if (isFinite(_repeat)) {
					_repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in _valuesStartRepeat) {

					if (typeof (_valuesEnd[property]) === 'string') {
						_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
					}

					if (_yoyo) {
						var tmp = _valuesStartRepeat[property];

						_valuesStartRepeat[property] = _valuesEnd[property];
						_valuesEnd[property] = tmp;
					}

					_valuesStart[property] = _valuesStartRepeat[property];

				}

				if (_yoyo) {
					_reversed = !_reversed;
				}

				_startTime = time + _delayTime;

				return true;

			} else {

				if (_onCompleteCallback !== null) {
					_onCompleteCallback.call(_object);
				}

				for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					_chainedTweens[i].start(_startTime + _duration);
				}

				return false;

			}

		}

		return true;

	};

};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}

			return - (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));

		},

		Out: function (k) {

			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}

			return (a * Math.pow(2, - 10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);

		},

		InOut: function (k) {

			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}

			if ((k *= 2) < 1) {
				return - 0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
			}

			return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (typeof define === 'function' && define.amd) {

		// AMD
		define([], function () {
			return TWEEN;
		});

	} else if (typeof module !== 'undefined' && typeof exports === 'object') {

		// Node.js
		module.exports = TWEEN;

	} else if (root !== undefined) {

		// Global variable
		root.TWEEN = TWEEN;

	}

})(this);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImphdmFzY3JpcHQvYW5pbWF0aW9uLmpzIiwiamF2YXNjcmlwdC9hdWRpby5qcyIsImphdmFzY3JpcHQvY2FtZXJhLmpzIiwiamF2YXNjcmlwdC9lbnRpdHkuanMiLCJqYXZhc2NyaXB0L2dhbWUuanMiLCJqYXZhc2NyaXB0L2lucHV0LmpzIiwiamF2YXNjcmlwdC9wYXJ0aWNsZS5qcyIsImphdmFzY3JpcHQvcGxheWVyLmpzIiwiamF2YXNjcmlwdC9yZW5kZXIuanMiLCJqYXZhc2NyaXB0L3dvcmxkLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLE9BQU8sUUFBUSxtQkFBUixDQUFQOztBQUVKLElBQUksT0FBTyxJQUFJLElBQUosRUFBUDs7Ozs7Ozs7Ozs7OztBQ0ZKLElBQU0sZUFBZSxRQUFRLFFBQVIsRUFBa0IsWUFBbEI7O0lBQ2Y7OztBQUNGLGFBREUsU0FDRixDQUFZLEtBQVosRUFBbUIsTUFBbkIsRUFBMkI7OEJBRHpCLFdBQ3lCOzsyRUFEekIsdUJBQ3lCOztBQUV2QixjQUFLLEtBQUwsR0FBYSxLQUFiLENBRnVCO0FBR3ZCLGNBQUssTUFBTCxHQUFjLE1BQWQsQ0FIdUI7QUFJdkIsY0FBSyxRQUFMLEdBQWdCLENBQWhCLENBSnVCOztBQU12QixjQUFLLE1BQUwsR0FBYyxFQUFkLENBTnVCO0FBT3ZCLGNBQUssQ0FBTCxHQUFTLENBQVQsQ0FQdUI7QUFRdkIsY0FBSyxLQUFMLEdBQWEsQ0FBYixDQVJ1Qjs7O0tBQTNCOztpQkFERTs7aUNBWU8sS0FBSyxVQUFVLE9BQU8sUUFBUTtBQUNuQyxnQkFBSSxRQUFRLEVB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEdhbWUgPSByZXF1aXJlKCcuL2phdmFzY3JpcHQvZ2FtZScpO1xuXG52YXIgZ2FtZSA9IG5ldyBHYW1lKCk7IiwiY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuY2xhc3MgQW5pbWF0aW9uIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBbXTtcbiAgICAgICAgdGhpcy50ID0gMDtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIFxuICAgIH1cbiAgICBhZGRGcmFtZShzcmMsIGR1cmF0aW9uLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGxldCBmcmFtZSA9IHt9O1xuICAgICAgICBmcmFtZS5pbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgZnJhbWUuaW1nLnNyYyA9IHNyYztcbiAgICAgICAgZnJhbWUuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgZnJhbWUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgZnJhbWUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmZyYW1lcy5wdXNoKGZyYW1lKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMudCA9IDA7XG4gICAgICAgIHRoaXMuaW5kZXggLSAwO1xuICAgIH1cbiAgICB1cGRhdGUodGltZSkge1xuICAgICAgICB0aGlzLnQgKz0gdGltZTtcbiAgICAgICAgaWYodGhpcy50ID4gdGhpcy5mcmFtZXNbdGhpcy5pbmRleF0uZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgICAgIHRoaXMudCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5pbmRleCA+PSB0aGlzLmZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnbG9vcCcpO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhdyhyZW5kZXJlciwgeCwgeSwgb3JpZ2luWCA9IHRoaXMud2lkdGggLyAyLCBvcmlnaW5ZID0gdGhpcy5oZWlnaHQgLyAyKSB7XG4gICAgICAgIGxldCBmcmFtZSA9IHRoaXMuZnJhbWVzW3RoaXMuaW5kZXhdO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LnRyYW5zbGF0ZSh4ICsgb3JpZ2luWCwgeSArIG9yaWdpblkpO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LnJvdGF0ZSh0aGlzLnJvdGF0aW9uKTtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5kcmF3SW1hZ2UoZnJhbWUuaW1nLCAtKG9yaWdpblgpLCAtKG9yaWdpblkpLCBmcmFtZS53aWR0aCB8fCB0aGlzLndpZHRoLCBmcmFtZS5oZWlnaHQgfHwgdGhpcy5oZWlnaHQpO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LnJvdGF0ZSgtdGhpcy5yb3RhdGlvbik7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQudHJhbnNsYXRlKC0oeCArIG9yaWdpblgpLCAtKHkgKyBvcmlnaW5ZKSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFuaW1hdGlvbjsiLCJjbGFzcyBBdWRpb01hbmFnZXJcbntcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBsb29wVGltZSlcbiAgICB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMubG9vcFRpbWUgPSBsb29wVGltZTtcbiAgICAgICAgaWYodGhpcy5sb29wVGltZSE9bnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCB0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcGxheSgpXG4gICAge1xuICAgICAgICB0aGlzLmVsZW1lbnQucGxheSgpO1xuICAgIH1cbiAgICBpbnRlcnJ1cHRQbGF5KCkge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICAgIFxuICAgIHBhdXNlKClcbiAgICB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5wYXVzZSgpO1xuICAgIH1cbiAgICBcbiAgICBzdG9wKClcbiAgICB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5wYXVzZSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY3VycmVudFRpbWU9MDtcbiAgICB9XG4gICAgXG4gICAgbG9vcCgpXG4gICAge1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmN1cnJlbnRUaW1lPXRoaXMubG9vcFRpbWU7XG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXVkaW9NYW5hZ2VyOyIsImNsYXNzIENhbWVyYSB7XG4gICAgY29uc3RydWN0b3IocmVuZGVyZXIpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLnNjYWxlID0ge1xuICAgICAgICAgICAgeDogMC41LFxuICAgICAgICAgICAgeTogMC41XG4gICAgICAgIH07XG4gICAgfVxuICAgIHRyYW5zZm9ybSgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5jb250ZXh0LnRyYW5zbGF0ZShcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuY2FudmFzLndpZHRoIC8gMiAtIHRoaXMueCAqIHRoaXMuc2NhbGUueCxcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuY2FudmFzLmhlaWdodCAvIDIgLSB0aGlzLnkgKiB0aGlzLnNjYWxlLnlcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIuY29udGV4dC5zY2FsZSh0aGlzLnNjYWxlLngsIHRoaXMuc2NhbGUueSk7XG4gICAgfVxuICAgIHRyYW5zbGF0ZShwb3MpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHBvcy54IC0gKHRoaXMueCAtIHRoaXMucmVuZGVyZXIuY2FudmFzLndpZHRoKSAqIHRoaXMuc2NhbGUueCxcbiAgICAgICAgICAgIHk6IHBvcy55IC0gdGhpcy55ICsgdGhpcy5yZW5kZXJlci5jYW52YXMuaGVpZ2h0IC8gMlxuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBsZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54IC0gdGhpcy53aWR0aCAvIDI7XG4gICAgfVxuICAgIGdldCByaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGggLyAyO1xuICAgIH1cbiAgICBnZXQgdG9wKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55IC0gdGhpcy5oZWlnaHQgLyAyO1xuICAgIH1cbiAgICBnZXQgYm90dG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyO1xuICAgIH1cbiAgICBcbiAgICBnZXQgd2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmNhbnZhcy53aWR0aCAvIHRoaXMuc2NhbGUueDtcbiAgICB9XG4gICAgZ2V0IGhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuY2FudmFzLmhlaWdodCAvIHRoaXMuc2NhbGUueTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FtZXJhOyIsImNsYXNzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMueCA9IDEwO1xuICAgICAgICB0aGlzLnkgPSAxMDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDUwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24gPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuICAgIH1cbiAgICBkcmF3KHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuICAgIHVwZGF0ZShnYW1lLCB0aW1lKSB7XG4gICAgICAgIHRoaXMudmVsb2NpdHkueCArPSB0aGlzLmFjY2VsZXJhdGlvbi54ICogdGltZTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eS55ICs9IHRoaXMuYWNjZWxlcmF0aW9uLnkgKiB0aW1lO1xuICAgICAgICBcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkueCAqIHRpbWUgKiBnYW1lLndvcmxkLnBpeGVsc1Blck1ldGVyO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eS55ICogdGltZSAqIGdhbWUud29ybGQucGl4ZWxzUGVyTWV0ZXI7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eTsiLCJjb25zdCBSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyLmpzJyk7XG5jb25zdCBQbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllci5qcycpO1xuY29uc3QgV29ybGQgPSByZXF1aXJlKCcuL3dvcmxkLmpzJyk7XG5jb25zdCBJbnB1dCA9IHJlcXVpcmUoJy4vaW5wdXQuanMnKTtcbmNvbnN0IEF1ZGlvTWFuYWdlciA9IHJlcXVpcmUoJy4vYXVkaW8uanMnKTtcblxuY29uc3QgVFdFRU4gPSByZXF1aXJlKCd0d2Vlbi5qcycpO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgdGhpcy5pbnB1dCA9IG5ldyBJbnB1dCh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucm92ZXJib2FyZFRyYWNrID0gbmV3IEF1ZGlvTWFuYWdlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdmVyYm9hcmRUcmFja1wiKSwgOS45KTtcbiAgICAgICAgdGhpcy5yb3ZlcmJvYXJkVHJhY2suZWxlbWVudC52b2x1bWUgPSAwO1xuICAgICAgICB0aGlzLmhvdmVyc3dvcmRUcmFjayA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ZlcnN3b3JkVHJhY2tcIiksIDkuOSk7XG4gICAgICAgIHRoaXMuaG92ZXJzd29yZFRyYWNrLmVsZW1lbnQudm9sdW1lID0gMC4xO1xuICAgICAgICB0aGlzLm1lbnVUcmFjayA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZW51VHJhY2tcIiksIDApO1xuICAgICAgICB0aGlzLm1lbnVUcmFjay5lbGVtZW50LnZvbHVtZSA9IDAuMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc291bmRzID0ge307XG4gICAgICAgIHRoaXMuc291bmRzLmdhbWVPdmVyID0gbmV3IEF1ZGlvTWFuYWdlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1bW1lclwiKSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYoZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFjay5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFjay5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbnRyb1BvcyA9IC10aGlzLnJlbmRlcmVyLmNhbnZhcy53aWR0aDtcbiAgICAgICAgXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1lbnVUcmFjay5wbGF5KCk7XG4gICAgICAgIHRoaXMudHJhY2sgPSB0aGlzLm1lbnVUcmFjaztcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzLnB1c2godGhpcy5wbGF5ZXIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy53b3JsZCA9IG5ldyBXb3JsZCh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZHlpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmKHRoaXMuc3RhcnRUd2Vlbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG5ldyBUV0VFTi5Ud2Vlbih0aGlzLm1lbnVUcmFjay5lbGVtZW50KS50byh7dm9sdW1lOiAwfSwgMjAwMCkuc3RhcnQoKTtcbiAgICAgICAgbmV3IFRXRUVOLlR3ZWVuKHRoaXMucm92ZXJib2FyZFRyYWNrLmVsZW1lbnQpLnRvKHt2b2x1bWU6IDAuMX0sIDIwMDApLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMucm92ZXJib2FyZFRyYWNrLnBsYXkoKTtcbiAgICAgICAgdGhpcy50cmFjayA9IHRoaXMucm92ZXJib2FyZFRyYWNrO1xuICAgICAgICB0aGlzLnN0YXJ0VHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4odGhpcylcbiAgICAgICAgICAgIC50byh7aW50cm9Qb3M6IHRoaXMucmVuZGVyZXIuY2FudmFzLndpZHRofSwgNDAwMClcbiAgICAgICAgICAgIC5vbkNvbXBsZXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cbiAgICB1cGRhdGUoY3VycmVudFRpbWUpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5keWluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYoIXRoaXMubGFzdFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHRpbWUgPSAoY3VycmVudFRpbWUgLSB0aGlzLmxhc3RUaW1lKSAvIDEwMDA7XG4gICAgICAgIGlmKHRpbWUgPiAwLjUpIHtcbiAgICAgICAgICAgIHRpbWUgPSAwLjAxNjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJlci5kcmF3KCk7XG4gICAgICAgIFxuICAgICAgICBUV0VFTi51cGRhdGUoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuY2FtZXJhLnggPSB0aGlzLmludHJvUG9zOyBcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuY2FtZXJhLnkgPSB0aGlzLnBsYXllci55O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnVwZGF0ZSh0aW1lKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLndvcmxkLnVwZGF0ZSh0aW1lKTtcbiAgICAgICAgdGhpcy5lbnRpdGllcy5mb3JFYWNoKGVudCA9PiBlbnQudXBkYXRlKHRoaXMsIHRpbWUpKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMucGxheWVyLnkgPiA2MDAwKSB7XG4gICAgICAgICAgICB0aGlzLmR5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc291bmRzLmdhbWVPdmVyLnBsYXkoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgaWYodGhpcy50cmFjayA9PT0gdGhpcy5yb3ZlcmJvYXJkVHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJzd29yZFRyYWNrLmVsZW1lbnQuY3VycmVudFRpbWUgPSB0aGlzLnJvdmVyYm9hcmRUcmFjay5lbGVtZW50LmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgdGhpcy5ob3ZlcnN3b3JkVHJhY2sucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMudHJhY2sgPT09IHRoaXMuaG92ZXJzd29yZFRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnJvdmVyYm9hcmRUcmFjay5lbGVtZW50LmN1cnJlbnRUaW1lID0gdGhpcy5ob3ZlcnN3b3JkVHJhY2suZWxlbWVudC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIHRoaXMucm92ZXJib2FyZFRyYWNrLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsImNvbnN0IFBsYXllciA9IHJlcXVpcmUoJy4vcGxheWVyLmpzJyk7XG5cbmNsYXNzIElucHV0IHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKVxuICAgIHtcbiAgICAgICAgdGhpcy5rZXlzID0ge307XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHRoaXMub25LZXlEb3duKGV2ZW50KSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGV2ZW50ID0+IHRoaXMub25LZXlVcChldmVudCkpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB0aGlzLm9uQ2xpY2soZXZlbnQpKTtcbiAgICAgICAgZ2FtZS5yZW5kZXJlci5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBldmVudCA9PiB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KSk7XG4gICAgfVxuICAgIFxuICAgIG9uS2V5RG93bihldmVudClcbiAgICB7XG4gICAgICAgIGlmKGV2ZW50LmNvZGUgPT09IFwiS2V5QVwiIHx8IGV2ZW50LmNvZGUgPT09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgICAgIHRoaXMubGVmdERvd24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleURcIiB8fCBldmVudC5jb2RlID09PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICAgICAgdGhpcy5yaWdodERvd24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleVdcIiB8fCBldmVudC5jb2RlID09PSBcIkFycm93VXBcIiB8fCBldmVudC5jb2RlPT1cIlNwYWNlXCIpIHtcbiAgICAgICAgICAgIHRoaXMudXBEb3duKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQuY29kZSA9PT0gXCJLZXlTXCIgfHwgZXZlbnQuY29kZSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgICAgICAgdGhpcy5kb3duRG93bigpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV2ZW50LmNvZGUgPT09IFwiS2V5UVwiKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLm1hbnVhbEJhcmsoKTtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5jb2RlPT1cIlNoaWZ0TGVmdFwiKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGV2ZW50LmNvZGU9PVwiU3BhY2VcIiB8fCBldmVudC5jb2RlID09PSBcIktleVdcIiB8fCBldmVudC5jb2RlID09PSBcIkFycm93VXBcIilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5qdW1wKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQuY29kZSk7XG4gICAgfVxuICAgIFxuICAgIG9uS2V5VXAoZXZlbnQpXG4gICAge1xuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleUFcIiB8fCBldmVudC5jb2RlID09PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRVcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV2ZW50LmNvZGUgPT09IFwiS2V5RFwiIHx8IGV2ZW50LmNvZGUgPT09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0VXAoKTtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleVdcIiB8fCBldmVudC5jb2RlID09PSBcIkFycm93VXBcIikge1xuICAgICAgICAgICAgdGhpcy51cFVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQuY29kZSA9PT0gXCJLZXlTXCIgfHwgZXZlbnQuY29kZSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgICAgICAgdGhpcy5kb3duVXAoKTtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleVJcIikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQuY29kZSk7XG4gICAgfVxuICAgIFxuICAgIG9uTW91c2VNb3ZlKGV2ZW50KSBcbiAgICB7XG4gICAgICAgIGxldCByZWN0ID0gZXZlbnQudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgIGxldCBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5tb3VzZVggPSBvZmZzZXRYO1xuICAgICAgICB0aGlzLm1vdXNlWSA9IG9mZnNldFk7XG4gICAgfVxuICAgIFxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYoIXRoaXMuZ2FtZS5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBqdW1wKClcbiAgICB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuanVtcCgpO1xuICAgIH1cbiAgICBcbiAgICBzaGlmdCgpXG4gICAge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNoaWZ0KCk7XG4gICAgfVxuICAgIFxuICAgIGxlZnREb3duKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmxlZnQgPSB0cnVlO1xuICAgIH1cbiAgICByaWdodERvd24oKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIucmlnaHQgPSB0cnVlO1xuICAgIH1cbiAgICB1cERvd24oKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudXAgPSB0cnVlO1xuICAgIH1cbiAgICBkb3duRG93bigpIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5kb3duID0gdHJ1ZTtcbiAgICB9XG4gICAgbGVmdFVwKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmxlZnQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmlnaHRVcCgpIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5yaWdodCA9IGZhbHNlO1xuICAgIH1cbiAgICB1cFVwKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLnVwID0gZmFsc2U7XG4gICAgfVxuICAgIGRvd25VcCgpIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5kb3duID0gZmFsc2U7XG4gICAgfVxuICAgIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0OyIsImNsYXNzIFBhcnRpY2xlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBhbmdsZSwgY29sb3IsIGxpZmVzcGFuKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxMDtcbiAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMubGlmZXNwYW4gPSBsaWZlc3BhbjtcbiAgICB9XG4gICAgdXBkYXRlKHRpbWUpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWQgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQgKiBNYXRoLnNpbih0aGlzLmFuZ2xlKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubGlmZXNwYW4gLT0gdGltZTtcbiAgICAgICAgaWYodGhpcy5saWZlc3BhbiA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZHJhdyhyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5jb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy5saWZlc3BhbiAqIDQ7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LmxpbmVXaWR0aCA9IDM7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5saW5lVG8odGhpcy54ICsgTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLnNwZWVkLCB0aGlzLnkgKyBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQpO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0Lmdsb2JhbEFscGhhID0gMTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGFydGljbGU7IiwiY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHkuanMnKTtcbmNvbnN0IEFuaW1hdGlvbiA9IHJlcXVpcmUoJy4vYW5pbWF0aW9uLmpzJyk7XG5jb25zdCBBdWRpb01hbmFnZXIgPSByZXF1aXJlKCcuL2F1ZGlvLmpzJyk7XG5cbmNvbnN0IFRXRUVOID0gcmVxdWlyZSgndHdlZW4uanMnKTtcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy55ID0gMzgwO1xuICAgICAgICB0aGlzLnNwZWVkID0gMDtcbiAgICAgICAgdGhpcy5zaGlmdENEID0gMDtcbiAgICAgICAgdGhpcy5mb3JtID0gXCJyb3ZlclwiO1xuICAgICAgICBcbiAgICAgICAgdGhpcy53aWR0aCA9IDMwMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAyMzk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJpcmRGbHkgPSBuZXcgQW5pbWF0aW9uKHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xuICAgICAgICB0aGlzLmJpcmRGbHkuYWRkRnJhbWUoXCIuL2ltYWdlcy9iaXJkMS5wbmdcIiwgMC4xNSk7XG4gICAgICAgIHRoaXMuYmlyZEZseS5hZGRGcmFtZShcIi4vaW1hZ2VzL2JpcmQyLnBuZ1wiLCAwLjEpO1xuICAgICAgICB0aGlzLmJpcmRGbHkuYWRkRnJhbWUoXCIuL2ltYWdlcy9iaXJkMy5wbmdcIiwgMC4xNSk7XG4gICAgICAgIHRoaXMuYmlyZEZseS5hZGRGcmFtZShcIi4vaW1hZ2VzL2JpcmQyLnBuZ1wiLCAwLjEpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zb3VuZHMgPSB7fTtcbiAgICAgICAgdGhpcy5zb3VuZHMuY2xpbmsgPSBuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWV0YWxDbGlua1wiKSk7XG4gICAgICAgIHRoaXMuc291bmRzLmJhcmsgPSBuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFya1wiKSk7XG4gICAgICAgIHRoaXMuc291bmRzLmJhcmsuZWxlbWVudC52b2x1bWUgPSAwLjE7XG4gICAgICAgIHRoaXMuc291bmRzLmhvdmVyc3dvcmQgPSBuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG92ZXJzd29yZFwiKSk7XG4gICAgICAgIHRoaXMuc291bmRzLnJvdmVyYm9hcmQgPSBuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm92ZXJib2FyZFwiKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNvdW5kcy5jaGlycHMgPSBbXTtcbiAgICAgICAgdGhpcy5zb3VuZHMuY2hpcnBzLnB1c2gobmV3IEF1ZGlvTWFuYWdlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpcmRzb25nMVwiKSkpO1xuICAgICAgICB0aGlzLnNvdW5kcy5jaGlycHMucHVzaChuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlyZHNvbmcyXCIpKSk7XG4gICAgICAgIHRoaXMuc291bmRzLmNoaXJwcy5wdXNoKG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaXJkc29uZzNcIikpKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc291bmRzLm5pY2UgPSBbXTtcbiAgICAgICAgdGhpcy5zb3VuZHMubmljZS5wdXNoKG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYWRpY2FsXCIpKSk7XG4gICAgICAgIHRoaXMuc291bmRzLm5pY2UucHVzaChuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2lja2VkXCIpKSk7XG4gICAgICAgIHRoaXMuc291bmRzLm5pY2UucHVzaChuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVkZVwiKSkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zb3VuZHMuZ3JpbmQgPSBuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpbmRcIikpO1xuICAgICAgICB0aGlzLnNvdW5kcy5ncmluZC5lbGVtZW50LnZvbHVtZSA9IDAuNDtcbiAgICAgICAgdGhpcy5zb3VuZHMuZ3JpbmRfbGF1bmNoID0gbmV3IEF1ZGlvTWFuYWdlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaW5kX2xhdW5jaFwiKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN3b3JkID0gbmV3IEFuaW1hdGlvbih0aGlzLndpZHRoLCAzNCAqIDIpO1xuICAgICAgICB0aGlzLnN3b3JkLmFkZEZyYW1lKFwiLi9pbWFnZXMvc3dvcmQucG5nXCIsIDEpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5kb2cgPSBuZXcgQW5pbWF0aW9uKHRoaXMud2lkdGgsIDIyMCk7XG4gICAgICAgIHRoaXMuZG9nLmFkZEZyYW1lKFwiLi9pbWFnZXMvZG9nX3dhZ19mdWxsMS5wbmdcIiwgMC4xKTtcbiAgICAgICAgdGhpcy5kb2cuYWRkRnJhbWUoXCIuL2ltYWdlcy9kb2dfd2FnX2Z1bGwyLnBuZ1wiLCAwLjA4KTtcbiAgICAgICAgdGhpcy5kb2cuYWRkRnJhbWUoXCIuL2ltYWdlcy9kb2dfd2FnX2Z1bGwzLnBuZ1wiLCAwLjEpO1xuICAgICAgICB0aGlzLmRvZy5hZGRGcmFtZShcIi4vaW1hZ2VzL2RvZ193YWdfZnVsbDIucG5nXCIsIDAuMDgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iYXJrQW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbih0aGlzLndpZHRoLCAyMjApO1xuICAgICAgICB0aGlzLmJhcmtBbmltYXRpb24uYWRkRnJhbWUoXCIuL2ltYWdlcy9iYXJrMi5wbmdcIiwgMC4xKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdCA9IG5ldyBBbmltYXRpb24odGhpcy53aWR0aCwgMjIwKTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0LmFkZEZyYW1lKFwiLi9pbWFnZXMvc2hhcGVzaGlmdF8xLnBuZ1wiLCAwLjA4KTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0LmFkZEZyYW1lKFwiLi9pbWFnZXMvc2hhcGVzaGlmdF8yLnBuZ1wiLCAwLjA4KTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0LmFkZEZyYW1lKFwiLi9pbWFnZXMvc2hhcGVzaGlmdF8zLnBuZ1wiLCAwLjA4LCB0aGlzLndpZHRoIC8gMiwgdGhpcy53aWR0aCAvIDIpO1xuICAgICAgICB0aGlzLnNoYXBlc2hpZnQuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzQucG5nXCIsIDAuMDgsIHRoaXMud2lkdGggLyAyLCB0aGlzLndpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdC5hZGRGcmFtZShcIi4vaW1hZ2VzL3NoYXBlc2hpZnRfNS5wbmdcIiwgMC4wOCwgdGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdC5hZGRGcmFtZShcIi4vaW1hZ2VzL3NoYXBlc2hpZnRfNi5wbmdcIiwgMC4wOCwgdGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNoYXBlc2hpZnRSZXZlcnNlID0gbmV3IEFuaW1hdGlvbih0aGlzLndpZHRoLCAyMjApO1xuICAgICAgICB0aGlzLnNoYXBlc2hpZnRSZXZlcnNlLmFkZEZyYW1lKFwiLi9pbWFnZXMvc2hhcGVzaGlmdF82LnBuZ1wiLCAwLjA4LCB0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0UmV2ZXJzZS5hZGRGcmFtZShcIi4vaW1hZ2VzL3NoYXBlc2hpZnRfNS5wbmdcIiwgMC4wOCwgdGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdFJldmVyc2UuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzQucG5nXCIsIDAuMDgsIHRoaXMud2lkdGggLyAyLCB0aGlzLndpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdFJldmVyc2UuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzMucG5nXCIsIDAuMDgsIHRoaXMud2lkdGggLyAyLCB0aGlzLndpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdFJldmVyc2UuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzIucG5nXCIsIDAuMDgpO1xuICAgICAgICB0aGlzLnNoYXBlc2hpZnRSZXZlcnNlLmFkZEZyYW1lKFwiLi9pbWFnZXMvc2hhcGVzaGlmdF8xLnBuZ1wiLCAwLjA4KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucm90YXRpb24gPSBNYXRoLlBJO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iYXJrVGltZXMgPSBbMjMuOTgsMjQuMjgsMjQuNTgsMjUuMTgsMjUuNDgsMjUuNzgsMjYuMzgsMjYuODMsMjcuMjgsMjcuODgsMjguNDgsNDcuOTcsNDguMjcsNDguNTcsNDkuMTcsNDkuNDcsNDkuNzcsNTAuMzcsNTAuODIsNTAuOTcsNTEuMjcsNTEuNTcsNTIuMDIsNTIuMTcsNTIuNDcsNjcuMTYsNjcuNDYsNjcuNzYsNjguMzYsNjguNjYsNjguOTYsNjkuNTYsNzAuMDEsNzAuMTYsNzAuNDYsNzAuNzYsNzEuMjEsNzEuMzYsNzEuNjYsNzEuOTYsNzIuNDEsNzIuODYsNzQuMzYsNzQuODEsNzUuMjZdO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jdXJyZW50QW5pbSA9IHRoaXMuZG9nO1xuICAgIH1cbiAgICB1cGRhdGUoZ2FtZSwgdGltZSkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zaGlmdENEIC09IHRpbWU7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmZvcm0gPT09IFwiYmlyZFwiKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmJpcmRVcGRhdGUoZ2FtZSwgdGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIudXBkYXRlKGdhbWUsIHRpbWUpO1xuICAgICAgICBpZih0aGlzLmZvcm09PVwicm92ZXJcIilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5kb2dVcGRhdGUoZ2FtZSwgdGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLmxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSAxLjUgKiBnYW1lLndvcmxkLnBpeGVsc1Blck1ldGVyICogdGltZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gMS41ICogZ2FtZS53b3JsZC5waXhlbHNQZXJNZXRlciAqIHRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy54PD0wKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLng9MC4wMTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoID4gZ2FtZS5yZW5kZXJlci5jYW1lcmEucmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGdhbWUucmVuZGVyZXIuY2FtZXJhLnJpZ2h0IC0gdGhpcy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNwZWVkPDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3BlZWRGYWN0b3IgPSAxICsgdGhpcy5zcGVlZCAvIDEwMDtcbiAgICAgICAgdGhpcy5jdXJyZW50QW5pbS51cGRhdGUodGltZSAqIHNwZWVkRmFjdG9yKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmFya1RpbWVzLmZvckVhY2goYmFyayA9PiB7XG4gICAgICAgICAgICBpZihNYXRoLmFicyhnYW1lLnJvdmVyYm9hcmRUcmFjay5lbGVtZW50LmN1cnJlbnRUaW1lIC0gYmFyaykgPCAwLjAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iYXJrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYoIXRoaXMub25Hcm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzLmdyaW5kLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGZ1Y2sgaXRcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB9XG4gICAgXG4gICAgZHJhdyhyZW5kZXJlcikge1xuICAgICAgICBpZih0aGlzLmZvcm09PVwicm92ZXJcIilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zd29yZC5yb3RhdGlvbiA9IHRoaXMucm90YXRpb24gKyBNYXRoLlBJO1xuICAgICAgICAgICAgbGV0IHN3b3JkWSA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC0gdGhpcy5zd29yZC5oZWlnaHQgKyAxNTtcbiAgICAgICAgICAgIHRoaXMuc3dvcmQuZHJhdyhyZW5kZXJlciwgdGhpcy54LCBzd29yZFkpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbS5yb3RhdGlvbiA9IHRoaXMuc3dvcmQucm90YXRpb247XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltLmRyYXcocmVuZGVyZXIsIFxuICAgICAgICAgICAgICAgIHRoaXMueCArIDQwLFxuICAgICAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0IC0gdGhpcy5jdXJyZW50QW5pbS5oZWlnaHQgKyAxMCxcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltLndpZHRoIC8gMiAtIDQwLFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEFuaW0uaGVpZ2h0IC0gdGhpcy5zd29yZC5oZWlnaHQgLyAyICsgNVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFuaW0uZHJhdyhyZW5kZXJlciwgdGhpcy54LCB0aGlzLnkpO1xuICAgICAgICAgICAgdGhpcy5zd29yZC5kcmF3KHJlbmRlcmVyLCB0aGlzLnggKyB0aGlzLndpZHRoIC8gMiwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyLCAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBqdW1wKClcbiAgICB7XG4gICAgICAgIGxldCBncm91bmREaXN0ID0gdGhpcy5nYW1lLndvcmxkLmZpbmRGbG9vcigodGhpcy54ICsgdGhpcy53aWR0aCAvIDIpKSAtICh0aGlzLnkrdGhpcy5oZWlnaHQpO1xuICAgICAgICBpZih0aGlzLmZvcm09PVwicm92ZXJcIiAmJiAoZ3JvdW5kRGlzdDw9MjUmJmdyb3VuZERpc3Q+PS0yNSkgJiYgIXRoaXMuZ2FtZS53b3JsZC5nZXRQaXQoKHRoaXMueCArIHRoaXMud2lkdGggLyAyKSkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSA9IC0xMDtcbiAgICAgICAgICAgIHRoaXMuc291bmRzLmdyaW5kX2xhdW5jaC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmFyaygpIHtcbiAgICAgICAgaWYodGhpcy5mb3JtID09PSBcInJvdmVyXCIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudEFuaW0gPT09IHRoaXMuYmFya0FuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFuaW0gPSB0aGlzLmJhcmtBbmltYXRpb247XG4gICAgICAgICAgICB0aGlzLmJhcmtBbmltYXRpb24ub25jZSgnbG9vcCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmZvcm0gPT09IFwicm92ZXJcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltID0gdGhpcy5kb2c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBtYW51YWxCYXJrKCkge1xuICAgICAgICBpZih0aGlzLmZvcm0gPT09IFwicm92ZXJcIiAmJiB0aGlzLmN1cnJlbnRBbmltICE9PSB0aGlzLmJhcmtBbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzLmJhcmsuaW50ZXJydXB0UGxheSgpO1xuICAgICAgICAgICAgdGhpcy5iYXJrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmZvcm0gPT09IFwiYmlyZFwiKSB7XG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRDaGlycCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudENoaXJwLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VycmVudENoaXJwID0gdGhpcy5zb3VuZHMuY2hpcnBzW01hdGgucm91bmQoKHRoaXMuc291bmRzLmNoaXJwcy5sZW5ndGggLSAxKSAqIE1hdGgucmFuZG9tKCkpXTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudENoaXJwLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgIGRvZ1VwZGF0ZShnYW1lLCB0aW1lKVxuICAgIHtcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24ueSA9IGdhbWUud29ybGQuZ3Jhdml0eTtcbiAgICAgICAgXG4gICAgICAgIGxldCBmbG9vciA9IGdhbWUud29ybGQuY2hlY2tGb3JGbG9vcih0aGlzKTtcbiAgICAgICAgbGV0IGxlZnRZID0gZ2FtZS53b3JsZC5maW5kRmxvb3IodGhpcy54KTtcbiAgICAgICAgbGV0IHJpZ2h0WSA9IGdhbWUud29ybGQuZmluZEZsb29yKHRoaXMueCArIHRoaXMud2lkdGgpO1xuICAgICAgICBcbiAgICAgICAgaWYoZmxvb3IpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLm9uR3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZHMuZ3JpbmQucGxheSgpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMud2FzRmxpcHBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3VuZHMubmljZVtNYXRoLnJvdW5kKCh0aGlzLnNvdW5kcy5uaWNlLmxlbmd0aCAtIDEpICogTWF0aC5yYW5kb20oKSldLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZCAqPSAxLjM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53YXNGbGlwcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vbkdyb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnkgPSBmbG9vciAtIHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55ID0gNDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmdyb3VuZEFuZ2xlID0gTWF0aC5hdGFuMihsZWZ0WSAtIHJpZ2h0WSwgdGhpcy54IC0gKHRoaXMueCArIHRoaXMud2lkdGgpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IHRoaXMuZ3JvdW5kQW5nbGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGdhbWUucmVuZGVyZXIuZW1pdFNwYXJrKHRoaXMueCArIHRoaXMud2lkdGggLyAyICsgMTUsIHRoaXMueSArIHRoaXMuaGVpZ2h0LCB0aGlzLmdyb3VuZEFuZ2xlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLm9uR3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZHMuZ3JpbmQucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBub3JtYWxpemVkID0gTWF0aC5hdGFuMihNYXRoLnNpbih0aGlzLnJvdGF0aW9uKSwgTWF0aC5jb3ModGhpcy5yb3RhdGlvbikpO1xuICAgICAgICAgICAgaWYobm9ybWFsaXplZCA+IE1hdGguUEkgKiAwLjI1ICYmIG5vcm1hbGl6ZWQgPCBNYXRoLlBJICogMC43NSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2FzRmxpcHBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkdyb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLm9uR3JvdW5kKSB7XG4gICAgICAgICAgICBpZih0aGlzLnJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCArPSB0aW1lICogMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCAtPSB0aW1lICogMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgKz0gdGltZSAqIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZihNYXRoLmFicyhsZWZ0WSAtICh0aGlzLnkgKyB0aGlzLmhlaWdodCkpID4gMjAgJiYgTWF0aC5hYnMocmlnaHRZIC0gKHRoaXMueSArIHRoaXMuaGVpZ2h0KSkgPiAyMCkge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMubGVmdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uIC09IDAuMDY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy5yaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uICs9IDAuMDY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGJpcmRVcGRhdGUoZ2FtZSwgdGltZSlcbiAgICB7XG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uLnkgPSBnYW1lLndvcmxkLmdyYXZpdHkgKiAwLjU7XG4gICAgICAgIGlmKHRoaXMudXApIHtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSAtPSAwLjUgKiBnYW1lLndvcmxkLnBpeGVsc1Blck1ldGVyICogdGltZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmRvd24pIHtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueSArPSAwLjUgKiBnYW1lLndvcmxkLnBpeGVsc1Blck1ldGVyICogdGltZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnZlbG9jaXR5Lnk+PTAuMiAqIGdhbWUud29ybGQucGl4ZWxzUGVyTWV0ZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueT0wLjIgKiBnYW1lLndvcmxkLnBpeGVsc1Blck1ldGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMudmVsb2NpdHkueTw9LTAuMiAqIGdhbWUud29ybGQucGl4ZWxzUGVyTWV0ZXIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkueT0tMC4yICogZ2FtZS53b3JsZC5waXhlbHNQZXJNZXRlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwZWVkICo9IDAuOTk1O1xuICAgICAgICBpZihnYW1lLndvcmxkLmNoZWNrRm9yRmxvb3IodGhpcykgJiYgdGhpcy52ZWxvY2l0eS55ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zcGVlZDw9MSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdHJhbnNsYXRlZCA9IHRoaXMuZ2FtZS5yZW5kZXJlci5jYW1lcmEudHJhbnNsYXRlKHRoaXMpO1xuICAgICAgICBsZXQgc3dvcmRBbmdsZSA9IE1hdGguUEkgKyBNYXRoLmF0YW4yKHRyYW5zbGF0ZWQueSAtIHRoaXMuZ2FtZS5pbnB1dC5tb3VzZVksIHRyYW5zbGF0ZWQueCAtIHRoaXMuZ2FtZS5pbnB1dC5tb3VzZVgpO1xuICAgICAgICAvL3RoaXMuc3dvcmQucm90YXRpb24gPSBzd29yZEFuZ2xlO1xuICAgICAgICB0aGlzLm9uR3JvdW5kID0gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHRyYW5zZm9ybSgpIHtcbiAgICAgICAgaWYodGhpcy5mb3JtPT1cInJvdmVyXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuanVtcCgpO1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gXCJiaXJkXCI7XG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiSE9WRVJTV09SRFwiO1xuICAgICAgICAgICAgdGhpcy53aWR0aCAvPSAyO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgLz0gMjtcbiAgICAgICAgICAgIHRoaXMuc3dvcmRTd2luZyA9IG5ldyBUV0VFTi5Ud2Vlbih0aGlzLnN3b3JkKS50byh7cm90YXRpb246IE1hdGguUEkgLyAyICsgMC40NX0sIDIwMCkuc3RhcnQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbSA9IHRoaXMuc2hhcGVzaGlmdDtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVzaGlmdC5vbmNlKCdsb29wJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEFuaW0gPSB0aGlzLmJpcmRGbHk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5zb3VuZHMuaG92ZXJzd29yZC5wbGF5KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5ob3ZlcnN3b3JkVHJhY2sucGxheSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5yb3ZlcmJvYXJkVHJhY2sucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUudHJhY2sgPSB0aGlzLmdhbWUuaG92ZXJzd29yZFRyYWNrO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IFwicm92ZXJcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJST1ZFUkJPQVJEXCI7XG4gICAgICAgICAgICB0aGlzLndpZHRoICo9IDI7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCAqPSAyO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRDaGlycCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudENoaXJwLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbSA9IHRoaXMuc2hhcGVzaGlmdFJldmVyc2U7XG4gICAgICAgICAgICB0aGlzLnNoYXBlc2hpZnRSZXZlcnNlLm9uY2UoJ2xvb3AnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbSA9IHRoaXMuZG9nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSBNYXRoLlBJO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNvdW5kcy5yb3ZlcmJvYXJkLnBsYXkoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucm92ZXJib2FyZFRyYWNrLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuaG92ZXJzd29yZFRyYWNrLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnRyYWNrID0gdGhpcy5nYW1lLnJvdmVyYm9hcmRUcmFjaztcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53YXNGbGlwcGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNoaWZ0Q0QgPSAxO1xuICAgIH1cbiAgICBzaGlmdCgpXG4gICAge1xuICAgICAgICBpZih0aGlzLnNoaWZ0Q0Q8PTAgJiYgdGhpcy5zcGVlZCA+IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyOyIsImNvbnN0IENhbWVyYSA9IHJlcXVpcmUoJy4vY2FtZXJhLmpzJyk7XG5jb25zdCBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4vcGFydGljbGUuanMnKTtcbmNsYXNzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHRoaXMuc2NvcmUuY2xhc3NMaXN0LmFkZChcInVpXCIpO1xuICAgICAgICB0aGlzLnNjb3JlLmNsYXNzTGlzdC5hZGQoXCJzY29yZVwiKTtcbiAgICAgICAgdGhpcy5zY29yZS50ZXh0Q29udGVudCA9ICdTY29yZTogMCc7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IFwiMFwiIHx8IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaGlnaFNjb3JlXCIpO1xuICAgICAgICB0aGlzLmhpZ2hTY29yZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgdGhpcy5oaWdoU2NvcmVTcGFuLmNsYXNzTGlzdC5hZGQoXCJ1aVwiKTtcbiAgICAgICAgdGhpcy5oaWdoU2NvcmVTcGFuLmNsYXNzTGlzdC5hZGQoXCJoaWdoU2NvcmVcIik7XG4gICAgICAgIHRoaXMuaGlnaFNjb3JlU3Bhbi50ZXh0Q29udGVudCA9ICdIaWdoIFNjb3JlOiAwJztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSAxMjgwO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA3NTI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBhcmFsbGF4ID0gW107XG4gICAgICAgIHRoaXMucGFyYWxsYXgucHVzaCh0aGlzLmxvYWRQYXR0ZXJuKFwiLi9pbWFnZXMvYmcvdHJlZXMucG5nXCIpKTtcbiAgICAgICAgdGhpcy5wYXJhbGxheC5wdXNoKHRoaXMubG9hZFBhdHRlcm4oXCIuL2ltYWdlcy9iZy9oaWxsLnBuZ1wiKSk7XG4gICAgICAgIHRoaXMucGFyYWxsYXgucHVzaCh0aGlzLmxvYWRQYXR0ZXJuKFwiLi9pbWFnZXMvYmcvY2xvdWRzLnBuZ1wiKSk7XG4gICAgICAgIHRoaXMucGFyYWxsYXgucHVzaCh0aGlzLmxvYWRQYXR0ZXJuKFwiLi9pbWFnZXMvYmcvc3Vuc2V0LnBuZ1wiKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgUHJvbWlzZS5hbGwodGhpcy5wYXJhbGxheCkudGhlbigocGF0dGVybnMpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyYWxsYXggPSBwYXR0ZXJucztcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJhY2tncm91bmRIZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvYWRJbWFnZShcIi4vaW1hZ2VzL2ludHJvLnBuZ1wiKS50aGVuKGltZyA9PiB7XG4gICAgICAgICAgICB0aGlzLmludHJvID0gaW1nO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc2NvcmUpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuaGlnaFNjb3JlU3Bhbik7XG4gICAgfVxuICAgIGxvYWRJbWFnZShzcmMpIHtcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoaW1nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZFBhdHRlcm4oc3JjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRJbWFnZShzcmMpLnRoZW4oaW1nID0+IHtcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1nLndpZHRoICogNDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgaSAqIGltZy53aWR0aCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYW52YXMueCA9IC10aGlzLmNhbnZhcy53aWR0aCAqIDI7XG4gICAgICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZW1pdFNwYXJrKHgsIHksIGFuZ2xlKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVzLnB1c2gobmV3IFBhcnRpY2xlKHggKyBNYXRoLnJhbmRvbSgpICogNSwgeSAtIE1hdGgucmFuZG9tKCkgKiA1LCBhbmdsZSAtIE1hdGguUEkgLyA4ICogTWF0aC5yYW5kb20oKSwgXCJnb2xkXCIsIE1hdGgucmFuZG9tKCkgLyAyKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd1BhcmFsbGF4UGF0dGVybihwYXR0ZXJuLCBpbmRleCwgb3ZlcnJpZGUpIHtcbiAgICAgICAgbGV0IGhlaWdodEZhY3RvciA9IHRoaXMuZ2FtZS5wbGF5ZXIueSAvIDYwO1xuICAgICAgICBpZihoZWlnaHRGYWN0b3IgPiAxMDApIHtcbiAgICAgICAgICAgIGhlaWdodEZhY3RvciA9IDEwMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYmFja2dyb3VuZFkgPSB0aGlzLmNhbWVyYS50b3AgLSBoZWlnaHRGYWN0b3I7XG4gICAgICAgIGlmKG92ZXJyaWRlKSB7XG4gICAgICAgICAgICBwYXR0ZXJuLnggPSAtdGhpcy5jYW52YXMud2lkdGggKiA0ICsgKDAgLSB0aGlzLmdhbWUuaW50cm9Qb3MpIC8gKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXR0ZXJuLnggLT0gdGhpcy5nYW1lLnBsYXllci5zcGVlZCAvIChpbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHBhdHRlcm4ueCA8PSAtdGhpcy5jYW1lcmEud2lkdGggKiAzKSB7XG4gICAgICAgICAgICBwYXR0ZXJuLnggPSB0aGlzLmNhbWVyYS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UocGF0dGVybiwgcGF0dGVybi54LCBiYWNrZ3JvdW5kWSwgdGhpcy5jYW1lcmEud2lkdGggKiA0LCB0aGlzLmJhY2tncm91bmRIZWlnaHQgLyB0aGlzLmNhbWVyYS5zY2FsZS55ICogMS4xNSk7XG4gICAgfVxuICAgIHVwZGF0ZSh0aW1lKSB7XG4gICAgICAgIHRoaXMuY2FtZXJhLnggPSAwICsgdGhpcy5jYW1lcmEud2lkdGggLyAyO1xuICAgICAgICB0aGlzLmNhbWVyYS55ID0gdGhpcy5nYW1lLnBsYXllci55O1xuICAgICAgICBpZih0aGlzLmNhbWVyYS55ID4gNTAwMCkge1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEueSA9IDUwMDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuZm9yRWFjaCgocGFydCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmKCFwYXJ0LnVwZGF0ZSh0aW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFydGljbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciBzY29yZUludCA9IHBhcnNlSW50KCh0aGlzLmdhbWUud29ybGQueFBvcy8xMDApLnRvRml4ZWQoMCkpO1xuICAgICAgICB0aGlzLnNjb3JlLnRleHRDb250ZW50ID0gXCJTY29yZTogXCIgKyBzY29yZUludC50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhpZ2hTY29yZSgpO1xuICAgICAgICB0aGlzLmhpZ2hTY29yZVNwYW4udGV4dENvbnRlbnQgPSBcIkhpZ2ggU2NvcmU6IFwiICsgdGhpcy5oaWdoU2NvcmUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybSgpO1xuICAgICAgICBpZighdGhpcy5wYXJhbGxheFswXS50aGVuKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLnBhcmFsbGF4Lmxlbmd0aDsgaS0tOyBpID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BhcmFsbGF4UGF0dGVybih0aGlzLnBhcmFsbGF4W2ldLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoIXRoaXMuZ2FtZS5zdGFydGVkKSB7XG4gICAgICAgICAgICBpZighdGhpcy5wYXJhbGxheFswXS50aGVuKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gdGhpcy5wYXJhbGxheC5sZW5ndGg7IGktLTsgaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3UGFyYWxsYXhQYXR0ZXJuKHRoaXMucGFyYWxsYXhbaV0sIGksIHRoaXMuZ2FtZS5pbnRyb1Bvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5pbnRybykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbnRybywgLXRoaXMuY2FtZXJhLndpZHRoLCB0aGlzLmNhbWVyYS50b3AsIHRoaXMuY2FtZXJhLndpZHRoLCB0aGlzLmNhbWVyYS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZS5lbnRpdGllcy5mb3JFYWNoKGVudCA9PiB7XG4gICAgICAgICAgICBlbnQuZHJhdyh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUud29ybGQuZHJhdyh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGFydGljbGVzLmZvckVhY2goKHBhcnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBwYXJ0LmRyYXcodGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVIaWdoU2NvcmUoKVxuICAgIHtcbiAgICAgICAgbGV0IG5ld0hTID0gcGFyc2VJbnQoKHRoaXMuZ2FtZS53b3JsZC54UG9zLzEwMCkudG9GaXhlZCgwKSk7XG4gICAgICAgIGlmKG5ld0hTPnRoaXMuaGlnaFNjb3JlKVxuICAgICAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBuZXdIUztcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoaWdoU2NvcmVcIiwgdGhpcy5oaWdoU2NvcmUpO1xuICAgIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlcmVyOyIsImNsYXNzIFdvcmxkIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IDkuODtcbiAgICAgICAgdGhpcy5waXhlbHNQZXJNZXRlciA9IDUwO1xuICAgICAgICB0aGlzLnhQb3MgPSAwO1xuICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDAgfHwgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoaWdoU2NvcmVcIik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFkanVzdG1lbnQgPSAwO1xuICAgICAgICB0aGlzLmFkanVzdG1lbnRDRCA9IDA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN0YWJpbGl0eSA9IDE7IC8vc2Vjb25kc1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wb2xlQ0QgPSAwO1xuICAgICAgICB0aGlzLnBvbGVNYXAgPSBbXTtcbiAgICAgICAgdGhpcy5waXRDRCA9IDEwMDA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBpdCA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5oZWlnaHRNYXAgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNjQwOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0TWFwW2ldID0ge3k6IDYyMH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWlnaHRNYXBbMTVdLnBvbGUgPSB0cnVlO1xuICAgIH1cbiAgICBmaW5kRmxvb3IoeCkge1xuICAgICAgICB4IC89IDQ7XG4gICAgICAgIGlmKHggPCAwKSB7XG4gICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHggPj0gdGhpcy5oZWlnaHRNYXAubGVuZ3RoKSB7XG4gICAgICAgICAgICB4ID0gdGhpcy5oZWlnaHRNYXAubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmxvb3IgPSB0aGlzLmhlaWdodE1hcFtNYXRoLnJvdW5kKHgpXTtcbiAgICAgICAgcmV0dXJuIGZsb29yLnk7XG4gICAgfVxuICAgIFxuICAgIGdldFBpdCh4KVxuICAgIHtcbiAgICAgICAgIHggLz0gNDtcbiAgICAgICAgaWYoeCA8IDApIHtcbiAgICAgICAgICAgIHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoeCA+PSB0aGlzLmhlaWdodE1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLmhlaWdodE1hcC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmbG9vciA9IHRoaXMuaGVpZ2h0TWFwW01hdGgucm91bmQoeCldO1xuICAgICAgICByZXR1cm4gZmxvb3IucGl0O1xuICAgIH1cbiAgICBcbiAgICBjaGVja0ZvckZsb29yKGVudCkge1xuICAgICAgICBsZXQgZmxvb3IgPSB0aGlzLmhlaWdodE1hcFtNYXRoLnJvdW5kKChlbnQueCArIGVudC53aWR0aCAvIDIpIC8gNCldO1xuICAgICAgICBpZihmbG9vci5waXQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGxlZnRZID0gdGhpcy5maW5kRmxvb3IoZW50LngpO1xuICAgICAgICBsZXQgcmlnaHRZID0gdGhpcy5maW5kRmxvb3IoZW50LnggKyBlbnQud2lkdGgpO1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKGxlZnRZIC0gcmlnaHRZLCBlbnQueCAtIChlbnQueCArIGVudC53aWR0aCkpO1xuICAgICAgICBsZXQgZGlmZiA9IGVudC5yb3RhdGlvbiAtIGFuZ2xlO1xuICAgICAgICBkaWZmID0gTWF0aC5hdGFuMihNYXRoLnNpbihkaWZmKSwgTWF0aC5jb3MoZGlmZikpO1xuICAgICAgICBcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlmZikgPiBNYXRoLlBJICogMC40KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gXG4gICAgICAgIGlmKGVudC55ICsgZW50LmhlaWdodCA+PSBmbG9vci55ICYmIGVudC55ICsgZW50LmhlaWdodCAqIDEvNCA8PSBmbG9vci55KSB7XG4gICAgICAgICAgICByZXR1cm4gZmxvb3IueTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHVwZGF0ZSh0aW1lKSB7XG4gICAgICAgIHRoaXMuYWRqdXN0bWVudENEIC09IHRpbWU7XG4gICAgICAgIGlmKHRoaXMuYWRqdXN0bWVudENEPD0wKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFkanVzdG1lbnQgKj0gMC44O1xuICAgICAgICAgICAgdGhpcy5hZGp1c3RtZW50ICs9IChNYXRoLnJhbmRvbSgpKjAuNiktMC4zO1xuICAgICAgICAgICAgaWYodGhpcy5hZGp1c3RtZW50PC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0bWVudD0tMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuYWRqdXN0bWVudD4xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0bWVudD0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmFkanVzdG1lbnRDRCA9IHRoaXMuc3RhYmlsaXR5O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnhQb3MrPSB0aGlzLmdhbWUucGxheWVyLnNwZWVkO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lLnBsYXllci5zcGVlZDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnN0cmVhbSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0cmVhbSh0aW1lKSB7XG4gICAgICAgIHRoaXMuaGVpZ2h0TWFwLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMucG9sZU1hcC5zaGlmdCgpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGxhc3QgPSB7fTtcbiAgICAgICAgbGFzdC55ID0gdGhpcy5oZWlnaHRNYXBbdGhpcy5oZWlnaHRNYXAubGVuZ3RoIC0gMV0ueTtcblxuICAgICAgICB0aGlzLnBpdENEIC09IDE7XG4gICAgICAgIGlmKHRoaXMucGl0TGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGFzdC5waXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5waXRMZW5ndGgtLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxhc3QueSAtPSB0aGlzLmFkanVzdG1lbnQ7XG4gICAgICAgICAgICBpZihsYXN0LnkgPiA1MDAwKSB7XG4gICAgICAgICAgICAgICAgbGFzdC55ID0gNTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnBpdENEIDw9IDApIHtcbiAgICAgICAgICAgIGxhc3QucGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucGl0Q0QgPSA0NTAwICsgTWF0aC5yYW5kb20oKSAqIDEwMDA7XG4gICAgICAgICAgICB0aGlzLnBpdExlbmd0aCA9IDMwMCArIE1hdGgucmFuZG9tKCkgKiAxNDAwICsgTWF0aC5yYW5kb20oKSAqIDUwMCAqIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWQgLyAyNTA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMucG9sZUNELS07XG4gICAgICAgIGlmKHRoaXMucG9sZUNEPD0wKVxuICAgICAgICB7XG4gICAgICAgICAgICBsYXN0LnBvbGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wb2xlQ0Q9NDAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wb2xlTWFwLnB1c2gobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGVpZ2h0TWFwLnB1c2gobGFzdCk7XG4gICAgfVxuICAgIGRyYXcocmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5saW5lV2lkdGggPSAxMDtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgbGV0IGxhc3RQb2xlID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHRNYXAuZm9yRWFjaCgocG9zLCB4KSA9PiB7XG4gICAgICAgICAgICB4ICo9IDQ7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcG9zLnk7XG4gICAgICAgICAgICBpZighcG9zLnBpdClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBpdD09dHJ1ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGl0PWZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZW5kZXJlci5jb250ZXh0LmxpbmVUbyh4LCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIGlmKHBvcy5wb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLmNvbnRleHQubW92ZVRvKHgsIHRoaXMuZ2FtZS5yZW5kZXJlci5jYW1lcmEuYm90dG9tKTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXIuY29udGV4dC5saW5lVG8oeCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFBvbGUgPSB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBpdD09ZmFsc2UpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpdD10cnVlO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMucGl0ID0gZmFsc2U7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmxkOyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIi8qKlxuICogVHdlZW4uanMgLSBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXG4gKi9cblxuLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbFxuKGZ1bmN0aW9uICgpIHtcblxuXHRpZiAoJ3BlcmZvcm1hbmNlJyBpbiB3aW5kb3cgPT09IGZhbHNlKSB7XG5cdFx0d2luZG93LnBlcmZvcm1hbmNlID0ge307XG5cdH1cblxuXHQvLyBJRSA4XG5cdERhdGUubm93ID0gKERhdGUubm93IHx8IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdH0pO1xuXG5cdGlmICgnbm93JyBpbiB3aW5kb3cucGVyZm9ybWFuY2UgPT09IGZhbHNlKSB7XG5cdFx0dmFyIG9mZnNldCA9IHdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmcgJiYgd2luZG93LnBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQgPyB3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogRGF0ZS5ub3coKTtcblxuXHRcdHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gRGF0ZS5ub3coKSAtIG9mZnNldDtcblx0XHR9O1xuXHR9XG5cbn0pKCk7XG5cbnZhciBUV0VFTiA9IFRXRUVOIHx8IChmdW5jdGlvbiAoKSB7XG5cblx0dmFyIF90d2VlbnMgPSBbXTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0Z2V0QWxsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHJldHVybiBfdHdlZW5zO1xuXG5cdFx0fSxcblxuXHRcdHJlbW92ZUFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRfdHdlZW5zID0gW107XG5cblx0XHR9LFxuXG5cdFx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdFx0X3R3ZWVucy5wdXNoKHR3ZWVuKTtcblxuXHRcdH0sXG5cblx0XHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0XHR2YXIgaSA9IF90d2VlbnMuaW5kZXhPZih0d2Vlbik7XG5cblx0XHRcdGlmIChpICE9PSAtMSkge1xuXHRcdFx0XHRfdHdlZW5zLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lKSB7XG5cblx0XHRcdGlmIChfdHdlZW5zLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpID0gMDtcblxuXHRcdFx0dGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cblx0XHRcdHdoaWxlIChpIDwgX3R3ZWVucy5sZW5ndGgpIHtcblxuXHRcdFx0XHRpZiAoX3R3ZWVuc1tpXS51cGRhdGUodGltZSkpIHtcblx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X3R3ZWVucy5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdH1cblx0fTtcblxufSkoKTtcblxuVFdFRU4uVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0KSB7XG5cblx0dmFyIF9vYmplY3QgPSBvYmplY3Q7XG5cdHZhciBfdmFsdWVzU3RhcnQgPSB7fTtcblx0dmFyIF92YWx1ZXNFbmQgPSB7fTtcblx0dmFyIF92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xuXHR2YXIgX2R1cmF0aW9uID0gMTAwMDtcblx0dmFyIF9yZXBlYXQgPSAwO1xuXHR2YXIgX3lveW8gPSBmYWxzZTtcblx0dmFyIF9pc1BsYXlpbmcgPSBmYWxzZTtcblx0dmFyIF9yZXZlcnNlZCA9IGZhbHNlO1xuXHR2YXIgX2RlbGF5VGltZSA9IDA7XG5cdHZhciBfc3RhcnRUaW1lID0gbnVsbDtcblx0dmFyIF9lYXNpbmdGdW5jdGlvbiA9IFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZTtcblx0dmFyIF9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLkxpbmVhcjtcblx0dmFyIF9jaGFpbmVkVHdlZW5zID0gW107XG5cdHZhciBfb25TdGFydENhbGxiYWNrID0gbnVsbDtcblx0dmFyIF9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuXHR2YXIgX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR2YXIgX29uQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG5cdHZhciBfb25TdG9wQ2FsbGJhY2sgPSBudWxsO1xuXG5cdC8vIFNldCBhbGwgc3RhcnRpbmcgdmFsdWVzIHByZXNlbnQgb24gdGhlIHRhcmdldCBvYmplY3Rcblx0Zm9yICh2YXIgZmllbGQgaW4gb2JqZWN0KSB7XG5cdFx0X3ZhbHVlc1N0YXJ0W2ZpZWxkXSA9IHBhcnNlRmxvYXQob2JqZWN0W2ZpZWxkXSwgMTApO1xuXHR9XG5cblx0dGhpcy50byA9IGZ1bmN0aW9uIChwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xuXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdF9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdF92YWx1ZXNFbmQgPSBwcm9wZXJ0aWVzO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKHRpbWUpIHtcblxuXHRcdFRXRUVOLmFkZCh0aGlzKTtcblxuXHRcdF9pc1BsYXlpbmcgPSB0cnVlO1xuXG5cdFx0X29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cblx0XHRfc3RhcnRUaW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblx0XHRfc3RhcnRUaW1lICs9IF9kZWxheVRpbWU7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiBfdmFsdWVzRW5kKSB7XG5cblx0XHRcdC8vIENoZWNrIGlmIGFuIEFycmF5IHdhcyBwcm92aWRlZCBhcyBwcm9wZXJ0eSB2YWx1ZVxuXHRcdFx0aWYgKF92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHRpZiAoX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcblx0XHRcdFx0X3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSBbX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdChfdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxuXHRcdFx0aWYgKF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0X3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IF9vYmplY3RbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoKF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXG5cdFx0XHR9XG5cblx0XHRcdF92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSBfdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9O1xuXG5cdHRoaXMuc3RvcCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGlmICghX2lzUGxheWluZykge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0VFdFRU4ucmVtb3ZlKHRoaXMpO1xuXHRcdF9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdGlmIChfb25TdG9wQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdF9vblN0b3BDYWxsYmFjay5jYWxsKF9vYmplY3QpO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RvcENoYWluZWRUd2VlbnMoKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9O1xuXG5cdHRoaXMuc3RvcENoYWluZWRUd2VlbnMgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IF9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0X2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xuXHRcdH1cblxuXHR9O1xuXG5cdHRoaXMuZGVsYXkgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG5cblx0XHRfZGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH07XG5cblx0dGhpcy5yZXBlYXQgPSBmdW5jdGlvbiAodGltZXMpIHtcblxuXHRcdF9yZXBlYXQgPSB0aW1lcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9O1xuXG5cdHRoaXMueW95byA9IGZ1bmN0aW9uICh5b3lvKSB7XG5cblx0XHRfeW95byA9IHlveW87XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXG5cdHRoaXMuZWFzaW5nID0gZnVuY3Rpb24gKGVhc2luZykge1xuXG5cdFx0X2Vhc2luZ0Z1bmN0aW9uID0gZWFzaW5nO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH07XG5cblx0dGhpcy5pbnRlcnBvbGF0aW9uID0gZnVuY3Rpb24gKGludGVycG9sYXRpb24pIHtcblxuXHRcdF9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH07XG5cblx0dGhpcy5jaGFpbiA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdF9jaGFpbmVkVHdlZW5zID0gYXJndW1lbnRzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH07XG5cblx0dGhpcy5vblN0YXJ0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cblx0XHRfb25TdGFydENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLm9uVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cblx0XHRfb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH07XG5cblx0dGhpcy5vbkNvbXBsZXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cblx0XHRfb25Db21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLm9uU3RvcCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG5cdFx0X29uU3RvcENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uICh0aW1lKSB7XG5cblx0XHR2YXIgcHJvcGVydHk7XG5cdFx0dmFyIGVsYXBzZWQ7XG5cdFx0dmFyIHZhbHVlO1xuXG5cdFx0aWYgKHRpbWUgPCBfc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xuXG5cdFx0XHRpZiAoX29uU3RhcnRDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0XHRfb25TdGFydENhbGxiYWNrLmNhbGwoX29iamVjdCk7XG5cdFx0XHR9XG5cblx0XHRcdF9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRlbGFwc2VkID0gKHRpbWUgLSBfc3RhcnRUaW1lKSAvIF9kdXJhdGlvbjtcblx0XHRlbGFwc2VkID0gZWxhcHNlZCA+IDEgPyAxIDogZWxhcHNlZDtcblxuXHRcdHZhbHVlID0gX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xuXG5cdFx0Zm9yIChwcm9wZXJ0eSBpbiBfdmFsdWVzRW5kKSB7XG5cblx0XHRcdC8vIERvbid0IHVwZGF0ZSBwcm9wZXJ0aWVzIHRoYXQgZG8gbm90IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0XG5cdFx0XHRpZiAoX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3RhcnQgPSBfdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cdFx0XHR2YXIgZW5kID0gX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmIChlbmQgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0XHRcdF9vYmplY3RbcHJvcGVydHldID0gX2ludGVycG9sYXRpb25GdW5jdGlvbihlbmQsIHZhbHVlKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHRpZiAoZW5kLnN0YXJ0c1dpdGgoJysnKSB8fCBlbmQuc3RhcnRzV2l0aCgnLScpKSB7XG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kLCAxMCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kLCAxMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUHJvdGVjdCBhZ2FpbnN0IG5vbiBudW1lcmljIHByb3BlcnRpZXMuXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0X29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAoX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdF9vblVwZGF0ZUNhbGxiYWNrLmNhbGwoX29iamVjdCwgdmFsdWUpO1xuXHRcdH1cblxuXHRcdGlmIChlbGFwc2VkID09PSAxKSB7XG5cblx0XHRcdGlmIChfcmVwZWF0ID4gMCkge1xuXG5cdFx0XHRcdGlmIChpc0Zpbml0ZShfcmVwZWF0KSkge1xuXHRcdFx0XHRcdF9yZXBlYXQtLTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XG5cdFx0XHRcdGZvciAocHJvcGVydHkgaW4gX3ZhbHVlc1N0YXJ0UmVwZWF0KSB7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIChfdmFsdWVzRW5kW3Byb3BlcnR5XSkgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRfdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQoX3ZhbHVlc0VuZFtwcm9wZXJ0eV0sIDEwKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoX3lveW8pIHtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSBfdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdFx0XHRfdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHRfdmFsdWVzRW5kW3Byb3BlcnR5XSA9IHRtcDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfdmFsdWVzU3RhcnRbcHJvcGVydHldID0gX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKF95b3lvKSB7XG5cdFx0XHRcdFx0X3JldmVyc2VkID0gIV9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9zdGFydFRpbWUgPSB0aW1lICsgX2RlbGF5VGltZTtcblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRpZiAoX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdF9vbkNvbXBsZXRlQ2FsbGJhY2suY2FsbChfb2JqZWN0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcblx0XHRcdFx0XHQvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cblx0XHRcdFx0XHRfY2hhaW5lZFR3ZWVuc1tpXS5zdGFydChfc3RhcnRUaW1lICsgX2R1cmF0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fTtcblxufTtcblxuXG5UV0VFTi5FYXNpbmcgPSB7XG5cblx0TGluZWFyOiB7XG5cblx0XHROb25lOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gaztcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YWRyYXRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogKDIgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgtLWsgKiAoayAtIDIpIC0gMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDdWJpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVhcnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSAoLS1rICogayAqIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWludGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFNpbnVzb2lkYWw6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEV4cG9uZW50aWFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0gMTAgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoLSBNYXRoLnBvdygyLCAtIDEwICogKGsgLSAxKSkgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdENpcmN1bGFyOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnNxcnQoMSAtICgtLWsgKiBrKSk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFbGFzdGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHM7XG5cdFx0XHR2YXIgYSA9IDAuMTtcblx0XHRcdHZhciBwID0gMC40O1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghYSB8fCBhIDwgMSkge1xuXHRcdFx0XHRhID0gMTtcblx0XHRcdFx0cyA9IHAgLyA0O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cyA9IHAgKiBNYXRoLmFzaW4oMSAvIGEpIC8gKDIgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gKGEgKiBNYXRoLnBvdygyLCAxMCAqIChrIC09IDEpKSAqIE1hdGguc2luKChrIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHM7XG5cdFx0XHR2YXIgYSA9IDAuMTtcblx0XHRcdHZhciBwID0gMC40O1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghYSB8fCBhIDwgMSkge1xuXHRcdFx0XHRhID0gMTtcblx0XHRcdFx0cyA9IHAgLyA0O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cyA9IHAgKiBNYXRoLmFzaW4oMSAvIGEpIC8gKDIgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChhICogTWF0aC5wb3coMiwgLSAxMCAqIGspICogTWF0aC5zaW4oKGsgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIDEpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcztcblx0XHRcdHZhciBhID0gMC4xO1xuXHRcdFx0dmFyIHAgPSAwLjQ7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFhIHx8IGEgPCAxKSB7XG5cdFx0XHRcdGEgPSAxO1xuXHRcdFx0XHRzID0gcCAvIDQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzID0gcCAqIE1hdGguYXNpbigxIC8gYSkgLyAoMiAqIE1hdGguUEkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAoayAtPSAxKSkgKiBNYXRoLnNpbigoayAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAoayAtPSAxKSkgKiBNYXRoLnNpbigoayAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICogMC41ICsgMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJhY2s6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Qm91bmNlOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8ICgxIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8IDAuNSkge1xuXHRcdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcblxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuXHRcdGlmIChrIDwgMCkge1xuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuXHRcdH1cblxuXHRcdGlmIChrID4gMSkge1xuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuXG5cdH0sXG5cblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIGIgPSAwO1xuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBwdyA9IE1hdGgucG93O1xuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYjtcblxuXHR9LFxuXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cblx0XHRpZiAodlswXSA9PT0gdlttXSkge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0aSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFV0aWxzOiB7XG5cblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcblxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcblxuXHRcdH0sXG5cblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcblxuXHRcdH0sXG5cblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBhID0gWzFdO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuXHRcdFx0XHR2YXIgcyA9IDE7XG5cblx0XHRcdFx0aWYgKGFbbl0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XG5cdFx0XHRcdFx0cyAqPSBpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YVtuXSA9IHM7XG5cdFx0XHRcdHJldHVybiBzO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSkoKSxcblxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xuXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcblxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKVxuKGZ1bmN0aW9uIChyb290KSB7XG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVFdFRU47XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblxuXHRcdC8vIE5vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFRXRUVOO1xuXG5cdH0gZWxzZSBpZiAocm9vdCAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHQvLyBHbG9iYWwgdmFyaWFibGVcblx0XHRyb290LlRXRUVOID0gVFdFRU47XG5cblx0fVxuXG59KSh0aGlzKTtcbiJdfQ==
