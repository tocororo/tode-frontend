import React, { Component } from 'react'

import Content from './Sidebar/Content'
import Sidebar from './Sidebar/Sidebar'
import '../css/sidebar.css'




export default class Editar extends Component {
    render() {
        return (
            <div className="edit">
                <Sidebar />
                <Content />
            </div>
        )
    }
}
