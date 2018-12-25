// import React, { Component } from 'react';

import { default as React, Component } from 'react';
import './App.css';

let DataView = React.lazy(() => import("./DataView.js"));

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Suspense fallback={
          <div>少女祈祷中...</div>
        }>
          <DataView title="传入异步组件的属性"></DataView>
        </React.Suspense>
      </div>
    );
  }
}

export default App;
