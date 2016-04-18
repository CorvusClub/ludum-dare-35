const Camera = require('./camera.js');
const Particle = require('./particle.js');
class Renderer {
    constructor(game) {
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
        
        Promise.all(this.parallax).then((patterns) => {
            this.parallax = patterns;
        });
        
        this.backgroundHeight = this.canvas.height;
        
        this.loadImage("./images/intro.png").then(img => {
            this.intro = img;
        });
        
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.score);
        document.body.appendChild(this.highScoreSpan);
    }
    loadImage(src) {
        let img = new Image();
        img.src = src;
        return new Promise(resolve => {
            img.addEventListener("load", () => {
                resolve(img);
            });
        });
    }
    loadPattern(src) {
        return this.loadImage(src).then(img => {
            let canvas = document.createElement("canvas");
            canvas.width = img.width * 4;
            canvas.height = img.height;
            let context = canvas.getContext("2d");
            for(let i = 0; i < 4; i++) {
                context.drawImage(img, i * img.width, 0);
            }
            canvas.x = -this.canvas.width * 2;
            return canvas;
        });
    }
    emitSpark(x, y, angle) {
        for(var i = 0; i < 5; i++) {
            this.particles.push(new Particle(x + Math.random() * 5, y - Math.random() * 5, angle - Math.PI / 8 * Math.random(), "gold", Math.random() / 2));
        }
    }
    drawParallaxPattern(pattern, index, override) {
        let heightFactor = this.game.player.y / 60;
        if(heightFactor > 100) {
            heightFactor = 100;
        }
        let backgroundY = this.camera.top - heightFactor;
        if(override) {
            pattern.x = -this.canvas.width * 4 + (0 - this.game.introPos) / (index + 1);
        }
        else {
            pattern.x -= this.game.player.speed / (index + 1);
        }
        if(pattern.x <= -this.camera.width * 3) {
            pattern.x = this.camera.left;
        }
        this.context.drawImage(pattern, pattern.x, backgroundY, this.camera.width * 4, this.backgroundHeight / this.camera.scale.y * 1.15);
    }
    update(time) {
        this.camera.x = 0 + this.camera.width / 2;
        this.camera.y = this.game.player.y;
        if(this.camera.y > 5000) {
            this.camera.y = 5000;
        }
        this.particles.forEach((part, index) => {
            if(!part.update(time)) {
                this.particles.splice(index, 1);
            }
        });
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        
        
        var scoreInt = parseInt((this.game.world.xPos/100).toFixed(0));
        this.score.textContent = "Score: " + scoreInt.toLocaleString();
        this.updateHighScore();
        this.highScoreSpan.textContent = "High Score: " + this.highScore.toLocaleString();
        
        this.camera.transform();
        if(!this.parallax[0].then) {
            for(let i = this.parallax.length; i--; i > 0) {
                this.drawParallaxPattern(this.parallax[i], i);
            }
        }
        
        if(!this.game.started) {
            if(!this.parallax[0].then) {
                for(let i = this.parallax.length; i--; i > 0) {
                    this.drawParallaxPattern(this.parallax[i], i, this.game.introPos);
                }
            }
            if(this.intro) {
                this.context.drawImage(this.intro, -this.camera.width, this.camera.top, this.camera.width, this.camera.height);
            }
        }
        this.game.entities.forEach(ent => {
            ent.draw(this);
        });
        
        this.game.world.draw(this);
        
        this.particles.forEach((part, index) => {
            part.draw(this);
        });
        
        
        
        this.context.restore();
    }
    
    updateHighScore()
    {
        let newHS = parseInt((this.game.world.xPos/100).toFixed(0));
        if(newHS>this.highScore)
            this.highScore = newHS;
        localStorage.setItem("highScore", this.highScore);
    }
}


module.exports = Renderer;