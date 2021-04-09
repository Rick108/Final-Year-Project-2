import { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
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
      alert('Passwords do not match');
      return;
    }

    signUpStart({ email, password, displayName });
  };

  return (
    <div className='sign-in'>
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
          required
        />
        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
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
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
