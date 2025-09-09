class WorldMap{
  constructor(config){
    this.gameObjects = config.gameObjects


    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLower(ctx){
    ctx.drawImage(this.lowerImage,0,0)
  }
  drawUpper(ctx){
    ctx.drawImage(this.upperImage,0,0)
  }
}
