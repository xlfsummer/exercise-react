import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value === null ? "" : props.value ? props.player1 : props.player2}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        player1={this.props.player1}
        player2={this.props.player2}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      nextTurn: true
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    let squares = history[history.length - 1].squares.slice();
    let turn = this.state.nextTurn;
    if (squares[i] !== null) return;
    squares[i] = turn;
    this.setState({
      history: history.concat([{squares: squares}]),
      nextTurn: !turn,
      stepNumber: history.length
    });
  }

  jumpTo(move){
    this.setState({
      stepNumber: move,
      nextTurn: !(move % 2)
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if(winner == null){
      status = `Next player: ${this.state.nextTurn ? this.props.player1 : this.props.player2}`;
    } else {
      status = `Winner is ${winner ?  this.props.player1 : this.props.player2}`
    }

    const moves = history.map((step, move)=>{
      const desc = move
        ? "Go to move #" + move
        : "Go to game start";
      return (
        <li key={move}>
          {
            move === this.state.stepNumber
            ? <button onClick={()=>this.jumpTo(move)}><strong>{desc}</strong></button>
            : <button onClick={()=>this.jumpTo(move)}>{desc}</button>
          }
        </li>
      );
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            player1={this.props.player1}
            player2={this.props.player2}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/** @param {boolean[]} squares*/
function calculateWinner(squares) {
  let situations = [
    // ---
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // |||
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // \/
    [0, 4, 8],
    [2, 4, 6]
  ];

  return situations.some(st => st.every(pos => squares[pos] === true))
    ? true
    : situations.some(st => st.every(pos => squares[pos] === false))
    ? false
    : null;
}

// ========================================

ReactDOM.render(<Game player1="A" player2="B" />, document.getElementById("root"));
