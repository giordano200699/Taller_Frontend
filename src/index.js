import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Movilidad from './componentesHechos/Movilidad';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Links, Route } from 'react-router-dom';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
   <BrowserRouter>
   		<div>
   			<Route path='/index' component={App} />
   			<Route path='/Movilidad' component={Movilidad} />
   		</div>
   </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
