import './form-input.styles.scss';

const FormInput = ({ label, handleChange, ...otherInputProps }) => {
  return (
    <div className='group'>
      <input className='form-input' onChange={handleChange} {...otherInputProps} />
      <label
        className={`${otherInputProps.value.length ? 'shrink' : ''} form-input-label`}>
        {label}
      </label>
    </div>
  );
};

export default FormInput;
