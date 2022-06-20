package com.example.EzoicChat;

public class Message {

    private String name;
    private String msg;

    public Message() {
    }

    public Message(String msgData) {
    	String data[] = msgData.split(":");
        this.name = data[0];
        this.msg = data[1];
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
