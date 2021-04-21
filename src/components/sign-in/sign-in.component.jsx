import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';
import {
  selectEmailSignInLoading,
  selectGoogleSignInLoading
} from '../../redux/user/user.selectors';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';

const SignIn = ({
  googleSignInStart,
  emailSignInStart,
  emailSignInLoading,
  googleSignInLoading
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    emailSignInStart(email, password);
  };

  return (
    <div className='sign-in'>
      <h2 className='title'>I have an account</h2>
      <span>Sign into your account</span>
      <form onSubmit={handleSubmit} autoComplete='off'>
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
        <div className='buttons'>
          <CustomButton type='submit' disabled={!!emailSignInLoading}>
            {emailSignInLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Sign In'}
          </CustomButton>
          <CustomButton
            type='button'
            onClick={googleSignInStart}
            disabled={!!googleSignInLoading}
            isGoogleSignIn>
            {googleSignInLoading ? (
              <i className='fas fa-spinner fa-spin'></i>
            ) : (
              'Sign in with Google'
            )}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  emailSignInLoading: selectEmailSignInLoading,
  googleSignInLoading: selectGoogleSignInLoading
});

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
