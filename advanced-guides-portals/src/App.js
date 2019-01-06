import React, { Component } from 'react';
import Model from "./Model.js";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModel: false,
      modelContent: "Lorem ipsum"
    }
  }
  render() {
    return (
      <div className="App">
        { this.state.showModel &&
          <div onClick={e => {
            // Portal 内的事件冒泡到 portal 外部
            this.setState({
              modelContent: this.state.modelContent.concat("\nclicked")
            })
          }}>
            <Model>
              {this.state.modelContent}
            </Model>
          </div>
        }
        <label>
          <input type="checkbox"
            value={this.state.showModel}
            onChange={e => this.setState({showModel: e.target.checked})}/>
            show model
        </label>
      </div>
    );
  }
}

export default App;
