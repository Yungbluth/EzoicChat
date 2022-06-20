import { Component } from '@angular/core';
import { WebSocketAPI } from './WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI;
  data: any;
  name: string;
  message: string;
  color: boolean;

  //Starts up the web socket
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new AppComponent());
  }

  //Connects to the server
  connect(){
    (document.getElementById("con") as HTMLButtonElement).disabled = true;
    (document.getElementById("dis") as HTMLButtonElement).disabled = false;
    this.webSocketAPI._connect();
  }

  //Disconnects to the server
  disconnect(){
    (document.getElementById("con") as HTMLButtonElement).disabled = false;
    (document.getElementById("dis") as HTMLButtonElement).disabled = true;
    this.webSocketAPI._disconnect();
  }

  //Sends a message to the server, includes the name of the sender
  sendMessage(){
    this.webSocketAPI._send(this.name + ":" + this.message);
  }

  //Receives messages from the server and displays it to the html
  handleMessage(message){
    this.data = JSON.parse(message);
    let row = document.createElement("tr");
    //alternate colors of the messages
    if (this.color) {
      row.style.backgroundColor = "#f2f2f2";
    }
    this.color = !this.color;
    let dataMsg = document.createElement("td");
    let Msg = document.createTextNode(this.data.name + " says: " + this.data.msg);
    dataMsg.appendChild(Msg);
    row.appendChild(dataMsg);
    document.getElementById("output").appendChild(row);
  }
}
