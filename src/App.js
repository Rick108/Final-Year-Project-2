import { Route, Switch } from 'react-router';
import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignOut from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <section className='container'>
          <Route path='/sign-in' component={SignInAndSignOut} />
        </section>
      </Switch>
    </>
  );
};

export default App;
