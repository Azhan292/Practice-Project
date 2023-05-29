import React from "react";

// Routes
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// redux
import { useSelector } from "react-redux";

// All Pages
import Home from "../Screens/Home/Home";
import Terms from "../Screens/Terms/Terms";
import Privacy from "../Screens/Privacy/Privacy";
import Signin from "../Screens/auth/Signin";
import Signup from "../Screens/auth/Signup";
import FreelancerDetails from "../Screens/Home/FreelancerDetails/FreelancerDetails";
import ProfileSetup from "../Screens/ProfileSetup/ProfileSetup";
import Message from "../Screens/Messages/Message";
import Notifications from "../Screens/Notifications/Notifications";
// freelancer side pages
import Jobs from "../Screens/Jobs/Jobs";
import JobDetails from "../Screens/Jobs/JobDetails";
import SellerDashboard from "../Screens/SellerDashboard/Dashboard";
import Transactions from "../Screens/Transactions/Transactions";
import Withdraw from "../Screens/Withdraw/Withdraw";
import PaypalWithdraw from "../Screens/Withdraw/PaypalWIthdraw";
import SubmittedProposal from "../Screens/SubmittedProposal/SubmittedProposal";
// client side pages
import AddProject from "../Screens/Client/AddProject/AddProject";
import AllFreelancers from "../Screens/Client/FindFreelancers/AllFreelancers";
import Freelancer from "../Screens/Client/FindFreelancers/FreelancerDetails";
import ClientDashboard from "../Screens/Client/ClientDashboard/Dashboard";
import MyJobs from "../Screens/Client/MyJobs/MyJobs";
import Proposals from "../Screens/Client/MyJobs/Proposals/Proposals";
import Profile from "../Screens/Client/MyJobs/Proposals/Profile/Profile";
import PlaceOrder from "../Screens/Client/PlaceOrder/PlaceOrder";

// Loader
import Loading from "../Screens/Loader/Loading";
import JobRequests from "../Screens/JobRequests/JobRequests";

const Routes = ({ isAuthenticated, userInfo }) => {
  const { loading } = useSelector((state) => state.userReducer);
  return loading ? (
    <Loading />
  ) : (
    <Router>
      <Switch>
        <PublicRoute
          path="/"
          component={Home}
          exact={true}
          isAuthenticated={isAuthenticated}
        />
        <PublicRoute
          path="/freelancerdetails/:freelancerId"
          component={FreelancerDetails}
          exact={true}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/Terms" component={Terms} exact={true} />
        <Route path="/Privacy" component={Privacy} exact={true} />
        <PublicRoute
          path="/Signin"
          component={Signin}
          exact={true}
          isAuthenticated={isAuthenticated}
        />
        <PublicRoute
          path="/Signup"
          component={Signup}
          exact={true}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/setprofile"
          component={ProfileSetup}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Message"
          component={Message}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/jobRequests"
          component={JobRequests}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/notifications"
          component={Notifications}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        {/* freelancer side routes */}
        <PrivateRoute
          path="/Jobs"
          component={Jobs}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/JobDetails/:jobId"
          component={JobDetails}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/sellerdashboard"
          component={SellerDashboard}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Transactions"
          component={Transactions}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Withdraw"
          component={Withdraw}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Withdraw/Paypal"
          component={PaypalWithdraw}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/SubmittedProposals"
          component={SubmittedProposal}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        {/* client side routes */}
        <PrivateRoute
          path="/AddProject"
          component={AddProject}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Findtalent"
          component={AllFreelancers}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Freelancer/:freelancerId"
          component={Freelancer}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/clientdashboard"
          component={ClientDashboard}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Myjobs"
          component={MyJobs}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Myjobs/:jobId"
          component={Proposals}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/Profile/:freelancerId"
          component={Profile}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
        <PrivateRoute
          path="/PlaceOrder/:freelancerId/:projectId"
          component={PlaceOrder}
          exact={true}
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
