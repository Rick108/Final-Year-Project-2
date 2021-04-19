import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createPostStart } from '../../redux/post/post.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';

const PostForm = ({ createPostStart, currentUser }) => {
  const [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: handle post submit
    createPostStart(text, currentUser);
    setText('');
  };

  return (
    <div className='post-comment-form'>
      <div className='post-comment-form-header'>
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={handleSubmit} className='post-form'>
        <textarea
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={handleChange}></textarea>
        <CustomButton type='submit'>Post</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  createPostStart: (postText, currentUser) =>
    dispatch(createPostStart(postText, currentUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
