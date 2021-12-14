const board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const boardElement = document.getElementById("board");

for (let i = 0; i < board.length; i += 1) {
  let elementRow = `<div class="row-${i} rows">`;
  let elementItem = "";

  for (let j = 0; j < board[i].length; j += 1) {
    elementItem += `<div class="column-${j} unit"></div>`;
  }
  elementRow += elementItem;
  elementRow += "</div>";

  boardElement.innerHTML += elementRow;
}
//
class Game {
  constructor() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.player1 = "player one";
    this.player2 = "player two";
  }

  move(player, column) {
    for (let i = this.board.length - 1; i >= 0; i -= 1) {
      const element = this.board[i];
      console.log(element);
      if (element[column] === 0) {
        element[column] = player;
        const lineWin = this.checkLine(i, player);
        const columnWin = this.checkColumn(column, player);
       if (lineWin || columnWin) {
           console.log(`${player} ganhou`)
       } 
       return i;
      
      }
    }
  }

  checkLine(line, player) {
    let count = 0;

    for (const element of this.board[line]) {
      if (element === player) {
        count += 1;
      } else if (element !== player && count < 4) {
        count = 0;
      }
    }
    console.log(count);
    if (count >= 4) {
      return true;
    }else{
        return false;
    }
  }

  checkColumn(column, player){
    let count = 0;
    for (const element of this.board) {
      if (element[column] === player) {
        count += 1;
      } else if (element[column] !== player && count < 4) {
        count = 0;
      }
    }
    console.log(count);
    if (count >= 4) {
        return true;
    }else{
        return false;
  }
}
}
const game = new Game();
const pieces = document.getElementsByClassName('unit');
[...pieces].forEach((piece)=>{
    piece.onclick = (event)=>{
        let currentColumn = event.target.classList[0].split("-")[1];
        let line = game.move(game.player1, currentColumn);
        let row = document.querySelector(`.row-${line}`);
        console.log(row);
        let unit = row.querySelector(`.column-${currentColumn}`);
        unit.classList.add('player1');
    }
});


