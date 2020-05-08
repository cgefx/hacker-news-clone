import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Posts from './components/Posts';
import Post from './components/Post';
import User from './components/User';
import { ThemeProvider } from './contexts/theme';
import './index.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: 'light',
			toggleTheme: () => {
				this.setState(({ theme }) => ({
					theme: theme === 'light' ? 'dark' : 'light',
				}));
			},
		};
	}
	render() {
		return (
			<Router>
				<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
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
					</div>
				</ThemeProvider>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
