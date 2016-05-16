var React = require('react');
var ReactDOM = require('react-dom');

var Game = require("./components/game.jsx").Game;

var MyComponent = React.createClass({
  render: function () {
    return(
      <Game />
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});