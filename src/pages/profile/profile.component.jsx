import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import CustomButton from '../../components/custom-button/custom-button.component';
import ProfileTop from '../../components/profile-top/profile-top.component';
import ProfileAbout from '../../components/profile-about/profile-about.component';
import ProfileExperience from '../../components/profile-experience/profile-experience.component';
import ProfileEducation from '../../components/profile-education/profile-education.component';
import Spinner from '../../components/spinner/spinner.component';
import { fetchProfileStart } from '../../redux/profile/profile.actions';
import {
  selectIsProfileFetching,
  selectProfile
} from '../../redux/profile/profile.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './profile.styles.scss';

const ProfilePage = ({
  fetchProfileStart,
  isFetching,
  profile,
  currentUser,
  match,
  history
}) => {
  useEffect(() => {
    fetchProfileStart(match.params.id);
  }, [fetchProfileStart, match.params.id]);

  return (
    <div className='profile-page'>
      {isFetching ? (
        <Spinner />
      ) : profile ? (
        <>
          <div className='buttons'>
            <CustomButton onClick={() => history.goBack()} light>
              Back
            </CustomButton>
            {currentUser && currentUser.id === profile.userId && (
              <CustomButton onClick={() => history.push('/edit-profile')}>
                Edit Profile
              </CustomButton>
            )}
          </div>

          <ProfileTop profile={profile} />
          <ProfileAbout owner={profile.owner} bio={profile.bio} skills={profile.skills} />
          <div className='profile-grid'>
            <ProfileExperience profileUserId={profile.userId} />
            <ProfileEducation profileUserId={profile.userId} />
          </div>
        </>
      ) : (
        <h3>No profile found</h3>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsProfileFetching,
  profile: selectProfile,
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  fetchProfileStart: id => dispatch(fetchProfileStart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));
