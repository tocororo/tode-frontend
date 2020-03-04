import React from 'react';
import { Segment, Sidebar,} from 'semantic-ui-react'
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import styled from 'styled-components'

import PrivateRoute from './PrivateRoute'
import SideBarContent from './SideBarContent';
import Home from '../Home'
import Documentos from '../Documents/Documentos'
import DocumentsShared from '../Documents/DocumentsShared'
import Permisions from '../Permisions/Permisions'
import NewDocument from '../Documents/NewDocument'
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
 return(
    <MySidebar.Pushable >

        <MySidebar
        animation='overlay'
        icon='labeled'
        inverted
        onHide={props.onHide}
        vertical
        visible={props.visibility}
        width='wide'
        >
        <SideBarContent />
        </MySidebar>


        <MySidebar.Pusher dimmed={props.visibility}>
                <MySegment basic>
                <Route exact path="/" component={Home} />
                <Route exact path="/login-oauth2" component={LoginOauth2} />
                <Route exact path="/texture" component={Texture} />
                <Switch>
                  <PrivateRoute exact path="/documents" component={Documentos} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/documents-shared" component={DocumentsShared} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/new_document" component={NewDocument} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/dropzone/:name" component={Dropzone} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-content/:name" component={AddContent} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/permisions/:id" component={Permisions} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit_document_version/:id" 
                                    component={EditDocumentVersion} /> 
                </Switch>
                </MySegment>
        </MySidebar.Pusher>
    </MySidebar.Pushable>
 )
}

export default NavigationSideBar