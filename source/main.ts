const validationErrorMessage = {
  row: {
    required: '행 값을 입력해주세요.',
    min: '행 값은 2보다 크거나 같아야 합니다.',
    max: '행 값은 6보다 작거나 같아야 합니다.',
  },
  cell: {
    required: '열 값을 입력해주세요.',
    min: '열 값은 2보다 크거나 같아야 합니다.',
    max: '열 값은 6보다 작거나 같아야 합니다.',
  },
  mole: {
    required: '두더지 값을 입력해주세요.',
    min: '두더지 값은 1보다 크거나 같아야 합니다.',
    max: '두더지 값은 18보다 작거나 같아야 합니다.',
    rangeViloation(validMoleCount: number): string {
      return `두더지 값을 잘 못 입력하셨습니다. '\n ${validMoleCount}마리 미만 이어야 합니다.`;
    },
  },
};

const formData = (form): {[prop: string]: string} => {
  const inputs = form.querySelectorAll('input');
  const values: {[prop: string]: string} = {};

  inputs.forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
};

const validateMoleCount = (form): boolean => {
  let valid = true;
  const mole = form.querySelector('#mole');
  const row = form.querySelector('#row');
  const cell = form.querySelector('#cell');
  const moleErrorPanel = form.querySelector('#moleError') as HTMLDivElement;
  const rowErrorPanel = form.querySelector('#rowError') as HTMLSpanElement;
  const cellErrorPanel = form.querySelector('#cellError') as HTMLSpanElement;
  moleErrorPanel.textContent = '';
  rowErrorPanel.textContent = '';
  cellErrorPanel.textContent = '';
  const validMoleCount = Math.round(Number(row.value * cell.value) / 2);

  if (row.value.length === 0) {
    valid = false;
    rowErrorPanel.textContent = validationErrorMessage.row.required;
  } else if (Number(row.value) < 2) {
    valid = false;
    rowErrorPanel.textContent = validationErrorMessage.row.min;
  } else if (Number(row.value) > 6) {
    valid = false;
    rowErrorPanel.textContent = validationErrorMessage.row.max;
  }

  if (cell.value.length === 0) {
    valid = false;
    cellErrorPanel.textContent = validationErrorMessage.cell.required;
  } else if (Number(cell.value) < 2) {
    valid = false;
    cellErrorPanel.textContent = validationErrorMessage.cell.min;
  } else if (Number(cell.value) > 6) {
    valid = false;
    cellErrorPanel.textContent = validationErrorMessage.cell.max;
  }

  if (mole.value.length === 0) {
    valid = false;
    moleErrorPanel.textContent = validationErrorMessage.mole.required;
  } else if (Number(mole.value) < 1) {
    valid = false;
    moleErrorPanel.textContent = validationErrorMessage.mole.min;
  } else if (Number(mole.value) > 18) {
    valid = false;
    moleErrorPanel.textContent = validationErrorMessage.mole.max;
  } else if (row.value.length !== 0 && cell.value.length !== 0
             && validMoleCount <= Number(mole.value)) {
    valid = false;
    moleErrorPanel.innerText = validationErrorMessage.mole.rangeViloation(validMoleCount);
  }

  return valid;
};

export {
  formData,
  validateMoleCount,
};
