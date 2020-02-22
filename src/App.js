import React, {useEffect} from 'react';
import './App.css';
import {  BrowserRouter as Router } from 'react-router-dom';
import { Provider} from 'react-redux'
import store from './store'
import { OAuth2Loaded, logout } from './actions/OAuth2Action'
import NavigationBar from './components/Navigation/NavigationBar'  
import { getNotificationsNumber, getRequestNumber} from './actions/NotificationAction'

function App()  {

  const sceibaId =localStorage.getItem('sceibaId')
  const token = localStorage.getItem('token');
  const expires_in = localStorage.getItem('expires_in');  

  useEffect(() =>{    
    store.dispatch(OAuth2Loaded(sceibaId));    
    
    if(token){
    const timer = setTimeout(() => {  
      store.dispatch(logout());
    }, 1000 * 60 * 60);
    return () => {
      clearTimeout(timer)
    }; 
   };
},[expires_in])
  
    return (
      <Router>
        <Provider store={store}>
          <NavigationBar/>
        </Provider>
      </Router>
    );
  }

export default App;

