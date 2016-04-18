const Player = require('./player.js');

class Input {
    constructor(game)
    {
        this.keys = {};
        
        this.game = game;
        document.body.addEventListener("keydown", event => this.onKeyDown(event));
        document.body.addEventListener("keyup", event => this.onKeyUp(event));
        document.body.addEventListener("click", event => this.onClick(event));
        game.renderer.canvas.addEventListener("mousemove", event => this.onMouseMove(event));
    }
    
    onKeyDown(event)
    {
        if(event.code === "KeyA" || event.code === "ArrowLeft") {
            this.leftDown();
        }
        if(event.code === "KeyD" || event.code === "ArrowRight") {
            this.rightDown();
        }
        if(event.code === "KeyW" || event.code === "ArrowUp" || event.code=="Space") {
            this.upDown();
        }
        if(event.code === "KeyS" || event.code === "ArrowDown") {
            this.downDown();
        }
        if(event.code === "KeyQ") {
            this.game.player.manualBark();
        }
        if(event.code=="ShiftLeft")
        {
            this.shift();
        }
        
        if(event.code=="Space" || event.code === "KeyW" || event.code === "ArrowUp")
        {
            this.jump();
        }
        
        //console.log(event.code);
    }
    
    onKeyUp(event)
    {
        if(event.code === "KeyA" || event.code === "ArrowLeft") {
            this.leftUp();
        }
        if(event.code === "KeyD" || event.code === "ArrowRight") {
            this.rightUp();
        }
        if(event.code === "KeyW" || event.code === "ArrowUp") {
            this.upUp();
        }
        if(event.code === "KeyS" || event.code === "ArrowDown") {
            this.downUp();
        }
        if(event.code === "KeyR") {
            this.game.reset();
        }
        
        //console.log(event.code);
    }
    
    onMouseMove(event) 
    {
        let rect = event.target.getBoundingClientRect();
        let offsetX = event.clientX - rect.left;
        let offsetY = event.clientY - rect.top;
        
        this.mouseX = offsetX;
        this.mouseY = offsetY;
    }
    
    onClick(event) {
        if(!this.game.started) {
            this.game.start();
        }
    }
    
    jump()
    {
        this.game.player.jump();
    }
    
    shift()
    {
        this.game.player.shift();
    }
    
    leftDown() {
        this.game.player.left = true;
    }
    rightDown() {
        this.game.player.right = true;
    }
    upDown() {
        this.game.player.up = true;
    }
    downDown() {
        this.game.player.down = true;
    }
    leftUp() {
        this.game.player.left = false;
    }
    rightUp() {
        this.game.player.right = false;
    }
    upUp() {
        this.game.player.up = false;
    }
    downUp() {
        this.game.player.down = false;
    }
    
}

module.exports = Input;