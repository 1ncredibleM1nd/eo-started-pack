import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import 'mobx-react/batchingForReactDom';
/** TODO:зарефакторить иконки */
import '@images/icons/index';
import './styles/index.scss';
import './styles/ant/index.scss';
import * as stores from '@stores/implementation';
import { Provider } from 'mobx-react';


ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>, document.getElementById('root')
);
