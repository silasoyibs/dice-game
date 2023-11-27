'use strict';
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const resetBtn = document.querySelector('.btn--new');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scorePlayer1 = document.querySelector('#score--0');
const scoreplayer2 = document.querySelector('#score--1');
const activeplayer = document.querySelector('.player--active');
const playersCurrentScore = document.querySelector('.current-score');
const dice = document.querySelector('.dice');
let player1Active = true;
let player2Active = false;
let current = 0;
let player1score = 0;
let player2score = 0;

function btnClickEvent(button, callBack) {
  button.addEventListener('click', callBack);
}

function clearCurrentScore(currentClass) {
  current = 0;
  document.querySelector(currentClass).textContent = current;
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function addClass(element, className) {
  element.classList.add(className);
}

function currentScore(diceNum, currentClass) {
  current += diceNum;
  document.querySelector(currentClass).textContent = current;
}

const rollDice = function () {
  const diceNum = Math.floor(Math.random() * 6 + 1);
  dice.classList.remove('hidden');
  dice.src = `dice-${diceNum}.png`;

  if (player1Active) {
    currentScore(diceNum, '#current--0');
    if (diceNum === 1) {
      player1score += current;
      scorePlayer1.textContent = player1score;
      clearCurrentScore('#current--0');
      player1Active = !player1Active;
      player2Active = !player2Active;
      removeClass(player1, 'player--active');
      addClass(player2, 'player--active');
      return;
    }
  }
  if (player2Active) {
    currentScore(diceNum, '#current--1', player2, player1, 'player--active');
    if (diceNum === 1) {
      player2score += current;
      scoreplayer2.textContent = current;
      clearCurrentScore('#current--1');
      player1Active = !player1Active;
      player2Active = !player2Active;
      removeClass(player2, 'player--active');
      addClass(player1, 'player--active');
      return;
    }
  }
};

btnClickEvent(rollDiceBtn, rollDice);

const hold = function () {
  if (player1Active) {
    player1score += current;
    scorePlayer1.textContent = player1score;
    clearCurrentScore('#current--0');
    player1Active = !player1Active;
    player2Active = !player2Active;
    if (player1score >= 100) {
      player1.classList.add('player--winner');
      return;
    }
    removeClass(player1, 'player--active');
    addClass(player2, 'player--active');
    return;
  }
  if (player2Active) {
    player2score += current;
    scoreplayer2.textContent = current;
    clearCurrentScore('#current--1');
    player1Active = !player1Active;
    player2Active = !player2Active;
    if (player1score >= 100) {
      player2.classList.add('player--winner');
      return;
    }
    removeClass(player2, 'player--active');
    addClass(player1, 'player--active');
    return;
  }
};

btnClickEvent(holdBtn, hold);

const resetAll = function () {
  function resetEl(parentEl) {
    parentEl.textContent = 0;
  }
  player1Active = true;
  dice.classList.add('hidden');
  resetEl(scorePlayer1);
  resetEl(scoreplayer2);
  resetEl(playersCurrentScore);
};

btnClickEvent(resetBtn, resetAll);
