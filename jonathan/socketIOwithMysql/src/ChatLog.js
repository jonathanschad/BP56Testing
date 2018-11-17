import React, { Component } from "react";
import { List, ListItem, Avatar, ListItemText } from "@material-ui/core";
import { Person } from "@material-ui/icons";
class ChatLog extends Component {
  getChats() {
    let chats = [];
    for (let i = 0; i < this.props.chats.length; i++) {
      const element = this.props.chats[i];
      chats.push(
        <ListItem key={i}>
          <Avatar>
            <Person />
          </Avatar>
          <ListItemText primary={element} />
        </ListItem>
      );
    }
    return chats;
  }
  render() {
    return (
      <div className="chat">
        <List>{this.getChats()}</List>
      </div>
    );
  }
}

export default ChatLog;
