import React, { Component } from 'react';
import {Button, Segment, Sidebar,} from 'semantic-ui-react'
import './App.css';
import '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import { loadUsers } from './actions/AuthAction'
import styled from 'styled-components'

import PrivateRoute from './components/Navigation/PrivateRoute'
import NavigationBar from './components/Navigation/NavigationBar';
import Home from './components/Home'
import Documentos from './components/Documentos/Documentos'
import DocumentsShared from './components/Documentos/DocumentsShared'
import Permisions from './components/Permisions/Permisions'
import NewDocument from './components/Documentos/NewDocument'
import EditDocumentVersion from './components/Documentos/EditDocumentVersion'

import { GoThreeBars } from 'react-icons/go'

const MySidebar = styled(Sidebar)`
  &&& {
    background-color:#1d314d;
  }
`
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


class App extends Component {
  state = {
    visible: false
  }

  showMenu = () => {
    this.setState((prevState) => ({ visible: !prevState.visible }))
  }

  componentDidMount() {
    store.dispatch(loadUsers())
  }

  
  render() {
    
    return (
      <Router>
        <Provider store={store}>
          <div>
            <MySidebar.Pushable as={Segment}>

            <MySidebar
              animation='overlay'
              icon='labeled'
              inverted
              onHide={() => this.setState({ visible: false })}
              vertical
              visible={this.state.visible}
              width='wide'
            >
            <NavigationBar />
            </MySidebar>


              <MySidebar.Pusher dimmed={this.state.visible}>
                <div className="container">
                  <div className="start">
                    <MyButton
                      className="button"
                      onClick={this.showMenu}>

                      <GoThreeBars className="doc" />
                    </MyButton>

                  </div>

                  <div className="center">
                    <Segment basic>
                      <Route exact path="/" exact component={Home} />
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
                      <PrivateRoute exact path="/permisions/:id" component={Permisions} />
                     </Switch>
                     <Switch>
                      <PrivateRoute exact path="/edit_document_version/:id" 
                                          component={EditDocumentVersion} />
                      </Switch>
                    </Segment>
                  </div>
                  <div/>
                </div>
              </MySidebar.Pusher>
            </MySidebar.Pushable>

          </div>
        </Provider>
      </Router>
    );
  }
}
export default App;
