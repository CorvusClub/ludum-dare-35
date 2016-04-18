const Entity = require('./entity.js');
const Animation = require('./animation.js');
const AudioManager = require('./audio.js');

const TWEEN = require('tween.js');

class Player extends Entity {
    constructor() {
        super();
        this.y = 380;
        this.speed = 0;
        this.shiftCD = 0;
        this.form = "rover";
        
        this.width = 300;
        this.height = 239;
        
        this.birdFly = new Animation(this.width / 2, this.height / 2);
        this.birdFly.addFrame("./images/bird1.png", 0.15);
        this.birdFly.addFrame("./images/bird2.png", 0.1);
        this.birdFly.addFrame("./images/bird3.png", 0.15);
        this.birdFly.addFrame("./images/bird2.png", 0.1);
        
        this.sounds = {};
        this.sounds.clink = new AudioManager(document.getElementById("metalClink"));
        this.sounds.bark = new AudioManager(document.getElementById("bark"));
        this.sounds.bark.element.volume = 0.1;
        this.sounds.hoversword = new AudioManager(document.getElementById("hoversword"));
        this.sounds.roverboard = new AudioManager(document.getElementById("roverboard"));
        
        this.sounds.chirps = [];
        this.sounds.chirps.push(new AudioManager(document.getElementById("birdsong1")));
        this.sounds.chirps.push(new AudioManager(document.getElementById("birdsong2")));
        this.sounds.chirps.push(new AudioManager(document.getElementById("birdsong3")));
        
        this.sounds.nice = [];
        this.sounds.nice.push(new AudioManager(document.getElementById("radical")));
        this.sounds.nice.push(new AudioManager(document.getElementById("wicked")));
        this.sounds.nice.push(new AudioManager(document.getElementById("dude")));
        
        this.sounds.grind = new AudioManager(document.getElementById("grind"));
        this.sounds.grind.element.volume = 0.4;
        this.sounds.grind_launch = new AudioManager(document.getElementById("grind_launch"));
        
        this.sword = new Animation(this.width, 34 * 2);
        this.sword.addFrame("./images/sword.png", 1);
        
        this.dog = new Animation(this.width, 220);
        this.dog.addFrame("./images/dog_wag_full1.png", 0.1);
        this.dog.addFrame("./images/dog_wag_full2.png", 0.08);
        this.dog.addFrame("./images/dog_wag_full3.png", 0.1);
        this.dog.addFrame("./images/dog_wag_full2.png", 0.08);
        
        this.barkAnimation = new Animation(this.width, 220);
        this.barkAnimation.addFrame("./images/bark2.png", 0.1);
        
        this.shapeshift = new Animation(this.width, 220);
        this.shapeshift.addFrame("./images/shapeshift_1.png", 0.08);
        this.shapeshift.addFrame("./images/shapeshift_2.png", 0.08);
        this.shapeshift.addFrame("./images/shapeshift_3.png", 0.08, this.width / 2, this.width / 2);
        this.shapeshift.addFrame("./images/shapeshift_4.png", 0.08, this.width / 2, this.width / 2);
        this.shapeshift.addFrame("./images/shapeshift_5.png", 0.08, this.width / 2, this.height / 2);
        this.shapeshift.addFrame("./images/shapeshift_6.png", 0.08, this.width / 2, this.height / 2);
        
        this.shapeshiftReverse = new Animation(this.width, 220);
        this.shapeshiftReverse.addFrame("./images/shapeshift_6.png", 0.08, this.width / 2, this.height / 2);
        this.shapeshiftReverse.addFrame("./images/shapeshift_5.png", 0.08, this.width / 2, this.height / 2);
        this.shapeshiftReverse.addFrame("./images/shapeshift_4.png", 0.08, this.width / 2, this.width / 2);
        this.shapeshiftReverse.addFrame("./images/shapeshift_3.png", 0.08, this.width / 2, this.width / 2);
        this.shapeshiftReverse.addFrame("./images/shapeshift_2.png", 0.08);
        this.shapeshiftReverse.addFrame("./images/shapeshift_1.png", 0.08);
        
        this.rotation = Math.PI;
        
        this.barkTimes = [23.98,24.28,24.58,25.18,25.48,25.78,26.38,26.83,27.28,27.88,28.48,47.97,48.27,48.57,49.17,49.47,49.77,50.37,50.82,50.97,51.27,51.57,52.02,52.17,52.47,67.16,67.46,67.76,68.36,68.66,68.96,69.56,70.01,70.16,70.46,70.76,71.21,71.36,71.66,71.96,72.41,72.86,74.36,74.81,75.26];
        
        this.currentAnim = this.dog;
    }
    update(game, time) {
        
        this.shiftCD -= time;
        
        if(this.form === "bird")
        {
            this.birdUpdate(game, time);
        }
        super.update(game, time);
        if(this.form=="rover")
        {
            this.dogUpdate(game, time);
        }
        
        
        if(this.left) {
            this.x -= 1.5 * game.world.pixelsPerMeter * time;
        }
        if(this.right) {
            this.x += 1.5 * game.world.pixelsPerMeter * time;
        }
        if(this.x<=0)
        {
            this.x=0.01;
        }
        if(this.x + this.width > game.renderer.camera.right) {
            this.x = game.renderer.camera.right - this.width;
        }
        if(this.speed<0)
        {
            this.speed = 0;
        }
        
        let speedFactor = 1 + this.speed / 100;
        this.currentAnim.update(time * speedFactor);
        
        this.barkTimes.forEach(bark => {
            if(Math.abs(game.roverboardTrack.element.currentTime - bark) < 0.02) {
                this.bark();
            }
        });
        
        if(!this.onGround) {
            this.sounds.grind.pause();
        }
        
        // fuck it
        this.game = game;
    }
    
    draw(renderer) {
        if(this.form=="rover")
        {
            this.sword.rotation = this.rotation + Math.PI;
            let swordY = this.y + this.height - this.sword.height + 15;
            this.sword.draw(renderer, this.x, swordY);
            this.currentAnim.rotation = this.sword.rotation;
            this.currentAnim.draw(renderer, 
                this.x + 40,
                this.y + this.height - this.currentAnim.height + 10,
                this.currentAnim.width / 2 - 40,
                this.currentAnim.height - this.sword.height / 2 + 5
            );
        }
        else
        {
            this.currentAnim.draw(renderer, this.x, this.y);
            this.sword.draw(renderer, this.x + this.width / 2, this.y + this.height / 2, 0);
        }
    }
    
    jump()
    {
        let groundDist = this.game.world.findFloor((this.x + this.width / 2)) - (this.y+this.height);
        if(this.form=="rover" && (groundDist<=25&&groundDist>=-25) && !this.game.world.getPit((this.x + this.width / 2)))
        {
            this.velocity.y = -10;
            this.sounds.grind_launch.play();
        }
    }
    bark() {
        if(this.form === "rover") {
            if(this.currentAnim === this.barkAnimation) {
                return;
            }
            this.currentAnim = this.barkAnimation;
            this.barkAnimation.once('loop', () => {
                if(this.form === "rover") {
                    this.currentAnim = this.dog;
                }
            })
        }
    }
    manualBark() {
        if(this.form === "rover" && this.currentAnim !== this.barkAnimation) {
            this.sounds.bark.interruptPlay();
            this.bark();
        }
        else if(this.form === "bird") {
            if(this.currentChirp) {
                this.currentChirp.stop();
            }
            this.currentChirp = this.sounds.chirps[Math.round((this.sounds.chirps.length - 1) * Math.random())];
            this.currentChirp.play();
        }
    }

    
    dogUpdate(game, time)
    {
        this.acceleration.y = game.world.gravity;
        
        let floor = game.world.checkForFloor(this);
        let leftY = game.world.findFloor(this.x);
        let rightY = game.world.findFloor(this.x + this.width);
        
        if(floor) {
            if(!this.onGround) {
                this.sounds.grind.play();
                if(this.wasFlipping) {
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
        }
        else {
            if(!this.onGround) {
                this.sounds.grind.pause();
            }
            let normalized = Math.atan2(Math.sin(this.rotation), Math.cos(this.rotation));
            if(normalized > Math.PI * 0.25 && normalized < Math.PI * 0.75) {
                this.wasFlipping = true;
            }
            this.onGround = false;
        }
        
        if(this.onGround) {
            if(this.right) {
                this.speed += time * 2;
            }
            else if(this.left) {
                this.speed -= time * 2;
            }
            else {
                this.speed += time * 2;
            }
        }
        else {
            if(Math.abs(leftY - (this.y + this.height)) > 20 && Math.abs(rightY - (this.y + this.height)) > 20) {
                if(this.left) {
                    this.rotation -= 0.06;
                }
                else if(this.right) {
                    this.rotation += 0.06;
                }
            }
        }
    }
    
    birdUpdate(game, time)
    {
        this.acceleration.y = game.world.gravity * 0.5;
        if(this.up) {
            this.velocity.y -= 0.5 * game.world.pixelsPerMeter * time;
        }
        if(this.down) {
            this.velocity.y += 0.5 * game.world.pixelsPerMeter * time;
        }
        if(this.velocity.y>=0.2 * game.world.pixelsPerMeter)
        {
            this.velocity.y=0.2 * game.world.pixelsPerMeter;
        }
        if(this.velocity.y<=-0.2 * game.world.pixelsPerMeter)
        {
            this.velocity.y=-0.2 * game.world.pixelsPerMeter;
        }
        this.speed *= 0.995;
        if(game.world.checkForFloor(this) && this.velocity.y >= 0) {
            this.transform();
        }
        if(this.speed<=1)
        {
            this.transform();
        }
        let translated = this.game.renderer.camera.translate(this);
        let swordAngle = Math.PI + Math.atan2(translated.y - this.game.input.mouseY, translated.x - this.game.input.mouseX);
        //this.sword.rotation = swordAngle;
        this.onGround = false;
    }
    
    transform() {
        if(this.form=="rover")
        {
            this.jump();
            this.form = "bird";
            document.title = "HOVERSWORD";
            this.width /= 2;
            this.height /= 2;
            this.swordSwing = new TWEEN.Tween(this.sword).to({rotation: Math.PI / 2 + 0.45}, 200).start();
            
            this.currentAnim = this.shapeshift;
            this.shapeshift.once('loop', () => {
                this.currentAnim = this.birdFly;
            });
            
            this.sounds.hoversword.play();
            
            setTimeout(() => {
                this.game.hoverswordTrack.play();
                this.game.roverboardTrack.pause();
                this.game.track = this.game.hoverswordTrack;
            }, 200);
        }
        else
        {
            this.form = "rover";
            document.title = "ROVERBOARD";
            this.width *= 2;
            this.height *= 2;
            
            if(this.currentChirp) {
                this.currentChirp.stop();
            }
            
            this.currentAnim = this.shapeshiftReverse;
            this.shapeshiftReverse.once('loop', () => {
                this.currentAnim = this.dog;
            });
            
            this.rotation = Math.PI;
            
            this.sounds.roverboard.play();
            
            
            setTimeout(() => {
                this.game.roverboardTrack.play();
                this.game.hoverswordTrack.pause();
                this.game.track = this.game.roverboardTrack;
            }, 200);
        }
        this.wasFlipping = false;
        this.shiftCD = 1;
    }
    shift()
    {
        if(this.shiftCD<=0 && this.speed > 1)
        {
            this.transform();
        }
        
    }
}


module.exports = Player;