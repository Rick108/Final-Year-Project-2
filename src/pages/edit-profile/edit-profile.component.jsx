import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import { auth } from '../../firebase/firebase.utils';
import { editProfileStart, fetchProfileStart } from '../../redux/profile/profile.actions';
import {
  selectIsProfileFetching,
  selectProfile
} from '../../redux/profile/profile.selectors';
import './edit-profile.styles.scss';

const EditProfile = ({
  fetchProfileStart,
  isProfileFetching,
  profile,
  editProfileStart,
  history
}) => {
  const [formData, setFormData] = useState({
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    facebook: '',
    instagram: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    fetchProfileStart(auth.currentUser.uid);

    setFormData({
      company: isProfileFetching || !profile.company ? '' : profile.company,
      website: isProfileFetching || !profile.website ? '' : profile.website,
      location: isProfileFetching || !profile.location ? '' : profile.location,
      status: isProfileFetching || !profile.status ? '' : profile.status,
      skills: isProfileFetching || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        isProfileFetching || !profile.githubusername ? '' : profile.githubusername,
      bio: isProfileFetching || !profile.bio ? '' : profile.bio,
      twitter: isProfileFetching || !profile.twitter ? '' : profile.twitter,
      linkedin: isProfileFetching || !profile.linkedin ? '' : profile.linkedin,
      youtube: isProfileFetching || !profile.youtube ? '' : profile.youtube,
      facebook: isProfileFetching || !profile.facebook ? '' : profile.facebook,
      instagram: isProfileFetching || !profile.instagram ? '' : profile.instagram
    });
  }, [fetchProfileStart]);

  const {
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    linkedin,
    youtube,
    facebook,
    instagram
  } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    editProfileStart(formData);
  };

  return (
    <div className='edit-profile'>
      <h1 className='text-primary large'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your profile
        stand out
      </p>
      <span className='required-field-warning'>* required field</span>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div className='form-group'>
          <select name='status' value={status} onChange={handleChange} required>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <FormInput
          label='Company'
          type='text'
          name='company'
          value={company}
          handleChange={handleChange}
          formText='Give us an idea of where you are at in your career'
        />
        <FormInput
          label='Website'
          type='text'
          name='website'
          value={website}
          handleChange={handleChange}
          formText='Could be your own or a company website'
        />
        <FormInput
          label='Location'
          type='text'
          name='location'
          value={location}
          handleChange={handleChange}
          formText='City & state suggested (eg. Boston, MA)'
        />
        <FormInput
          label='* Skills'
          type='text'
          name='skills'
          value={skills}
          handleChange={handleChange}
          formText='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
          required
        />
        <FormInput
          label='GitHub Username'
          type='text'
          name='githubusername'
          value={githubusername}
          handleChange={handleChange}
          formText='Your GitHub username'
        />
        <FormInput
          label='A short bio of yourself'
          type='text'
          name='bio'
          value={bio}
          handleChange={handleChange}
          formText='Tell us a little about yourself'
          textarea
        />

        <div className='toggle-social-inputs-button-container'>
          <CustomButton
            type='button'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            light>
            Add Social Network Links
          </CustomButton>
          <span className='optional-span'>(Optional)</span>
        </div>

        {displaySocialInputs && (
          <>
            <FormInput
              label='Twitter URL'
              type='text'
              name='twitter'
              value={twitter}
              handleChange={handleChange}
              socialInput
              socialMedia='twitter'
            />
            <FormInput
              label='LinkedIn URL'
              type='text'
              name='linkedin'
              value={linkedin}
              handleChange={handleChange}
              socialInput
              socialMedia='linkedin'
            />
            <FormInput
              label='YouTube URL'
              type='text'
              name='youtube'
              value={youtube}
              handleChange={handleChange}
              socialInput
              socialMedia='youtube'
            />
            <FormInput
              label='Facebook URL'
              type='text'
              name='facebook'
              value={facebook}
              handleChange={handleChange}
              socialInput
              socialMedia='facebook'
            />
            <FormInput
              label='Instagram URL'
              type='text'
              name='instagram'
              value={instagram}
              handleChange={handleChange}
              socialInput
              socialMedia='instagram'
            />
          </>
        )}
        <div className='buttons'>
          <CustomButton type='submit'>Submit</CustomButton>
          <CustomButton type='button' onClick={() => history.goBack()} light>
            Go Back
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isProfileFetching: selectIsProfileFetching,
  profile: selectProfile
});

const mapDispatchToProps = dispatch => ({
  fetchProfileStart: () => dispatch(fetchProfileStart()),
  editProfileStart: formData => dispatch(editProfileStart(formData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
