import React from 'react';
import TopMenu from './containers/TopMenu/TopMenu';
import Content from './containers/content/content';

import './App.css';

function App() {
	return (
		<div className="App">
			<TopMenu />
			<Content />
		</div>
	);
}

export default App;
