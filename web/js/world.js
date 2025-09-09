class World{
  constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.gridFactor = 16;
    this.gridXOffset = 8;
    this.gridYOffset = 18;

    this.hero = new Hero({
      character: "laura",
      ctx: this.ctx
    })

    this.map = new Image();
    this.map.onload = () => {
      this.ctx.drawImage(this.map,0,0);
    }
    this.map.src = "images/maps/DemoLower.png";
  };

  init(){
    console.log(this)
    this.draw();
    //this.draw();
  }

  draw(){
    this.drawMap();
    setTimeout(()=>{
      this.hero.draw(this.ctx);
    },200)
  }


  drawMap(){
      this.ctx.drawImage(this.map,0,0);
  }
}



