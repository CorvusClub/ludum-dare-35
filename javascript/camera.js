class Camera {
    constructor(renderer) {
        this.renderer = renderer;
        this.x = 0;
        this.y = 0;
        this.scale = {
            x: 0.5,
            y: 0.5
        };
    }
    transform() {
        this.renderer.context.translate(
            this.renderer.canvas.width / 2 - this.x * this.scale.x,
            this.renderer.canvas.height / 2 - this.y * this.scale.y
        );
        
        this.renderer.context.scale(this.scale.x, this.scale.y);
    }
    translate(pos) {
        return {
            x: pos.x - (this.x - this.renderer.canvas.width) * this.scale.x,
            y: pos.y - this.y + this.renderer.canvas.height / 2
        }
    }
    get left() {
        return this.x - this.width / 2;
    }
    get right() {
        return this.x + this.width / 2;
    }
    get top() {
        return this.y - this.height / 2;
    }
    get bottom() {
        return this.y + this.height / 2;
    }
    
    get width() {
        return this.renderer.canvas.width / this.scale.x;
    }
    get height() {
        return this.renderer.canvas.height / this.scale.y;
    }
}

module.exports = Camera;