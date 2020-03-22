import React, {useContext} from 'react';
import { Segment, Sidebar,} from 'semantic-ui-react'
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import styled from 'styled-components'

import { SideBarContext } from '../contexts/SideBar';
import PrivateRoute from './PrivateRoute'
import SideBarContent from './SideBarContent';
import Home from '../Home'
import Documentos from '../Documents/Documentos'
import DocumentsShared from '../Documents/DocumentsShared'
import Permisions from '../Permisions/Permisions'
import EditDocumentVersion from '../Documents/EditDocumentVersion'
import AddContent from '../Documents/AddContent'
import LoginOauth2 from '../User/LoginOauth2'
import Dropzone from '../Documents/Dropzone'
import Texture from '../Texture/Texture'
import URLNotFound from './URLNotFound'

const MySidebar = styled(Sidebar)`
  &&& {
    background-color:grey;
  }
`
const MySegment = styled(Segment)`
  &&& {
    min-height: 90vh;
  }
`

function NavigationSideBar (props) {

  const {open,toogleOpen} = useContext(SideBarContext)

 return(
   
    <MySidebar.Pushable >

        <MySidebar
        animation='overlay'
        icon='labeled'
        onHide={null}        
        visible={open}
        width='wide'
        >
        <SideBarContent />
        </MySidebar>


        <MySidebar.Pusher dimmed={open}>
                <MySegment basic>

                <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login-oauth2" component={LoginOauth2} />
                <Route exact path="/texture" component={Texture} />
                  
                  <PrivateRoute exact path="/documents" component={Documentos} />
                 
                  <PrivateRoute exact path="/documents-shared" component={DocumentsShared} />
                
                  <PrivateRoute exact path="/new_document" component={AddContent} />
                
                  <PrivateRoute exact path="/dropzone" component={Dropzone} />
                
                  <PrivateRoute exact path="/permisions/:id" component={Permisions} />
               
                  <PrivateRoute exact path="/edit_document_version/:id" 
                                    component={EditDocumentVersion} /> 
               
                  <Route component={URLNotFound} />
                </Switch>
                
                </MySegment>
        </MySidebar.Pusher>
    </MySidebar.Pushable>
 )
}

export default NavigationSideBar