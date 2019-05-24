import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Index from './componentesHechos/Index/Index';
import DemandaSocial from './componentesHechos/DemandaSocial/DemandaSocial';
import Movilidad from './componentesHechos/Movilidad/Movilidad';
import Pdf from './componentesHechos/Pdf/pdf';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Links, Route } from 'react-router-dom';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render((
   <BrowserRouter>
   		<div>
   			<Route path="/" exact component={Index} />
   			<Route path='/demandaSocial' component={DemandaSocial} />
   			<Route path='/movilidad' component={Movilidad} />
			<Route path='/pdf' component={Pdf} />
   		</div>
   </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
