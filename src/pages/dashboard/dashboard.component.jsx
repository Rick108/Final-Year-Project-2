import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import CustomButton from '../../components/custom-button/custom-button.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './dashboard.styles.scss';

const DashboardPage = ({ currentUser: { displayName }, history }) => {
  return (
    <div className='dashboard'>
      <h1 className='primary-text large'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {displayName}
      </p>

      <p>You have not yet set up a profile yet, please add some info</p>
      <CustomButton onClick={() => history.push('/create-profile')}>
        Create Profile
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default withRouter(connect(mapStateToProps)(DashboardPage));
