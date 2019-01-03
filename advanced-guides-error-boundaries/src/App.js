import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <ErrorBoundary>
          <A></A>
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

  static getDerivedStateFromError(){
    debugger;
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

class A extends React.Component {
  render(){

    throw new Error();

    return <p>Lorem ipsum</p>
  }
}

export default App;
