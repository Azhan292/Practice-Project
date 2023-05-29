import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, component: Component, ...restProps}) => {
    return (
        <Route
            {...restProps}
            component={(props) =>
                isAuthenticated && localStorage.getItem('userType') === 'Freelancer'
                ? <Redirect to="/Jobs" /> 
                : isAuthenticated && localStorage.getItem('userType') === 'Client' 
                ? <Redirect to="/Findtalent" /> 
                : <Component {...props} />
            }
        />
    )
}

export default PublicRoute;
