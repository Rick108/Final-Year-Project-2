import { Link } from 'react-router-dom';
import DefaultDP from '../../assets/no-dp.jpg';
import CustomButton from '../custom-button/custom-button.component';
import './profile-item.styles.scss';

const ProfileItem = ({ profile: { id, owner, status, company, location, skills } }) => {
  return (
    <div className='profile-item'>
      <img src={DefaultDP} alt='DP' />
      <div className='profile-item_main'>
        <h2>{owner}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        {location && (
          <p className='location'>
            <span>{location}</span>
          </p>
        )}
        <Link to={`profile/${id}`}>
          <CustomButton>View Profile</CustomButton>
        </Link>
      </div>
      <div className='profile-item_skills'>
        {skills.slice(0, 5).map((skill, index) => (
          <span key={index} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileItem;
