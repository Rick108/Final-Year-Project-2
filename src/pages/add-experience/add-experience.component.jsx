import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import './add-experience.styles.scss';

const AddExperience = ({ history }) => {
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
    // TODO: handle add an experience
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
          <CustomButton type='submit'>Submit</CustomButton>
          <CustomButton type='button' onClick={() => history.goBack()} light>
            Go Back
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default withRouter(connect()(AddExperience));
