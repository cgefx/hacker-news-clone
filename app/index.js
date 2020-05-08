import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Posts from './components/Posts';
import Post from './components/Post';
import User from './components/User';
import './index.css';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route exact path='/' render={() => <Posts type='top' />} />
						<Route exact path='/new' render={() => <Posts type='new' />} />
						<Route path='/post' component={Post} />
						<Route path='/user' component={User} />
						<Route render={() => <h1>404</h1>} />
					</Switch>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
