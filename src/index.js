import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if(__DEV__)
    console.log('Dev version',__DEV__);

ReactDOM.render(<App />, document.getElementById('root'));