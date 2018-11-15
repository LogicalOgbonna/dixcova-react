import React from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";

import RegisterPage from "../components/Forms/RegisterPage/RegisterPage";
import LoginPage from "../components/Forms/LoginPage/LoginPage";
import HomePage from '../components/Pages/HomePage/HomePage';
import AdminDashboard from '../components/Admin/Dashboard/Dashboard';
import UserDashboard from '../components/User/DashBoard/DashBoard';
import SearchAll from '../components/Search/SearchBar';
import ForgotPassword from '../components/Forms/ForgotPassword/ForgotPasssword';
import ProceedPasswordReset from '../components/Forms/ForgotPassword/ProceedPasswordReset';
import Welcome from '../components/Pages/Welcome/Welcome';
import Logout from '../components/Forms/Logout/Logout';

const AdminRoute = ({ component: Component, userData: userData, ...rest }) => (
  <Route {...rest} render={(props) => (
     userData ? userData.role[0].name === "ADMIN"? <Component {...props}/>:<Redirect to='/logout'/> : <Redirect to='/logout' />
  )} />
)


const UserRoute = ({ component: Component, userData: userData, ...rest }) => (
  <Route {...rest} render={(props) => (
     userData ? userData.role[0].name === "USER"? <Component {...props}/>:<Redirect to='/logout'/> : <Redirect to='/logout' />
  )} />
)


class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/Home" component={HomePage} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/search" component={SearchAll} />
        <Route exact path="/proceedpasswordreset" component={ProceedPasswordReset} />
        <AdminRoute userData={this.props.userData} path="/admindashboard" component={AdminDashboard} />
        <UserRoute userData={this.props.userData} path="/userdashboard" component={UserDashboard} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/logout" component={Logout} />
        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
        }
        {/* {console.log(this.props.userData)} */}
      </Switch>
    );
  }
}

export default Routes;
