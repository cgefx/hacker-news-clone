import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchMainPosts } from '../utils/api';
import PostsList from './PostsList';

export default class Posts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: null,
			error: null,
			loading: true,
		};
	}

	componentDidMount() {
		this.handleFetch();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.type !== this.props.type) {
			this.handleFetch();
		}
	}

	handleFetch() {
		this.setState({
			posts: null,
			error: null,
			loading: true,
		});

		fetchMainPosts(this.props.type)
			.then(posts =>
				this.setState({
					posts,
					loading: false,
					error: null,
				}),
			)
			.catch(({ message }) =>
				this.setState({
					error: message,
					loading: false,
				}),
			);
	}

	render() {
		const { posts, error, loading } = this.state;

		if (loading === true) {
			return <p>Loading</p>; //!make component
		}

		if (error) {
			return <p className='center-text error'>{error}</p>; //!maybe make component
		}
		console.log(posts);
		return <PostsList posts={posts} />;
	}
}

Posts.propTypes = {
	type: PropTypes.oneOf(['top', 'new']),
};
