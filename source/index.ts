require('./style.css');

const { formData, validateMoleCount } = require('./main');
const { buildTable } = require('./play');
const { initialRoutes, historyRouterPush } = require('./router');

// app division
const contentDiv = document.querySelector('#root');

// Browser History
initialRoutes(contentDiv);

window.onload = () => {
  const historyLinker = document.querySelectorAll('.btn');
  historyLinker.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const getEvent = event.currentTarget as HTMLInputElement;
      const pathName = getEvent.getAttribute('route') as string;
      const form = document.querySelector('#form') as HTMLFormElement;
      if (pathName === '/play') {
        if (!validateMoleCount(form)) {
          return;
        }
        historyRouterPush(contentDiv, pathName);
        buildTable(formData(form));
      }
    });
  });
};

// For global scope issue
// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};
