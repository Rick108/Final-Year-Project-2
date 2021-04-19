import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchPostsStart } from '../../redux/post/post.actions';
import { selectArePostsLoading, selectPosts } from '../../redux/post/post.selectors';
import PostItem from '../post-item/post-item.component';
import Spinner from '../spinner/spinner.component';
import './posts-list.styles.scss';

const PostsList = ({ fetchPostsStart, postsLoading, posts }) => {
  useEffect(() => {
    fetchPostsStart();
  }, [fetchPostsStart]);

  return (
    <div className='posts-list'>
      {postsLoading ? (
        <Spinner small />
      ) : posts.length ? (
        posts.map((post, index) => <PostItem key={index} post={post} />)
      ) : (
        <h3 className='no-posts-found-msg'>Be the first one to post.</h3>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  postsLoading: selectArePostsLoading,
  posts: selectPosts
});

const mapDispatchToProps = dispatch => ({
  fetchPostsStart: () => dispatch(fetchPostsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
