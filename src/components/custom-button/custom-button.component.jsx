import './custom-button.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  light,
  danger,
  ...otherButtonProps
}) => {
  return (
    <button
      className={`${isGoogleSignIn ? 'google-sign-in' : ''} 
      ${light ? 'light' : ''} 
      ${danger ? 'danger' : ''} 
      custom-button`}
      {...otherButtonProps}>
      {children}
    </button>
  );
};

export default CustomButton;
