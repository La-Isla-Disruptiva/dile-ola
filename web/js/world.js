class World{
  constructor(config){
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.gridFactor = 16;
    this.gridXOffset = 8;
    this.gridYOffset = 18;

    this.storage = config.storage
    this.transport = null
//    this.webrtcController = new WebrtcController({
//     localVideo: document.querySelector("#localVideo"),
//      remoteVideo: document.querySelector("#remoteVideo"),
//    })
  
    this.touchCircle = config.touchCircle;
    this.ws = config.ws
     
    this.hero = new Hero({
              uuid: this.storage.uuid,
              ckey: "laura",
              ctx: this.ctx,
              x: 5, y: 4,
              isPlayer: true
            }),

    this.other_users = {}

    this.FRAME_INTERVAL_MS = 1000 / MAX_FPS;
    this.previousTimeMs = 0;

    this.map = new WorldMap(window.worldMaps.DemoRoom) 

    console.log(this)
  };
  startGameLoop(){
    const step = () => {
      requestAnimationFrame((currentTimeMs) => {
           const deltaTimeMs = currentTimeMs - this.previousTimeMs;

           if (deltaTimeMs >= this.FRAME_INTERVAL_MS) {
             this.draw();
             this.previousTimeMs = currentTimeMs;
           }
        step()
      })
    }
    step();
  }

  init(){
    this.inputControl = new InputControl();
    this.inputControl.init();


    this.transport = new Transporter({
      uuid: this.hero.uuid,
      hostname: this.ws.hostname,
      port: this.ws.port,
      protocol: this.ws.protocol
    })
    this.transport.init()
//    this.webrtcController.init()
    //  Action permettant de se connecter à un autre utilisateur
    document.addEventListener("keydown", e => {
 
      console.log("keydown!", e)

      if(e.code === "Enter"){
        console.log("start connection process")
//        this.webrtcController.start()

//        let [other_user]  = Object.keys(this.other_users)
//        this.transport.update(this.hero.uuid,"connectionOffer",{
//          uuid: other_user, 
//          data: { dps: 1234}
//        })
        }
      }
    )
    

    function genReceivedCB(ref){
     return (data) => {
   //     console.log(data)
        if (data.type === "move" && data.uuid != ref.hero.uuid){
          if (data.uuid in ref.other_users ){
            ref.other_users[data.uuid].update(data.data)
          }else{
            ref.other_users[data.uuid] = new Hero({
              uuid: data.uuid, 
              ckey: data.data.ckey,
              direction: data.data.direction,
              x: data.data.x,
              y: data.data.y
            })
          }
        }else if(data.type === "p2pConnection"){
          console.log("demande de connection: ", data)
          init_videochat()
        }
        //console.log(ref.other_users)
      }
    }

    this.transport.on("move",genReceivedCB(this))

    this.startGameLoop();
  }

  

  draw(){
    // todo: séparer le update du draw (??)
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    this.map.drawLower(this.ctx)
    
    //  draw npcs
    Object.values(this.map.gameObjects).forEach(object => {
      object.draw(this.ctx);
    })

     // draw other USERS
     
    Object.values(this.other_users).forEach(object => {
      object.draw(this.ctx);
    })

    // update + draw USER
      this.hero.update({
        arrow: this.inputControl.direction
      });

      this.hero.draw(this.ctx)
    
      // Communique le nouvel état
      this.transport.update(this.hero.uuid, "move", this.hero.state)

      // touch screen feedback
      const x= this.inputControl.touchStartX
      const y= this.inputControl.touchStartY
  if ( x != null && y != null) {
         this.touchCircle.style.visibility = "visible";
         this.touchCircle.style.left = x + 'px';
         this.touchCircle.style.top = y + 'px';
         this.touchCircle.style.transform="translateX(-100%) translateY(-50%)";
      }else{
      this.touchCircle.style.visibility = "hidden";
      }

  }

}

