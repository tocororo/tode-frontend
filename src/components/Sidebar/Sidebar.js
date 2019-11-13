import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDocuments, getDocument } from '../../actions/DocumentAction'
import '../../css/sidebar.css'

import SidebarIcon from './SidebarIcon'
import ChatPage from '../Chat/ChatPage'


class Sidebar extends Component {
    state = {
        isOpen: false
    }


    componentDidMount() {
        this.props.getDocuments();

        console.log(this.props.doc.docs);

    }

    listarDocs = () => {
        const { docs } = this.props.doc;
        const nameDocs = new Array(docs.lengt);

        for (let i = 0; i < docs.length; i++) {

            let element = docs[i].split("/");

            let docHtml = element[element.length - 1].split('.')

            if (element[element.length - 1] !== "manifest.xml") {
                if (docHtml[docHtml.length - 1] === "html") {
                    nameDocs[i] = (
                        <li key={uuid()} className="list-group-item">{docHtml[0]}
                        </li>
                    )
                }
            }
        }
        return nameDocs
    }

    renderSidebar = () => {
        if (!this.state.isOpen) {
            return null
        }
        return <div className="sidebar">
            <div id="chat">
                <h4>Manifiestos en producción</h4>
            </div>
            <ul className="list-group"  >
                {this.listarDocs()}
            </ul>
            <div id="chat">
                <h4>Mensajes</h4>
            </div>
            <ChatPage />
        </div>
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    render() {
        return <div className="sidebar-container">

            {this.renderSidebar()}


            <div className="sidebar-icon">
                <SidebarIcon
                    isOpen={this.state.isOpen}
                    handleClick={this.toggleSidebar}
                />
            </div>
        </div>
    }
}

Sidebar.propTypes = {
    getDocuments: PropTypes.func.isRequired,
    getDocument: PropTypes.func.isRequired,
    doc: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    doc: state.doc
})

export default connect(mapStateToProps, { getDocuments, getDocument })(Sidebar)