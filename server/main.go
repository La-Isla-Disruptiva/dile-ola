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

type webSocketHandler struct {
	upgrader websocket.Upgrader
}

type Message struct {
	Password string `json:password`
	Uuid     string `json:uuid`
	Ckey     string `json:ckey`
	X        json.Number `json:x`
	Y        json.Number `json:y`
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)

func main() {
	connectionHandler := webSocketHandler{
		upgrader: websocket.Upgrader{
	    CheckOrigin: func(r *http.Request) bool {
				// devlopment mode only
        return true
      },
		},
	}
	http.Handle("/",connectionHandler)

	go handleMessages()

	log.Print("Starting server ...")
	log.Fatal(http.ListenAndServe(":8888", nil))
}

func (wsh webSocketHandler) ServeHTTP(w http.ResponseWriter, r *http.Request){
  c, err := wsh.upgrader.Upgrade(w,r,nil)
	if err != nil {
		log.Printf("error %s when upgrading connection to websocket", err)
		return
	}
	defer func(){
		log.Println("Closing connection")
		c.Close()
	}()

  clients[c] = true

  for {
		var msg Message
    err := c.ReadJSON(&msg)
		if err != nil {
			log.Printf("Error %s when reading message from client", err)
			c.Close()
			delete(clients,c)
		  return
		}
		// todo: adapter pour ReadJSON 
    //if mt == websocket.BinaryMessage {
		//	err = c.WriteMessage(websocket.TextMessage, []byte("server doesn't support binaty message"))
		//	if err != nil {
		//		log.Printf("Error %s when sending message to client", err)
		//	}
		//	return
		//}
		log.Printf("Receive message from %s", string(msg.Uuid))
		if strings.Trim(string(msg.Password),"\n") != "start" {
			err = c.WriteMessage(websocket.TextMessage, []byte("You did not say the magic word"))
			delete(clients,c)
			if err != nil {
				log.Printf("Error %s when sending message to client", err)
				return
			}
			continue
		}

		broadcast <- msg
		//i:= 1
		//for {
		//	response := fmt.Sprintf("Notification %d", i)
		//	err = c.WriteMessage(websocket.TextMessage, []byte(response))
		//	if err != nil {
		//		log.Printf("Error %s when sending message to client", err)
		//		return
		//	}
		//	i = i+1
		//	time.Sleep(2 * time.Second)
		//}
	}
}

func handleMessages(){
	for {
		msg := <-broadcast

		for client := range clients {
			err:= client.WriteJSON(msg)
			if err != nil {
				log.Printf("Error %s when sending message to client", err)
			  client.Close()	
				delete(clients, client)
			}
		}
	}
}
