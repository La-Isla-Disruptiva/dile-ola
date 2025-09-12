class Transporter {
  constructor(config){
    this.hostname= config.hostname
    this.port     = config.port
    this.protocol = config.protocol
   
    this.uuid     = config.uuid || "1234"
    this.password = config.password || "start"

    this.socket   = null
    this.isConnected = false
  }

  init(receivedCB){
    console.log("initialise connection")
    let uri
    if (this.port != undefined){
      uri= this.protocol + "://" + this.hostname + ":" + this.port
    }else{
      uri= this.protocol + "://" + this.hostname
    }
    console.log(uri)
    this.socket = new WebSocket(uri)
    // OPEN
    this.socket.onopen = (e) => {
      this.isConnected = true
      console.log("connection", this.socket)
    }
    // ERROR
    this.socket.onerror = (e) => {
      console.log("transport error: ",e)
    }
    // CLOSE
    this.socket.onclose = (e) => {
      this.isConnected = false
      this.retryConnection(receivedCB)
      if (e.wasClean) {
        console.log(`connection closed (code=${e.code} reason=${e.reason})`)
      }else{
        console.log("connection died", e)
      }
    }
    // RECEIVED
    this.socket.onmessage = (e) => {
     // console.log("data received", e)
      receivedCB(e.data)
    }
  }

  retryConnection(receivedCB){
     setTimeout(()=>{
      this.init(receivedCB)
    },CONNECTION_RETRY_TIMEOUT)
  }
    update(pos){
      if ( ! this.isConnected ) { return }
      const msg = {
        password: this.password,
        uuid: this.uuid,
        ckey: pos.ckey,
        x:    pos.x,
        y:    pos.y
      }
      this.socket.send(JSON.stringify(msg)); 
  }

}
