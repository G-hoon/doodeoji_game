import './mole';

let time = 60;

function timerStart() {
  const timerId = setInterval(() => {
    const timer = document.querySelector('#timer') as HTMLSpanElement;
    time = (time * 10 - 1) / 10;
    timer.textContent = time.toString();
    if (time === 0) {
      clearInterval(timerId);
      setTimeout(() => {
        alert(`게임 오버!`);
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

  timerStart();
}

module.exports = {
  buildTable,
};
