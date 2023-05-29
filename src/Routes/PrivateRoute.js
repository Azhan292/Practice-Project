import React from "react";
import { Route, Redirect } from "react-router-dom";
import ProfileSetup from "../Screens/ProfileSetup/ProfileSetup";

const PrivateRoute = ({ isAuthenticated, userInfo, component: Component, ...restProps }) => {
    return (
        <Route
            {...restProps}
            component={(props) =>
                isAuthenticated && userInfo.completeStatus ? ( 
                    <Component {...props} /> 
                ) : isAuthenticated && !userInfo.completeStatus ? ( 
                    <ProfileSetup />
                ) : (
                    <Redirect to="/Signin" /> 
                )
            }
        />
    )
}

export default PrivateRoute;
