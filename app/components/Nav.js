import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeConsumer } from '../contexts/theme';

const activeStyle = {
	color: `rgb(187,46,31)`,
};

const Nav = () => {
	return (
		<ThemeConsumer>
			{({ theme, toggleTheme }) => (
				<nav className='row space-between'>
					<ul className='row nav'>
						<li>
							<NavLink
								to='/'
								exact
								activeStyle={activeStyle}
								className='nav-link'
							>
								Top
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/new'
								exact
								activeStyle={activeStyle}
								className='nav-link'
							>
								New
							</NavLink>
						</li>
					</ul>
					<button onClick={toggleTheme} className='btn-clear text-lg'>
						{theme === 'light' ? '🔦' : '💡'}
					</button>
				</nav>
			)}
		</ThemeConsumer>
	);
};

export default Nav;
