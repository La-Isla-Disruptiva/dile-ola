class WorldMap{
  constructor(config){
//    console.log("new map", config)
    this.gameObjects = config.gameObjects
    this.walls = {}
    Object.entries(config.walls || []).forEach(([key, value]) => {
      const [x,y] = value
      this.walls[mapUtils.asGridCoords(x,y)] = true
    })
    console.log(this.walls)
    
    this.lowerImage = new Image();
    this.lowerImage.src = "images/maps/" + config.srcName + "Lower.png";

    this.upperImage = new Image();
    this.upperImage.src = "images/maps/" + config.srcName + "Upper.png";
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
    srcName: "Demo",
    gameObjects: {
     npc: new Hero({
              ckey: "alicia",
              ctx: this.ctx,
              x: mapUtils.withGrid(6), y: mapUtils.withGrid(6)
            }),
    }
  },
  DiningRoom: {
    srcName: "DiningRoom",
    gameObjects: {
     npc: new Hero({  
              ckey: "carlos",
              ctx: this.ctx,
              x: mapUtils.withGrid(7), y: mapUtils.withGrid(5),
              behavihorLoop: [
                { type: "stand", direction: "down", time: 800 },
                { type: "walk", direction: "left" }
              ]
            }),
    },
walls: [
     [1,3],
      [2,3],
      [3,3],
      [4,3],
      [5,3],
      [6,2],
      [6,3],
      [6,4],
      [6,5],
      [0,4],
      [0,5],
      [0,6],
      [0,7],
      [0,8],
      [0,9],
      [0,10],
      [0,11],
      [1,12],
      [2,12],
      [3,12],
      [4,12],
      [5,12],
      [6,13],
      [7,12],
      [8,12],
      [9,12],
      [10,12],
      [11,12],
      [12,12],
      [13,11],
      [13,10],
      [13,9],
      [13,8],
      [12,7],
      [11,7],
      [13,6],
      [12,5],
      [11,5],
      [10,5],
      [9,4],
      [8,3],
      [8,2],
      [7,1],

      // contoir  à gauche
      [1,5],
      [2,5],
      [3,5],
      [4,5],

      // sofas
      [2,7],
      [3,7],
      [4,7],

      [2,10],
      [3,10],
      [4,10],

      [7,7],
      [8,7],
      [9,7],

      [7,10],
      [8,10],
      [9,10]
]
  },
 Common1: {
      srcName: "Common1",
    lowerSrc: "images/maps/Common1Lower.png",
    upperSrc: "images/maps/Common1Upper.png",
    gameObjects: {
     npc: new Hero({  
              ckey: "carlos",
              ctx: this.ctx,
              x: mapUtils.withGrid(7), y: mapUtils.withGrid(5),
              behavihorLoop: [
                { type: "stand", direction: "down", time: 800 },
                { type: "walk", direction: "left" }
              ]
            }),
    },
    walls: [[8,8],[9,8],[9,7],[8,7],[8,6],[7,6],[6,6],[6,7],[6,8],[9,6],[9,5],[9,4],[9,3],[8,3],[7,3],[6,3],[6,4],[6,5],[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20],[0,21],[0,22],[0,23],[0,24],[0,25],[0,26],[0,27],[0,28],[0,29],[1,29],[2,29],[3,29],[4,29],[5,29],[6,29],[7,29],[8,29],[9,29],[10,29],[11,29],[12,29],[13,29],[14,29],[19,29],[15,29],[16,29],[17,29],[18,29],[20,29],[21,29],[22,29],[23,29],[24,29],[25,29],[26,29],[27,29],[28,29],[29,29],[29,28],[29,26],[29,25],[29,27],[29,24],[29,23],[29,22],[29,21],[29,18],[29,19],[29,20],[29,17],[29,16],[29,15],[29,14],[29,13],[29,12],[29,11],[29,10],[29,9],[29,8],[29,7],[29,6],[29,5],[29,4],[29,3],[29,2],[29,1],[29,0],[28,0],[27,0],[26,0],[25,0],[24,0],[23,0],[22,0],[21,0],[20,0],[19,0],[17,0],[16,0],[15,0],[14,0],[13,0],[12,0],[11,0],[10,0],[9,0],[8,0],[7,0],[6,0],[5,0],[4,0],[3,-1],[1,0],[2,0],[3,0],[18,0]]
  }
}