import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(prop){
    super(prop)
    this.state = {
      form: {
        name: "",
        gender: "",
        region: "",
        price: ""
      },
      valid: {
        name: true,
        gender: true,
        region: true,
        price: true
      }
    }
  }
  validator = {
    name: v => v !== "" && v.length < 10,
    gender: v => v !== "",
    region: v => v !== "",
    price: v => /^(1\d)(\.\d{0,2})?$/.test(v)
  }
  handelCompositionStart(){
    console.log("composition start");
  }
  handelCompositionEnd(){
    console.log("composition end");
  }
  handelChange = e => {
    console.log("change");
    let input = e.target;
    let valid = this.state.valid;
    valid[input.name] = this.validator[input.name](input.value)
    this.setState({
      form: {...this.state.form, [e.target.name]: e.target.value},
      valid
    })
  }
  handelSubmit = e => {
    e.preventDefault();

    let form = this.state.form;
    let valid = this.state.valid;
    let error = false;

    Object.entries(this.validator).forEach(([name, validFn]) => {
      valid[name] = validFn(form[name]);
    });

    error = !Object.values(valid).every(v => v);

    this.setState({
      valid: valid
    });

    if(!error){
      window.alert("提交成功")      
    }
  }
  componentDidMount(){

  }
  render() {
    return (
      <div className="App">
        <h1>测试表单校验</h1>
        <form onSubmit={this.handelSubmit}>
          <p><label> 姓名 <input type="text" name="name"
            value={this.state.value}
            onCompositionStart={this.handelCompositionStart}
            onCompositionEnd={this.handelCompositionEnd}
            onChange={this.handelChange}/></label></p>
          <p className="error-msg" hidden={this.state.valid.name}>少于10个字，不能为空</p>
          <p>
              性别
              <label><input
                checked={this.state.form.gender === "m"}
                onChange={this.handelChange}
                type="radio"
                value="m"
                name="gender"/>男</label>
              <label><input
                checked={this.state.form.gender === "f"}
                onChange={this.handelChange}
                type="radio"
                value="f"
                name="gender"/>女</label>
          </p>
          <p className="error-msg" hidden={this.state.valid.gender}>请选择</p>
          <p><label>地区
            <select name="region" value={this.state.form.region} onChange={this.handelChange}>
              <option value="">请选择</option>
              <option value="sc">四川</option>
              <option value="cq">重庆</option>
              <option value="sx">山西</option>
              <option value="s'x">陕西</option>
              <option value="yn">云南</option>
            </select>
            </label>
          </p>
          <p className="error-msg" hidden={this.state.valid.region}>请选择</p>
          <p><label> 价格 <input type="text" name="price" value={this.state.form.price} onChange={this.handelChange}/></label></p>
          <p className="error-msg" hidden={this.state.valid.price}>大于等于10，小于20，保留两位小数，不能为空</p>
          <button type="submit">提交</button>
        </form>
      </div>
    );
  }
}

export default App;
