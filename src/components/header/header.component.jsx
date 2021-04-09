import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './header.styles.scss';

const Header = ({ currentUser, signOutStart }) => {
  return (
    <div className='header bg-dark'>
      <div className='logo-container'>
        <Link className='logo' to='/'>
          <i className='fas fa-code'></i> Project-II
        </Link>
      </div>
      <div className='nav-links'>
        <Link className='nav-link' to='/developers'>
          Developers
        </Link>
        {currentUser ? (
          <div className='nav-link' onClick={signOutStart}>
            Sign Out
          </div>
        ) : (
          <Link className='nav-link' to='/sign-in'>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
