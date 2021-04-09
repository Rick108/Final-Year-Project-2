import { useState } from 'react';
import { connect } from 'react-redux';
import { googleSignInStart } from '../../redux/user/user.actions';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';

const SignIn = ({ googleSignInStart }) => {
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

    // TODO: handle sign in with email and password
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
          required
        />
        <div className='buttons'>
          <CustomButton type='submit' onClick={() => {}}>
            Sign In
          </CustomButton>
          <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);
