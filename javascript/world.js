class World {
    constructor(game) {
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
        
        
        for(let i = 0; i < 640; i++) {
            this.heightMap[i] = {y: 620};
        }
        this.heightMap[15].pole = true;
    }
    findFloor(x) {
        x /= 4;
        if(x < 0) {
            x = 0;
        }
        else if(x >= this.heightMap.length) {
            x = this.heightMap.length - 1;
        }
        let floor = this.heightMap[Math.round(x)];
        return floor.y;
    }
    checkForFloor(ent) {
        let floor = this.heightMap[Math.round((ent.x + ent.width / 2) / 4)];
        if(floor.pit) {
            return false;
        }
        
        let leftY = this.findFloor(ent.x);
        let rightY = this.findFloor(ent.x + ent.width);
        let angle = Math.atan2(leftY - rightY, ent.x - (ent.x + ent.width));
        let diff = ent.rotation - angle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        
        if(Math.abs(diff) > Math.PI * 0.4) {
            return false;
        } 
        if(ent.y + ent.height >= floor.y && ent.y + ent.height * 1/4 <= floor.y) {
            return floor.y;
        }
        return false;
    }
    update(time) {
        this.adjustmentCD -= time;
        if(this.adjustmentCD<=0)
        {
            this.adjustment *= 0.8;
            this.adjustment += (Math.random()*0.6)-0.3;
            if(this.adjustment<-1)
            {
                this.adjustment=-1;
            }
            if(this.adjustment>1)
            {
                this.adjustment=1;
            }
            
            this.adjustmentCD = this.stability;
        }
        
        this.xPos+= this.game.player.speed;
        for(let i = 0; i < this.game.player.speed; i++) {
            this.stream();
        }
    }
    stream(time) {
        this.heightMap.shift();
        this.poleMap.shift();
        
        let last = {};
        last.y = this.heightMap[this.heightMap.length - 1].y;

        this.pitCD -= 1;
        if(this.pitLength > 0) {
            last.pit = true;
            this.pitLength--;
        }
        else {
            last.y -= this.adjustment;
            if(last.y > 5000) {
                last.y = 5000;
            }
        }
        if(this.pitCD <= 0) {
            last.pit = true;
            this.pitCD = 4500 + Math.random() * 1000;
            this.pitLength = 300 + Math.random() * 1400 + Math.random() * 500 * this.game.player.speed / 1000;
        }
        
        this.poleCD--;
        if(this.poleCD<=0)
        {
            last.pole = true;
            this.poleCD=400;
        }
        else {
            this.poleMap.push(null);
        }
        
        this.heightMap.push(last);
    }
    draw(renderer) {
        renderer.context.strokeStyle = "black";
        renderer.context.lineWidth = 10;
        renderer.context.beginPath();
        let lastPole = 0;
        this.heightMap.forEach((pos, x) => {
            x *= 4;
            let height = pos.y;
            if(!pos.pit)
            {
                if(this.pit==true)
                {
                    this.pit=false;
                    renderer.context.beginPath();
                }
                renderer.context.lineTo(x, height);
                if(pos.pole) {
                    renderer.context.moveTo(x, this.game.renderer.camera.bottom);
                    renderer.context.lineTo(x, height);
                    lastPole = x;
                }
            }
            else
            {
                if(this.pit==false)
                {
                    this.pit=true;
                    renderer.context.stroke();
                }
            }
        });
        renderer.context.stroke();
        this.pit = false;
    }
}

module.exports = World;