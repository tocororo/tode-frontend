import React, { Component } from 'react'
import axios from 'axios'



class ViewDocumentVersionContent extends Component {
    state = {
        content:""
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
        const res = await axios.get(`/document_version_content/${this.props.match.params.id}`)
        this.setState({content:res.data})
    }
}


    render() {

        return (
            <textarea name="content" id="" cols="30" rows="10" value={this.state.content}>  </textarea>
        
        )
    }
}


export default ViewDocumentVersionContent