import { useEffect } from 'react';
import DayJS from 'react-dayjs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  deleteEducationStart,
  fetchEducationsStart
} from '../../redux/education/education.actions';
import {
  selectAreEducationsLoading,
  selectEducations
} from '../../redux/education/education.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';
import Spinner from '../spinner/spinner.component';

const Education = ({
  currentUser,
  fetchEducationsStart,
  educations,
  loading,
  deleteEducationStart
}) => {
  useEffect(() => {
    fetchEducationsStart(currentUser.id);
  }, [fetchEducationsStart, currentUser.id]);

  return (
    <div className='experience'>
      <h2>Education Credentials</h2>
      {loading ? (
        <Spinner small />
      ) : (
        <table>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {educations.map(edu => (
              <tr key={edu.id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                  <DayJS format='DD.MM.YYYY'>{edu.from}</DayJS> -{' '}
                  {edu.to ? <DayJS format='DD.MM.YYYY'>{edu.to}</DayJS> : 'Now'}
                </td>
                <td>
                  <CustomButton onClick={() => deleteEducationStart(edu.id)} danger>
                    {loading ? <i className='fa fa-spinner fa-spin'></i> : 'Delete'}
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
  educations: selectEducations,
  loading: selectAreEducationsLoading
});

const mapDispatchToProps = dispatch => ({
  fetchEducationsStart: currentUserId => dispatch(fetchEducationsStart(currentUserId)),
  deleteEducationStart: eduId => dispatch(deleteEducationStart(eduId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Education);
