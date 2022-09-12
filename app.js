"use strict";

const playerFactory = (sign) => {
  const _sign = sign;

  const getSign = () => {
    return _sign;
  };

  return { getSign };
};

const gameBoard = (function () {
  const _boardArray = ["", "", "", "", "", "", "", "", ""];

  const addToBoardArray = (sign, index) => {
    _boardArray.splice(index, 1, sign);
  };

  const getBoardArray = () => {
    return _boardArray;
  };

  const reset = () => {
    for (let i = 0; i < _boardArray.length; i++) {
      _boardArray[i] = "";
    }
  };

  return { addToBoardArray, getBoardArray, reset };
})();

const displayController = (function () {
  const board = document.querySelector(".board");
  const resetBtn = document.querySelector(".reset-btn");
  const winMsg = document.querySelector(".win-msg p");
  const boardCells = document.querySelectorAll(".board-cell");

  board.addEventListener("click", (e) => {
    const cellIndex = parseInt(e.target.getAttribute("data-index"));

    gameController.playRound(cellIndex);
  });

  resetBtn.addEventListener("click", () => {
    gameController.reset();
    displayController.reset();
    gameBoard.reset();
  });

  const displaySignOnBoard = (sign, cellIndex) => {
    document.querySelector(`[data-index="${cellIndex}"]`).textContent = sign;
  };

  const reset = () => {
    boardCells.forEach((cell) => {
      cell.textContent = "";
    });

    winMsg.parentElement.style.display = "";
  };

  const displayWinner = (playerSign) => {
    winMsg.parentElement.style.display = "block";
    winMsg.textContent = `Player ${playerSign} won`;
  };

  const displayDraw = () => {
    winMsg.parentElement.style.display = "block";
    winMsg.textContent = `Draw!`;
  };

  return { displaySignOnBoard, displayWinner, reset, displayDraw };
})();

const gameController = (function () {
  const _PlayerOne = playerFactory("X");
  const _PlayerTwo = playerFactory("O");

  let _round = 1;
  let _playerSign;
  let _gameDone = false;

  const playRound = (cellIndex) => {
    if (gameBoard.getBoardArray()[cellIndex] || _gameDone) {
      return;
    } else {
      if (_round % 2 === 0) {
        _playerSign = _PlayerTwo.getSign();
      } else {
        _playerSign = _PlayerOne.getSign();
      }

      _round += 1;

      gameBoard.addToBoardArray(_playerSign, cellIndex);
      displayController.displaySignOnBoard(_playerSign, cellIndex);

      if (_getWinner(cellIndex, _playerSign)) {
        _gameDone = true;
        displayController.displayWinner(_playerSign);
      } else if (_round === 10) {
        displayController.displayDraw();
      }
    }
  };

  const _getWinner = (cellIndex, playerSign) => {
    const _winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //finds the combination possible for the player choose cell and returns true if all index are same sign
    return _winConditions
      .filter((combination) => combination.includes(cellIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getBoardArray()[index] === playerSign
        )
      );
  };

  const reset = () => {
    _round = 1;
    _gameDone = false;
  };
  return { playRound, reset, _round };
})();
