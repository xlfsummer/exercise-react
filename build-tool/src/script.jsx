let container = document.getElementById("app");

class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            timerID: null
        }
    }

    componentDidMount(){
        this.state.timerID = setInterval(() => this.tick(), 1e3);
    }

    componentWillUnmount(){
        clearInterval(this.state.timerID);
    }

    tick(){
        this.setState({ date: new Date() });
    }

    render(){
       return(
            <div>
                <h1>Hello World {
                    Array(5).fill(0).flatMap((_,i)=>[<span>{i}</span>, ","]).slice(0, -1)
                }</h1>
                <span>{this.state.date.toLocaleString()}</span>
            </div>
       );
    }
}

ReactDOM.render(<div><Clock/><Clock/></div>, container);
