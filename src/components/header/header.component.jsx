import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = () => {
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
        <Link className='nav-link' to='/sign-in'>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Header;
