import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Route } from 'react-router-dom';


import NavigationBar from './components/NavigationBar';
import Home from './components/Home'
import Users from './components/Users'
import Editar from './components/Editar'


import { Provider } from 'react-redux'
import store from './store'
import { loadUsers } from './actions/AuthAction'


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUsers())
  }
  render() {
    return (
      <Router>
        <Provider store={store}>
          <NavigationBar />
          <div className="container p-4">
            <Route path="/" exact component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/editar" component={Editar} />

          </div>
        </Provider>
      </Router>
    );
  }
}
export default App;
