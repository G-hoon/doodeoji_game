const formData = (form) => {
  const inputs = form.querySelectorAll('input');
  const values: {[prop: string]: string} = {};

  inputs.forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
};

const validateMoleCount = (form) => {
  const mole = form.querySelector('#mole');
  const row = form.querySelector('#row');
  const col = form.querySelector('#cell');
  const validMoleCount = Math.floor(Number(row.value * col.value) / 2);

  if (Number(mole.value) === 0) {
    setTimeout(() => {
      alert(`두더지 숫자를 입력하셔야 합니다.`);
    }, 50);
    return false;
  }
  if (validMoleCount < Number(mole.value)) {
    alert(`두더지 숫자를 잘 못 입력하셨습니다. ${validMoleCount} 마리 미만 이어야 합니다.`);
    return false;
  }
  return true;
};

module.exports = {
  formData,
  validateMoleCount,
};
