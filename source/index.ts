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
      const getEvent = event.currentTarget as HTMLInputElement;
      const pathName = getEvent.getAttribute('route');
      const form = document.querySelector('form');
      historyRouterPush(contentDiv, pathName);
      if (pathName === '/play') {
        const gameScreen = document.querySelector('#game_screen');
        buildTable(formData(form), gameScreen);
      }
    });
  });
};

// For global scope issue
// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};
