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

