import { useEffect } from 'react';
import DayJS from 'react-dayjs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchEducationsStart } from '../../redux/education/education.actions';
import {
  selectAreEducationsLoading,
  selectEducations
} from '../../redux/education/education.selectors';
import Spinner from '../spinner/spinner.component';
import './profile-education.styles.scss';

const ProfileEducation = ({
  profileUserId,
  fetchEducationsStart,
  isFetching,
  educations
}) => {
  useEffect(() => {
    fetchEducationsStart(profileUserId);
  }, [fetchEducationsStart, profileUserId]);

  return (
    <div className='profile-education'>
      <h2 className='text-primary'>Education</h2>
      {isFetching ? (
        <Spinner small />
      ) : (
        <div className='profile-education_list'>
          {educations.length ? (
            <>
              {educations.map(
                ({ id, school, from, to, degree, fieldOfStudy, description }) => (
                  <div key={id} className='profile-education_item'>
                    <b className='school'>{school}</b>
                    <p>
                      <DayJS format='DD.MM.YYYY'>{from}</DayJS> -{' '}
                      {to ? <DayJS format='DD.MM.YYYY'>{to}</DayJS> : 'Now'}
                    </p>
                    <p>
                      <b>Degree: </b> {degree}
                    </p>
                    <p>
                      <b>Field of Study: </b> {fieldOfStudy}
                    </p>
                    {description && (
                      <p>
                        <b>Description: </b> {description}
                      </p>
                    )}
                  </div>
                )
              )}
            </>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectAreEducationsLoading,
  educations: selectEducations
});

const mapDispatchToProps = dispatch => ({
  fetchEducationsStart: profileUserId => dispatch(fetchEducationsStart(profileUserId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEducation);
