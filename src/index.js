import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import clientReducer from './store/reducers/client';
import formReducer from './store/reducers/dForm';
import dropDownSearchReducer from './store/reducers/dropDownSearch';
import columnsSelectReducer from './store/reducers/columnsSelect';
import { reducer as reduxFormReducer } from 'redux-form';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	client: clientReducer,
	form: reduxFormReducer,
	dForm: formReducer,
	dropDownSearch: dropDownSearchReducer,
	columnsSelect: columnsSelectReducer
	
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
