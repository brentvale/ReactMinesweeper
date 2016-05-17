var React = require('react');
var Tile = require('./tile.jsx').Tile;
var Heading = require('./heading.jsx').Heading;
var Timer = require('./timer.jsx').Timer;

var Board = React.createClass({

  render: function(){
    var grid = this.props.board.grid;
    var that = this;
    //if user has taken 1 move, create the timer
    var timer = this.props.startTimer ? <Timer startTimer={this.props.startTimer}/> : 
      <div className="clock centerBlock"><p>00:00</p></div>;
    
    return(
      <div className="container">
      
        <Heading bombsRemaining={this.props.bombsRemaining}/>
        {timer}
      
        <div className="board centerBlock">
          {grid.map(function(row, idx){
            return (
              <div className="row centerBlock" key={idx}>
                {
                  row.map(function(tile, jdx){
                    return (<Tile key={idx * that.props.board.gridSize + jdx} 
                                  tile={tile} 
                                  updateGame={that.props.updateGame}/>);
                  })
                }
              </div>
            )
          })}
        </div>
          
      </div>
    )
  }
});

module.exports = {
  Board: Board
}