import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MyLink = styled(Link)`
  &&& {
    color:black;
  }
`


function DocumentsOptions (props) {

    const trigger = (
      <span>
        <Icon name='settings' size='large' color='red'/>
      </span>
    )

    return(
      <Dropdown
        trigger={trigger}
        pointing='top left'
        icon={null}
      >
        <Dropdown.Menu >               
            <Dropdown.Item >
              <MyLink to = {"/permisions/" + props.permision}>
                <Icon name='user plus' color='red'/>  Otorgar Permisios
              </MyLink>
            </Dropdown.Item>
            <Dropdown.Item >
                <Icon name='pencil alternate' color='red'/> Renombrar
            </Dropdown.Item>
            <Dropdown.Item >
                <Icon name='trash alternate outline' color='red'/> Eliminar
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default DocumentsOptions