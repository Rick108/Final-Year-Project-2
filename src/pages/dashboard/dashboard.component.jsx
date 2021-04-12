import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import CustomButton from '../../components/custom-button/custom-button.component';
import DashboardActions from '../../components/dashboard-actions/dashboard-actions.component';
import Experience from '../../components/experience/experience.component';
import Education from '../../components/education/education.component';
import Spinner from '../../components/spinner/spinner.component';
import { auth } from '../../firebase/firebase.utils';
import { fetchProfileStart } from '../../redux/profile/profile.actions';
import {
  selectIsProfileFetching,
  selectProfile
} from '../../redux/profile/profile.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './dashboard.styles.scss';

const DashboardPage = ({
  currentUser: { displayName },
  fetchProfileStart,
  isProfileFetching,
  profile,
  history
}) => {
  useEffect(() => {
    fetchProfileStart(auth.currentUser.uid);
  }, [fetchProfileStart]);

  return isProfileFetching ? (
    <Spinner />
  ) : (
    <div className='dashboard'>
      <h1 className='text-primary large'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {displayName}
      </p>

      {profile ? (
        <>
          <DashboardActions />
          <Experience />
          <Education />
        </>
      ) : (
        <>
          <p>You have not yet set up a profile yet, please add some info</p>
          <CustomButton onClick={() => history.push('/create-profile')}>
            Create Profile
          </CustomButton>
        </>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isProfileFetching: selectIsProfileFetching,
  profile: selectProfile
});

const mapDispatchToProps = dispatch => ({
  fetchProfileStart: id => dispatch(fetchProfileStart(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
