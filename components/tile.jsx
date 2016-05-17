var React = require('react');

var Tile = React.createClass({
  handleClick: function(e){
    var flagged = e.altKey ? true : false;
    this.props.updateGame(this.props.tile, flagged);
  },
  render: function(){
    var tile = this.props.tile;
    var klass, text, count, colorClass;
    
    
    if (tile.explored) {
      if (tile.bombed) {
        klass = 'bombed';
        text = "\u2622";
      } else {
        klass = 'explored';
        count = tile.adjacentBombCount();
        text = (count > 0 ? count + " " : "  ")
        //colors for number of neighbors
        klass = klass + " color" + count;
      }
    } else if (tile.flagged) {
      klass = 'flagged';
      text = "\u2691"
    } else {
      klass = 'unexplored';
    }
    
    klass = 'tile ' + klass + ' centerBlock';
    
    return(
      
        <div className={klass} onClick={this.handleClick}>
          <p>{text}</p>
        </div>
 
    )
  }
});

module.exports = {
  Tile: Tile
}