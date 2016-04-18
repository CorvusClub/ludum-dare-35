class Entity {
    constructor() {
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
    draw(renderer) {
        renderer.context.fillStyle = "black";
        renderer.context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(game, time) {
        this.velocity.x += this.acceleration.x * time;
        this.velocity.y += this.acceleration.y * time;
        
        this.x += this.velocity.x * time * game.world.pixelsPerMeter;
        this.y += this.velocity.y * time * game.world.pixelsPerMeter;
    }
}

module.exports = Entity;