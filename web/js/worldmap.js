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

window.worldMaps = {
  DemoRoom: {
    lowerSrc: "images/maps/DemoLower.png",
    upperSrc: "images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Hero({
              character: "laura",
              ctx: this.ctx,
              x: 5, y: 4,
              isPlayer: true
            }),
      npc: new Hero({
              character: "alicia",
              ctx: this.ctx,
              x: 6, y: 6
            }),
    }
  }
}
