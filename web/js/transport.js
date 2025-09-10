class Transporter {
  constructor(config){
    this.url      = config.url
    this.port     = config.port
    this.protocol = config.protocol
   
    this.uuid     = config.uuid || "1234"
    this.password = config.password || "start"

    this.socket   = null
    //this.isConnected = false
    //this.connectionFailed = 0
  }
  init(){
    this.socket = new WebSocket(this.protocol + "://" + this.url + ":" + this.port)
    // OPEN
    this.socket.onopen = (e) => {
      const msg = {
        uuid: this.uuid,
        ckey: "any",
        x:    this.password,
        y:    "trek"
      }
      this.socket.send(JSON.stringify(msg));
    }
    // ERROR
    this.socket.onerror = (e) => {
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
      console.log("data received", e)
    }
  }

}
