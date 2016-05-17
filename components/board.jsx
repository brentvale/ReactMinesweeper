var React = require('react');
var Tile = require('./tile.jsx').Tile;
var Heading = require('./heading.jsx').Heading;

var Board = React.createClass({
  render: function(){
    var grid = this.props.board.grid;
    var that = this;
    
    return(
      <div className="container">
      
        <Heading />
      
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