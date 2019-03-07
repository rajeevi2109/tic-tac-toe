import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board/board';
import Cell from './cell/cell';
import Settings from './settings/settings';

const combinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

class App extends Component {
  state = {
    keys: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    indexes: [],
    activePlayer: '',
    gameOver: false,
    winningPlayer: ''
  }
  cellClick(index) {
    if(!this.state.gameOver && this.state.activePlayer) {
      if(this.state.keys[index]) return;
      let oldValue = this.state.keys;
      oldValue[index] = this.state.activePlayer;
      let activePlayer = '';
      if(this.state.activePlayer === 'X') {
        activePlayer = 'O'
      } else {
        activePlayer = 'X'
      }
      const indexes = this.state.indexes;
      indexes.push(index);
      this.setState({
        keys: oldValue,
        activePlayer,
        indexes
      })
      this.checkForWin();
    }
  }
  checkForWin() {
    const {keys} = this.state;
    const combinedKeysX = 'XXX';
    const combinedKeysO = 'OOO';
    for (const item of combinations) {
      const combined = item.map(combination=>{
        return keys[combination];
      }).join('');
      const xMatch = combinedKeysX === combined;
      const oMatch = combinedKeysO === combined;
      if( xMatch||oMatch ) {
        this.setState({
          gameOver: true,
          winningPlayer: xMatch ? 'X' : oMatch ? 'O' : ''
        })
      } else {
        const allDone = keys.filter(item=>item === null);
        if(allDone.length === 0) {
          this.setState({
            gameOver: true,
            winningPlayer: 'tie'
          })
        }
      }
    }
  }
  componentDidUpdate() {
    if(this.state.gameOver && this.state.winningPlayer) {
      setTimeout(()=>{
        if(this.state.winningPlayer === 'tie') {
          alert('Game Tie');
        } else {
          alert(`Player ${this.state.winningPlayer} wins`);
        }
      }, 0)
    } else if(this.state.activePlayer) {
      setTimeout(()=>{
        alert(`Player ${this.state.activePlayer} turn`);
      }, 0)
    }
  }
  startGame(event) {
    if(!this.state.gameOver) {
      if(this.state.activePlayer){
        alert(`Player ${event} turn`);
      }
      this.setState({
        activePlayer: event
      })
    }
  }
  resetGame() {
    this.setState({
      gameOver: false,
      activePlayer: '',
      keys: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    })
  }
  undo() {
    let {indexes, keys} = this.state;
    if(indexes.length) {
      const lastIndex = indexes.pop();
      const value = keys[lastIndex];
      keys[lastIndex] = null;
      this.setState({
        indexes,
        keys,
        activePlayer: value
      })
    }
  }
  render() {
    return (
      <div>
        <Settings
          gameStatus={this.state.gameOver}
          startGame={this.startGame.bind(this)}
          activePlayer={this.state.activePlayer} 
          resetGame={this.resetGame.bind(this)} 
          undo={this.undo.bind(this)} />
        <Board>
          {this.state.keys.map((item, index)=>{
            return <Cell cellClick={this.cellClick.bind(this)} key={index} index={index}>{item}</Cell>
          })}
        </Board>
      </div>
    );
  }
}

export default App;
