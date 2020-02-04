import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  const user = useSelector(state => state.auth.user); 
  
  return(
  <Route
    {...rest}
    render={props =>
      user ?
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
