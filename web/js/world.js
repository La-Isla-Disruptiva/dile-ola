class World{
  constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.gridFactor = 16;
    this.gridXOffset = 8;
    this.gridYOffset = 18;
  };


  init(){
    console.log("init world");
    console.log(this)
    this.drawMap();
    this.drawHero(4,6);
  }


  drawMap(){
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image,0,0);
    }
    image.src = "images/maps/DemoLower.png";
  }


  drawHero(x,y){
   const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(
        image
        ,0 // left ctx
        ,0 // top cut
        ,32 // width of cut
        ,32 // hight of cut
        ,x * this.gridFactor - this.gridXOffset
        ,y * this.gridFactor - this.gridYOffset
        ,32
        ,32
      );
    }
    image.src = "images/characters/people/hero.png";

    const shadow = new Image();
    shadow.onload = () => {
      this.ctx.drawImage(
        shadow
        ,0 // left ctx
        ,0 // top cut
        ,32 // width of cut
        ,32 // hight of cut
        ,x * this.gridFactor - this.gridXOffset
        ,y * this.gridFactor - this.gridYOffset
        ,32
        ,32
      );
    }
    shadow.src = "images/characters/shadow.png";


  }
}


class Hero{

}



