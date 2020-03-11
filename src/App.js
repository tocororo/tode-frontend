import React, {useEffect} from 'react';
import './App.css';
import {  BrowserRouter as Router } from 'react-router-dom';
import { Provider} from 'react-redux'
import store from './store'
import { OAuth2Loaded, logout } from './actions/OAuth2Action'
import NavigationBar from './components/Navigation/NavigationBar'
import ConfirmContextProvider from './components/contexts/ConfirmContext';
import SideBarContextProvider from './components/contexts/SideBar';

function App()  {
  
  useEffect(() =>{    
  if (localStorage.getItem('token') ) {
    store.dispatch(OAuth2Loaded())
  } else {
    store.dispatch(logout())
  }   
       
},[localStorage.getItem('expires_in')])
  
    return (
      <Router>
          <Provider store={store}>
            <SideBarContextProvider>
              <ConfirmContextProvider>
                <NavigationBar/>
              </ConfirmContextProvider>
            </SideBarContextProvider>
          </Provider>
      </Router>
    );
  }

export default App;

