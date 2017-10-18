import React from 'react';
import io from 'socket.io-client';

import './style.css';

const socket = io();

socket.on('news', (variable) => {
  console.log(variable)
  socket.emit('my other event', { hello: 'world' });
});
console.log('running')

var acualId = 0;

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      users: [],
      messages: []
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentWillMount() {
    socket.on('initialState', (state) => {
      this.setState(state)
    })
  }
  componentDidMount() {
    socket.on('newMessage', (message) => {
      console.log(message);
      let messages = this.state.messages;
      messages.push(message);
      this.setState({messages})
    })
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let message = {
        userId: this.state.user.id,
        userName: this.state.user.userName,
        message: e.target.value,
      }
      socket.emit('newMessage', message);
      e.target.value = ''
    }
  }
  render() {
    const messages = this.state.messages.map((item) => {
      return <div key={item.id}>{item.userName}: {item.message}</div>;
    })
    const users = this.state.users.map((item) => {
      return <div key={item.id}>{item.userName}</div>;
    })
    return(
      <div className="container">
        <div className="chat">
          {messages}
        </div>
        <div className="sidebar">
          {users}
        </div>
        <div className="chat-input-text">
          <input className="uma-class-aew" type="text" onKeyPress={this.handleKeyPress}/>
        </div>
      </div>
    )
  }
}
