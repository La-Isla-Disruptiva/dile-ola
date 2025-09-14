package main

// basic ws server based on: 
//   https://golangbot.com/go-websocket-server/

import (
	//"fmt"
	"log"
	"net/http"
	"strings"
	"encoding/json"
	//"time"

  "github.com/gorilla/websocket"
)

type Client struct {
	Uuid string
	Conn *websocket.Conn
	Pool *Pool
}

func Authenticate(token string) bool {
		//  Validate server token
		if strings.Trim(string(token),"\n") != "start" {
			return false
		}
		return true
}

func(c *Client) Read(){
	defer func(){
    c.Pool.Unregister <- c
	  c.Conn.Close()
	}()

	for {
		var message InputMessage
    err := c.Conn.ReadJSON(&message)
		if err != nil {
			log.Printf("Error %s when reading client's message ", err)
			c.Conn.Close()
		  break
		}

   if ! Authenticate(message.Token){
		 c.Conn.Close()
     break 
	 } 


   c.Uuid = message.Uuid

	// log.Println("message from", message.Uuid, message.Type)
	 c.Pool.Register <- c

	  if strings.TrimRight(message.Type, "\n") == "move" {	
			//log.Println(message)
			output := BroadcastMessage{ Uuid: message.Uuid, Type: "move", Data: message.Data }
			c.Pool.Broadcast <- output
			
		}

  
//	  if strings.TrimRight(message.Type, "\n") != "move" {	
//			log.Println(message)
//		}

	  if strings.TrimRight(message.Type, "\n") == "p2pConnection" {
			  //log.Println("connection message")
		    var data BasicMessage 
			  if err := json.Unmarshal([]byte(message.Data), &data); err != nil {
            log.Fatal(err)
						break
        }
			output := SendtoMessage{ SenderUuid: c.Uuid, TargetUuid: data.Uuid, Type: "p2pConnection", Data: data.Data }
			c.Pool.Sendto <- output
			
		}	
	}
}

type Pool struct {
	Clients    map[string]*Client
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan BroadcastMessage
	Sendto     chan SendtoMessage
}


type InputMessage struct {
	Token string      `json:"token"`
	Uuid  string      `json:"uuid"`
	Type  string      `json:"type"`
	Data  json.RawMessage `json:"data"`
}

type BroadcastMessage struct {
	Uuid  string      `json:"uuid"`
	Type  string      `json:"type"`
	Data  json.RawMessage `json:"data"`
}

type SendtoMessage struct {
	SenderUuid string      `json:"senderUuid"`
	TargetUuid string      `json:"targetUuid"`
	Type       string      `json:"type"`
	Data       json.RawMessage `json:"data"`
}

type BasicMessage struct {
	Uuid  string           `json:"uuid"`
	Data  json.RawMessage `json:"data"`
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[string]*Client),
		Broadcast:  make(chan BroadcastMessage),
		Sendto:     make(chan SendtoMessage),
	}
}

func(pool *Pool) Start(){
  for {
    select {
		case client := <-pool.Register:
        pool.Clients[client.Uuid] = client
			  log.Println("New user connected: ", client.Uuid)
			break
		case client := <-pool.Unregister:
			//output := BroadcastMessage{Uuid:client.Uuid, Type: "disconnected"}
				log.Println("User disconnected:", client.Uuid)
				//pool.Broadcast <- output
        delete(pool.Clients,client.Uuid)
			break
		case message:= <-pool.Broadcast:
			  //log.Println(pool.Clients)
    		for _, client := range pool.Clients {
					//log.Println(message.Uuid, client.Uuid)
					if client.Uuid != message.Uuid {
					  //log.Println(message)
		      	err:= client.Conn.WriteJSON(message)
		      	if err != nil {
		      		log.Printf("Error %s when sending message to client", err)
						  return
			      }
					}
    		}
			break
		case message:= <-pool.Sendto:

	   log.Println("message: ", message)
          j, err := json.Marshal(&message.Data)
    if err != nil {
        panic(err)
    }
		log.Println("data send: ",string(j))
		log.Println("clients available: ", pool.Clients)

			client, ok := pool.Clients[message.TargetUuid]
			if ok {
				log.Println("send to ", message.TargetUuid)
		   	err:= client.Conn.WriteJSON(message)
		   	if err != nil {
		   		log.Printf("Error %s when sending message to client", err)
			  	break
			  }
			}
		}
	}
}

var upgrader = websocket.Upgrader{
	    CheckOrigin: func(r *http.Request) bool {
				// devlopment mode only
        return true
      },
		}

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn,error){
	conn, err := upgrader.Upgrade(w,r,nil)
	if err != nil {
		log.Println("Erreur lors de l'upgrade http => ws  ",err)
		return nil, err
	}
  return conn, nil
}

func serveWs(pool *Pool, w http.ResponseWriter, r *http.Request){
  c, err := upgrader.Upgrade(w,r,nil)
	if err != nil {
		log.Printf("error %s when upgrading connection to websocket", err)
		return
	}
  client := &Client{
		Uuid: "",
		Conn: c,
		Pool: pool,
	}
	client.Read()
}

func main(){
	log.Println("Start server")
  pool := NewPool()

	go pool.Start()
	
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		serveWs(pool,w,r)
	})

	http.ListenAndServe(":8888", nil)

}
