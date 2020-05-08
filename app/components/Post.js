import React, { Component } from 'react';
import queryString from 'query-string';
import { fetchItem, fetchComments } from '../utils/api';
import Title from './Title';
import PostMetaInfo from './PostMetaInfo';
import Comment from './Comment';
import Loading from './Loading';

export default class Post extends Component {
	state = {
		post: null,
		loadingPost: true,
		comments: null,
		loadingComments: true,
		error: null,
	};

	componentDidMount() {
		const { id } = queryString.parse(this.props.location.search);

		fetchItem(id)
			.then((post) => {
				this.setState({
					post,
					loadingPost: false,
				});
				return fetchComments(post.kids || []);
			})
			.then((comments) => {
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
					<Loading text='Fetching Post' />
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
						<p dangerouslySetInnerHTML={{ __html: post.text }} />
					</>
				)}
				{loadingComments === true ? (
					loadingPost === false && <Loading text='Fetching Comments' />
				) : (
					<>
						{comments.map((comment) => (
							<Comment key={comment.id} comment={comment} />
						))}
					</>
				)}
			</>
		);
	}
}
