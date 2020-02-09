import React, {Component} from 'react';
import './App.css';
import {  BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import { loadUsers } from './actions/AuthAction'
import NavigationBar from './components/Navigation/NavigationBar'

class App extends Component  {
  

  componentDidMount(){
    store.dispatch(loadUsers())  
}
  
  render(){
    return (
      <Router>
        <Provider store={store}>
          <NavigationBar/>
        </Provider>
      </Router>
    );
  }
}
export default App;
