const gridFactor = 16;
const centerXOffset = 6;
const centerYOffset = 10.5;

const mapUtils = {
  withGrid (n) {
    return n * gridFactor; 
  },
  asGridCoords(x,y) {
    return `${x*gridFactor},${y*gridFactor}`
  },
  nextPosition(initialX, initialY, direction){
    let x = initialX;
    let y = initialY;
    const size = gridFactor;
    if (direction === "up"){
      y -= size;
    } else if (direction === "down"){
      y += size;
    } else if (direction === "left"){
      x -= size;
    } else if (direction === "right"){
      x += size;
    }
    return { x, y };  
  }
}