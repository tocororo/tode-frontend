import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocuments } from '../../actions/DocumentAction'
import { Accordion, Icon, Table, Container,  Segment, Header} from 'semantic-ui-react'
import Moment  from 'react-moment'
import '../../css/DocumentsPage.css'
import styled from 'styled-components'

/* estilo modificado para table */
const MyTable = styled(Table)`
  &&& {
    background-color:#1d314d;
  }
`
const MyLink = styled(Link)`
  &&& {
    background-color:#1d314d;
  }
`

function DocumentsShared () {
  /* creando variables de estado y un metodo para modificarlas */
  const [activeIndex, setActiveIndex] = useState(0);

  /* utilizando variables de los reducers.js */
  const docs_version = useSelector(state => state.doc_version.docs_version);
  const {docs, perms} = useSelector(state => state.doc);
  const user = useSelector(state => state.auth.user); 

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()

  // useeffect for componentDidMount, ComponentDidUpdate, componentWillUnmount  
  useEffect( () =>{
    dispatch(getDocuments());
    dispatch(getDocument_version());
  },[])

  /* funcion para manejar la apertura y cierre del accordion */
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex )
  }


      return (

          <Container>       
            {
              docs.length !== 0 ?              
            docs.map(doc =>   
             perms.map(perm => 
               user &&  doc._id === perm.document._id &&  user._id === perm.withPermisions._id &&user._id !== perm.document.document_user && perm.requestAcepted === true ? 
               
              /**
              ACCORDION FOR MAIN DOCUMENT
               */
             <Accordion fluid styled key={perm._id}>
                <Accordion.Title
                  active={activeIndex === perm._id}
                  index={perm._id}
                  onClick={handleClick}
                >
                  <MyTable padded='very' inverted>
                    <Table.Header>
                     <Table.Row>
                    <Table.HeaderCell><Icon name='dropdown'/></Table.HeaderCell>
                    <Table.HeaderCell>{perm.document.name}</Table.HeaderCell>
                    <Table.HeaderCell>{perm.document.coment}</Table.HeaderCell>
                    <Table.HeaderCell>{doc.document_user.name}</Table.HeaderCell>
                    <Table.HeaderCell>{doc.document_user.rol}</Table.HeaderCell>
                    <Table.HeaderCell><Moment fromNow>{perm.document.createdAt}</Moment></Table.HeaderCell>
                  </Table.Row>  
                </Table.Header>     
              </MyTable>
            </Accordion.Title>

             {/**
              ACCORDION FOR DOCUMENTS VERSIONS 
             */}
            <Accordion.Content active={activeIndex === perm._id}>
            {docs_version.map(doc_version => 
              perm.document._id === doc_version.document._id ?
                <Table padded='very' color="blue" key={doc_version._id}>
                  <Table.Header>
                    <Table.Row>
                      <Table.Cell>{doc_version.document.name}</Table.Cell>
                      <Table.Cell>{doc_version.coment}</Table.Cell>
                      <Table.Cell>{doc_version.coment}</Table.Cell>
                      <Table.Cell>{doc_version.document_user.name}</Table.Cell>
                      <Table.Cell>{doc_version.document_user.rol}</Table.Cell>
                      <Table.Cell><Moment fromNow>{doc_version.createdAt}</Moment></Table.Cell>
                      <Table.Cell>
                        <Link  
                          to={"/edit_document_version/" + doc_version._id}>
                          <Icon name='pen square' color='orange' size='big' />
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Header>
                </Table>
                                    : "")}
            </Accordion.Content>
          </Accordion>
          :null
          )
        )
      
        :
            
        <Segment placeholder>
        <Header icon>
          <Icon name='pdf file outline' />
          No existen documentos en la biblioteca.
        </Header>
        <MyLink className='button'  to='/new_document' >Adicionar Documento</MyLink>
      </Segment>}
        </Container>
            
        )
    }

export default (withRouter(DocumentsShared))