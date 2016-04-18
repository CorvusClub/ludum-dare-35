const Renderer = require('./render.js');
const Player = require('./player.js');
const World = require('./world.js');
const Input = require('./input.js');
const AudioManager = require('./audio.js');

const TWEEN = require('tween.js');

class Game {
    constructor() {
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
        
        
        document.addEventListener("visibilitychange", () => {
            if(document.hidden) {
                this.track.pause();
            }
            else {
                this.track.play();
            }
        });
        
        this.introPos = -this.renderer.canvas.width;
        
        requestAnimationFrame(this.update.bind(this));
        this.started = false;
        
        this.menuTrack.play();
        this.track = this.menuTrack;
    }
    reset() {
        this.entities = [];
        this.player = new Player();
        
        this.entities.push(this.player);
        
        this.world = new World(this);
        
        this.dying = false;
    }
    start() {
        if(this.startTween) {
            return;
        }
        new TWEEN.Tween(this.menuTrack.element).to({volume: 0}, 2000).start();
        new TWEEN.Tween(this.roverboardTrack.element).to({volume: 0.1}, 2000).start();
        this.roverboardTrack.play();
        this.track = this.roverboardTrack;
        this.startTween = new TWEEN.Tween(this)
            .to({introPos: this.renderer.canvas.width}, 4000)
            .onComplete(() => {
                this.started = true;
            })
            .start();
    }
    update(currentTime) {
        requestAnimationFrame(this.update.bind(this));
        
        if(this.dying) {
            return;
        }
        
        
        if(!this.lastTime) {
            this.lastTime = currentTime;
        }
        
        let time = (currentTime - this.lastTime) / 1000;
        if(time > 0.5) {
            time = 0.016;
        }
        this.lastTime = currentTime;
        
        
        this.renderer.draw();
        
        TWEEN.update();
        
        if(!this.started) {
            this.renderer.camera.x = this.introPos; 
            this.renderer.camera.y = this.player.y;
            return;
        }
        
        this.renderer.update(time);
        
        
        this.world.update(time);
        this.entities.forEach(ent => ent.update(this, time));
        
        if(this.player.y > 6000) {
            this.dying = true;
            this.sounds.gameOver.play();
            setTimeout(() => {
                this.reset();
            }, 2000);
        }
        
        
        if(this.track === this.roverboardTrack) {
            this.hoverswordTrack.element.currentTime = this.roverboardTrack.element.currentTime;
            this.hoverswordTrack.pause();
        }
        else if(this.track === this.hoverswordTrack) {
            this.roverboardTrack.element.currentTime = this.hoverswordTrack.element.currentTime;
            this.roverboardTrack.pause();
        }
    }
}


module.exports = Game;