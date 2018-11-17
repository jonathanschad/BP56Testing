import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onEnterClicked = this.onEnterClicked.bind(this);
  }
  onInputChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  sendMessage() {
    this.props.onSendClicked(this.state.input);
    this.setState({
      input: ""
    });
  }
  onEnterClicked(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }
  componentDidMount() {
    window.addEventListener("keyup", this.onEnterClicked);
  }
  render() {
    return (
      <div className="input">
        <TextField
          label="Enter Message"
          style={{ margin: 8 }}
          placeholder="Enter Message"
          margin="normal"
          value={this.state.input}
          onChange={this.onInputChange}
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button variant="contained" color="primary" onClick={this.sendMessage}>
          Send
        </Button>
      </div>
    );
  }
}

export default Chat;
