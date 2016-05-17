var React = require('react');
var Board = require('./board.jsx').Board;
var Minesweeper = require('../minesweeper');
var Modal = require('./modal.jsx').Modal;

var BOMB_COUNT = 10;

var Game = React.createClass({
  getInitialState: function(){
    var board = new Minesweeper.Board({gridSize: 10, numBombs: BOMB_COUNT});
    return {board: board, moves: 0, startTimer: null, bombsRemaining: BOMB_COUNT,
            leaders: [{name: "brent", time:"01:21"},{name: "leslie", time:"00:46"},{name: "russel", time:"00:21"}]}
  },
  checkForWinner: function(){
    //add new winner to client side leaderboard
    var leadersArray = this.state.leaders;
    
    if(this.state.board.won()){
      var timeStringified = this.stringifyTime((new Date() - this.state.startTimer)/1000);
      var newestWinner = {name: "you", time: timeStringified};
      leadersArray.push(newestWinner);
    }
    
    return leadersArray;
  },
  stringifyTime: function(time){
    var seconds = parseInt(time % 60);
    var minutes = parseInt(time / 60);
    
    var secondsString = (seconds < 10) ? ("0" + seconds) : ("" + seconds);
    var minutesString = (minutes < 10) ? ("0" + minutes) : ("" + minutes);
    
    var clockString = minutesString + ":" + secondsString;
    
    return clockString;
  },
  updateGame:function(tile, flagged){
    //flagged refers to the users input including Alt
    
    var startTimer = (this.state.moves == 0) ? new Date() : this.state.startTimer;
    var newMovesState = this.state.moves + 1;
    //returns num of flags on current board, must also add in if the move that caused
    //this updateGame is a flagged
    var totalFlagged = this.state.board.flagTotal();
    
    if(flagged){
      //if tile is already flagged and user is flagging again, it unflags so reduce flag count
      totalFlagged = tile.flagged ? totalFlagged - 1 : totalFlagged + 1;
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    var leaders = this.checkForWinner();
    this.setState({ board:this.state.board, 
                    moves: newMovesState, 
                    startTimer: startTimer, 
                    bombsRemaining: BOMB_COUNT - totalFlagged,
                    leaders: leaders});
  },
  restartGame: function(){
    var board = new Minesweeper.Board({gridSize: 10, numBombs: BOMB_COUNT});
    this.setState({board: board, moves: 0, startTimer: null, bombsRemaining: BOMB_COUNT, leaders:this.state.leaders});
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
    
    var modal = displayModal ? <Modal modalText={modalText} 
                                      restartGame={this.restartGame} 
                                      won={won} 
                                      startTimer={this.state.startTimer}
                                      leaders={this.state.leaders}/> : "";
    
    return(
      <div>
        {modal}
        <Board  board={this.state.board} 
                updateGame={this.updateGame} 
                startTimer={this.state.startTimer} 
                bombsRemaining={this.state.bombsRemaining}/>
      </div>
    )
  }
  
});

module.exports = {
  Game: Game
};