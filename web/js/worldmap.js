class WorldMap{
  constructor(config){
    console.log("new map", config)
    this.gameObjects = config.gameObjects


    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLower(ctx,camera){
    ctx.drawImage(this.lowerImage,centerXOffset * gridFactor - camera.x,centerYOffset * gridFactor - camera.y)
  }
  drawUpper(ctx,camera){
    ctx.drawImage(this.upperImage,centerXOffset * gridFactor - camera.x,centerYOffset * gridFactor - camera.y)
  }
}

window.worldMaps = {
  DemoRoom: {
    lowerSrc: "images/maps/DemoLower.png",
    upperSrc: "images/maps/DemoUpper.png",
    gameObjects: {
     npc: new Hero({
              ckey: "alicia",
              ctx: this.ctx,
              x: mapUtils.withGrid(6), y: mapUtils.withGrid(6)
            }),
    }
  },
  DiningRoom: {
    lowerSrc: "images/maps/DiningRoomLower.png",
    upperSrc: "images/maps/DiningRoomUpper.png",
    gameObjects: {
     npc: new Hero({  
              ckey: "carlos",
              ctx: this.ctx,
              x: mapUtils.withGrid(7), y: mapUtils.withGrid(5)
            }),
    }
  },
}