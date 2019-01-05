import React, { Component } from 'react';
import './App.css';

import LogHoc from "./LogHoc.js";


const  P= React.forwardRef((props, ref)=>{
  return <p ref={ref} {...props}/>
})

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pRef: React.createRef()
    }
  }
  render() {
    let LogedP = LogHoc(P);
    let add = { [Symbol("symbol")]: "symbol", prop: "prop" }
    return (
      <div className="App">
        <LogedP ref={this.state.pRef} {...add}>Hello world</LogedP>
      </div>
    );
  }
}


// function P(props){
//   return <p {...props} />
// }

export default App;
