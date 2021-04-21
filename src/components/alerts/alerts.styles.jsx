import styled from 'styled-components';

const dangerColor = '#dc3545';
const successColor = '#28a745';
const darkColor = '#343a40';

const setAlertBgColor = ({ alertType }) => {
  if (alertType === 'danger') {
    return dangerColor;
  } else if (alertType === 'success') {
    return successColor;
  }
  return darkColor;
};

export const AlertsContainer = styled.div`
  position: fixed;
  bottom: 70px;
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AlertItem = styled.div`
  color: white;
  background-color: ${props => setAlertBgColor(props)};
  min-width: 250px;
  width: auto;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
  margin: 1rem 0;
  box-shadow: 2px 8px 10px #666;
`;
