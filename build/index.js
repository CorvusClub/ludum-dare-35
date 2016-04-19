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
            event.preventDefault();
            return false;
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
            event.preventDefault();
            return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImphdmFzY3JpcHQvYW5pbWF0aW9uLmpzIiwiamF2YXNjcmlwdC9hdWRpby5qcyIsImphdmFzY3JpcHQvY2FtZXJhLmpzIiwiamF2YXNjcmlwdC9lbnRpdHkuanMiLCJqYXZhc2NyaXB0L2dhbWUuanMiLCJqYXZhc2NyaXB0L2lucHV0LmpzIiwiamF2YXNjcmlwdC9wYXJ0aWNsZS5qcyIsImphdmFzY3JpcHQvcGxheWVyLmpzIiwiamF2YXNjcmlwdC9yZW5kZXIuanMiLCJqYXZhc2NyaXB0L3dvcmxkLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLE9BQU8sUUFBUSxtQkFBUixDQUFQOztBQUVKLElBQUksT0FBTyxJQUFJLElBQUosRUFBUDs7Ozs7Ozs7Ozs7OztBQ0ZKLElBQU0sZUFBZSxRQUFRLFFBQVIsRUFBa0IsWUFBbEI7O0lBQ2Y7OztBQUNGLGFBREUsU0FDRixDQUFZLEtBQVosRUFBbUIsTUFBbkIsRUFBMkI7OEJBRHpCLFdBQ3lCOzsyRUFEekIsdUJBQ3lCOztBQUV2QixjQUFLLEtBQUwsR0FBYSxLQUFiLENBRnVCO0FBR3ZCLGNBQUssTUFBTCxHQUFjLE1BQWQsQ0FIdUI7QUFJdkIsY0FBSyxRQUFMLEdBQWdCLENBQWhCLENBSnVCOztBQU12QixjQUFLLE1BQUwsR0FBYyxFQUFkLENBTnVCO0FBT3ZCLGNBQUssQ0FBTCxHQUFTLENBQVQsQ0FQdUI7QUFRdkIsY0FBSyxLQUFMLEdBQWEsQ0FBYixDQVJ1Qjs7O0tBQTNCOztpQkFERTs7aUNBWU8sS0FBSyxVQUFVLE9BQU8sUUFBUTtBQUNuQyxnQkFBSSxRQUFRLEVB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBHYW1lID0gcmVxdWlyZSgnLi9qYXZhc2NyaXB0L2dhbWUnKTtcblxudmFyIGdhbWUgPSBuZXcgR2FtZSgpOyIsImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcbmNsYXNzIEFuaW1hdGlvbiBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZnJhbWVzID0gW107XG4gICAgICAgIHRoaXMudCA9IDA7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICBcbiAgICB9XG4gICAgYWRkRnJhbWUoc3JjLCBkdXJhdGlvbiwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBsZXQgZnJhbWUgPSB7fTtcbiAgICAgICAgZnJhbWUuaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGZyYW1lLmltZy5zcmMgPSBzcmM7XG4gICAgICAgIGZyYW1lLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIGZyYW1lLndpZHRoID0gd2lkdGg7XG4gICAgICAgIGZyYW1lLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5mcmFtZXMucHVzaChmcmFtZSk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnQgPSAwO1xuICAgICAgICB0aGlzLmluZGV4IC0gMDtcbiAgICB9XG4gICAgdXBkYXRlKHRpbWUpIHtcbiAgICAgICAgdGhpcy50ICs9IHRpbWU7XG4gICAgICAgIGlmKHRoaXMudCA+IHRoaXMuZnJhbWVzW3RoaXMuaW5kZXhdLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICB0aGlzLnQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaW5kZXggPj0gdGhpcy5mcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2xvb3AnKTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXcocmVuZGVyZXIsIHgsIHksIG9yaWdpblggPSB0aGlzLndpZHRoIC8gMiwgb3JpZ2luWSA9IHRoaXMuaGVpZ2h0IC8gMikge1xuICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1t0aGlzLmluZGV4XTtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC50cmFuc2xhdGUoeCArIG9yaWdpblgsIHkgKyBvcmlnaW5ZKTtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5yb3RhdGUodGhpcy5yb3RhdGlvbik7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQuZHJhd0ltYWdlKGZyYW1lLmltZywgLShvcmlnaW5YKSwgLShvcmlnaW5ZKSwgZnJhbWUud2lkdGggfHwgdGhpcy53aWR0aCwgZnJhbWUuaGVpZ2h0IHx8IHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5yb3RhdGUoLXRoaXMucm90YXRpb24pO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LnRyYW5zbGF0ZSgtKHggKyBvcmlnaW5YKSwgLSh5ICsgb3JpZ2luWSkpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBbmltYXRpb247IiwiY2xhc3MgQXVkaW9NYW5hZ2VyXG57XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgbG9vcFRpbWUpXG4gICAge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmxvb3BUaW1lID0gbG9vcFRpbWU7XG4gICAgICAgIGlmKHRoaXMubG9vcFRpbWUhPW51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgdGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHBsYXkoKVxuICAgIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnBsYXkoKTtcbiAgICB9XG4gICAgaW50ZXJydXB0UGxheSgpIHtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cbiAgICBcbiAgICBwYXVzZSgpXG4gICAge1xuICAgICAgICB0aGlzLmVsZW1lbnQucGF1c2UoKTtcbiAgICB9XG4gICAgXG4gICAgc3RvcCgpXG4gICAge1xuICAgICAgICB0aGlzLmVsZW1lbnQucGF1c2UoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmN1cnJlbnRUaW1lPTA7XG4gICAgfVxuICAgIFxuICAgIGxvb3AoKVxuICAgIHtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jdXJyZW50VGltZT10aGlzLmxvb3BUaW1lO1xuICAgIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvTWFuYWdlcjsiLCJjbGFzcyBDYW1lcmEge1xuICAgIGNvbnN0cnVjdG9yKHJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHtcbiAgICAgICAgICAgIHg6IDAuNSxcbiAgICAgICAgICAgIHk6IDAuNVxuICAgICAgICB9O1xuICAgIH1cbiAgICB0cmFuc2Zvcm0oKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuY29udGV4dC50cmFuc2xhdGUoXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNhbnZhcy53aWR0aCAvIDIgLSB0aGlzLnggKiB0aGlzLnNjYWxlLngsXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHQgLyAyIC0gdGhpcy55ICogdGhpcy5zY2FsZS55XG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLmNvbnRleHQuc2NhbGUodGhpcy5zY2FsZS54LCB0aGlzLnNjYWxlLnkpO1xuICAgIH1cbiAgICB0cmFuc2xhdGUocG9zKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBwb3MueCAtICh0aGlzLnggLSB0aGlzLnJlbmRlcmVyLmNhbnZhcy53aWR0aCkgKiB0aGlzLnNjYWxlLngsXG4gICAgICAgICAgICB5OiBwb3MueSAtIHRoaXMueSArIHRoaXMucmVuZGVyZXIuY2FudmFzLmhlaWdodCAvIDJcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbGVmdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAtIHRoaXMud2lkdGggLyAyO1xuICAgIH1cbiAgICBnZXQgcmlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLndpZHRoIC8gMjtcbiAgICB9XG4gICAgZ2V0IHRvcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSAtIHRoaXMuaGVpZ2h0IC8gMjtcbiAgICB9XG4gICAgZ2V0IGJvdHRvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMjtcbiAgICB9XG4gICAgXG4gICAgZ2V0IHdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5jYW52YXMud2lkdGggLyB0aGlzLnNjYWxlLng7XG4gICAgfVxuICAgIGdldCBoZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmNhbnZhcy5oZWlnaHQgLyB0aGlzLnNjYWxlLnk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbWVyYTsiLCJjbGFzcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnggPSAxMDtcbiAgICAgICAgdGhpcy55ID0gMTA7XG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZHJhdyhyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgICB1cGRhdGUoZ2FtZSwgdGltZSkge1xuICAgICAgICB0aGlzLnZlbG9jaXR5LnggKz0gdGhpcy5hY2NlbGVyYXRpb24ueCAqIHRpbWU7XG4gICAgICAgIHRoaXMudmVsb2NpdHkueSArPSB0aGlzLmFjY2VsZXJhdGlvbi55ICogdGltZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5LnggKiB0aW1lICogZ2FtZS53b3JsZC5waXhlbHNQZXJNZXRlcjtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkueSAqIHRpbWUgKiBnYW1lLndvcmxkLnBpeGVsc1Blck1ldGVyO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHk7IiwiY29uc3QgUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlci5qcycpO1xuY29uc3QgUGxheWVyID0gcmVxdWlyZSgnLi9wbGF5ZXIuanMnKTtcbmNvbnN0IFdvcmxkID0gcmVxdWlyZSgnLi93b3JsZC5qcycpO1xuY29uc3QgSW5wdXQgPSByZXF1aXJlKCcuL2lucHV0LmpzJyk7XG5jb25zdCBBdWRpb01hbmFnZXIgPSByZXF1aXJlKCcuL2F1ZGlvLmpzJyk7XG5cbmNvbnN0IFRXRUVOID0gcmVxdWlyZSgndHdlZW4uanMnKTtcblxuY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIodGhpcyk7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBuZXcgSW5wdXQodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJvdmVyYm9hcmRUcmFjayA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3ZlcmJvYXJkVHJhY2tcIiksIDkuOSk7XG4gICAgICAgIHRoaXMucm92ZXJib2FyZFRyYWNrLmVsZW1lbnQudm9sdW1lID0gMDtcbiAgICAgICAgdGhpcy5ob3ZlcnN3b3JkVHJhY2sgPSBuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG92ZXJzd29yZFRyYWNrXCIpLCA5LjkpO1xuICAgICAgICB0aGlzLmhvdmVyc3dvcmRUcmFjay5lbGVtZW50LnZvbHVtZSA9IDAuMTtcbiAgICAgICAgdGhpcy5tZW51VHJhY2sgPSBuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVudVRyYWNrXCIpLCAwKTtcbiAgICAgICAgdGhpcy5tZW51VHJhY2suZWxlbWVudC52b2x1bWUgPSAwLjE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNvdW5kcyA9IHt9O1xuICAgICAgICB0aGlzLnNvdW5kcy5nYW1lT3ZlciA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidW1tZXJcIikpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhY2sucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhY2sucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW50cm9Qb3MgPSAtdGhpcy5yZW5kZXJlci5jYW52YXMud2lkdGg7XG4gICAgICAgIFxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5tZW51VHJhY2sucGxheSgpO1xuICAgICAgICB0aGlzLnRyYWNrID0gdGhpcy5tZW51VHJhY2s7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzID0gW107XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcy5wdXNoKHRoaXMucGxheWVyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMud29ybGQgPSBuZXcgV29ybGQodGhpcyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmR5aW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICBpZih0aGlzLnN0YXJ0VHdlZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXcgVFdFRU4uVHdlZW4odGhpcy5tZW51VHJhY2suZWxlbWVudCkudG8oe3ZvbHVtZTogMH0sIDIwMDApLnN0YXJ0KCk7XG4gICAgICAgIG5ldyBUV0VFTi5Ud2Vlbih0aGlzLnJvdmVyYm9hcmRUcmFjay5lbGVtZW50KS50byh7dm9sdW1lOiAwLjF9LCAyMDAwKS5zdGFydCgpO1xuICAgICAgICB0aGlzLnJvdmVyYm9hcmRUcmFjay5wbGF5KCk7XG4gICAgICAgIHRoaXMudHJhY2sgPSB0aGlzLnJvdmVyYm9hcmRUcmFjaztcbiAgICAgICAgdGhpcy5zdGFydFR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKHRoaXMpXG4gICAgICAgICAgICAudG8oe2ludHJvUG9zOiB0aGlzLnJlbmRlcmVyLmNhbnZhcy53aWR0aH0sIDQwMDApXG4gICAgICAgICAgICAub25Db21wbGV0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG4gICAgdXBkYXRlKGN1cnJlbnRUaW1lKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuZHlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGlmKCF0aGlzLmxhc3RUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCB0aW1lID0gKGN1cnJlbnRUaW1lIC0gdGhpcy5sYXN0VGltZSkgLyAxMDAwO1xuICAgICAgICBpZih0aW1lID4gMC41KSB7XG4gICAgICAgICAgICB0aW1lID0gMC4wMTY7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZHJhdygpO1xuICAgICAgICBcbiAgICAgICAgVFdFRU4udXBkYXRlKCk7XG4gICAgICAgIFxuICAgICAgICBpZighdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNhbWVyYS54ID0gdGhpcy5pbnRyb1BvczsgXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmNhbWVyYS55ID0gdGhpcy5wbGF5ZXIueTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJlci51cGRhdGUodGltZSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdGhpcy53b3JsZC51cGRhdGUodGltZSk7XG4gICAgICAgIHRoaXMuZW50aXRpZXMuZm9yRWFjaChlbnQgPT4gZW50LnVwZGF0ZSh0aGlzLCB0aW1lKSk7XG4gICAgICAgIFxuICAgICAgICBpZih0aGlzLnBsYXllci55ID4gNjAwMCkge1xuICAgICAgICAgICAgdGhpcy5keWluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNvdW5kcy5nYW1lT3Zlci5wbGF5KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMudHJhY2sgPT09IHRoaXMucm92ZXJib2FyZFRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmhvdmVyc3dvcmRUcmFjay5lbGVtZW50LmN1cnJlbnRUaW1lID0gdGhpcy5yb3ZlcmJvYXJkVHJhY2suZWxlbWVudC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJzd29yZFRyYWNrLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLnRyYWNrID09PSB0aGlzLmhvdmVyc3dvcmRUcmFjaykge1xuICAgICAgICAgICAgdGhpcy5yb3ZlcmJvYXJkVHJhY2suZWxlbWVudC5jdXJyZW50VGltZSA9IHRoaXMuaG92ZXJzd29yZFRyYWNrLmVsZW1lbnQuY3VycmVudFRpbWU7XG4gICAgICAgICAgICB0aGlzLnJvdmVyYm9hcmRUcmFjay5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCJjb25zdCBQbGF5ZXIgPSByZXF1aXJlKCcuL3BsYXllci5qcycpO1xuXG5jbGFzcyBJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSlcbiAgICB7XG4gICAgICAgIHRoaXMua2V5cyA9IHt9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB0aGlzLm9uS2V5RG93bihldmVudCkpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBldmVudCA9PiB0aGlzLm9uS2V5VXAoZXZlbnQpKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4gdGhpcy5vbkNsaWNrKGV2ZW50KSk7XG4gICAgICAgIGdhbWUucmVuZGVyZXIuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZXZlbnQgPT4gdGhpcy5vbk1vdXNlTW92ZShldmVudCkpO1xuICAgIH1cbiAgICBcbiAgICBvbktleURvd24oZXZlbnQpXG4gICAge1xuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleUFcIiB8fCBldmVudC5jb2RlID09PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnREb3duKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQuY29kZSA9PT0gXCJLZXlEXCIgfHwgZXZlbnQuY29kZSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgICAgIHRoaXMucmlnaHREb3duKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQuY29kZSA9PT0gXCJLZXlXXCIgfHwgZXZlbnQuY29kZSA9PT0gXCJBcnJvd1VwXCIgfHwgZXZlbnQuY29kZT09XCJTcGFjZVwiKSB7XG4gICAgICAgICAgICB0aGlzLnVwRG93bigpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV2ZW50LmNvZGUgPT09IFwiS2V5U1wiIHx8IGV2ZW50LmNvZGUgPT09IFwiQXJyb3dEb3duXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZG93bkRvd24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleVFcIikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5tYW51YWxCYXJrKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQuY29kZT09XCJTaGlmdExlZnRcIilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihldmVudC5jb2RlPT1cIlNwYWNlXCIgfHwgZXZlbnQuY29kZSA9PT0gXCJLZXlXXCIgfHwgZXZlbnQuY29kZSA9PT0gXCJBcnJvd1VwXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuanVtcCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50LmNvZGUpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIG9uS2V5VXAoZXZlbnQpXG4gICAge1xuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleUFcIiB8fCBldmVudC5jb2RlID09PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRVcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGV2ZW50LmNvZGUgPT09IFwiS2V5RFwiIHx8IGV2ZW50LmNvZGUgPT09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0VXAoKTtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleVdcIiB8fCBldmVudC5jb2RlID09PSBcIkFycm93VXBcIikge1xuICAgICAgICAgICAgdGhpcy51cFVwKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQuY29kZSA9PT0gXCJLZXlTXCIgfHwgZXZlbnQuY29kZSA9PT0gXCJBcnJvd0Rvd25cIikge1xuICAgICAgICAgICAgdGhpcy5kb3duVXAoKTtcbiAgICAgICAgfVxuICAgICAgICBpZihldmVudC5jb2RlID09PSBcIktleVJcIikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQuY29kZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgb25Nb3VzZU1vdmUoZXZlbnQpIFxuICAgIHtcbiAgICAgICAgbGV0IHJlY3QgPSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgbGV0IG9mZnNldFkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm1vdXNlWCA9IG9mZnNldFg7XG4gICAgICAgIHRoaXMubW91c2VZID0gb2Zmc2V0WTtcbiAgICB9XG4gICAgXG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBpZighdGhpcy5nYW1lLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGp1bXAoKVxuICAgIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5qdW1wKCk7XG4gICAgfVxuICAgIFxuICAgIHNoaWZ0KClcbiAgICB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2hpZnQoKTtcbiAgICB9XG4gICAgXG4gICAgbGVmdERvd24oKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIubGVmdCA9IHRydWU7XG4gICAgfVxuICAgIHJpZ2h0RG93bigpIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5yaWdodCA9IHRydWU7XG4gICAgfVxuICAgIHVwRG93bigpIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci51cCA9IHRydWU7XG4gICAgfVxuICAgIGRvd25Eb3duKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmRvd24gPSB0cnVlO1xuICAgIH1cbiAgICBsZWZ0VXAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIubGVmdCA9IGZhbHNlO1xuICAgIH1cbiAgICByaWdodFVwKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLnJpZ2h0ID0gZmFsc2U7XG4gICAgfVxuICAgIHVwVXAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIudXAgPSBmYWxzZTtcbiAgICB9XG4gICAgZG93blVwKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmRvd24gPSBmYWxzZTtcbiAgICB9XG4gICAgXG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7IiwiY2xhc3MgUGFydGljbGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGFuZ2xlLCBjb2xvciwgbGlmZXNwYW4pIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDEwO1xuICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5saWZlc3BhbiA9IGxpZmVzcGFuO1xuICAgIH1cbiAgICB1cGRhdGUodGltZSkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZCAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZCAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5saWZlc3BhbiAtPSB0aW1lO1xuICAgICAgICBpZih0aGlzLmxpZmVzcGFuIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBkcmF3KHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLmxpZmVzcGFuICogNDtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQubGluZVdpZHRoID0gMztcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LmxpbmVUbyh0aGlzLnggKyBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuc3BlZWQsIHRoaXMueSArIE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5zcGVlZCk7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIHJlbmRlcmVyLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSAxO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNsZTsiLCJjb25zdCBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eS5qcycpO1xuY29uc3QgQW5pbWF0aW9uID0gcmVxdWlyZSgnLi9hbmltYXRpb24uanMnKTtcbmNvbnN0IEF1ZGlvTWFuYWdlciA9IHJlcXVpcmUoJy4vYXVkaW8uanMnKTtcblxuY29uc3QgVFdFRU4gPSByZXF1aXJlKCd0d2Vlbi5qcycpO1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnkgPSAzODA7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnNoaWZ0Q0QgPSAwO1xuICAgICAgICB0aGlzLmZvcm0gPSBcInJvdmVyXCI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLndpZHRoID0gMzAwO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDIzOTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmlyZEZseSA9IG5ldyBBbmltYXRpb24odGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMik7XG4gICAgICAgIHRoaXMuYmlyZEZseS5hZGRGcmFtZShcIi4vaW1hZ2VzL2JpcmQxLnBuZ1wiLCAwLjE1KTtcbiAgICAgICAgdGhpcy5iaXJkRmx5LmFkZEZyYW1lKFwiLi9pbWFnZXMvYmlyZDIucG5nXCIsIDAuMSk7XG4gICAgICAgIHRoaXMuYmlyZEZseS5hZGRGcmFtZShcIi4vaW1hZ2VzL2JpcmQzLnBuZ1wiLCAwLjE1KTtcbiAgICAgICAgdGhpcy5iaXJkRmx5LmFkZEZyYW1lKFwiLi9pbWFnZXMvYmlyZDIucG5nXCIsIDAuMSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNvdW5kcyA9IHt9O1xuICAgICAgICB0aGlzLnNvdW5kcy5jbGluayA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXRhbENsaW5rXCIpKTtcbiAgICAgICAgdGhpcy5zb3VuZHMuYmFyayA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYXJrXCIpKTtcbiAgICAgICAgdGhpcy5zb3VuZHMuYmFyay5lbGVtZW50LnZvbHVtZSA9IDAuMTtcbiAgICAgICAgdGhpcy5zb3VuZHMuaG92ZXJzd29yZCA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3ZlcnN3b3JkXCIpKTtcbiAgICAgICAgdGhpcy5zb3VuZHMucm92ZXJib2FyZCA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3ZlcmJvYXJkXCIpKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc291bmRzLmNoaXJwcyA9IFtdO1xuICAgICAgICB0aGlzLnNvdW5kcy5jaGlycHMucHVzaChuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmlyZHNvbmcxXCIpKSk7XG4gICAgICAgIHRoaXMuc291bmRzLmNoaXJwcy5wdXNoKG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaXJkc29uZzJcIikpKTtcbiAgICAgICAgdGhpcy5zb3VuZHMuY2hpcnBzLnB1c2gobmV3IEF1ZGlvTWFuYWdlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpcmRzb25nM1wiKSkpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zb3VuZHMubmljZSA9IFtdO1xuICAgICAgICB0aGlzLnNvdW5kcy5uaWNlLnB1c2gobmV3IEF1ZGlvTWFuYWdlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGljYWxcIikpKTtcbiAgICAgICAgdGhpcy5zb3VuZHMubmljZS5wdXNoKG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aWNrZWRcIikpKTtcbiAgICAgICAgdGhpcy5zb3VuZHMubmljZS5wdXNoKG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWRlXCIpKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNvdW5kcy5ncmluZCA9IG5ldyBBdWRpb01hbmFnZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmluZFwiKSk7XG4gICAgICAgIHRoaXMuc291bmRzLmdyaW5kLmVsZW1lbnQudm9sdW1lID0gMC40O1xuICAgICAgICB0aGlzLnNvdW5kcy5ncmluZF9sYXVuY2ggPSBuZXcgQXVkaW9NYW5hZ2VyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpbmRfbGF1bmNoXCIpKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3dvcmQgPSBuZXcgQW5pbWF0aW9uKHRoaXMud2lkdGgsIDM0ICogMik7XG4gICAgICAgIHRoaXMuc3dvcmQuYWRkRnJhbWUoXCIuL2ltYWdlcy9zd29yZC5wbmdcIiwgMSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRvZyA9IG5ldyBBbmltYXRpb24odGhpcy53aWR0aCwgMjIwKTtcbiAgICAgICAgdGhpcy5kb2cuYWRkRnJhbWUoXCIuL2ltYWdlcy9kb2dfd2FnX2Z1bGwxLnBuZ1wiLCAwLjEpO1xuICAgICAgICB0aGlzLmRvZy5hZGRGcmFtZShcIi4vaW1hZ2VzL2RvZ193YWdfZnVsbDIucG5nXCIsIDAuMDgpO1xuICAgICAgICB0aGlzLmRvZy5hZGRGcmFtZShcIi4vaW1hZ2VzL2RvZ193YWdfZnVsbDMucG5nXCIsIDAuMSk7XG4gICAgICAgIHRoaXMuZG9nLmFkZEZyYW1lKFwiLi9pbWFnZXMvZG9nX3dhZ19mdWxsMi5wbmdcIiwgMC4wOCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJhcmtBbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKHRoaXMud2lkdGgsIDIyMCk7XG4gICAgICAgIHRoaXMuYmFya0FuaW1hdGlvbi5hZGRGcmFtZShcIi4vaW1hZ2VzL2JhcmsyLnBuZ1wiLCAwLjEpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0ID0gbmV3IEFuaW1hdGlvbih0aGlzLndpZHRoLCAyMjApO1xuICAgICAgICB0aGlzLnNoYXBlc2hpZnQuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzEucG5nXCIsIDAuMDgpO1xuICAgICAgICB0aGlzLnNoYXBlc2hpZnQuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzIucG5nXCIsIDAuMDgpO1xuICAgICAgICB0aGlzLnNoYXBlc2hpZnQuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzMucG5nXCIsIDAuMDgsIHRoaXMud2lkdGggLyAyLCB0aGlzLndpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdC5hZGRGcmFtZShcIi4vaW1hZ2VzL3NoYXBlc2hpZnRfNC5wbmdcIiwgMC4wOCwgdGhpcy53aWR0aCAvIDIsIHRoaXMud2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0LmFkZEZyYW1lKFwiLi9pbWFnZXMvc2hhcGVzaGlmdF81LnBuZ1wiLCAwLjA4LCB0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0LmFkZEZyYW1lKFwiLi9pbWFnZXMvc2hhcGVzaGlmdF82LnBuZ1wiLCAwLjA4LCB0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdFJldmVyc2UgPSBuZXcgQW5pbWF0aW9uKHRoaXMud2lkdGgsIDIyMCk7XG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdFJldmVyc2UuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzYucG5nXCIsIDAuMDgsIHRoaXMud2lkdGggLyAyLCB0aGlzLmhlaWdodCAvIDIpO1xuICAgICAgICB0aGlzLnNoYXBlc2hpZnRSZXZlcnNlLmFkZEZyYW1lKFwiLi9pbWFnZXMvc2hhcGVzaGlmdF81LnBuZ1wiLCAwLjA4LCB0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0UmV2ZXJzZS5hZGRGcmFtZShcIi4vaW1hZ2VzL3NoYXBlc2hpZnRfNC5wbmdcIiwgMC4wOCwgdGhpcy53aWR0aCAvIDIsIHRoaXMud2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0UmV2ZXJzZS5hZGRGcmFtZShcIi4vaW1hZ2VzL3NoYXBlc2hpZnRfMy5wbmdcIiwgMC4wOCwgdGhpcy53aWR0aCAvIDIsIHRoaXMud2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5zaGFwZXNoaWZ0UmV2ZXJzZS5hZGRGcmFtZShcIi4vaW1hZ2VzL3NoYXBlc2hpZnRfMi5wbmdcIiwgMC4wOCk7XG4gICAgICAgIHRoaXMuc2hhcGVzaGlmdFJldmVyc2UuYWRkRnJhbWUoXCIuL2ltYWdlcy9zaGFwZXNoaWZ0XzEucG5nXCIsIDAuMDgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IE1hdGguUEk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJhcmtUaW1lcyA9IFsyMy45OCwyNC4yOCwyNC41OCwyNS4xOCwyNS40OCwyNS43OCwyNi4zOCwyNi44MywyNy4yOCwyNy44OCwyOC40OCw0Ny45Nyw0OC4yNyw0OC41Nyw0OS4xNyw0OS40Nyw0OS43Nyw1MC4zNyw1MC44Miw1MC45Nyw1MS4yNyw1MS41Nyw1Mi4wMiw1Mi4xNyw1Mi40Nyw2Ny4xNiw2Ny40Niw2Ny43Niw2OC4zNiw2OC42Niw2OC45Niw2OS41Niw3MC4wMSw3MC4xNiw3MC40Niw3MC43Niw3MS4yMSw3MS4zNiw3MS42Niw3MS45Niw3Mi40MSw3Mi44Niw3NC4zNiw3NC44MSw3NS4yNl07XG4gICAgICAgIFxuICAgICAgICB0aGlzLmN1cnJlbnRBbmltID0gdGhpcy5kb2c7XG4gICAgfVxuICAgIHVwZGF0ZShnYW1lLCB0aW1lKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNoaWZ0Q0QgLT0gdGltZTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuZm9ybSA9PT0gXCJiaXJkXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYmlyZFVwZGF0ZShnYW1lLCB0aW1lKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci51cGRhdGUoZ2FtZSwgdGltZSk7XG4gICAgICAgIGlmKHRoaXMuZm9ybT09XCJyb3ZlclwiKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRvZ1VwZGF0ZShnYW1lLCB0aW1lKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMubGVmdCkge1xuICAgICAgICAgICAgdGhpcy54IC09IDEuNSAqIGdhbWUud29ybGQucGl4ZWxzUGVyTWV0ZXIgKiB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMucmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCArPSAxLjUgKiBnYW1lLndvcmxkLnBpeGVsc1Blck1ldGVyICogdGltZTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLng8PTApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueD0wLjAxO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMueCArIHRoaXMud2lkdGggPiBnYW1lLnJlbmRlcmVyLmNhbWVyYS5yaWdodCkge1xuICAgICAgICAgICAgdGhpcy54ID0gZ2FtZS5yZW5kZXJlci5jYW1lcmEucmlnaHQgLSB0aGlzLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc3BlZWQ8MClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzcGVlZEZhY3RvciA9IDEgKyB0aGlzLnNwZWVkIC8gMTAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRBbmltLnVwZGF0ZSh0aW1lICogc3BlZWRGYWN0b3IpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iYXJrVGltZXMuZm9yRWFjaChiYXJrID0+IHtcbiAgICAgICAgICAgIGlmKE1hdGguYWJzKGdhbWUucm92ZXJib2FyZFRyYWNrLmVsZW1lbnQuY3VycmVudFRpbWUgLSBiYXJrKSA8IDAuMDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhcmsoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZighdGhpcy5vbkdyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHMuZ3JpbmQucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gZnVjayBpdFxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIH1cbiAgICBcbiAgICBkcmF3KHJlbmRlcmVyKSB7XG4gICAgICAgIGlmKHRoaXMuZm9ybT09XCJyb3ZlclwiKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN3b3JkLnJvdGF0aW9uID0gdGhpcy5yb3RhdGlvbiArIE1hdGguUEk7XG4gICAgICAgICAgICBsZXQgc3dvcmRZID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLSB0aGlzLnN3b3JkLmhlaWdodCArIDE1O1xuICAgICAgICAgICAgdGhpcy5zd29yZC5kcmF3KHJlbmRlcmVyLCB0aGlzLngsIHN3b3JkWSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltLnJvdGF0aW9uID0gdGhpcy5zd29yZC5yb3RhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFuaW0uZHJhdyhyZW5kZXJlciwgXG4gICAgICAgICAgICAgICAgdGhpcy54ICsgNDAsXG4gICAgICAgICAgICAgICAgdGhpcy55ICsgdGhpcy5oZWlnaHQgLSB0aGlzLmN1cnJlbnRBbmltLmhlaWdodCArIDEwLFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEFuaW0ud2lkdGggLyAyIC0gNDAsXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbS5oZWlnaHQgLSB0aGlzLnN3b3JkLmhlaWdodCAvIDIgKyA1XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbS5kcmF3KHJlbmRlcmVyLCB0aGlzLngsIHRoaXMueSk7XG4gICAgICAgICAgICB0aGlzLnN3b3JkLmRyYXcocmVuZGVyZXIsIHRoaXMueCArIHRoaXMud2lkdGggLyAyLCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDIsIDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGp1bXAoKVxuICAgIHtcbiAgICAgICAgbGV0IGdyb3VuZERpc3QgPSB0aGlzLmdhbWUud29ybGQuZmluZEZsb29yKCh0aGlzLnggKyB0aGlzLndpZHRoIC8gMikpIC0gKHRoaXMueSt0aGlzLmhlaWdodCk7XG4gICAgICAgIGlmKHRoaXMuZm9ybT09XCJyb3ZlclwiICYmIChncm91bmREaXN0PD0yNSYmZ3JvdW5kRGlzdD49LTI1KSAmJiAhdGhpcy5nYW1lLndvcmxkLmdldFBpdCgodGhpcy54ICsgdGhpcy53aWR0aCAvIDIpKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55ID0gLTEwO1xuICAgICAgICAgICAgdGhpcy5zb3VuZHMuZ3JpbmRfbGF1bmNoLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiYXJrKCkge1xuICAgICAgICBpZih0aGlzLmZvcm0gPT09IFwicm92ZXJcIikge1xuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50QW5pbSA9PT0gdGhpcy5iYXJrQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbSA9IHRoaXMuYmFya0FuaW1hdGlvbjtcbiAgICAgICAgICAgIHRoaXMuYmFya0FuaW1hdGlvbi5vbmNlKCdsb29wJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuZm9ybSA9PT0gXCJyb3ZlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEFuaW0gPSB0aGlzLmRvZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIG1hbnVhbEJhcmsoKSB7XG4gICAgICAgIGlmKHRoaXMuZm9ybSA9PT0gXCJyb3ZlclwiICYmIHRoaXMuY3VycmVudEFuaW0gIT09IHRoaXMuYmFya0FuaW1hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHMuYmFyay5pbnRlcnJ1cHRQbGF5KCk7XG4gICAgICAgICAgICB0aGlzLmJhcmsoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuZm9ybSA9PT0gXCJiaXJkXCIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudENoaXJwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2hpcnAuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2hpcnAgPSB0aGlzLnNvdW5kcy5jaGlycHNbTWF0aC5yb3VuZCgodGhpcy5zb3VuZHMuY2hpcnBzLmxlbmd0aCAtIDEpICogTWF0aC5yYW5kb20oKSldO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2hpcnAucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG4gICAgZG9nVXBkYXRlKGdhbWUsIHRpbWUpXG4gICAge1xuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbi55ID0gZ2FtZS53b3JsZC5ncmF2aXR5O1xuICAgICAgICBcbiAgICAgICAgbGV0IGZsb29yID0gZ2FtZS53b3JsZC5jaGVja0ZvckZsb29yKHRoaXMpO1xuICAgICAgICBsZXQgbGVmdFkgPSBnYW1lLndvcmxkLmZpbmRGbG9vcih0aGlzLngpO1xuICAgICAgICBsZXQgcmlnaHRZID0gZ2FtZS53b3JsZC5maW5kRmxvb3IodGhpcy54ICsgdGhpcy53aWR0aCk7XG4gICAgICAgIFxuICAgICAgICBpZihmbG9vcikge1xuICAgICAgICAgICAgaWYoIXRoaXMub25Hcm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kcy5ncmluZC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy53YXNGbGlwcGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdW5kcy5uaWNlW01hdGgucm91bmQoKHRoaXMuc291bmRzLm5pY2UubGVuZ3RoIC0gMSkgKiBNYXRoLnJhbmRvbSgpKV0ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkICo9IDEuMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLndhc0ZsaXBwaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm9uR3JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMueSA9IGZsb29yIC0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5LnkgPSA0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kQW5nbGUgPSBNYXRoLmF0YW4yKGxlZnRZIC0gcmlnaHRZLCB0aGlzLnggLSAodGhpcy54ICsgdGhpcy53aWR0aCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gdGhpcy5ncm91bmRBbmdsZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZ2FtZS5yZW5kZXJlci5lbWl0U3BhcmsodGhpcy54ICsgdGhpcy53aWR0aCAvIDIgKyAxNSwgdGhpcy55ICsgdGhpcy5oZWlnaHQsIHRoaXMuZ3JvdW5kQW5nbGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYoIXRoaXMub25Hcm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kcy5ncmluZC5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5vcm1hbGl6ZWQgPSBNYXRoLmF0YW4yKE1hdGguc2luKHRoaXMucm90YXRpb24pLCBNYXRoLmNvcyh0aGlzLnJvdGF0aW9uKSk7XG4gICAgICAgICAgICBpZihub3JtYWxpemVkID4gTWF0aC5QSSAqIDAuMjUgJiYgbm9ybWFsaXplZCA8IE1hdGguUEkgKiAwLjc1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXNGbGlwcGluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uR3JvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMub25Hcm91bmQpIHtcbiAgICAgICAgICAgIGlmKHRoaXMucmlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkICs9IHRpbWUgKiAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmxlZnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkIC09IHRpbWUgKiAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCArPSB0aW1lICogMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKE1hdGguYWJzKGxlZnRZIC0gKHRoaXMueSArIHRoaXMuaGVpZ2h0KSkgPiAyMCAmJiBNYXRoLmFicyhyaWdodFkgLSAodGhpcy55ICsgdGhpcy5oZWlnaHQpKSA+IDIwKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm90YXRpb24gLT0gMC4wNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm90YXRpb24gKz0gMC4wNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYmlyZFVwZGF0ZShnYW1lLCB0aW1lKVxuICAgIHtcbiAgICAgICAgdGhpcy5hY2NlbGVyYXRpb24ueSA9IGdhbWUud29ybGQuZ3Jhdml0eSAqIDAuNTtcbiAgICAgICAgaWYodGhpcy51cCkge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55IC09IDAuNSAqIGdhbWUud29ybGQucGl4ZWxzUGVyTWV0ZXIgKiB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZG93bikge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55ICs9IDAuNSAqIGdhbWUud29ybGQucGl4ZWxzUGVyTWV0ZXIgKiB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMudmVsb2NpdHkueT49MC4yICogZ2FtZS53b3JsZC5waXhlbHNQZXJNZXRlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55PTAuMiAqIGdhbWUud29ybGQucGl4ZWxzUGVyTWV0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy52ZWxvY2l0eS55PD0tMC4yICogZ2FtZS53b3JsZC5waXhlbHNQZXJNZXRlcilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eS55PS0wLjIgKiBnYW1lLndvcmxkLnBpeGVsc1Blck1ldGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3BlZWQgKj0gMC45OTU7XG4gICAgICAgIGlmKGdhbWUud29ybGQuY2hlY2tGb3JGbG9vcih0aGlzKSAmJiB0aGlzLnZlbG9jaXR5LnkgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNwZWVkPD0xKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0cmFuc2xhdGVkID0gdGhpcy5nYW1lLnJlbmRlcmVyLmNhbWVyYS50cmFuc2xhdGUodGhpcyk7XG4gICAgICAgIGxldCBzd29yZEFuZ2xlID0gTWF0aC5QSSArIE1hdGguYXRhbjIodHJhbnNsYXRlZC55IC0gdGhpcy5nYW1lLmlucHV0Lm1vdXNlWSwgdHJhbnNsYXRlZC54IC0gdGhpcy5nYW1lLmlucHV0Lm1vdXNlWCk7XG4gICAgICAgIC8vdGhpcy5zd29yZC5yb3RhdGlvbiA9IHN3b3JkQW5nbGU7XG4gICAgICAgIHRoaXMub25Hcm91bmQgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdHJhbnNmb3JtKCkge1xuICAgICAgICBpZih0aGlzLmZvcm09PVwicm92ZXJcIilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5qdW1wKCk7XG4gICAgICAgICAgICB0aGlzLmZvcm0gPSBcImJpcmRcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gXCJIT1ZFUlNXT1JEXCI7XG4gICAgICAgICAgICB0aGlzLndpZHRoIC89IDI7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCAvPSAyO1xuICAgICAgICAgICAgdGhpcy5zd29yZFN3aW5nID0gbmV3IFRXRUVOLlR3ZWVuKHRoaXMuc3dvcmQpLnRvKHtyb3RhdGlvbjogTWF0aC5QSSAvIDIgKyAwLjQ1fSwgMjAwKS5zdGFydCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltID0gdGhpcy5zaGFwZXNoaWZ0O1xuICAgICAgICAgICAgdGhpcy5zaGFwZXNoaWZ0Lm9uY2UoJ2xvb3AnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QW5pbSA9IHRoaXMuYmlyZEZseTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNvdW5kcy5ob3ZlcnN3b3JkLnBsYXkoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmhvdmVyc3dvcmRUcmFjay5wbGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnJvdmVyYm9hcmRUcmFjay5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS50cmFjayA9IHRoaXMuZ2FtZS5ob3ZlcnN3b3JkVHJhY2s7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gXCJyb3ZlclwiO1xuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIlJPVkVSQk9BUkRcIjtcbiAgICAgICAgICAgIHRoaXMud2lkdGggKj0gMjtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ICo9IDI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudENoaXJwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2hpcnAuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltID0gdGhpcy5zaGFwZXNoaWZ0UmV2ZXJzZTtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVzaGlmdFJldmVyc2Uub25jZSgnbG9vcCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBbmltID0gdGhpcy5kb2c7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IE1hdGguUEk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc291bmRzLnJvdmVyYm9hcmQucGxheSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5yb3ZlcmJvYXJkVHJhY2sucGxheSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5ob3ZlcnN3b3JkVHJhY2sucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUudHJhY2sgPSB0aGlzLmdhbWUucm92ZXJib2FyZFRyYWNrO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndhc0ZsaXBwaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hpZnRDRCA9IDE7XG4gICAgfVxuICAgIHNoaWZ0KClcbiAgICB7XG4gICAgICAgIGlmKHRoaXMuc2hpZnRDRDw9MCAmJiB0aGlzLnNwZWVkID4gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0oKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXI7IiwiY29uc3QgQ2FtZXJhID0gcmVxdWlyZSgnLi9jYW1lcmEuanMnKTtcbmNvbnN0IFBhcnRpY2xlID0gcmVxdWlyZSgnLi9wYXJ0aWNsZS5qcycpO1xuY2xhc3MgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSh0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NvcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgdGhpcy5zY29yZS5jbGFzc0xpc3QuYWRkKFwidWlcIik7XG4gICAgICAgIHRoaXMuc2NvcmUuY2xhc3NMaXN0LmFkZChcInNjb3JlXCIpO1xuICAgICAgICB0aGlzLnNjb3JlLnRleHRDb250ZW50ID0gJ1Njb3JlOiAwJztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gXCIwXCIgfHwgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoaWdoU2NvcmVcIik7XG4gICAgICAgIHRoaXMuaGlnaFNjb3JlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICB0aGlzLmhpZ2hTY29yZVNwYW4uY2xhc3NMaXN0LmFkZChcInVpXCIpO1xuICAgICAgICB0aGlzLmhpZ2hTY29yZVNwYW4uY2xhc3NMaXN0LmFkZChcImhpZ2hTY29yZVwiKTtcbiAgICAgICAgdGhpcy5oaWdoU2NvcmVTcGFuLnRleHRDb250ZW50ID0gJ0hpZ2ggU2NvcmU6IDAnO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDEyODA7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDc1MjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGFyYWxsYXggPSBbXTtcbiAgICAgICAgdGhpcy5wYXJhbGxheC5wdXNoKHRoaXMubG9hZFBhdHRlcm4oXCIuL2ltYWdlcy9iZy90cmVlcy5wbmdcIikpO1xuICAgICAgICB0aGlzLnBhcmFsbGF4LnB1c2godGhpcy5sb2FkUGF0dGVybihcIi4vaW1hZ2VzL2JnL2hpbGwucG5nXCIpKTtcbiAgICAgICAgdGhpcy5wYXJhbGxheC5wdXNoKHRoaXMubG9hZFBhdHRlcm4oXCIuL2ltYWdlcy9iZy9jbG91ZHMucG5nXCIpKTtcbiAgICAgICAgdGhpcy5wYXJhbGxheC5wdXNoKHRoaXMubG9hZFBhdHRlcm4oXCIuL2ltYWdlcy9iZy9zdW5zZXQucG5nXCIpKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGFydGljbGVzID0gW107XG4gICAgICAgIFxuICAgICAgICBQcm9taXNlLmFsbCh0aGlzLnBhcmFsbGF4KS50aGVuKChwYXR0ZXJucykgPT4ge1xuICAgICAgICAgICAgdGhpcy5wYXJhbGxheCA9IHBhdHRlcm5zO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9hZEltYWdlKFwiLi9pbWFnZXMvaW50cm8ucG5nXCIpLnRoZW4oaW1nID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW50cm8gPSBpbWc7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zY29yZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5oaWdoU2NvcmVTcGFuKTtcbiAgICB9XG4gICAgbG9hZEltYWdlKHNyYykge1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsb2FkUGF0dGVybihzcmMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZEltYWdlKHNyYykudGhlbihpbWcgPT4ge1xuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGggKiA0O1xuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1nLCBpICogaW1nLndpZHRoLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbnZhcy54ID0gLXRoaXMuY2FudmFzLndpZHRoICogMjtcbiAgICAgICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbWl0U3BhcmsoeCwgeSwgYW5nbGUpIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMucHVzaChuZXcgUGFydGljbGUoeCArIE1hdGgucmFuZG9tKCkgKiA1LCB5IC0gTWF0aC5yYW5kb20oKSAqIDUsIGFuZ2xlIC0gTWF0aC5QSSAvIDggKiBNYXRoLnJhbmRvbSgpLCBcImdvbGRcIiwgTWF0aC5yYW5kb20oKSAvIDIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3UGFyYWxsYXhQYXR0ZXJuKHBhdHRlcm4sIGluZGV4LCBvdmVycmlkZSkge1xuICAgICAgICBsZXQgaGVpZ2h0RmFjdG9yID0gdGhpcy5nYW1lLnBsYXllci55IC8gNjA7XG4gICAgICAgIGlmKGhlaWdodEZhY3RvciA+IDEwMCkge1xuICAgICAgICAgICAgaGVpZ2h0RmFjdG9yID0gMTAwO1xuICAgICAgICB9XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kWSA9IHRoaXMuY2FtZXJhLnRvcCAtIGhlaWdodEZhY3RvcjtcbiAgICAgICAgaWYob3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHBhdHRlcm4ueCA9IC10aGlzLmNhbnZhcy53aWR0aCAqIDQgKyAoMCAtIHRoaXMuZ2FtZS5pbnRyb1BvcykgLyAoaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhdHRlcm4ueCAtPSB0aGlzLmdhbWUucGxheWVyLnNwZWVkIC8gKGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGF0dGVybi54IDw9IC10aGlzLmNhbWVyYS53aWR0aCAqIDMpIHtcbiAgICAgICAgICAgIHBhdHRlcm4ueCA9IHRoaXMuY2FtZXJhLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShwYXR0ZXJuLCBwYXR0ZXJuLngsIGJhY2tncm91bmRZLCB0aGlzLmNhbWVyYS53aWR0aCAqIDQsIHRoaXMuYmFja2dyb3VuZEhlaWdodCAvIHRoaXMuY2FtZXJhLnNjYWxlLnkgKiAxLjE1KTtcbiAgICB9XG4gICAgdXBkYXRlKHRpbWUpIHtcbiAgICAgICAgdGhpcy5jYW1lcmEueCA9IDAgKyB0aGlzLmNhbWVyYS53aWR0aCAvIDI7XG4gICAgICAgIHRoaXMuY2FtZXJhLnkgPSB0aGlzLmdhbWUucGxheWVyLnk7XG4gICAgICAgIGlmKHRoaXMuY2FtZXJhLnkgPiA1MDAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYS55ID0gNTAwMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5mb3JFYWNoKChwYXJ0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYoIXBhcnQudXBkYXRlKHRpbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIHNjb3JlSW50ID0gcGFyc2VJbnQoKHRoaXMuZ2FtZS53b3JsZC54UG9zLzEwMCkudG9GaXhlZCgwKSk7XG4gICAgICAgIHRoaXMuc2NvcmUudGV4dENvbnRlbnQgPSBcIlNjb3JlOiBcIiArIHNjb3JlSW50LnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGlnaFNjb3JlKCk7XG4gICAgICAgIHRoaXMuaGlnaFNjb3JlU3Bhbi50ZXh0Q29udGVudCA9IFwiSGlnaCBTY29yZTogXCIgKyB0aGlzLmhpZ2hTY29yZS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtKCk7XG4gICAgICAgIGlmKCF0aGlzLnBhcmFsbGF4WzBdLnRoZW4pIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IHRoaXMucGFyYWxsYXgubGVuZ3RoOyBpLS07IGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UGFyYWxsYXhQYXR0ZXJuKHRoaXMucGFyYWxsYXhbaV0sIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZighdGhpcy5nYW1lLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLnBhcmFsbGF4WzBdLnRoZW4pIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLnBhcmFsbGF4Lmxlbmd0aDsgaS0tOyBpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQYXJhbGxheFBhdHRlcm4odGhpcy5wYXJhbGxheFtpXSwgaSwgdGhpcy5nYW1lLmludHJvUG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLmludHJvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmludHJvLCAtdGhpcy5jYW1lcmEud2lkdGgsIHRoaXMuY2FtZXJhLnRvcCwgdGhpcy5jYW1lcmEud2lkdGgsIHRoaXMuY2FtZXJhLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nYW1lLmVudGl0aWVzLmZvckVhY2goZW50ID0+IHtcbiAgICAgICAgICAgIGVudC5kcmF3KHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZ2FtZS53b3JsZC5kcmF3KHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuZm9yRWFjaCgocGFydCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHBhcnQuZHJhdyh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZUhpZ2hTY29yZSgpXG4gICAge1xuICAgICAgICBsZXQgbmV3SFMgPSBwYXJzZUludCgodGhpcy5nYW1lLndvcmxkLnhQb3MvMTAwKS50b0ZpeGVkKDApKTtcbiAgICAgICAgaWYobmV3SFM+dGhpcy5oaWdoU2NvcmUpXG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IG5ld0hTO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhpZ2hTY29yZVwiLCB0aGlzLmhpZ2hTY29yZSk7XG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyZXI7IiwiY2xhc3MgV29ybGQge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0gOS44O1xuICAgICAgICB0aGlzLnBpeGVsc1Blck1ldGVyID0gNTA7XG4gICAgICAgIHRoaXMueFBvcyA9IDA7XG4gICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMCB8fCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhpZ2hTY29yZVwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWRqdXN0bWVudCA9IDA7XG4gICAgICAgIHRoaXMuYWRqdXN0bWVudENEID0gMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3RhYmlsaXR5ID0gMTsgLy9zZWNvbmRzXG4gICAgICAgIFxuICAgICAgICB0aGlzLnBvbGVDRCA9IDA7XG4gICAgICAgIHRoaXMucG9sZU1hcCA9IFtdO1xuICAgICAgICB0aGlzLnBpdENEID0gMTAwMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGl0ID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmhlaWdodE1hcCA9IFtdO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA2NDA7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHRNYXBbaV0gPSB7eTogNjIwfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlaWdodE1hcFsxNV0ucG9sZSA9IHRydWU7XG4gICAgfVxuICAgIGZpbmRGbG9vcih4KSB7XG4gICAgICAgIHggLz0gNDtcbiAgICAgICAgaWYoeCA8IDApIHtcbiAgICAgICAgICAgIHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoeCA+PSB0aGlzLmhlaWdodE1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLmhlaWdodE1hcC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmbG9vciA9IHRoaXMuaGVpZ2h0TWFwW01hdGgucm91bmQoeCldO1xuICAgICAgICByZXR1cm4gZmxvb3IueTtcbiAgICB9XG4gICAgXG4gICAgZ2V0UGl0KHgpXG4gICAge1xuICAgICAgICAgeCAvPSA0O1xuICAgICAgICBpZih4IDwgMCkge1xuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih4ID49IHRoaXMuaGVpZ2h0TWFwLmxlbmd0aCkge1xuICAgICAgICAgICAgeCA9IHRoaXMuaGVpZ2h0TWFwLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZsb29yID0gdGhpcy5oZWlnaHRNYXBbTWF0aC5yb3VuZCh4KV07XG4gICAgICAgIHJldHVybiBmbG9vci5waXQ7XG4gICAgfVxuICAgIFxuICAgIGNoZWNrRm9yRmxvb3IoZW50KSB7XG4gICAgICAgIGxldCBmbG9vciA9IHRoaXMuaGVpZ2h0TWFwW01hdGgucm91bmQoKGVudC54ICsgZW50LndpZHRoIC8gMikgLyA0KV07XG4gICAgICAgIGlmKGZsb29yLnBpdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgbGVmdFkgPSB0aGlzLmZpbmRGbG9vcihlbnQueCk7XG4gICAgICAgIGxldCByaWdodFkgPSB0aGlzLmZpbmRGbG9vcihlbnQueCArIGVudC53aWR0aCk7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguYXRhbjIobGVmdFkgLSByaWdodFksIGVudC54IC0gKGVudC54ICsgZW50LndpZHRoKSk7XG4gICAgICAgIGxldCBkaWZmID0gZW50LnJvdGF0aW9uIC0gYW5nbGU7XG4gICAgICAgIGRpZmYgPSBNYXRoLmF0YW4yKE1hdGguc2luKGRpZmYpLCBNYXRoLmNvcyhkaWZmKSk7XG4gICAgICAgIFxuICAgICAgICBpZihNYXRoLmFicyhkaWZmKSA+IE1hdGguUEkgKiAwLjQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBcbiAgICAgICAgaWYoZW50LnkgKyBlbnQuaGVpZ2h0ID49IGZsb29yLnkgJiYgZW50LnkgKyBlbnQuaGVpZ2h0ICogMS80IDw9IGZsb29yLnkpIHtcbiAgICAgICAgICAgIHJldHVybiBmbG9vci55O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdXBkYXRlKHRpbWUpIHtcbiAgICAgICAgdGhpcy5hZGp1c3RtZW50Q0QgLT0gdGltZTtcbiAgICAgICAgaWYodGhpcy5hZGp1c3RtZW50Q0Q8PTApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0bWVudCAqPSAwLjg7XG4gICAgICAgICAgICB0aGlzLmFkanVzdG1lbnQgKz0gKE1hdGgucmFuZG9tKCkqMC42KS0wLjM7XG4gICAgICAgICAgICBpZih0aGlzLmFkanVzdG1lbnQ8LTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RtZW50PS0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5hZGp1c3RtZW50PjEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGp1c3RtZW50PTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0bWVudENEID0gdGhpcy5zdGFiaWxpdHk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMueFBvcys9IHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWQ7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWUucGxheWVyLnNwZWVkOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyZWFtKHRpbWUpIHtcbiAgICAgICAgdGhpcy5oZWlnaHRNYXAuc2hpZnQoKTtcbiAgICAgICAgdGhpcy5wb2xlTWFwLnNoaWZ0KCk7XG4gICAgICAgIFxuICAgICAgICBsZXQgbGFzdCA9IHt9O1xuICAgICAgICBsYXN0LnkgPSB0aGlzLmhlaWdodE1hcFt0aGlzLmhlaWdodE1hcC5sZW5ndGggLSAxXS55O1xuXG4gICAgICAgIHRoaXMucGl0Q0QgLT0gMTtcbiAgICAgICAgaWYodGhpcy5waXRMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXN0LnBpdCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBpdExlbmd0aC0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGFzdC55IC09IHRoaXMuYWRqdXN0bWVudDtcbiAgICAgICAgICAgIGlmKGxhc3QueSA+IDUwMDApIHtcbiAgICAgICAgICAgICAgICBsYXN0LnkgPSA1MDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMucGl0Q0QgPD0gMCkge1xuICAgICAgICAgICAgbGFzdC5waXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5waXRDRCA9IDQ1MDAgKyBNYXRoLnJhbmRvbSgpICogMTAwMDtcbiAgICAgICAgICAgIHRoaXMucGl0TGVuZ3RoID0gMzAwICsgTWF0aC5yYW5kb20oKSAqIDE0MDAgKyBNYXRoLnJhbmRvbSgpICogNTAwICogdGhpcy5nYW1lLnBsYXllci5zcGVlZCAvIDI1MDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5wb2xlQ0QtLTtcbiAgICAgICAgaWYodGhpcy5wb2xlQ0Q8PTApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxhc3QucG9sZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBvbGVDRD00MDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBvbGVNYXAucHVzaChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5oZWlnaHRNYXAucHVzaChsYXN0KTtcbiAgICB9XG4gICAgZHJhdyhyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LmxpbmVXaWR0aCA9IDEwO1xuICAgICAgICByZW5kZXJlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBsZXQgbGFzdFBvbGUgPSAwO1xuICAgICAgICB0aGlzLmhlaWdodE1hcC5mb3JFYWNoKChwb3MsIHgpID0+IHtcbiAgICAgICAgICAgIHggKj0gNDtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBwb3MueTtcbiAgICAgICAgICAgIGlmKCFwb3MucGl0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGl0PT10cnVlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waXQ9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLmNvbnRleHQubGluZVRvKHgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgaWYocG9zLnBvbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXIuY29udGV4dC5tb3ZlVG8oeCwgdGhpcy5nYW1lLnJlbmRlcmVyLmNhbWVyYS5ib3R0b20pO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5jb250ZXh0LmxpbmVUbyh4LCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0UG9sZSA9IHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGl0PT1mYWxzZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGl0PXRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVuZGVyZXIuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5waXQgPSBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV29ybGQ7IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiLyoqXG4gKiBUd2Vlbi5qcyAtIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL3R3ZWVuanMvdHdlZW4uanNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3ZWVuanMvdHdlZW4uanMvZ3JhcGhzL2NvbnRyaWJ1dG9ycyBmb3IgdGhlIGZ1bGwgbGlzdCBvZiBjb250cmlidXRvcnMuXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcbiAqL1xuXG4vLyBJbmNsdWRlIGEgcGVyZm9ybWFuY2Uubm93IHBvbHlmaWxsXG4oZnVuY3Rpb24gKCkge1xuXG5cdGlmICgncGVyZm9ybWFuY2UnIGluIHdpbmRvdyA9PT0gZmFsc2UpIHtcblx0XHR3aW5kb3cucGVyZm9ybWFuY2UgPSB7fTtcblx0fVxuXG5cdC8vIElFIDhcblx0RGF0ZS5ub3cgPSAoRGF0ZS5ub3cgfHwgZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fSk7XG5cblx0aWYgKCdub3cnIGluIHdpbmRvdy5wZXJmb3JtYW5jZSA9PT0gZmFsc2UpIHtcblx0XHR2YXIgb2Zmc2V0ID0gd2luZG93LnBlcmZvcm1hbmNlLnRpbWluZyAmJiB3aW5kb3cucGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydCA/IHdpbmRvdy5wZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBEYXRlLm5vdygpO1xuXG5cdFx0d2luZG93LnBlcmZvcm1hbmNlLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBEYXRlLm5vdygpIC0gb2Zmc2V0O1xuXHRcdH07XG5cdH1cblxufSkoKTtcblxudmFyIFRXRUVOID0gVFdFRU4gfHwgKGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgX3R3ZWVucyA9IFtdO1xuXG5cdHJldHVybiB7XG5cblx0XHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0cmV0dXJuIF90d2VlbnM7XG5cblx0XHR9LFxuXG5cdFx0cmVtb3ZlQWxsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdF90d2VlbnMgPSBbXTtcblxuXHRcdH0sXG5cblx0XHRhZGQ6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0XHRfdHdlZW5zLnB1c2godHdlZW4pO1xuXG5cdFx0fSxcblxuXHRcdHJlbW92ZTogZnVuY3Rpb24gKHR3ZWVuKSB7XG5cblx0XHRcdHZhciBpID0gX3R3ZWVucy5pbmRleE9mKHR3ZWVuKTtcblxuXHRcdFx0aWYgKGkgIT09IC0xKSB7XG5cdFx0XHRcdF90d2VlbnMuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKHRpbWUpIHtcblxuXHRcdFx0aWYgKF90d2VlbnMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGkgPSAwO1xuXG5cdFx0XHR0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcblxuXHRcdFx0d2hpbGUgKGkgPCBfdHdlZW5zLmxlbmd0aCkge1xuXG5cdFx0XHRcdGlmIChfdHdlZW5zW2ldLnVwZGF0ZSh0aW1lKSkge1xuXHRcdFx0XHRcdGkrKztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRfdHdlZW5zLnNwbGljZShpLCAxKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0fVxuXHR9O1xuXG59KSgpO1xuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QpIHtcblxuXHR2YXIgX29iamVjdCA9IG9iamVjdDtcblx0dmFyIF92YWx1ZXNTdGFydCA9IHt9O1xuXHR2YXIgX3ZhbHVlc0VuZCA9IHt9O1xuXHR2YXIgX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG5cdHZhciBfZHVyYXRpb24gPSAxMDAwO1xuXHR2YXIgX3JlcGVhdCA9IDA7XG5cdHZhciBfeW95byA9IGZhbHNlO1xuXHR2YXIgX2lzUGxheWluZyA9IGZhbHNlO1xuXHR2YXIgX3JldmVyc2VkID0gZmFsc2U7XG5cdHZhciBfZGVsYXlUaW1lID0gMDtcblx0dmFyIF9zdGFydFRpbWUgPSBudWxsO1xuXHR2YXIgX2Vhc2luZ0Z1bmN0aW9uID0gVFdFRU4uRWFzaW5nLkxpbmVhci5Ob25lO1xuXHR2YXIgX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRXRUVOLkludGVycG9sYXRpb24uTGluZWFyO1xuXHR2YXIgX2NoYWluZWRUd2VlbnMgPSBbXTtcblx0dmFyIF9vblN0YXJ0Q2FsbGJhY2sgPSBudWxsO1xuXHR2YXIgX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cdHZhciBfb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG5cdHZhciBfb25Db21wbGV0ZUNhbGxiYWNrID0gbnVsbDtcblx0dmFyIF9vblN0b3BDYWxsYmFjayA9IG51bGw7XG5cblx0Ly8gU2V0IGFsbCBzdGFydGluZyB2YWx1ZXMgcHJlc2VudCBvbiB0aGUgdGFyZ2V0IG9iamVjdFxuXHRmb3IgKHZhciBmaWVsZCBpbiBvYmplY3QpIHtcblx0XHRfdmFsdWVzU3RhcnRbZmllbGRdID0gcGFyc2VGbG9hdChvYmplY3RbZmllbGRdLCAxMCk7XG5cdH1cblxuXHR0aGlzLnRvID0gZnVuY3Rpb24gKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XG5cblx0XHRpZiAoZHVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0X2R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0X3ZhbHVlc0VuZCA9IHByb3BlcnRpZXM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9O1xuXG5cdHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAodGltZSkge1xuXG5cdFx0VFdFRU4uYWRkKHRoaXMpO1xuXG5cdFx0X2lzUGxheWluZyA9IHRydWU7XG5cblx0XHRfb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblxuXHRcdF9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0aW1lIDogd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXHRcdF9zdGFydFRpbWUgKz0gX2RlbGF5VGltZTtcblxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIF92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXG5cdFx0XHRpZiAoX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0XHRcdGlmIChfdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxuXHRcdFx0XHRfdmFsdWVzRW5kW3Byb3BlcnR5XSA9IFtfb2JqZWN0W3Byb3BlcnR5XV0uY29uY2F0KF92YWx1ZXNFbmRbcHJvcGVydHldKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XG5cdFx0XHRpZiAoX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRfdmFsdWVzU3RhcnRbcHJvcGVydHldID0gX29iamVjdFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmICgoX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0X3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSAqPSAxLjA7IC8vIEVuc3VyZXMgd2UncmUgdXNpbmcgbnVtYmVycywgbm90IHN0cmluZ3Ncblx0XHRcdH1cblxuXHRcdFx0X3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH07XG5cblx0dGhpcy5zdG9wID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCFfaXNQbGF5aW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHRUV0VFTi5yZW1vdmUodGhpcyk7XG5cdFx0X2lzUGxheWluZyA9IGZhbHNlO1xuXG5cdFx0aWYgKF9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0X29uU3RvcENhbGxiYWNrLmNhbGwoX29iamVjdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH07XG5cblx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHRfY2hhaW5lZFR3ZWVuc1tpXS5zdG9wKCk7XG5cdFx0fVxuXG5cdH07XG5cblx0dGhpcy5kZWxheSA9IGZ1bmN0aW9uIChhbW91bnQpIHtcblxuXHRcdF9kZWxheVRpbWUgPSBhbW91bnQ7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLnJlcGVhdCA9IGZ1bmN0aW9uICh0aW1lcykge1xuXG5cdFx0X3JlcGVhdCA9IHRpbWVzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH07XG5cblx0dGhpcy55b3lvID0gZnVuY3Rpb24gKHlveW8pIHtcblxuXHRcdF95b3lvID0geW95bztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9O1xuXG5cblx0dGhpcy5lYXNpbmcgPSBmdW5jdGlvbiAoZWFzaW5nKSB7XG5cblx0XHRfZWFzaW5nRnVuY3Rpb24gPSBlYXNpbmc7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLmludGVycG9sYXRpb24gPSBmdW5jdGlvbiAoaW50ZXJwb2xhdGlvbikge1xuXG5cdFx0X2ludGVycG9sYXRpb25GdW5jdGlvbiA9IGludGVycG9sYXRpb247XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLmNoYWluID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0X2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLm9uU3RhcnQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdF9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9O1xuXG5cdHRoaXMub25VcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdF9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fTtcblxuXHR0aGlzLm9uQ29tcGxldGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblxuXHRcdF9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9O1xuXG5cdHRoaXMub25TdG9wID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cblx0XHRfb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9O1xuXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKHRpbWUpIHtcblxuXHRcdHZhciBwcm9wZXJ0eTtcblx0XHR2YXIgZWxhcHNlZDtcblx0XHR2YXIgdmFsdWU7XG5cblx0XHRpZiAodGltZSA8IF9zdGFydFRpbWUpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmIChfb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XG5cblx0XHRcdGlmIChfb25TdGFydENhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRcdF9vblN0YXJ0Q2FsbGJhY2suY2FsbChfb2JqZWN0KTtcblx0XHRcdH1cblxuXHRcdFx0X29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdGVsYXBzZWQgPSAodGltZSAtIF9zdGFydFRpbWUpIC8gX2R1cmF0aW9uO1xuXHRcdGVsYXBzZWQgPSBlbGFwc2VkID4gMSA/IDEgOiBlbGFwc2VkO1xuXG5cdFx0dmFsdWUgPSBfZWFzaW5nRnVuY3Rpb24oZWxhcHNlZCk7XG5cblx0XHRmb3IgKHByb3BlcnR5IGluIF92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3Rcblx0XHRcdGlmIChfdmFsdWVzU3RhcnRbcHJvcGVydHldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBzdGFydCA9IF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblx0XHRcdHZhciBlbmQgPSBfdmFsdWVzRW5kW3Byb3BlcnR5XTtcblxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0X29iamVjdFtwcm9wZXJ0eV0gPSBfaW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcblxuXHRcdFx0XHRcdGlmIChlbmQuc3RhcnRzV2l0aCgnKycpIHx8IGVuZC5zdGFydHNXaXRoKCctJykpIHtcblx0XHRcdFx0XHRcdGVuZCA9IHN0YXJ0ICsgcGFyc2VGbG9hdChlbmQsIDEwKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZW5kID0gcGFyc2VGbG9hdChlbmQsIDEwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHRfb2JqZWN0W3Byb3BlcnR5XSA9IHN0YXJ0ICsgKGVuZCAtIHN0YXJ0KSAqIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGlmIChfb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0X29uVXBkYXRlQ2FsbGJhY2suY2FsbChfb2JqZWN0LCB2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKGVsYXBzZWQgPT09IDEpIHtcblxuXHRcdFx0aWYgKF9yZXBlYXQgPiAwKSB7XG5cblx0XHRcdFx0aWYgKGlzRmluaXRlKF9yZXBlYXQpKSB7XG5cdFx0XHRcdFx0X3JlcGVhdC0tO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gUmVhc3NpZ24gc3RhcnRpbmcgdmFsdWVzLCByZXN0YXJ0IGJ5IG1ha2luZyBzdGFydFRpbWUgPSBub3dcblx0XHRcdFx0Zm9yIChwcm9wZXJ0eSBpbiBfdmFsdWVzU3RhcnRSZXBlYXQpIHtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKF92YWx1ZXNFbmRbcHJvcGVydHldKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdF92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSBfdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdChfdmFsdWVzRW5kW3Byb3BlcnR5XSwgMTApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChfeW95bykge1xuXHRcdFx0XHRcdFx0dmFyIHRtcCA9IF92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdF92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSBfdmFsdWVzRW5kW3Byb3BlcnR5XTtcblx0XHRcdFx0XHRcdF92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSBfdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX3lveW8pIHtcblx0XHRcdFx0XHRfcmV2ZXJzZWQgPSAhX3JldmVyc2VkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0X3N0YXJ0VGltZSA9IHRpbWUgKyBfZGVsYXlUaW1lO1xuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmIChfb25Db21wbGV0ZUNhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0X29uQ29tcGxldGVDYWxsYmFjay5jYWxsKF9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSBfY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcblx0XHRcdFx0XHQvLyBNYWtlIHRoZSBjaGFpbmVkIHR3ZWVucyBzdGFydCBleGFjdGx5IGF0IHRoZSB0aW1lIHRoZXkgc2hvdWxkLFxuXHRcdFx0XHRcdC8vIGV2ZW4gaWYgdGhlIGB1cGRhdGUoKWAgbWV0aG9kIHdhcyBjYWxsZWQgd2F5IHBhc3QgdGhlIGR1cmF0aW9uIG9mIHRoZSB0d2VlblxuXHRcdFx0XHRcdF9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KF9zdGFydFRpbWUgKyBfZHVyYXRpb24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9O1xuXG59O1xuXG5cblRXRUVOLkVhc2luZyA9IHtcblxuXHRMaW5lYXI6IHtcblxuXHRcdE5vbmU6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVhZHJhdGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiAoMiAtIGspO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gMC41ICogKC0tayAqIChrIC0gMikgLSAxKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEN1YmljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFydGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtICgtLWsgKiBrICogayAqIGspO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgLSAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1aW50aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrICogayArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0U2ludXNvaWRhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5jb3MoayAqIE1hdGguUEkgLyAyKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnNpbihrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMC41ICogKDEgLSBNYXRoLmNvcyhNYXRoLlBJICogaykpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RXhwb25lbnRpYWw6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayA9PT0gMCA/IDAgOiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLSAxMCAqIGspO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgtIE1hdGgucG93KDIsIC0gMTAgKiAoayAtIDEpKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q2lyY3VsYXI6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gayAqIGspO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc3FydCgxIC0gKC0tayAqIGspKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gLSAwLjUgKiAoTWF0aC5zcXJ0KDEgLSBrICogaykgLSAxKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtIChrIC09IDIpICogaykgKyAxKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEVsYXN0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcztcblx0XHRcdHZhciBhID0gMC4xO1xuXHRcdFx0dmFyIHAgPSAwLjQ7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFhIHx8IGEgPCAxKSB7XG5cdFx0XHRcdGEgPSAxO1xuXHRcdFx0XHRzID0gcCAvIDQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzID0gcCAqIE1hdGguYXNpbigxIC8gYSkgLyAoMiAqIE1hdGguUEkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAoYSAqIE1hdGgucG93KDIsIDEwICogKGsgLT0gMSkpICogTWF0aC5zaW4oKGsgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcztcblx0XHRcdHZhciBhID0gMC4xO1xuXHRcdFx0dmFyIHAgPSAwLjQ7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFhIHx8IGEgPCAxKSB7XG5cdFx0XHRcdGEgPSAxO1xuXHRcdFx0XHRzID0gcCAvIDQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzID0gcCAqIE1hdGguYXNpbigxIC8gYSkgLyAoMiAqIE1hdGguUEkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKGEgKiBNYXRoLnBvdygyLCAtIDEwICogaykgKiBNYXRoLnNpbigoayAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgMSk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzO1xuXHRcdFx0dmFyIGEgPSAwLjE7XG5cdFx0XHR2YXIgcCA9IDAuNDtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWEgfHwgYSA8IDEpIHtcblx0XHRcdFx0YSA9IDE7XG5cdFx0XHRcdHMgPSBwIC8gNDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHMgPSBwICogTWF0aC5hc2luKDEgLyBhKSAvICgyICogTWF0aC5QSSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKGEgKiBNYXRoLnBvdygyLCAxMCAqIChrIC09IDEpKSAqIE1hdGguc2luKChrIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC09IDEpKSAqIE1hdGguc2luKChrIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAwLjUgKyAxO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0QmFjazoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzID0gMS43MDE1ODtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRCb3VuY2U6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KDEgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgKDEgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogayAqIGs7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMS41IC8gMi43NSkpICogayArIDAuNzU7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMi41IC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi42MjUgLyAyLjc1KSkgKiBrICsgMC45ODQzNzU7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgMC41KSB7XG5cdFx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLkluKGsgKiAyKSAqIDAuNTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG5cblx0XHR9XG5cblx0fVxuXG59O1xuXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xuXG5cdExpbmVhcjogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xuXG5cdFx0aWYgKGsgPCAwKSB7XG5cdFx0XHRyZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XG5cdFx0fVxuXG5cdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRyZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XG5cblx0fSxcblxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgYiA9IDA7XG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XG5cdFx0dmFyIHB3ID0gTWF0aC5wb3c7XG5cdFx0dmFyIGJuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcblx0XHRcdGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBiO1xuXG5cdH0sXG5cblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQ2F0bXVsbFJvbTtcblxuXHRcdGlmICh2WzBdID09PSB2W21dKSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRpID0gTWF0aC5mbG9vcihmID0gbSAqICgxICsgaykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRcdHJldHVybiB2W21dIC0gKGZuKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0VXRpbHM6IHtcblxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xuXG5cdFx0XHRyZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xuXG5cdFx0fSxcblxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcblxuXHRcdFx0dmFyIGZjID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XG5cblx0XHRcdHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xuXG5cdFx0fSxcblxuXHRcdEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIGEgPSBbMV07XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xuXG5cdFx0XHRcdHZhciBzID0gMTtcblxuXHRcdFx0XHRpZiAoYVtuXSkge1xuXHRcdFx0XHRcdHJldHVybiBhW25dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IG47IGkgPiAxOyBpLS0pIHtcblx0XHRcdFx0XHRzICo9IGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhW25dID0gcztcblx0XHRcdFx0cmV0dXJuIHM7XG5cblx0XHRcdH07XG5cblx0XHR9KSgpLFxuXG5cdFx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XG5cblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcblx0XHRcdHZhciB2MSA9IChwMyAtIHAxKSAqIDAuNTtcblx0XHRcdHZhciB0MiA9IHQgKiB0O1xuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xuXG5cdFx0XHRyZXR1cm4gKDIgKiBwMSAtIDIgKiBwMiArIHYwICsgdjEpICogdDMgKyAoLSAzICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pXG4oZnVuY3Rpb24gKHJvb3QpIHtcblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBUV0VFTjtcblx0XHR9KTtcblxuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXG5cdFx0Ly8gTm9kZS5qc1xuXHRcdG1vZHVsZS5leHBvcnRzID0gVFdFRU47XG5cblx0fSBlbHNlIGlmIChyb290ICE9PSB1bmRlZmluZWQpIHtcblxuXHRcdC8vIEdsb2JhbCB2YXJpYWJsZVxuXHRcdHJvb3QuVFdFRU4gPSBUV0VFTjtcblxuXHR9XG5cbn0pKHRoaXMpO1xuIl19
