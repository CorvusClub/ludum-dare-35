const EventEmitter = require('events').EventEmitter;
class Animation extends EventEmitter {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.rotation = 0;
        
        this.frames = [];
        this.t = 0;
        this.index = 0;
        
    }
    addFrame(src, duration, width, height) {
        let frame = {};
        frame.img = new Image();
        frame.img.src = src;
        frame.duration = duration;
        frame.width = width;
        frame.height = height;
        this.frames.push(frame);
    }
    start() {
        this.t = 0;
        this.index - 0;
    }
    update(time) {
        this.t += time;
        if(this.t > this.frames[this.index].duration) {
            this.index++;
            this.t = 0;
        }
        if(this.index >= this.frames.length) {
            this.emit('loop');
            this.index = 0;
        }
    }
    draw(renderer, x, y, originX = this.width / 2, originY = this.height / 2) {
        let frame = this.frames[this.index];
        renderer.context.translate(x + originX, y + originY);
        renderer.context.rotate(this.rotation);
        renderer.context.drawImage(frame.img, -(originX), -(originY), frame.width || this.width, frame.height || this.height);
        renderer.context.rotate(-this.rotation);
        renderer.context.translate(-(x + originX), -(y + originY));
    }
}

module.exports = Animation;