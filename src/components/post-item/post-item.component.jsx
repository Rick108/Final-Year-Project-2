import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DayJS from 'react-dayjs';
import { createStructuredSelector } from 'reselect';
import { deletePostStart } from '../../redux/post/post.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';
import DefaultDP from '../../assets/no-dp.jpg';
import './post-item.styles.scss';

const PostItem = ({
  post: { id, text, createdAt, user },
  currentUser,
  deletePostStart,
  history
}) => {
  return (
    <div className='post-item'>
      <div className='post-item_user'>
        <Link to={`/profile/${user.id}`}>
          <img src={DefaultDP} alt='DP' />
          <h4 className='text-primary'>{user.displayName}</h4>
        </Link>
      </div>
      <div className='post-item_content'>
        <p>{text}</p>
        {createdAt && (
          <p className='post-date'>
            Posted on <DayJS format="DD MMM 'YY">{createdAt}</DayJS>
          </p>
        )}
        <div className='post-item_actions'>
          <div className='buttons'>
            <CustomButton widthAuto light>
              <i className='fas fa-thumbs-up'></i> 1
            </CustomButton>
            <CustomButton widthAuto light>
              <i className='fas fa-thumbs-down'></i>
            </CustomButton>
            <CustomButton onClick={() => history.push(`/posts/${id}`)} primaryBlue>
              Discussions <span className='comment-count'>4</span>
            </CustomButton>
            {currentUser && currentUser.id === user.id && (
              <CustomButton
                onClick={() => deletePostStart(id)}
                style={{ padding: '0 20px' }}
                danger>
                <i className='fas fa-times'></i>
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  deletePostStart: postId => dispatch(deletePostStart(postId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostItem));
