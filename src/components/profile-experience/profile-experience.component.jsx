import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchExperiencesStart } from '../../redux/experience/experience.actions';
import {
  selectAreExperiencesLoading,
  selectExperiences
} from '../../redux/experience/experience.selectors';
import Spinner from '../spinner/spinner.component';
import './profile-experience.styles.scss';
import DayJS from 'react-dayjs';

const ProfileExperience = ({
  profileUserId,
  fetchExperiencesStart,
  isLoading,
  experiences
}) => {
  useEffect(() => {
    fetchExperiencesStart(profileUserId);
  }, [fetchExperiencesStart, profileUserId]);

  return (
    <div className='profile-experience'>
      <h2 className='text-primary'>Experience</h2>
      {isLoading ? (
        <Spinner small />
      ) : (
        <div className='profile-experience_list'>
          {experiences.length ? (
            <>
              {experiences.map(({ id, company, from, to, title, description }) => (
                <div key={id} className='profile-experience_item'>
                  <b className='company'>{company}</b>
                  <p>
                    <DayJS format='DD.MM.YYYY'>{from}</DayJS> -{' '}
                    {to ? <DayJS format='DD.MM.YYYY'>{to}</DayJS> : 'Now'}
                  </p>
                  <p>
                    <b>Position: </b> {title}
                  </p>
                  {description && (
                    <p>
                      <b>Description: </b> {description}
                    </p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectAreExperiencesLoading,
  experiences: selectExperiences
});

const mapDispatchToProps = dispatch => ({
  fetchExperiencesStart: profileUserId => dispatch(fetchExperiencesStart(profileUserId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileExperience);
