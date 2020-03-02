import React, {Fragment, useState, useEffect } from 'react';
import { Menu, Icon, Dropdown} from 'semantic-ui-react'
import { useHistory, Link} from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import NavigationSideBar from './NavigationSideBar';
import Request from '../Notifications/Request'
import Notifications from '../Notifications/Notifications'
import LoginOauth2 from '../User/LoginOauth2'
// import RegisterModal from '../User/Register'
// import LoginModal from '../User/Login'

import {logout} from '../../actions/OAuth2Action'
import {getNotifications, getNotificationsNumber, getRequestNumber} from '../../actions/NotificationAction'

const MyLink = styled(Link)`
&&&{
    color:#df3e32;
}

&&&:hover{
    color:tomato;
}
`
const MyIcon = styled(Icon)`
  &&& {
   color: white;
  }
`

const MyMenu = styled(Menu)`
  &&& {
   margin: 0;
   position: sticky;
  top: 0;
  z-index: 100;
  }
`


function NavigationBar ()  {
  const [state, setState] = useState({
    visible: false
  })

  const dispatch = useDispatch()
  const history = useHistory()

    // const {users, isAuthenticated} = useSelector(state => state.auth)
    const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)

    const {notificationsNumber, requestNumber} = useSelector(state => state.notification);

  const showMenu = () => {
    setState( state => ({...state, visible: !state.visible }))   
     
  }

  const onHide = () => setState({...state, visible: false})
  

  useEffect(() => {    
      dispatch(getNotifications())    
      dispatch(getNotificationsNumber());    
      dispatch(getRequestNumber());
  },[notificationsNumber, requestNumber])

  const trigger = (
    oauth2IsAuthenticated ?
    <span>
    <MyIcon name='user circle' size='big'/> {oauth2Users.name}
    </span>
    :null
  )


  /** MENU FOR USERS AUTHENTICATEDS */
  const authLinks = (
    <MyMenu color='teal' inverted size='small'>
            <MyMenu.Item onClick={showMenu} >
                <MyIcon size='big' name='bars' />
            </MyMenu.Item>
        <MyMenu.Item>
            <MyLink className="navbar-brand" to='/'> <h1>TODE</h1></MyLink>
        </MyMenu.Item>
        <MyMenu.Menu position='right'>
            <MyMenu.Item>
                <Request count={requestNumber}/>
            </MyMenu.Item>
            <MyMenu.Item>
                <Notifications count={notificationsNumber}/>
            </MyMenu.Item>    
            <Dropdown 
                item
                trigger={trigger}
                icon={null}
                >
                <Dropdown.Menu >               
                    <Dropdown.Item onClick={() => dispatch(logout(history))}>
                        <Icon name='log out' color='red'/> Log Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </MyMenu.Menu>
    </MyMenu>

        
)

/** MENU FOR USERS NOT AUTHENTICATEDS */
const gestLinks = (

    <Fragment >
        <MyMenu color='teal' inverted size='small'>
            <MyMenu.Item onClick={showMenu} >
                <MyIcon size='big' name="bars" />
            </MyMenu.Item>
            <MyMenu.Item>
                <MyLink className="navbar-brand" to='/'> <h1>TODE</h1></MyLink>
            </MyMenu.Item>
            <MyMenu.Menu position='right'>
                <MyMenu.Item>
                    <LoginOauth2/>
                </MyMenu.Item>
            </MyMenu.Menu>
        </MyMenu>
    </Fragment>

)
  
    return (
          <div>
            {oauth2IsAuthenticated ? authLinks : gestLinks}
            <NavigationSideBar onHide={onHide} visibility={state.visible}/>
          </div>
    );
  }
export default NavigationBar;
