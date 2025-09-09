class GameObject {
  constructor(config){
    this.x = config.x || 1;
    this.y = config.y || 1;
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/laura.png"
    });
  }
}
