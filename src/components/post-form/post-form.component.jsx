import { useState } from 'react';
import { connect } from 'react-redux';
import { createPostStart } from '../../redux/post/post.actions';
import CustomButton from '../custom-button/custom-button.component';

const PostForm = ({ createPostStart }) => {
  const [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: handle post submit
    createPostStart(text);
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

const mapDispatchToProps = dispatch => ({
  createPostStart: postText => dispatch(createPostStart(postText))
});

export default connect(null, mapDispatchToProps)(PostForm);
