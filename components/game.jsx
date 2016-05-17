var React = require('react');
var Board = require('./board.jsx').Board;
var Minesweeper = require('../minesweeper');
var Modal = require('./modal.jsx').Modal;

var Game = React.createClass({
  getInitialState: function(){
    var board = new Minesweeper.Board({gridSize: 10, numBombs: 10});
    return {board: board}
  },
  updateGame:function(tile, flagged){
    if(flagged){
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    this.setState({board:this.state.board});
  },
  restartGame: function(){
    var board = new Minesweeper.Board({gridSize: 10, numBombs: 10});
    this.setState({board: board});
  },
  render: function(){
    var lost = this.state.board.lost();
    var won = this.state.board.won();
    var displayModal = false;    
    
    if(lost){
      var modalText = "Sorry, you lost.  Click to start a new game.";
      displayModal = true;
    }
    if(won){
      var modalText = "CONGRATULATIONS, you won!!!.  Click to start a new game.";
      displayModal = true;
    }
    
    var modal = displayModal ? <Modal modalText={modalText} restartGame={this.restartGame}/> : "";
    
    return(
      <div>
        {modal}
        <Board board={this.state.board} updateGame={this.updateGame} />
      </div>
      
    )
  }
  
});

module.exports = {
  Game: Game
};