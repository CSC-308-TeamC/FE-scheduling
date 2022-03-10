import React from 'react';
import Dashboard from './Dashboard';
import './index.css';
import index from './Calendar/index';

import ReactDOM from "react-dom";
import store from './Calendar/store';
//import App from "./App";
import {Provider} from 'react-redux';
//import './Calendar/index.css';
import App from './Calendar/App';
//import Calendar from './Calendar';

// import * as serviceWorker from './Calendar/serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

ReactDOM.render(<Dashboard />, document.getElementById('root'));

//ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));