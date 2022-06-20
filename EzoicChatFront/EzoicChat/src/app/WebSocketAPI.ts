import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://69.244.47.172:8080/ws';
    topic: string = "/topic/chatapp";
    stompClient: any;
    appComponent: AppComponent;
    constructor(appComponent: AppComponent){
        this.appComponent = appComponent;
    }

    //Connects to the server
    connectServer() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    //if error try and reconnect every 10 seconds
    errorCallBack(error) {
        console.log("Error -> " + error)
        setTimeout(() => {
            this.connectServer();
        }, 10000);
    }

    //Disconnects from the server
    disconnectServer() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    //Receives a message from the server
    onMessageReceived(message) {
        console.log("Got message from server: " + message);
        this.appComponent.handleMessage(message.body);
    }

    //Sends a message to the server
    sendMsg(message) {
        console.log("Sending message to server");
        this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    }
}
