import { useEffect } from 'react';
import { connect } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createStructuredSelector } from 'reselect';
import { selectAlerts } from '../../redux/alert/alert.selectors';
import { AlertItem, AlertsContainer } from './alerts.styles';

const Alerts = ({ alerts }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <AlertsContainer>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <AlertItem key={alert.id} alertType={alert.alertType} data-aos='zoom-in-up'>
            {alert.alertMsg}
          </AlertItem>
        ))}
    </AlertsContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  alerts: selectAlerts
});

export default connect(mapStateToProps)(Alerts);
