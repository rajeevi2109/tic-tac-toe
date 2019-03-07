import React, { PureComponent } from 'react';

export default class Settings extends PureComponent {
  state = {
    gamer: ''
  };
  gamerChange(val) {
    this.setState({
      gamer: val
    });
  }
  render() {
    return (
      <div>
        <label>Start Player</label>
        <input
          type="radio"
          name="player"
          value={this.state.gamer}
          id="playerx"
          onChange={this.gamerChange.bind(this, 'X')}
        />
        <label htmlFor="playerx">X</label>
        <input
          type="radio"
          name="player"
          value={this.state.gamer}
          id="playero"
          onChange={this.gamerChange.bind(this, 'O')}
        />
        <label htmlFor="playero">O</label>
        <button
          disabled={this.props.activePlayer ? true : false}
          onClick={() => {
            this.props.startGame && this.props.startGame(this.state.gamer);
          }}>
          Start Game
        </button>
        <button
          onClick={() => {
            this.props.resetGame && this.props.resetGame();
          }}>
          Reset Game
        </button>
        <button onClick={()=>{this.props.undo && this.props.undo()}}>
          Undo
        </button>
      </div>
    );
  }
}
