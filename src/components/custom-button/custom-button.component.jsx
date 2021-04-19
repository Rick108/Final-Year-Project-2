import './custom-button.styles.scss';

const CustomButton = ({
  isGoogleSignIn,
  light,
  danger,
  primaryBlue,
  widthAuto,
  children,
  ...otherButtonProps
}) => {
  return (
    <button
      className={`${isGoogleSignIn ? 'google-sign-in' : ''} 
      ${light ? 'light' : ''} 
      ${danger ? 'danger' : ''} 
      ${primaryBlue ? 'primary-blue' : ''}
      ${widthAuto ? 'width-auto' : ''}
      custom-button`}
      {...otherButtonProps}>
      {children}
    </button>
  );
};

export default CustomButton;
