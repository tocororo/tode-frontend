import React, { Component } from 'react'
import ProyectoTocororo from '../assets/ProyectoTocororo.png'
import CRAI from '../assets/CRAI.png'
import '../css/home.css'

import '../css/sidebar.css'

import Sidebar from './Sidebar/Sidebar'

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <img id="logo" src={ProyectoTocororo} alt="" />
                <img id="logo1" src={CRAI} alt="" />
                <h2 id='text1'>Bienvenidos a nuestro Editor de Texto Online el cual tiene como objetivo facilitar el proceso editorial para todas las partes involucradas</h2>
                <h4 id='text2'>aun en fase de produccion</h4>
                <Sidebar />
            </div>
        )
    }
}
