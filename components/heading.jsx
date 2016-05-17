var React = require('react');

var Heading = React.createClass({
  
  render: function(){
    return(
      <div>
        <img src={"../images/minesweeper_text.png"} alt="Minesweeper" className="centerBlock"/>
        <div className="headingText centerBlock">
          <p className="instructions"><span>Click</span> on tiles to turn them over.  <span>Alt + Click</span> tiles to place a flag or unplace an already placed flag.</p>
        </div>
      </div>
    )
  }
});

module.exports = {
  Heading: Heading
};