import './assets/index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configureUrlQuery } from 'react-url-query';
import App from './components/App';
import Renderer from './components/Renderer';
import history from './history';
import registerServiceWorker from './registerServiceWorker';
var params = new URL(document.location.href).searchParams;
if (params.get('__render__') !== '1') {
    // link the history used in our app to url-query so it can update the URL with it.
    configureUrlQuery({ history: history });
    ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
    registerServiceWorker();
    // server rendering mode
}
else {
    ReactDOM.render(React.createElement(Renderer, null), document.body);
}
//# sourceMappingURL=index.js.map