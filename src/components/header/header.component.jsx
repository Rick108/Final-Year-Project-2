import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './header.styles.scss';

const Header = ({ currentUser, signOutStart }) => {
  const authLinks = (
    <>
      <Link className="nav-link" to='/posts'>Posts</Link>
      <Link className='nav-link' to='/dashboard'>
        <i className='fas fa-user'></i> Dashboard
      </Link>
      <div className='nav-link' onClick={signOutStart}>
        <i className='fas fa-sign-out-alt'></i> Sign Out
      </div>
    </>
  );

  const guestLinks = (
    <>
      <Link className='nav-link' to='/sign-in'>
        Sign In
      </Link>
    </>
  );

  return (
    <div className='header bg-dark'>
      <div className='logo-container'>
        <Link className='logo' to='/'>
          <i className='fas fa-code'></i> Project-II
        </Link>
      </div>
      <div className='nav-links'>
        <Link className='nav-link' to='/profiles'>
          Developers
        </Link>
        {currentUser ? authLinks : guestLinks}
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
