const {Router} = require('capybara-router');
const history = require('history');
const TITLE = 'Chat';

module.exports = new Router({
  history: history.createBrowserHistory(),
  errorComponent: require('./pages/shared/error-page'),
  routes: [
    {
      isAbstract: true,
      name: 'web',
      uri: '',
      onEnter: () => {
        document.title = TITLE;
      },
      component: require('./pages/shared/layout'),
    },
    {
      name: 'web.home',
      uri: '/',
      onEnter: () => {
        document.title = `Home - ${TITLE}`;
      },
      loadComponent: () => import(
        /* webpackChunkName: "web-home" */
        './pages/home'
      ),
    },
    {
      name: 'not-found',
      uri: '.*',
      component: require('./pages/shared/not-found'),
    },
  ],
});
