class Transporter {
  constructor(config){
    this.hostname= config.hostname
    this.port     = config.port
    this.protocol = config.protocol
   
    this.uuid     = config.uuid || "1234"
    this.password = config.password || "start"

    this.socket   = null
    this.isConnected = false

    this.emitters = {}
  }

  init(){
    if(DEBUG_WEBSOCKET){console.log("initialise connection")}
    let uri
    if (this.port != undefined){
      uri= this.protocol + "://" + this.hostname + ":" + this.port
    }else{
      uri= this.protocol + "://" + this.hostname
    }
    this.socket = new WebSocket(uri)
    // OPEN
    this.socket.onopen = (e) => {
      this.isConnected = true
     // console.log("connection", this.socket)
    }
    // ERROR
    this.socket.onerror = (e) => {
      console.log("transport error: ",e)
    }
    // CLOSE
    this.socket.onclose = (e) => {
      this.isConnected = false
      this.retryConnection()
   if(DEBUG_WEBSOCKET){  
      if (e.wasClean) {
        console.log(`connection closed (code=${e.code} reason=${e.reason})`)
      }else{
        console.log("connection died", e)
      }
    }
    }
    // RECEIVED
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      //if(DEBUG_WEBSOCKET){console.log("data received", e)}
      if(this.emitters[data.type] != undefined){
        this.emitters[data.type].forEach((fn) =>{
          fn(data)
        })
      }
    }
  }

  on(type , callback){

    if( ! (type in this.emitters) ){
      this.emitters[type] = []
    }
    this.emitters[type].push(callback)

  }


  retryConnection(){
     setTimeout(()=>{
      this.init()
    },CONNECTION_RETRY_TIMEOUT)
  }
  update(uuid, action, state){

    if ( ! this.isConnected ) { return }
      const msg = {
        token: this.password,
        uuid: uuid,
        type: action,
        data:  state
      }
    if(action === "p2pConnection"){
     // console.log("data send: ",msg)
    }

      this.socket.send(JSON.stringify(msg)); 
  }
}
