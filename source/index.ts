import { formData, validateMoleCount } from './main';
import buildTable from './play';
import { initialRoutes, historyRouterPush } from './router';
import './style.css';

// app division
const contentDiv = document.querySelector('#root') as HTMLDivElement;

// Browser History
initialRoutes(contentDiv);

function routing() {
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
        routing();
      }
      if (pathName === '/main') {
        historyRouterPush(contentDiv, pathName);
        routing();
      }
    });
  });
}

window.onload = () => {
  routing();
};
