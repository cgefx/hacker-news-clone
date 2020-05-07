import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Title = ({ url, title, id }) => {
	return url ? (
		<a href={url} className='link'>
			{title}
		</a>
	) : (
		<Link to={`/post?id=${id}`}>{title}</Link>
	);
};

Title.propTypes = {
	url: PropTypes.string,
	title: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};

export default Title;
