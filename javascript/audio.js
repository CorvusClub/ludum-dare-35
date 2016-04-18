class AudioManager
{
    constructor(element, loopTime)
    {
        this.element = element;
        this.loopTime = loopTime;
        if(this.loopTime!=null)
        {
            this.element.addEventListener("ended", this.loop.bind(this));
        }
    }
    
    play()
    {
        this.element.play();
    }
    interruptPlay() {
        this.stop();
        this.play();
    }
    
    pause()
    {
        this.element.pause();
    }
    
    stop()
    {
        this.element.pause();
        this.element.currentTime=0;
    }
    
    loop()
    {
        this.play();
        this.element.currentTime=this.loopTime;
    }
}


module.exports = AudioManager;