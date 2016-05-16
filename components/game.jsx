var React = require('react');
var Board = require('./board.jsx').Board;
var Minesweeper = require('../minesweeper');

var Game = React.createClass({
  getInitialState: function(){
    return {board: new Minesweeper.Board({gridSize: 10, numBombs: 10})}
  },
  updateGame:function(){
    
  },
  render: function(){
    return(
      <Board board={this.state.board} updateGame={this.updateGame} />
    )
  }
  
});

module.exports = {
  Game: Game
};