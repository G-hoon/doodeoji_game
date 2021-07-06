const mainTemplate = require('./main.html');
const playTemplate = require('./play.html');

const routes = {
  '/': mainTemplate.default,
  '/main': mainTemplate.default,
  '/play': playTemplate.default,
};

// render
const renderHTML = (el: HTMLElement, route: string) => {
  const element = el;
  element.innerHTML = route;
};

// initial entry point
const initialRoutes = (element: HTMLElement) => {
  renderHTML(element, routes['/']);

  window.onpopstate = () => renderHTML(element, routes[window.location.pathname]);
};

// set browser history
const historyRouterPush = (element: HTMLElement, pathName: string) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(element, routes[pathName]);
};

module.exports = {
  initialRoutes,
  historyRouterPush,
};
