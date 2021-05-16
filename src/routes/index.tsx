import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashbord';
import UpdateRole from '../pages/UpdateRole/indext';
import ForgottenPassword from '../pages/ForgottenPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import CreatePortfolio from '../pages/CreatePortfolio';
import CreateObservation from '../pages/CreateObservation';
import CreateObservationToClass from '../pages/CreateObservationToClass';
import Portfolio from '../pages/Portfolio';
import PortfolioWithEmailPermission from '../pages/PortfolioWithEmailPermission';
import UpdateObservation from '../pages/UpdateObservation';
import UpdatePortfolio from '../pages/UpdatePortfolio';
import InviteParent from '../pages/InviteParent';
import InstitutionDashboard from '../pages/InstitutionDashbord';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgottenpassword" component={ForgottenPassword} />
        <Route path="/reset-password" component={ResetPassword} />

        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/createportfolio" component={CreatePortfolio} isPrivate />
        <Route
          path="/createobservationtoclass"
          component={CreateObservationToClass}
          isPrivate
        />
        <Route
          path="/createobservation/:portfolio"
          component={CreateObservation}
          isPrivate
        />
        <Route
          path="/updateobservation/:portfolio/:observation"
          component={UpdateObservation}
          isPrivate
        />
        <Route
          path="/updateportfolio/:portfolio"
          component={UpdatePortfolio}
          isPrivate
        />
        <Route path="/portfolio/:portfolio+" component={Portfolio} isPrivate />
        <Route
          path="/portfoliowithpermission/:portfolio+"
          component={PortfolioWithEmailPermission}
          isPrivate
        />
        <Route
          path="/inviteparent/:portfolio+"
          component={InviteParent}
          isPrivate
        />
        <Route path="/user/:user+" component={UpdateRole} isPrivate />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/admindashboard" component={AdminDashboard} isPrivate />
        <Route
          path="/portfoliobyinstitution/:user+"
          component={InstitutionDashboard}
          isPrivate
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
