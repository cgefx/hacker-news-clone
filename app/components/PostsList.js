import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import PostMetaInfo from './PostMetaInfo';

const PostsList = ({ posts }) => {
	if (posts.length === 0) {
		return <p>Sorry no posts to show</p>;
	}

	return (
		<ul>
			{posts.map(post => (
				<li key={post.id} className='post'>
					<Title url={post.url} title={post.title} id={post.id} />
					<PostMetaInfo
						by={post.by}
						time={post.time}
						id={post.id}
						descendants={post.descendants}
					/>
				</li>
			))}
		</ul>
	);
};

PostsList.propTypes = {
	posts: PropTypes.array.isRequired,
};

export default PostsList;
