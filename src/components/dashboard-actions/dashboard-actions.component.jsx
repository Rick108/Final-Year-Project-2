import { withRouter } from 'react-router';
import CustomButton from '../custom-button/custom-button.component';
import './dashboard-actions.styles.scss';

const DashboardActions = ({ history }) => {
  return (
    <div className='dashboard-actions'>
      <CustomButton onClick={() => history.push('/edit-profile')} light>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </CustomButton>
      <CustomButton onClick={() => history.push('/add-experience')} light>
        <i className='fab fa-black-tie text-primary'></i> Add Experience
      </CustomButton>
      <CustomButton onClick={() => history.push('/add-education')} light>
        <i className='fas fa-graduation-cap text-primary'></i> Add Education
      </CustomButton>
    </div>
  );
};

export default withRouter(DashboardActions);
