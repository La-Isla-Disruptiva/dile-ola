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
    this.webrtcController = null

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
    this.talkingto = null

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

      if(e.code === "Space"){

        console.log("hero uuid", this.hero.uuid)
        console.log("other heros: ", this.other_users)
      }

      //console.log("keydown!", e)

      if(e.code === "Enter"){
        //console.log("start connection process")
        let [other_user]  = Object.keys(this.other_users)
        this.talkingto = other_user
        // todo: do only if user is found
        this.webrtcController.connect(other_user)
        }

     if(e.code === "Escape"){
      //console.log("start disconnection process")
        // todo: do only if user is found
        this.webrtcController.disconnect(this.talkingto)
        this.talkingto
      }
    })

   



    //  Ajuste la position des autres personnages
    this.transport.on("move",(data) => {

     // if(data.uuid != this.talkingto){
     //   console.log(data)
     // }

      if ( data.uuid != this.hero.uuid){
        if (data.uuid in this.other_users ){
          this.other_users[data.uuid].update(data.data)
        }else{
          this.other_users[data.uuid] = new Hero({
            uuid: data.uuid, 
            ckey: data.data.ckey,
            direction: data.data.direction,
            x: data.data.x,
            y: data.data.y
          })
        }
      }
    })


    this.webrtcController =  new WebrtcController({
      localVideo: document.querySelector("#localVideo"),
      remoteVideo: document.querySelector("#remoteVideo"),
//      signaling: new BroadcastChannel('webrtc')
     signaling: {
        postMessage: (data)=> {
         // console.log("postMessage",data) 
          this.transport.update(this.hero.uuid, "p2pConnection", data)
        }
      }

    })


    this.transport.on("p2pConnection",(data)=>{
//      this.webrtcController.signaling.onmessage = resp => {
        if (!this.webrtcController.localStream) {
         console.log('not ready yet');
         return;
      }
      console.log("webrtc connection data")
      console.log(e)
      console.log(resp)
      switch (resp.data.type){
        case "offer":
          this.webrtcController.handleOffer(e.senderUuid,resp.data  )
          break
        case "answer":
          this.webrtcController.handleAnswer(resp.data)
          break
        case "candidate":
          console.log("pass to handlecandidate: ", resp.data)
          this.webrtcController.handleCandidate(resp.data  )
          break
        case "ready":
          if( this.webrtcController.isConnected){
            console.log("already in a call")
            return
          }
          this.webrtcController.makeCall(e.senderUuid)
          break
        case "bye":
          if( this.webrtcController.isConnected){
            this.webrtcController.hangup()
            this.talkingto = null
          }
          break
        default:
          break


      }
    }
    )   
    this.transport.on("disconnected",(data)=>{
      console.log("user disconnected: ", data)
       delete this.other_users[data.uuid]
    })
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

