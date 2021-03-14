import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../App';

const PrivateRoute = ({children, ...rest}) => {

    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <Route
      {...rest}
      render={({ location }) =>
        LoggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;