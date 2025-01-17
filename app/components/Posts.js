import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchMainPosts } from '../utils/api';
import PostsList from './PostsList';
import Loading from './Loading';

export default class Posts extends Component {
	state = {
		posts: null,
		error: null,
		loading: true,
	};

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
			.then((posts) =>
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
			return <Loading />;
		}

		if (error) {
			return <p className='center-text error'>{error}</p>; //!maybe make component
		}
		return <PostsList posts={posts} />;
	}
}

Posts.propTypes = {
	type: PropTypes.oneOf(['top', 'new']),
};
