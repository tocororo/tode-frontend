import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import Moment  from 'react-moment'
import styled from 'styled-components'
import { Table, Container } from 'semantic-ui-react'
import PermisionSearch from './PermisionSearch'
import {getDocuments} from '../../actions/DocumentAction'

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
  constructor(props){
    super(props)
    this.state = { 
        document:this.props.match.params.id
       }
      }
  componentDidMount() {
     this.props.getDocuments()
  }
      
  render() {
      const {docs, perms} = this.props.doc
    return (
      <Container>
        {/** DIV FOR CURRENT DOCUMENT */}
        <div>
          {docs.map(doc => 
              doc._id === this.state.document ?
              <MyTable key={doc._id} padded='very' inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>{doc.name}</Table.HeaderCell>
                  <Table.HeaderCell>{doc.coment}</Table.HeaderCell>
                  <Table.HeaderCell>{doc.document_user.name}</Table.HeaderCell>
                  <Table.HeaderCell>{doc.document_user.rol}</Table.HeaderCell>
                  <Table.HeaderCell><Moment fromNow>{doc.createdAt}</Moment></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              </MyTable>
          : "" )}
        </div>
        {/** DIV FOR COMPONENT PermisionSearch */}
        <div>
          <PermisionSearch document_id={this.props.match.params.id} />
        </div>
      </Container>
    )
    }
}

const mapStateToProps = (state) => ({
    doc: state.doc
});

export default connect(mapStateToProps, {getDocuments}) (withRouter(Permisions))