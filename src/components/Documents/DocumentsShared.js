import React, {Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom';
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocuments } from '../../actions/DocumentAction'
import { Accordion, Icon, Container, Grid} from 'semantic-ui-react'
import Moment  from 'react-moment'
import '../../css/DocumentsPage.css'
import styled from 'styled-components'

function DocumentsShared () {
  /* creando variables de estado y un metodo para modificarlas */
  const [activeIndex, setActiveIndex] = useState(0);

  /* utilizando variables de los reducers.js */
  const docs_version = useSelector(state => state.doc_version.docs_version);
  const {docs, perms} = useSelector(state => state.doc);
  // const {users, isAuthenticated} = useSelector(state => state.auth)
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)

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
        <Grid columns={6} columns='equal' divided>
          <Grid.Row>
            <h2>Biblioteca Compartida</h2>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              Articulo
            </Grid.Column>
            <Grid.Column>
              Comentario
            </Grid.Column>
            <Grid.Column>
              Usuario
            </Grid.Column>
            <Grid.Column>
              Fecha
            </Grid.Column>
            <Grid.Column>
              Opciones
            </Grid.Column>
          </Grid.Row> 
          {
        //docs.map(doc =>   
        perms.map(perm => 
           oauth2IsAuthenticated && oauth2Users._id === perm.withPermisions._id && oauth2Users._id !== perm.document.document_user && perm.requestAcepted === true ?  
          
            /**
            ACCORDION FOR MAIN DOCUMENT
             */
        <Grid.Row key={perm._id}>
          <Accordion fluid styled >
             <Accordion.Title
               active={activeIndex === perm._id}
               index={perm._id}
               onClick={handleClick}
             >
              <Fragment>
                <Grid columns={6} columns='equal' divided>
                  <Grid.Row color='blue'>
                      <Grid.Column><Icon name='dropdown'/>{perm.document.name}</Grid.Column>
                      <Grid.Column>{perm.document.coment}</Grid.Column>
                      <Grid.Column>{perm.withPermisions.name}</Grid.Column>
                      <Grid.Column>
                        <Moment fromNow>{perm.document.createdAt}</Moment>
                      </Grid.Column>
                      <Grid.Column>
                      </Grid.Column>
                  </Grid.Row>  
                </Grid>   
              </Fragment>
            </Accordion.Title>

            {/**
             ACCORDION FOR DOCUMENTS VERSIONS 
            */}
            <Accordion.Content active={activeIndex === perm._id}>
              {docs_version.map(doc_version => 
                 perm.document._id === doc_version.document._id ?
                  <Fragment key={doc_version._id}>
                    <Grid columns={6} columns='equal' celled>
                      <Grid.Row color='teal'>
                         <Grid.Column>{doc_version.document.name}</Grid.Column>
                         <Grid.Column>{doc_version.coment}</Grid.Column>
                         <Grid.Column>{doc_version.document_user.name}</Grid.Column>
                         <Grid.Column><Moment fromNow>{doc_version.createdAt}</Moment></Grid.Column>
                         <Grid.Column>
                           <Link
                             to={"/edit_document_version/" + doc_version._id}>
                             <Icon name='pen square' color='orange' size='big'/>
                           </Link>
                         </Grid.Column>
                       </Grid.Row>
                    </Grid>
                   </Fragment>
              : null)}
            </Accordion.Content>
          </Accordion>
          </Grid.Row>
             :null
             // )
          )
              }
          </Grid>      
        </Container>
            
        )
    }

export default DocumentsShared