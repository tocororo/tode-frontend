import React, { useState, Fragment, useContext } from 'react'
import {  useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu} from 'semantic-ui-react'
import { SideBarContext } from '../contexts/SideBar';
import { ChatContext } from '../contexts/ChatContext';
        
function SideBar (props) {
    const history = useHistory()

    const [state, setState] = useState({activeItem: 'a'})

    const {open,toogleOpen} = useContext(SideBarContext)
    const {trueDisabled} = useContext(ChatContext) 
    
    const handleItemClick = (e, { name, url }) => {
    setState({ activeItem: name })
    toogleOpen()
    history.push(url)
    //localStorage.setItem('doc_chat', '')
    trueDisabled()
    }

    const handleItemClickGest= (e, { name }) => {
      setState({ activeItem: name })
      window.open("https://10.2.64.4:4000/oauth2", "_self")
      }

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)

        /** MENU FOR USERS AUTHENTICATEDS */
        const authLinks = (
          <Fragment >
            <Menu color='teal' inverted size='massive' vertical>
              <Menu.Item
              name='a'
              active={state.activeItem === 'a'}
              onClick={handleItemClick} 
              url="/documents"
              >
                Mi Biblioteca
              </Menu.Item>
      
              <Menu.Item 
              name='b'
              active={state.activeItem === 'b'}
              onClick={handleItemClick} 
              url="/documents-shared"
              >
                Biblioteca Compartida
              </Menu.Item>
      
              <Menu.Item 
              name='c'
              active={state.activeItem === 'c'}
              onClick={handleItemClick} 
              url="/new_document"
              >              
                Nuevo Documento
              </Menu.Item>
            </Menu>
          </Fragment>
        )

        /** MENU FOR USERS NOT AUTHENTICATEDS */
        const gestLinks = (

            <Fragment >
              <Menu color='teal' inverted size='massive' vertical>
                <Menu.Item
                name='a'
                active={state.activeItem === 'a'}
                onClick={handleItemClickGest} 
                >
                  Mi Biblioteca
                </Menu.Item>
        
                <Menu.Item 
                name='b'
                active={state.activeItem === 'b'}
                onClick={handleItemClickGest} 
                >
                  Biblioteca Compartida
                </Menu.Item>
        
                <Menu.Item 
                name='c'
                active={state.activeItem === 'c'}
                onClick={handleItemClickGest} 
                >              
                  Nuevo Documento
                </Menu.Item>
              </Menu>
            </Fragment>

        )

        return (
            <div className="menu-lateral">
                {oauth2IsAuthenticated ? authLinks : gestLinks}

            </div>
        )
}

export default SideBar




