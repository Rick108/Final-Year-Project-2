import { useEffect } from 'react';
import DayJS from 'react-dayjs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  deleteExperienceStart,
  fetchExperiencesStart
} from '../../redux/experience/experience.actions';
import {
  selectAreExperiencesFetching,
  selectExperiences
} from '../../redux/experience/experience.selectors';
import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

const Experience = ({
  fetchExperiencesStart,
  experiences,
  isFetching,
  deleteExperienceStart
}) => {
  useEffect(() => {
    fetchExperiencesStart();
  }, [fetchExperiencesStart]);

  return (
    <div className='experience'>
      <h2>Experience Credentials</h2>
      {isFetching ? (
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
                    Delete
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
  experiences: selectExperiences,
  isFetching: selectAreExperiencesFetching
});

const mapDispatchToProps = dispatch => ({
  fetchExperiencesStart: () => dispatch(fetchExperiencesStart()),
  deleteExperienceStart: expId => dispatch(deleteExperienceStart(expId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Experience);
