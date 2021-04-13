import Loader from '../../assets/loader.gif';
import LoaderSmall from '../../assets/loader-small.gif';
import './spinner.styles.scss';

const Spinner = ({ small }) => {
  return (
    <div className={`${small ? 'small' : ''} spinner-container`}>
      <img src={small ? LoaderSmall : Loader} alt='Loading...' className='spinner' />
    </div>
  );
};

export default Spinner;
