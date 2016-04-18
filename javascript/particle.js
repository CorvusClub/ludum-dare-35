class Particle {
    constructor(x, y, angle, color, lifespan) {
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.angle = angle;
        this.color = color;
        this.lifespan = lifespan;
    }
    update(time) {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        
        this.lifespan -= time;
        if(this.lifespan < 0) {
            return false;
        }
        return true;
    }
    draw(renderer) {
        renderer.context.globalAlpha = this.lifespan * 4;
        renderer.context.strokeStyle = this.color;
        renderer.context.lineWidth = 3;
        renderer.context.beginPath();
        renderer.context.moveTo(this.x, this.y);
        renderer.context.lineTo(this.x + Math.cos(this.angle) * this.speed, this.y + Math.sin(this.angle) * this.speed);
        renderer.context.stroke();
        renderer.context.globalAlpha = 1;
    }
}

module.exports = Particle;