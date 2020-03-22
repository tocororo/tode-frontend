import React, {Fragment, useState, useEffect, useContext } from 'react';
import { Menu, Icon, Dropdown, Transition} from 'semantic-ui-react'
import { useHistory, Link} from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { SideBarContext } from '../contexts/SideBar';

import NavigationSideBar from './NavigationSideBar';
import Request from '../Notifications/Request'
import Notifications from '../Notifications/Notifications'
import LoginOauth2 from '../User/LoginOauth2'
import { ChatContext } from '../contexts/ChatContext';

import {logout} from '../../actions/OAuth2Action'
import {getNotifications, getNotificationsNumber, getRequestNumber} from '../../actions/NotificationAction'

const MyLink = styled(Link)`
&&&{
    color:#df3e32;

&&&:hover{
    color:grey;
    
}
`
const MyIcon = styled(Icon)`
  &&& {
   color: white;

   &&&:hover{
    color: grey;
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

  const dispatch = useDispatch()
  const history = useHistory()

    // const {users, isAuthenticated} = useSelector(state => state.auth)
    const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)

    const {notificationsNumber, requestNumber} = useSelector(state => state.notification);
    
    const {open,toogleOpen} = useContext(SideBarContext) 
    const {visible,toogleVisible, iconVisible} = useContext(ChatContext) 

    //let chat = localStorage.getItem('doc_chat')

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
    <MyMenu color='teal' inverted size='tiny'>
            <MyMenu.Item onClick={toogleOpen} >
                <MyIcon size='big' name='bars' />
            </MyMenu.Item>
        <MyMenu.Item>
            <MyLink className="navbar-brand" to='/'> <h1>TODE</h1></MyLink>
        </MyMenu.Item>
        <MyMenu.Menu position='right'>        
        { //chat !== '' ?
            <Transition.Group animation='fade' duration={100}>
                {iconVisible && (
                <MyMenu.Item>
                    <MyIcon  name='wechat' size='big' onClick={toogleVisible}/>
                </MyMenu.Item>
                )}   
            </Transition.Group>
        //: null
        }
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
        <MyMenu color='teal' inverted size='tiny'>
            <MyMenu.Item onClick={toogleOpen} >
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
            <NavigationSideBar />
          </div>
    );
  }
export default NavigationBar;
