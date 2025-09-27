class GameObject {
  constructor(config){
    this.ismounted = false;
    this.x = config.x || 1;
    this.y = config.y || 1;
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/laura.png"
    });
  }
  
  mount(map){
    this.ismounted = true;
    map.addWall(this.x, this.y);
  }
  unmount(map){
    this.ismounted = false;
    map.removeWall(this.x, this.y);
  }
}
