import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import './App.scss';

import Header from './components/header/header.component';
import Alerts from './components/alerts/alerts.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignOut from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import PrivateRoute from './components/routing/PrivateRoute';
import DashboardPage from './pages/dashboard/dashboard.component';
import CreateProfile from './pages/create-profile/create-profile.component';
import EditProfile from './pages/edit-profile/edit-profile.component';
import AddExperience from './pages/add-experience/add-experience.component';
import AddEducation from './pages/add-education/add-education.component';
import ProfilesPage from './pages/profiles/profiles.component';
import ProfilePage from './pages/profile/profile.component';
import PostsPage from './pages/posts/posts.component';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <>
          <section className='container'>
            <Route
              path='/sign-in'
              render={() =>
                currentUser ? <Redirect to='/dashboard' /> : <SignInAndSignOut />
              }
            />
            <PrivateRoute exact path='/dashboard' component={DashboardPage} />
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/add-experience' component={AddExperience} />
            <PrivateRoute exact path='/add-education' component={AddEducation} />
            <Route exact path='/profiles' component={ProfilesPage} />
            <Route exact path='/profile/:id' component={ProfilePage} />
            <PrivateRoute exact path='/posts' component={PostsPage} />
          </section>
        </>
      </Switch>
      <Alerts />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
