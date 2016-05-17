var React = require('react');

var Modal = React.createClass({
  handleClick: function(){
    this.props.restartGame();
  },
  render: function(){
    return(
      <div>
        <div className="modal centerBlock">
          <p className="modalText">{this.props.modalText}</p>
          <button onClick={this.handleClick} >Replay!</button>
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