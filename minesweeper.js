var Tile = function(board, pos) {
  this.board = board;
  this.pos = pos;
  this.bombed = false;
  this.explored = false;
  this.flagged = false;
}

Tile.DELTAS = [[-1, -1], [-1,  0], [-1,  1], [ 0, -1], 
               [ 0,  1], [ 1, -1], [ 1,  0], [ 1,  1]]

Tile.prototype = {
  adjacentBombCount: function(){
    var bombCount = 0;
    this.neighbors().forEach(function(neighbor) {
      if (neighbor.bombed) {
        bombCount++;
      }
    });
    return bombCount;
  },
  explore: function(){
    if (this.flagged || this.explored) { 
      return this;
    }
    this.explored = true;
    if (!this.bombed && this.adjacentBombCount() === 0) {
      this.neighbors().forEach(function(tile) {
        tile.explore();
      });
    }
  },
  neighbors: function(){
    var adjacentCoords = [];
    Tile.DELTAS.forEach(function(delta) {
      var newPos = [delta[0] + this.pos[0], delta[1] + this.pos[1]];
      if (this.board.onBoard(newPos)) {
        adjacentCoords.push(newPos);
      }
    }.bind(this));

    return adjacentCoords.map(function(coord) {
      return this.board.grid[coord[0]][coord[1]]
    }.bind(this));
  },
  plantBomb: function(){
    this.bombed = true;
  },
  toggleFlag: function(){
    if (!this.explored) {
      this.flagged = !this.flagged;
      return true;
    }

    return false;
  }
};

var Board = function(options) {
  this.gridSize = options.gridSize;
  this.grid = [];
  this.numBombs = options.numBombs;
  this.generateBoard();
  this.plantBombs();
};

Board.prototype = {
  generateBoard: function(){
    for (var i = 0; i < this.gridSize; i++) {
      this.grid.push([]);
      for (var j = 0; j < this.gridSize; j++) {
        var tile = new Tile(this, [i, j]);
        this.grid[i].push(tile);
      }
    }
  },
  onBoard: function(pos){
    return (
      pos[0] >= 0 && pos[0] < this.gridSize && 
        pos[1] >= 0 && pos[1] < this.gridSize
    )
  },
  plantBombs: function(){
    var totalPlantedBombs = 0;
    while (totalPlantedBombs < this.numBombs) {
      var row = Math.floor(Math.random() * (this.gridSize - 1));
      var col = Math.floor(Math.random() * (this.gridSize - 1));

      tile = this.grid[row][col];
      if (!tile.bombed) {
        tile.plantBomb();
        totalPlantedBombs++;
      }
    }
  },
  lost: function(){
    var lost = false;
    this.grid.forEach(function(row) {
      row.forEach(function(tile) {
        if (tile.bombed && tile.explored) {
          lost = true;
        }
      });
    });
    return lost;
  },
  won: function (){
    var won = true;
    this.grid.forEach(function(row) {
      row.forEach(function(tile) {
        if (tile.flagged === tile.revealed || tile.flagged !== tile.bombed) {
          won = false;
        }
      });
    });
    return won;
  }
};

module.exports = {
  Board: Board,
  Tile: Tile
};