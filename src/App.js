import React, {useEffect} from 'react';
import './App.css';
import {  BrowserRouter as Router } from 'react-router-dom';
import { Provider} from 'react-redux'
import store from './store'

import { OAuth2Loaded } from './actions/OAuth2Action'
import NavigationBar from './components/Navigation/NavigationBar'
import ConfirmContextProvider from './components/contexts/ConfirmContext';
import SideBarContextProvider from './components/contexts/SideBar';
import ChatContextProvider from './components/contexts/ChatContext'

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

