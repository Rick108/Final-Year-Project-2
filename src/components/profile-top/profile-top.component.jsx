import DefaultDP from '../../assets/no-dp.jpg';
import './profile-top.styles.scss';

const ProfileTop = ({
  profile: {
    owner,
    status,
    company,
    location,
    website,
    twitter,
    linkedin,
    youtube,
    facebook,
    instagram
  }
}) => {
  return (
    <div className='profile-top'>
      <img src={DefaultDP} alt='dp' />
      <h1 className='text-large'>{owner}</h1>
      {status && (
        <p className='lead'>
          {status} {company && <span> at {company}</span>}
        </p>
      )}
      {location && <p>{location}</p>}
      <div className='icons'>
        {website && (
          <a href={`https://${website}`} target='_blank' rel='noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {twitter && (
          <a href={`https://${twitter}`} target='_blank' rel='noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {linkedin && (
          <a href={`https://${linkedin}`} target='_blank' rel='noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {youtube && (
          <a href={`https://${youtube}`} target='_blank' rel='noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {facebook && (
          <a href={`https://${facebook}`} target='_blank' rel='noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {instagram && (
          <a href={`https://${instagram}`}>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileTop;
