class WorldMap{
  constructor(config){
//    console.log("new map", config)
    this.gameObjects = config.gameObjects
    this.walls = config.walls || {};


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
  isSpaceTaken(currentX, currentY,direction){
    const {x,y} = mapUtils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false
  }
  addWall(x,y){
    this.walls[`${x},${y}`] = true
  }
  removeWall(x,y){
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX,wasY,direction){
    const {x,y} = mapUtils.nextPosition(wasX, wasY, direction);
    this.removeWall(wasX,wasY);
    this.addWall(x,y);
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
    },
    walls: {
      // contour
      [mapUtils.asGridCoords(1,3)]: true,
      [mapUtils.asGridCoords(2,3)]: true,
      [mapUtils.asGridCoords(3,3)]: true,
      [mapUtils.asGridCoords(4,3)]: true,
      [mapUtils.asGridCoords(5,3)]: true,
      [mapUtils.asGridCoords(6,2)]: true,
      [mapUtils.asGridCoords(6,3)]: true,
      [mapUtils.asGridCoords(6,4)]: true,
      [mapUtils.asGridCoords(6,5)]: true,
      [mapUtils.asGridCoords(0,6)]: true,
      [mapUtils.asGridCoords(0,7)]: true,
      [mapUtils.asGridCoords(0,8)]: true,
      [mapUtils.asGridCoords(0,9)]: true,
      [mapUtils.asGridCoords(0,10)]: true,
      [mapUtils.asGridCoords(0,11)]: true,
      [mapUtils.asGridCoords(1,12)]: true,
      [mapUtils.asGridCoords(2,12)]: true,
      [mapUtils.asGridCoords(3,12)]: true,
      [mapUtils.asGridCoords(4,12)]: true,
      [mapUtils.asGridCoords(5,12)]: true,
      [mapUtils.asGridCoords(6,13)]: true,
      [mapUtils.asGridCoords(7,12)]: true,
      [mapUtils.asGridCoords(8,12)]: true,
      [mapUtils.asGridCoords(9,12)]: true,
      [mapUtils.asGridCoords(10,12)]: true,
      [mapUtils.asGridCoords(11,12)]: true,
      [mapUtils.asGridCoords(12,12)]: true,
      [mapUtils.asGridCoords(13,11)]: true,
      [mapUtils.asGridCoords(13,10)]: true,
      [mapUtils.asGridCoords(13,9)]: true,
      [mapUtils.asGridCoords(13,8)]: true,
      [mapUtils.asGridCoords(12,7)]: true,
      [mapUtils.asGridCoords(11,7)]: true,
      [mapUtils.asGridCoords(13,6)]: true,
      [mapUtils.asGridCoords(12,5)]: true,
      [mapUtils.asGridCoords(11,5)]: true,
      [mapUtils.asGridCoords(10,5)]: true,
      [mapUtils.asGridCoords(9,4)]: true,
      [mapUtils.asGridCoords(8,3)]: true,
      [mapUtils.asGridCoords(8,2)]: true,
      [mapUtils.asGridCoords(7,1)]: true,

      // contoir  à gauche
      [mapUtils.asGridCoords(1,5)]: true,
      [mapUtils.asGridCoords(2,5)]: true,
      [mapUtils.asGridCoords(3,5)]: true,
      [mapUtils.asGridCoords(4,5)]: true,

      // sofas
      [mapUtils.asGridCoords(2,7)]: true,
      [mapUtils.asGridCoords(3,7)]: true,
      [mapUtils.asGridCoords(4,7)]: true,

      [mapUtils.asGridCoords(2,10)]: true,
      [mapUtils.asGridCoords(3,10)]: true,
      [mapUtils.asGridCoords(4,10)]: true,

      [mapUtils.asGridCoords(7,7)]: true,
      [mapUtils.asGridCoords(8,7)]: true,
      [mapUtils.asGridCoords(9,7)]: true,

      [mapUtils.asGridCoords(7,10)]: true,
      [mapUtils.asGridCoords(8,10)]: true,
      [mapUtils.asGridCoords(9,10)]: true,
    }
  } 
}