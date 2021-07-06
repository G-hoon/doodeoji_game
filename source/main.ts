const formData = (form) => {
  const inputs = form.querySelectorAll('input');
  const values: {[prop: string]: string} = {};

  inputs.forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
};

export default formData;