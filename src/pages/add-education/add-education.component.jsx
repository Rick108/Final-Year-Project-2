import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import { addEducationStart } from '../../redux/education/education.actions';
import { selectAreEducationsLoading } from '../../redux/education/education.selectors';
import './add-education.styles.scss';

const AddEducation = ({ addEducationStart, educationLoading, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [toDateDisabled, toggleToDateDisabled] = useState(false);

  const { school, degree, fieldOfStudy, from, to, current, description } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addEducationStart(formData);
  };

  return (
    <div className='add-education'>
      <h1 className='text-primary large'>Add an Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school or bootcamp that you
        attended
      </p>
      <span className='required-field-warning'>* required field</span>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <FormInput
          label='* School or Bootcamp'
          type='text'
          name='school'
          value={school}
          handleChange={handleChange}
          required
        />
        <FormInput
          label='* Degree of Certificate'
          type='text'
          name='degree'
          value={degree}
          handleChange={handleChange}
          required
        />
        <FormInput
          label='* Field of Study'
          type='text'
          name='fieldOfStudy'
          value={fieldOfStudy}
          handleChange={handleChange}
          required
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
          Current
        </p>
        <FormInput
          type='date'
          name='to'
          value={to}
          handleChange={handleChange}
          disabled={toDateDisabled}
        />
        <FormInput
          label='Program Description'
          name='description'
          value={description}
          handleChange={handleChange}
          textarea
        />
        <div className='buttons'>
          <CustomButton type='submit'>
            {educationLoading ? <i class='fa fa-spinner fa-spin'></i> : 'Add Education'}
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
  educationLoading: selectAreEducationsLoading
});

const mapDispatchToProps = dispatch => ({
  addEducationStart: formData => dispatch(addEducationStart(formData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEducation));
