import './mole';

let score = 0;
let time = 60;
let timerId;
let tickId;
let pausedGame = false;
let moles: number = 0;
const holes: number[] = [];

function getRandomValueWithRange(minValue, maxValue) {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function switchMole(status: 'show' | 'hide', cell) {
  const singleMole = cell.querySelector('.mole') as HTMLDivElement;
  const holeFront = cell.querySelector('.hole_front') as HTMLDivElement;
  const holeEmpty = cell.querySelector('.hole') as HTMLDivElement;
  holeFront.style.display = 'block';
  holeEmpty.style.display = 'none';
  if (status === 'show') {
    singleMole.classList.add('hidden');
    // ToDo: For natural change of image after mole hidden or displayed
    // holeFront.style.display = 'none';
    // holeEmpty.style.display = 'block';
  } else {
    singleMole.classList.remove('hidden');
    // holeFront.style.display = 'block';
    // holeEmpty.style.display = 'none';
  }
}

function switchDisplay(status: 'init' | 'playing') {
  const playingDiv = document.querySelector('#playing') as HTMLDivElement;
  const initDiv = document.querySelector('#init') as HTMLDivElement;
  if (status === 'init') {
    playingDiv.style.display = 'none';
    initDiv.style.display = 'block';
  } else if (status === 'playing') {
    playingDiv.style.display = 'block';
    initDiv.style.display = 'none';
  }
}

function catchMole(cells) {
  const scoreDiv = document.querySelector('#score') as HTMLSpanElement;

  cells.forEach((cell, index) => {
    cell.querySelector('.mole').addEventListener('click', (event) => {
      if (!event.target.classList.contains('dead')) {
        score += 1;
        scoreDiv.textContent = score.toString();
      }
      event.target.classList.add('dead');
      event.target.classList.add('hidden');
      clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
      setTimeout(() => {
        holes[index] = 0;
        event.target.classList.remove('dead');
      }, 1000);
    });
  });
}

function generateRandomMoles(cells) {
  tickId = setInterval(() => {
    if (!pausedGame) {
      holes.forEach((hole, index) => {
        if (hole) return;
        const randomValue = getRandomValueWithRange(0, holes.length);
        if (randomValue < moles) {
          // ToDo: 가끔씩 예상보다 더 많은 두더지가 나타나는 이슈
          setTimeout(() => {
            switchMole('show', cells[index]);
            holes[index] = 0;
          }, 1000);
          switchMole('hide', cells[index]);
        }
      });
    }
  }, 1000);
}

function timerStart() {
  const timer = document.querySelector('#timer') as HTMLSpanElement;
  time = 60;
  timerId = setInterval(() => {
    if (!pausedGame) {
      time = (time * 10 - 1) / 10;
      timer.textContent = time.toString();
    }
    if (time === 0) {
      clearInterval(timerId);
      clearInterval(tickId);
      setTimeout(() => {
        switchDisplay('init');
      }, 50);
    }
  }, 100);
}

function initialize() {
  const cells = document.querySelectorAll('.cell');
  const timer = document.querySelector('#timer') as HTMLSpanElement;
  const stopButton = document.querySelector('#end_game') as HTMLButtonElement;
  const playButton = document.querySelector('#play_game') as HTMLButtonElement;
  const pauseButton = document.querySelector('#pause_game') as HTMLButtonElement;
  const resumeButton = document.querySelector('#resume_game') as HTMLButtonElement;

  switchDisplay('init');

  stopButton.onclick = () => {
    clearInterval(timerId);
    clearInterval(tickId);
    time = 0;
    switchDisplay('init');
    timer.textContent = time.toString();
  };
  playButton.onclick = () => {
    timerStart();
    switchDisplay('playing');
    generateRandomMoles(cells);
    catchMole(cells);
    resumeButton.style.display = 'none';
    pauseButton.style.display = 'block';
  };
  pauseButton.onclick = () => {
    pausedGame = true;
    resumeButton.style.display = 'block';
    pauseButton.style.display = 'none';
  };
  resumeButton.onclick = () => {
    pausedGame = false;
    resumeButton.style.display = 'none';
    pauseButton.style.display = 'block';
  };
}

function buildTable(data: any) {
  const contentDiv = document.querySelector('#game_screen') as HTMLDivElement;
  const rowLength: number = data.row;
  const colLength: number = data.cell;

  for (let index = 0; index < rowLength; index += 1) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < colLength; j += 1) {
      const mole = document.createElement('mole-object');
      row.appendChild(mole);
      holes.push(0);
    }
    contentDiv.appendChild(row);
  }

  initialize();
  moles = data.mole;
}

module.exports = {
  buildTable,
};
