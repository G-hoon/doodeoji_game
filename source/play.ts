import './mole';

function buildTable(data: any, contentDiv: HTMLDivElement) {
  const rowLength = data.row;
  const colLength = data.cell;

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

module.exports = {
  buildTable,
};
