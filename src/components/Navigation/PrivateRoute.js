import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2) 
  
  return(
    <Route
      {...rest}
      render={props =>
        oauth2Users 
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />
      }
    />
  )
}

export default PrivateRoute;
