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
    this.inputControl = new InputControl();
    this.inputControl.init();
    this.startGameLoop();
  }

  draw(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.map.drawLower(this.ctx)
    Object.values(this.map.gameObjects).forEach(object => {
      //console.log(object)
      object.update({
        arrow: this.inputControl.direction
      });
      object.draw(this.ctx);
    })
  }

}


