import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProfileItem from '../../components/profile-item/profile-item.component';
import Spinner from '../../components/spinner/spinner.component';
import { fetchProfilesStart } from '../../redux/profile/profile.actions';
import {
  selectIsProfileFetching,
  selectProfiles
} from '../../redux/profile/profile.selectors';
import './profiles.styles.scss';

const ProfilesPage = ({ fetchProfilesStart, isFetching, profiles }) => {
  useEffect(() => {
    fetchProfilesStart();
  }, [fetchProfilesStart]);

  return (
    <div className='profiles-page'>
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with fellow
            developers
          </p>
          <div className='profiles'>
            {profiles.length === 0 ? (
              <h4>No profiles found...</h4>
            ) : (
              profiles.map(profile => <ProfileItem key={profile.id} profile={profile} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsProfileFetching,
  profiles: selectProfiles
});

const mapDispatchToProps = dispatch => ({
  fetchProfilesStart: () => dispatch(fetchProfilesStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesPage);
