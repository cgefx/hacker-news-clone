import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
	color: `rgb(187,46,31)`,
};

const Nav = () => {
	return (
		<nav className='row space-between'>
			<ul className='row nav'>
				<li>
					<NavLink to='/' exact activeStyle={activeStyle} className='nav-link'>
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
			<button className='btn-clear text-lg'>🔦</button>
		</nav>
	);
};

export default Nav;
