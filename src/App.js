import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Button, Segment, Sidebar,} from 'semantic-ui-react'
import './App.css';
import '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import { loadUsers } from './actions/AuthAction'
import styled from 'styled-components'


import NavigationBar from './components/NavigationBar';
import Home from './components/Home'
import Users from './components/Users'
import Editar from './components/Editar'
import ChatPage from './components/Chat/ChatPage'
import Documentos from './components/Documentos/Documentos'
import Permisions from './components/Documentos/Permisions'
import NewDocument from './components/Documentos/NewDocument'
import ViewDocumentContent from './components/Documentos/ViewDocumentContent'
import ViewDocumentVersionContent from './components/Documentos/ViewDocumentVersionContent'
import EditDocument from './components/Documentos/EditDocument'
import EditDocumentVersion from './components/Documentos/EditDocumentVersion'
import Texture from './components/Texture/Texture'


import { MdChat } from 'react-icons/md'
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

const VerticalSidebarDoc = ({ animation, direction, visible }) => (
  <MySidebar
    animation={animation}
    direction={direction}
    visible={visible}
    width="thin"
  >
  
    <NavigationBar />
  </MySidebar>
)
VerticalSidebarDoc.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

const VerticalSidebarChat = ({ animation, direction, visible }) => (
  <Sidebar
    animation={animation}
    direction={direction}
    visible={visible}
  >
    <ChatPage />

  </Sidebar>
)

VerticalSidebarChat.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUsers())
  }

  state = {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
  }

  handleChangerigth = (direction, animation) => () => {
    this.setState({ direction })
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))
  }

  handleChangeleft = (direction, animation) => () => {
    this.setState({ direction })
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))
  }

  render() {
    const { animation, dimmed, direction, visible } = this.state

    return (
      <Router>
        <Provider store={store}>
          <div>
            <MySidebar.Pushable as={Segment}>

              {direction === "left" ?
                <VerticalSidebarDoc
                  animation={animation}
                  direction={direction}
                  visible={visible}
                />
                :

                <VerticalSidebarChat
                  animation={animation}
                  direction={direction}
                  visible={visible}
                />
              }


              <MySidebar.Pusher dimmed={dimmed && visible}>
                <div className="container">
                  <div className="start">
                    <MyButton
                      className="button"
                      active={direction === 'left'}
                      onClick={this.handleChangeleft('left')}>

                      <GoThreeBars className="doc" />
                    </MyButton>

                  </div>

                  <div className="center">
                    <Segment basic>
                      <Route path="/" exact component={Home} />
                      <Route path="/users" component={Users} />
                      <Route path="/editar" component={Editar} />
                      <Route path="/document/" component={Documentos} />
                      <Route path="/new_document/" component={NewDocument} />                      
                      <Route path="/permisions/:id" component={Permisions} />
                      <Route path="/view_document/:id" component={ViewDocumentContent} />
                      <Route path="/view_document_version/:id" component={ViewDocumentVersionContent}/>
                      <Route path="/edit_document/:id" component={EditDocument} />
                      <Route path="/edit_document_version/:id" component={EditDocumentVersion} />
                      <Route path="/texture" component={Texture} />


                    </Segment>
                  </div>
                  <div className="end">
                    <MyButton
                      className="button"
                      active={direction === 'right'}
                      onClick={this.handleChangerigth('right')}>

                      <MdChat className="chats" />
                    </MyButton>
                  </div>
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
