import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, light, ...otherButtonProps }) => {
  return (
    <button
      className={`${isGoogleSignIn ? 'google-sign-in' : ''} 
      ${light ? 'light' : ''} 
      custom-button`}
      {...otherButtonProps}>
      {children}
    </button>
  );
};

export default CustomButton;
