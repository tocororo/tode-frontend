import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Button,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import { loadUsers } from './actions/AuthAction'


import NavigationBar from './components/NavigationBar';
import Home from './components/Home'
import Users from './components/Users'
import Editar from './components/Editar'
import ChatPage from './components/Chat/ChatPage'
import Documentos from './components/Documentos/Documentos'
import NewDocument from './components/Documentos/NewDocument'
import ViewDocument from './components/Documentos/ViewDocument'


import {  MdChat } from 'react-icons/md'
import { IoMdDocument } from 'react-icons/io'



const VerticalSidebarDoc = ({ animation, direction, visible }) => (
  <Sidebar    
    animation={animation}
    direction={direction}
    visible={visible}
  >
  <Documentos/>   
  </Sidebar>
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
   <ChatPage/>
   
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
  
    handleChangerigth = (direction,animation) => () =>{
      this.setState({ direction}) 
      this.setState((prevState) => ({ animation, visible: !prevState.visible }))
    }

    handleChangeleft = (direction,animation) => () =>{
      this.setState({ direction}) 
      this.setState((prevState) => ({ animation, visible: !prevState.visible }))
    }

  render() {
    const { animation, dimmed, direction, visible } = this.state

    return (
      <Router>
        <Provider store={store}>
          <NavigationBar />

      <div>     
        <Sidebar.Pushable as={Segment}>        
         
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
          

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <div className=" d-flex justify-content-between">
            <div className="start">
        <Button 
        className="button" 
        active={direction === 'left'}
        onClick={this.handleChangeleft('left')}>
        
        <IoMdDocument className="doc" /> 
        </Button>
        
        </div>     
         
        <div className="center">
            <Segment basic>
            <Route path="/" exact component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/editar" component={Editar} />
            <Route path="/new_document/" component={NewDocument} />
            <Route path="/edit_document/:id" component={NewDocument} />
            <Route path="/view_document/:id" component={ViewDocument} />
           
            </Segment>
            </div>
            <div className="end">
        <Button 
        className="button" 
        active={direction === 'right'}
        onClick={this.handleChangerigth('right')}>
        
        <MdChat className="chats" />
        </Button>        
        </div>        
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
        </Provider>
      </Router>
    );
  }
}
export default App;
