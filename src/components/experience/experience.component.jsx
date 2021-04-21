import { useEffect } from 'react';
import DayJS from 'react-dayjs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  deleteExperienceStart,
  fetchExperiencesStart
} from '../../redux/experience/experience.actions';
import {
  selectAreExperiencesLoading,
  selectExperiences
} from '../../redux/experience/experience.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

const Experience = ({
  currentUser,
  fetchExperiencesStart,
  experiences,
  isLoading,
  deleteExperienceStart
}) => {
  useEffect(() => {
    fetchExperiencesStart(currentUser.id);
  }, [fetchExperiencesStart, currentUser.id]);

  return (
    <div className='experience'>
      <h2>Experience Credentials</h2>
      {isLoading ? (
        <Spinner small />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {experiences.map(exp => (
              <tr key={exp.id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                  <DayJS format='DD.MM.YYYY'>{exp.from}</DayJS> -{' '}
                  {exp.to ? <DayJS format='DD.MM.YYYY'>{exp.to}</DayJS> : 'Now'}
                </td>
                <td>
                  <CustomButton onClick={() => deleteExperienceStart(exp.id)} danger>
                    {isLoading ? <i class='fa fa-spinner fa-spin'></i> : 'Delete'}
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  experiences: selectExperiences,
  isLoading: selectAreExperiencesLoading
});

const mapDispatchToProps = dispatch => ({
  fetchExperiencesStart: currentUserId => dispatch(fetchExperiencesStart(currentUserId)),
  deleteExperienceStart: expId => dispatch(deleteExperienceStart(expId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
