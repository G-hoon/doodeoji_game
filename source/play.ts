import './mole';

let time = 60;
let timerId;
let pausedGame = false;

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
      setTimeout(() => {
        switchDisplay('init');
      }, 50);
    }
  }, 100);
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
    }
    contentDiv.appendChild(row);
  }
}

function initialize() {
  const timer = document.querySelector('#timer') as HTMLSpanElement;
  const stopButton = document.querySelector('#end_game') as HTMLButtonElement;
  const playButton = document.querySelector('#play_game') as HTMLButtonElement;
  const pauseButton = document.querySelector('#pause_game') as HTMLButtonElement;
  const resumeButton = document.querySelector('#resume_game') as HTMLButtonElement;

  switchDisplay('init');

  stopButton.onclick = () => {
    clearInterval(timerId);
    time = 0;
    switchDisplay('init');
    timer.textContent = time.toString();
  };
  playButton.onclick = () => {
    timerStart();
    switchDisplay('playing');
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

module.exports = {
  buildTable,
  initialize,
};
