import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import { addExperienceStart } from '../../redux/experience/experience.actions';
import { selectAreExperiencesLoading } from '../../redux/experience/experience.selectors';
import './add-experience.styles.scss';

const AddExperience = ({ addExperienceStart, experienceLoading, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [toDateDisabled, toggleToDateDisabled] = useState(false);

  const { title, company, location, from, to, current, description } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addExperienceStart(formData);
  };

  return (
    <div className='add-experience'>
      <h1 className='text-primary large'>Add an Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming positions
        that you have had in the past
      </p>
      <span className='required-field-warning'>* required field</span>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <FormInput
          label='* Job Title'
          type='text'
          name='title'
          value={title}
          handleChange={handleChange}
          required
        />
        <FormInput
          label='* Company'
          type='text'
          name='company'
          value={company}
          handleChange={handleChange}
          required
        />
        <FormInput
          label='Location'
          type='text'
          name='location'
          value={location}
          handleChange={handleChange}
        />
        <FormInput
          type='date'
          name='from'
          value={from}
          handleChange={handleChange}
          required
        />
        <p>
          <input
            type='checkbox'
            name='current'
            value={current}
            checked={current}
            onChange={() => {
              setFormData({ ...formData, current: !current });
              toggleToDateDisabled(!toDateDisabled);
            }}
            style={{ marginRight: 10 }}
          />
          Current Job
        </p>
        <FormInput
          type='date'
          name='to'
          value={to}
          handleChange={handleChange}
          disabled={toDateDisabled}
        />
        <FormInput
          label='Job Description'
          name='description'
          value={description}
          handleChange={handleChange}
          textarea
        />
        <div className='buttons'>
          <CustomButton type='submit'>
            {experienceLoading ? <i class='fa fa-spinner fa-spin'></i> : 'Add Experience'}
          </CustomButton>
          <CustomButton type='button' onClick={() => history.goBack()} light>
            Go Back
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  experienceLoading: selectAreExperiencesLoading
});

const mapDispatchToProps = dispatch => ({
  addExperienceStart: formData => dispatch(addExperienceStart(formData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddExperience));
