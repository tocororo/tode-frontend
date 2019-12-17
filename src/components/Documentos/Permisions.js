import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'
import { getUsers  } from '../../actions/UserAction'
import Moment  from 'react-moment'
import styled from 'styled-components'
import { Table } from 'semantic-ui-react'
import PermisionSearch from './PermisionSearch'

const MyTable = styled(Table)`
  &&& {
    background-color:#1d314d;
    margin-bottom: 10vh;
  }
`
const MyLink = styled(Link)`
  &&& {
    color:red;
  }
`


class Permisions extends Component {
    state = { 
        document:"",
        document_user:"",
        doc:[],
        permision: [],
        editing: false
       }

    async componentDidMount() {
        if (this.props.match.params.id) {
            const res = await axios.get(`/document/${this.props.match.params.id}`)
            this.setState({
                editing: true,
                _id: this.props.match.params.id,
                coment: res.data.coment,
                document: this.props.match.params.id,
                document_user: res.data.document_user
            })
        }

        fetch('/document').then(res => res.json()).then((data) => {
            this.setState({doc:data.docs, permision:data.perms})
            console.log(data.docs);
                  
           })
         .catch(console.log);

        this.props.getUsers(); 
      }
      
    render() {
        const docs = this.state.doc

        return (
            <div>
              {/** DIV FOR CURRENT DOCUMENT */}
              <div>
                {docs.map(doc => (
                    doc._id === this.state.document ?
                    <MyTable padded='very' inverted>
                    <Table.Header>
                     <Table.Row>
                     <Table.HeaderCell>{doc.name}</Table.HeaderCell>
                        <Table.HeaderCell>
                          <MyLink> {doc.coment} </MyLink>
                        </Table.HeaderCell>
                        <Table.HeaderCell>{doc.document_user.name}</Table.HeaderCell>
                        <Table.HeaderCell>{doc.document_user.rol}</Table.HeaderCell>
                        <Table.HeaderCell><Moment fromNow>{doc.createdAt}</Moment></Table.HeaderCell>
                     </Table.Row>
                     </Table.Header>
                    </MyTable>
                : "" ))}
              </div>
              {/** DIV FOR COMPONENT PermisionSearch */}
              <div>
                <PermisionSearch doc={this.props.match.params.id} perm={docs}/>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    auth : state.auth
});

export default connect(mapStateToProps, {getUsers}) (withRouter(Permisions))