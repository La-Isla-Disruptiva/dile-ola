class World{
  constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.gridFactor = 16;
    this.gridXOffset = 8;
    this.gridYOffset = 18;

     
    this.map = new WorldMap(window.worldMaps.DemoRoom) 
    console.log(this)
    //  new Image();
    //this.map.onload = () => {
    //  this.ctx.drawImage(this.map,0,0);
   // }
   // this.map.src = "images/maps/DemoLower.png";
  };

  startGameLoop(){
    const step = () => {
      this.draw()
      requestAnimationFrame(() => {
        step()
      })
    }
    step();
  }

  init(){
    this.startGameLoop();

  }

  draw(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.map.drawLower(this.ctx)
    Object.values(this.map.gameObjects).forEach(object => {
      //object.movex(.05)
      object.draw(this.ctx)
    })
  }

}


window.worldMaps = {
  DemoRoom: {
    lowerSrc: "images/maps/DemoLower.png",
    upperSrc: "images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Hero({
              character: "laura",
              ctx: this.ctx,
              x: 5, y: 4
            }),
      npc: new Hero({
              character: "alicia",
              ctx: this.ctx,
              x: 6, y: 6
            }),
    }
  }
}
