var React = require('react');
var Leaderboard = require('./leaderboard.jsx').Leaderboard;

var Modal = React.createClass({
  handleClick: function(){
    this.props.restartGame();
  },
  render: function(){
    var leaderboard = this.props.won ? <Leaderboard leaders={this.props.leaders}/> : "";
    return(
      <div>
        <div className="modal centerBlock">
          <p className="modalText">{this.props.modalText}</p>
          <button onClick={this.handleClick} >Replay!</button>
          {leaderboard}
        </div>
        <div className="backgroundOverlay">
        </div>
      </div>
    )
  }
});

module.exports = {
  Modal: Modal
}