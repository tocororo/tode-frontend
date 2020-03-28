import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2) 
  let date = new Date();
  
  return(
    <Route
      {...rest}
      render={props =>
        oauth2Users && localStorage.getItem('expires_in') > date.getTime()
        ? <Component {...props} />
        : window.open("https://10.2.64.4:4000/oauth2", "_self")
      }
    />
  )
}

export default PrivateRoute;
