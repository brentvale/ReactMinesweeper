var React = require('react');
var Tile = require('./tile.jsx').Tile;

var Board = React.createClass({
  render: function(){
    var grid = this.props.board.grid;
    var that = this;
    
    return(
      <div>
        {grid.map(function(row, idx){
          return (
            <div key={idx}>
              {
                row.map(function(tile, jdx){
                  return (<Tile key={idx * that.props.board.gridSize + jdx} tile={tile} updateGame={that.props.updateGame}/>);
                })
              }
            </div>
          )
        })}
      </div>
    )
  }
});

module.exports = {
  Board: Board
}