import React, { useState, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Label, Menu, Segment} from 'semantic-ui-react'
import styled from 'styled-components'

const MySegment = styled(Segment)`
  &&& {
    background-color:#1d314d;
  }
`
        
function SideBar (props) {
    const history = useHistory()

    const [state, setState] = useState({activeItem: 'a'})
    
    const handleItemClick = (e, { name, url }) => {
    setState({ activeItem: name })
    history.push(url)
    }

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

        /** MENU FOR USERS AUTHENTICATEDS */
        const authLinks = (

            <Menu size='massive' vertical>
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
        )

        /** MENU FOR USERS NOT AUTHENTICATEDS */
        const gestLinks = (

            <Fragment >
                <MySegment textAlign='center'>Autentiquese para ver las opciones disponibles para ustedd</MySegment>
            </Fragment>

        )

        return (
            <div className="menu-lateral">
                {isAuthenticated ? authLinks : gestLinks}

            </div>
        )
}

export default SideBar




