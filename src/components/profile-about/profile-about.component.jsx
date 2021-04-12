import Divider from '../divider/divider.component';
import './profile-about.styles.scss';

const ProfileAbout = ({ owner, bio, skills }) => {
  return (
    <div className='profile-about'>
      {bio && (
        <div className='profile-about_flex'>
          <h2 className='text-primary'>{owner.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
        </div>
      )}
      {bio && <Divider />}
      <div className='profile-about_flex'>
        <h2 className='text-primary'>Skill Set</h2>
        <div className='skills'>
          {skills.map((skill, index) => (
            <div key={index} className='skill'>
              <i className='fas fa-check'></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
