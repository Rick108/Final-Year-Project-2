import { useState } from 'react';
import { connect } from 'react-redux';
import { setAlertStart } from '../../redux/alert/alert.actions';
import { signUpStart } from '../../redux/user/user.actions';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';

const SignUp = ({ signUpStart, setAlertStart }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertStart('danger', 'Passwords do not match', 3000);
      return;
    }

    signUpStart({ email, password, displayName });
  };

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          required
        />
        <FormInput
          label='Email'
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          label='Password'
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          autoComplete='off'
          required
        />
        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          autoComplete='off'
          required
        />
        <CustomButton type='submit' onClick={() => {}}>
          Sign Up
        </CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
  setAlertStart: (alertType, alertMsg, timeout) =>
    dispatch(setAlertStart(alertType, alertMsg, timeout))
});

export default connect(null, mapDispatchToProps)(SignUp);
