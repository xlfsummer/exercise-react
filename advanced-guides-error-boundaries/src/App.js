import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <ErrorBoundary>
          <BuggyCommponent></BuggyCommponent>
       </ErrorBoundary>
      </div>
    );
  }
}

class ErrorBoundary extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(err){
    return { hasError: true }
  }

  componentDidCatch(error, info){
    console.log("Hello world");
    return true;
  }

  render(){

    if(this.state.hasError){
      return <p>Something went wrong.</p>
    }

    return this.props.children;
  }
}

class BuggyCommponent extends React.Component {
  render(){
    let boolRandom = Math.random() > 0.5;
    if(boolRandom){
      return <p>{(()=>{throw new Error();})()}</p>
    }
    return <p>Every thing goes right</p>
  }
}

export default App;
