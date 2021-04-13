import PostForm from '../../components/post-form/post-form.component';
import './posts.styles.scss';

const PostsPage = () => {
  return (
    <div className='posts-page'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>
      <PostForm />
    </div>
  );
};

export default PostsPage;
