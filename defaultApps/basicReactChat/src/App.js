import React, { Component } from "react";
import Chat from "./Chat";
import "./index.css";
import ChatLog from "./ChatLog";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
    this.addMessage = this.addMessage.bind(this);
  }
  addMessage(text) {
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
        <Chat onSendClicked={this.addMessage} />
      </div>
    );
  }
}

export default App;
