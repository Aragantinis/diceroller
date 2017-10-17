import React from 'react';
import io from 'socket.io-client';

import 'style.css';

const socket = io();

socket.on('news', (variable) => {
  console.log(variable)
  socket.emit('my other event', { hello: 'world' });
});
console.log('running')

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(e.target.value)
      e.target.value = ''
    }
  }
  render(){
    return(
      <div>
        <input className="uma-class-aew" type="text" onKeyPress={this.handleKeyPress}/>
      </div>
    )
  }
}
