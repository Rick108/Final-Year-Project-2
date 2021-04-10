import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !currentUser ? <Redirect to='/sign-in' /> : <Component {...props} />
    }
  />
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(PrivateRoute);
