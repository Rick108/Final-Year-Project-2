import Loader from '../../assets/loader.gif';
import './spinner.styles.scss';

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <img src={Loader} alt='Loading...' className='spinner' />
    </div>
  );
};

export default Spinner;
