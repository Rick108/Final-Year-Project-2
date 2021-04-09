import { Route, Switch } from 'react-router';
import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/homepage.component';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <section className='container'></section>
      </Switch>
    </>
  );
};

export default App;
