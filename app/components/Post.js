import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchItem, fetchPosts, fetchComments } from '../utils/api';
import queryString from 'query-string';
import Title from './Title';
import PostMetaInfo from './PostMetaInfo';

export default class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: null,
			loadingPost: true,
			comments: null,
			loadingComments: true,
			error: null,
		};
	}

	componentDidMount() {
		const { id } = queryString.parse(this.props.location.search);

		fetchItem(id)
			.then(post => {
				this.setState({
					post,
					loadingPost: false,
				});
				return fetchComments(post.kids || []);
			})
			.then(comments => {
				this.setState({
					comments,
					loadingComments: false,
				});
			})
			.catch(({ message }) => {
				this.setState({
					error: message,
					loadingPost: false,
					loadingComments: false,
				});
			});
	}

	render() {
		const { post, loadingPost, comments, loadingComments, error } = this.state;

		if (error) {
			return <p>{error}</p>;
		}

		return (
			<>
				{loadingPost === true ? (
					<p>fetching post</p>
				) : (
					<>
						<h1 className='header'>
							<Title url={post.url} title={post.title} id={post.id} />
						</h1>
						<PostMetaInfo
							by={post.by}
							time={post.time}
							id={post.id}
							descendants={post.descendants}
						/>
						<p>post text will go here</p>
					</>
				)}
			</>
		);
	}
}
