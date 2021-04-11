import './form-input.styles.scss';

const FormInput = ({
  label,
  handleChange,
  formText,
  textarea,
  socialInput,
  socialMedia,
  ...otherInputProps
}) => {
  return (
    <div className='form-group'>
      {otherInputProps.name === 'from' && <h4>* From Date</h4>}
      {otherInputProps.name === 'to' && <h4>To Date</h4>}

      {textarea ? (
        <textarea className='form-input' onChange={handleChange} {...otherInputProps} />
      ) : (
        <input className='form-input' onChange={handleChange} {...otherInputProps} />
      )}

      {label && (
        <label
          className={`${otherInputProps.value.length ? 'shrink' : ''}  
          ${socialMedia ? 'social-media-label' : ''}
          form-input-label`}>
          <i className={`fab fa-${socialMedia} fa-2x`}></i>
          {label}
        </label>
      )}

      {formText && <small className='form-text'>{formText}</small>}
    </div>
  );
};

export default FormInput;
