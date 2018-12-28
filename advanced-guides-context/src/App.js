import React, { Component } from 'react';
import './App.css';


let ThemeContext = React.createContext({
  foregroundColor: "#666",
  backgroundColor: "#eee"
});

class App extends Component {
  render() {
    return (
      <div className="App">
       <ThemeContext.Provider value={{
        backgroundColor: "alice",
        foregroundColor: "crimson"
       }}>
        <Toolbar/>
       </ThemeContext.Provider>
      </div>
    );
  }
}

function Toolbar(props){
  return (
    <>
      <ThemeButton>主题按钮</ThemeButton>
      <ThemeList data={["1", "2", "3", "4"]} />
      <ThemeContext.Consumer>
        {theme => 
          <p style={{ color: theme.foregroundColor }}>A paragragh text in theme color using <code>&lt;Context.prototype.Consumer&gt;</code></p>
        }
      </ThemeContext.Consumer>
    </>
  );
}


class ThemeButton extends React.Component{
  static contextType = ThemeContext;
  render(){
    return <button style={{
      color: this.context.foregroundColor,
      backgroundColor: this.context.backgroundColor,
      borderColor: this.context.foregroundColor,
      borderStyle: "solid"
    }}
      children={this.props.children}
      />
  }
}

class ThemeList extends React.Component{
  static contextType = ThemeContext;
  render(){
    return <ul style={{
      color: this.context.foregroundColor
    }}> { this.props.data.map((n,i) => <li key={i}>{n}</li>) } </ul>
  }
}

export default App;
