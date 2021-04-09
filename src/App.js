import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignOut from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

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

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(null, mapDispatchToProps)(App);
