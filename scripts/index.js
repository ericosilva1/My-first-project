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
    this.player1 = "player1";
    this.player2 = "player2";
    this.activePlayer = this.player1;
    this.result = document.getElementById("result");
    this.endGame = false;
  }

  move(column) {
    for (let i = this.board.length - 1; i >= 0; i -= 1) {
      const element = this.board[i];
      console.log(element);
      if (element[column] === 0) {
        element[column] = this.activePlayer;
        const lineWin = this.checkLine(i, this.activePlayer);
        const columnWin = this.checkColumn(column, this.activePlayer);
        if (lineWin || columnWin) {
          this.result.innerHTML = `E o vencedor é o ${this.activePlayer}`;
          console.log(`${this.activePlayer} ganhou`);
          this.endGame = true;
        }
        if (this.activePlayer === this.player1) {
          this.activePlayer = this.player2;
        } else {
          this.activePlayer = this.player1;
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
    } else {
      return false;
    }
  }

  checkColumn(column, player) {
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
    } else {
      return false;
    }
  }
}
let game = new Game();
const pieces = document.getElementsByClassName("unit");
[...pieces].forEach((piece) => {
  piece.onclick = (event) => {
    if (!game.endGame) {
      let currentColumn = event.target.classList[0].split("-")[1];
      let currentPlayer = game.activePlayer;
      let line = game.move(currentColumn);
      let row = document.querySelector(`.row-${line}`);
      console.log(row);
      let unit = row.querySelector(`.column-${currentColumn}`);
      unit.classList.add(currentPlayer);
      const whoPlay = document.getElementById("player-active");
      whoPlay.innerHTML = game.activePlayer.toLocaleUpperCase();
    }
  };
});

const reset = () => {
  const pieces = document.getElementsByClassName("unit");
  [...pieces].forEach((piece) => {
    piece.classList.remove("player1");
    piece.classList.remove("player2");
  });

  game = new Game();
  const whoPlay = document.getElementById("player-active");
  whoPlay.innerHTML = game.activePlayer.toLocaleUpperCase();

  const result = document.getElementById("result");
  result.innerHTML = "Vamos lá!!!";
};

const resetBtn = document.getElementById("reset");
resetBtn.onclick = () => {
  reset();
};
