import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './pages/App/App';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
