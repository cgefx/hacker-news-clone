import React, { Component } from 'react';
import queryString from 'query-string';
import { fetchUser, fetchPosts } from '../utils/api';
import { formatDate } from '../utils/helpers';
import PostsList from './PostsList';
import Loading from './Loading';
import { ThemeConsumer } from '../contexts/theme';

export default class User extends Component {
	state = {
		user: null,
		loadingUser: true,
		posts: null,
		loadingPosts: true,
		error: null,
	};

	componentDidMount() {
		const { id } = queryString.parse(this.props.location.search);

		fetchUser(id)
			.then((user) => {
				this.setState({
					user,
					loadingUser: false,
				});

				return fetchPosts(user.submitted.slice(0, 30));
			})
			.then((posts) => {
				this.setState({
					posts,
					loadingPosts: false,
				});
			})
			.catch(({ message }) => {
				this.setState({
					error: message,
					loadingPosts: false,
					loadingUser: false,
				});
			});
	}

	render() {
		const { user, posts, loadingUser, loadingPosts, error } = this.state;

		if (error) {
			return <p>{error}</p>;
		}

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<>
						{loadingUser === true ? (
							<Loading text='Fetching User' />
						) : (
							<>
								<h1 className='header'>{user.id}</h1>
								<div className={`meta-info-${theme}`}>
									<span>
										Joined <b>{formatDate(user.created)}</b>
									</span>
									<span>
										has <b>{user.karma.toLocaleString()}</b> karma
									</span>
								</div>
								<p dangerouslySetInnerHTML={{ __html: user.about }} />
							</>
						)}
						{loadingPosts === true ? (
							loadingUser === false && <Loading text='Fetching Posts' />
						) : (
							<>
								<h2>Posts</h2>
								<PostsList posts={posts} />
							</>
						)}
					</>
				)}
			</ThemeConsumer>
		);
	}
}
