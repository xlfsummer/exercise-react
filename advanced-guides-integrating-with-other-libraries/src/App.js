import React, { Component } from 'react';
import Chosen from './Chosen.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSelectChange2 = this.handleSelectChange2.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.addOption = this.addOption.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      option: ["aaa", "bbb", "ccc"],
      input: "",
      selectValue: "",
      handleSelectChange: this.handleSelectChange
    }
    this.options = this.state.option.map(x=><option>{x}</option>);
  }
  handleChange(e){
    let v = e.target.value;
    this.setState({ input: v })
  }
  handleSelectChange(e){
    this.setState({selectValue: e.target.value});
  }
  handleSelectChange2(e){
    this.setState({selectValue2: e.target.value});
  }
  changeHandler(){
    if(this.state.handleSelectChange !== this.handleSelectChange2)
    this.setState({
      handleSelectChange: this.handleSelectChange2
    })
  }
  addOption(e){
    let input = this.state.input;
    if(!input) return window.alert("input 不能为空");
    this.setState({
      option: this.state.option.concat(this.state.input),
      input: ""
    })
  }
  componentWillUpdate(newProps, newState){
    if(newState.option !== this.state.option){
      this.options = newState.option.map(x=><option>{x}</option>);
    }
  } 
  render() {
    return (
      <div className="App">
        <Chosen onChange={this.state.handleSelectChange}>{this.options}</Chosen>
        <input value={this.state.input} onChange={this.handleChange} />
        <button onClick={this.addOption}>增加 option</button>
        <p>你选择的是：{this.state.selectValue}</p>
        <p>你选择的是：{this.state.selectValue2}</p>
        <button onClick={this.changeHandler}>改变监听器</button>
      </div>
    );
  }
}

export default App;
