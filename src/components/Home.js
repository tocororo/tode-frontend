import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {PropTypes} from 'prop-types'
import ProyectoTocororo from '../assets/ProyectoTocororo.png'
import CRAI from '../assets/CRAI.png'
import '../css/home.css'
import qs from 'qs'

class Home extends Component {
    
    UNSAFE_componentWillMount(){        
        if (qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token) {
            localStorage.setItem('sceibaId', qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sceibaId);
            localStorage.setItem('token', qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token);
            localStorage.setItem('expires_in', qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).expires_in);
        }

    }

    componentDidMount(){
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }
    }
     
    render() {
        return (
            <div >
                <img id="logo" src={ProyectoTocororo} alt="" />
                <img id="logo1" src={CRAI} alt="" />
                <h2 id='text1'>Bienvenidos a nuestro Editor de Texto Online el cual tiene como objetivo facilitar el proceso editorial para todas las partes involucradas</h2>
                <h4 id='text2'>aun en fase de produccion</h4>
            </div>
        )
    }
}

export default withRouter(Home)