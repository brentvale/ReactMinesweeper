var React = require('react');

var Leaderboard = React.createClass({

  render: function(){
    this.props.leaders.sort(function(a, b){
      if(a.time > b.time){
        return 1;
      }
      if(a.time < b.time){
        return -1;
      }
      return 0;
    });
    
    return(
      <div>
        <h3>CHAMPIONS</h3>
        <ul className={"modalLeaderboard"}>
          {this.props.leaders.map(function(leader, idx){
            return <li key={idx}>{leader.name} | {leader.time}</li>
          })}
        </ul>
      </div>
    )
  }
})

module.exports = {
  Leaderboard: Leaderboard
}