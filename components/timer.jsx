var React = require('react');

var Timer = React.createClass({
  getInitialState: function(){
    var startTime = this.props.startTimer;
    return {elapsed: 0, time: startTime};
  },
  componentDidMount: function(){
    var that = this;
    if(this.props.startTimer){
      this.timeInterval = setInterval(that.updateElapsed, 1000);
    }
  },
  componentWillUnmount: function(){
    clearInterval(this.timeInterval)
  },
  updateElapsed: function(){
    console.log(this.props.startTimer);
    this.setState({elapsed: new Date() - this.state.time});
  },
  stringifyClock: function(time){
    var seconds = parseInt(time % 60);
    var minutes = parseInt(time / 60);
    
    var secondsString = (seconds < 10) ? ("0" + seconds) : ("" + seconds);
    var minutesString = (minutes < 10) ? ("0" + minutes) : ("" + minutes);
    
    var clockString = minutesString + ":" + secondsString;
    
    return clockString;
  },
  render: function(){
    var clockString = this.stringifyClock(this.state.elapsed/1000);
    
    return(
      <div className="clock centerBlock">
        <p>{clockString}</p>
      </div>)
  }
});

module.exports = {
  Timer: Timer
}