"use strict";

const playerFactory = (sign) => {
  const _sign = sign;

  const getSign = () => {
    return _sign;
  };

  return { getSign };
};
