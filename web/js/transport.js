class Transporter {
  constructor(config){
    this.hostname= config.hostname
    this.port     = config.port
    this.protocol = config.protocol
   
    this.uuid     = config.uuid || "1234"
    this.password = config.password || "start"

    this.socket   = null
    this.isConnected = false
    //this.connectionFailed = 0
  }
  init(receivedCB){

    let uri
    if (this.port != undefined){
      uri= this.protocol + "://" + this.hostname + ":" + this.port
    }else{
      uri= this.protocol + "://" + this.hostname
    }

    this.socket = new WebSocket(uri)
    console.log(this.socket)
    // OPEN
    this.socket.onopen = (e) => {
      this.isConnected = true
      console.log("connection", this.socket)
    }
    // ERROR
    this.socket.onerror = (e) => {
      this.isConnected = true
      console.log("transport error: ",e)
    }
    // CLOSE
    this.socket.onclose = (e) => {
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
