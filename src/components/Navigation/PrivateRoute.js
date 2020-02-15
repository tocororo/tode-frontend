import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  // const {users, isAuthenticated} = useSelector(state => state.auth)
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2) 
  
  return(
  <Route
    {...rest}
    render={props =>
      oauth2Users ?
       (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

}

export default PrivateRoute;
