import React, { Component } from "react";
import Chat from "./Chat";
import "./index.css";
import ChatLog from "./ChatLog";
import io from "socket.io-client";

var chat = io.connect();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };

    this.pushMessage = this.pushMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }
  componentDidMount() {
    var add = this.addMessage;
    chat.on("connect", function() {
      chat.send("hi!");
      chat.on("new message", function(msg) {
        add(msg);
      });
    });
  }
  pushMessage(text) {
    chat.emit("new message", text);
    this.addMessage(text);
  }
  addMessage(text) {
    console.log("getting calleds");

    let chats = this.state.chats;
    chats.push(text);
    this.setState({
      chats
    });
  }
  render() {
    return (
      <div>
        <ChatLog chats={this.state.chats} />
        <Chat onSendClicked={this.pushMessage} />
      </div>
    );
  }
}

export default App;
