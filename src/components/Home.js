import React, { Component } from 'react'
import ProyectoTocororo from '../assets/ProyectoTocororo.png'
import CRAI from '../assets/CRAI.png'
import '../css/home.css'
import qs from 'qs'
//import 'bootstrap/dist/css/bootstrap.min.css'

export default class Home extends Component {
    componentDidMount(){
        console.log(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sceibaId);
        localStorage.setItem('sceibaId', qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).sceibaId);
        localStorage.setItem('token', qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).token);
        localStorage.setItem('expires_in', qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).expires_in);
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
