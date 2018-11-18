import React, { Component } from "react";
import Chat from "./Chat";
import "./index.css";
import ChatLog from "./ChatLog";
import SocketIO from "socket.io-client";
//SocketIO connection
const socket = SocketIO("http://localhost:8000");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
    this.addMessage = this.addMessage.bind(this);

    //Message Received callBack
    socket.on("onMessage", (data) => {
      let chats = this.state.chats;
      chats.push(data.text);
      this.setState({
        chats
      });
    });

    //Initial Setup Callback
    socket.on("init", (chat) => {
      this.setState({
        chats: chat
      });
    });
  }
  addMessage(text) {
    let chats = this.state.chats;
    chats.push(text);
    this.setState({
      chats
    });
    socket.emit("sendMessage", { text: text });
  }
  render() {
    return (
      <div>
        <ChatLog chats={this.state.chats} />
        <Chat onSendClicked={this.addMessage} />
      </div>
    );
  }
}

export default App;
