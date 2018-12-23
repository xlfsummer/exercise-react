import React from "react";

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <Calculator />
        )
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temperature: 0
        };

        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(temperature){
        this.setState({
            scale: 'c',
            temperature
        })
    }
    handleFahrenheitChange(temperature){
        this.setState({
            scale: 'f',
            temperature
        })
    }

    render(){
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === "c"
            ? temperature
            : tryConvert(temperature, toCelsius);
        const fahrenheit = scale === "f"
            ? temperature
            : tryConvert(temperature, toFahrenheit);

        return (
            <div>
                <TemperatureInput
                    onTeperatureChange={this.handleCelsiusChange}
                    temperature={celsius}
                    scale="c"/>
                <TemperatureInput
                    onTeperatureChange={this.handleFahrenheitChange}
                    temperature={fahrenheit}
                    scale="f"/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        )
    }
}

const scaleNames = {
    c: "Celsuis",
    f: "Fahrenheit"
}

function toCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius){
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)) return "";
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemperatureInput extends React.Component{
    handleChange = e =>{
        this.props.onTeperatureChange(e.target.value)
    }

    render(){
        let temperature = this.props.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[this.props.scale]}:</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange}
                    />
            </fieldset>
        )
    }
}

function BoilingVerdict(props){
    return (
        props.celsius >= 100
        ? <p>The water would boil.</p>
        : <p>The water would not boil.</p>
    )
}
