var React = require('react');

var Tile = React.createClass({
  render: function(){
    
    var klass, text, count;
    if (tile.explored) {
      if (tile.bombed) {
        klass = 'bombed';
        text = "\u2622";
      } else {
        klass = 'explored';
        count = tile.adjacentBombCount();
        text = (count > 0 ? count + " " : "")
      }
    } else if (tile.flagged) {
      klass = 'flagged';
      text = "\u2691"
    } else {
      klass = 'unexplored';
    }
    klass = 'tile ' + klass
    
    
    
    return(
      <div className={klass}>
  
      </div>
    )
  }
});

module.exports = {
  Tile: Tile
}