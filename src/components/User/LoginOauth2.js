import React from "react";
import { useDispatch} from 'react-redux'
import {Button} from 'semantic-ui-react'
import styled from 'styled-components'

const MyButton = styled(Button)`
&&&{
    background-color:#1d314d;
    color:white;
}
&&&:hover{
  background-color:#0f1d31;
  color:whitesmoke;
}
`

function LoginOauth2(props){

    const dispatch = useDispatch()

    const _handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        // Upon successful login, a cookie session will be stored in the client
        window.open("https://10.2.64.4:4000/oauth2", "_self");
    };
    
    return(
          <MyButton onClick={_handleSignInClick}>Login with sceiba</MyButton>
    )
}

export default LoginOauth2