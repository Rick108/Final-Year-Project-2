import { connect } from 'react-redux';
import { setAlertStart } from '../../redux/alert/alert.actions';

const Test = ({ setAlertStart }) => {
  return (
    // <div>
    <div style={{ height: 1500 }}>
      <div style={{ height: 700 }}></div>
      <br />
      <button onClick={() => setAlertStart('danger', 'Sign in failed')}>
        Sign in failed
      </button>
      <br />
      <br />
      <button onClick={() => setAlertStart('success', 'Sign in success', 2000)}>
        Sign in success
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setAlertStart: (alertType, alertMsg, timeout) =>
    dispatch(setAlertStart(alertType, alertMsg, timeout))
});

export default connect(null, mapDispatchToProps)(Test);
