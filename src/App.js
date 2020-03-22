import React, {useEffect} from 'react';
import './App.css';
import {  BrowserRouter as Router } from 'react-router-dom';
import { Provider, useSelector} from 'react-redux'
import store from './store'
import { OAuth2Loaded, logout } from './actions/OAuth2Action'
import NavigationBar from './components/Navigation/NavigationBar'
import ConfirmContextProvider from './components/contexts/ConfirmContext';
import SideBarContextProvider from './components/contexts/SideBar';
import ChatContextProvider from './components/contexts/ChatContext'
import { getDocument_version } from './actions/DocumentVersionAction';
import { getDocuments } from './actions/DocumentAction';

function App()  {
  
  useEffect(() =>{      
    store.dispatch(OAuth2Loaded());
},[])
  
    return (
      <Router>
          <Provider store={store}>
            <SideBarContextProvider>
              <ConfirmContextProvider>
                <ChatContextProvider>
                    <NavigationBar/>
                </ChatContextProvider>
              </ConfirmContextProvider>
            </SideBarContextProvider>
          </Provider>
      </Router>
    );
  }

export default App;

