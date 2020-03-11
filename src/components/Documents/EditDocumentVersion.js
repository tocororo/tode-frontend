import React, {Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom';
import { Button, Form, TextArea, Sidebar, Segment, Container, Input, Table } from 'semantic-ui-react'
import '../../css/editpage.css'
import styled from 'styled-components'
import Moment  from 'react-moment'

import { editDocument_version, getDocument_version_content, getDocument_versionById} from '../../actions/DocumentVersionAction'
import ChatPage from '../Chat/ChatPage'
import DocumentModal from '../Utils/DocumentModal';


const MyTable = styled(Table)`
  &&& {
    background-color:#1d314d;
    margin-bottom: 10vh;
  }
`

const MySidebar = styled(Sidebar)`
  &&& {
    background-color:#efefef;
  }
`
const MyButton = styled(Button)`
&&&{
    background-color:#1d314d;
    color:white;
}

&&&:hover{
  background-color:#0f1d31;
  color:whitesmoke;
}
`


function EditDocumentVersion(props) {
    /* creando variables de estado y un metodo para modificarlas */
  /* const [coment, setComent] = useState('');
  const [document, setDocument] = useState('');
  const [document_user, setDocument_user] = useState('');
  const [visible, setVisible] = useState(false); */
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [document, setDocument] = useState('');
  const [document_user, setDocument_user] = useState('');
  const [open, setOpen] = useState(false);

  /* utilizando variables de los reducers.js */
  // const users = useSelector(state => state.auth.user);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2);
  const {document_version_content, version}  = useSelector(state => state.doc_version);

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()
  const history = useHistory()

  // useeffect for componentDidMount, ComponentDidUpdate, componentWillUnmount    

  useEffect( () =>{
    dispatch(getDocument_versionById(props.match.params.id));
    dispatch(getDocument_version_content(props.match.params.id));    
    setText(document_version_content);        
  },[document_version_content, version._id])

    // funcion que controla la visibilidad del chat 
    /* const showChat = () => {
      setVisible( prevState => !prevState.visible )
    } */


    const handleOpen = () => {
      setOpen( true )  
    }

    const OnChange = e => {
      setText( e.target.value, );  
      if (oauth2IsAuthenticated) {
        setDocument_user(oauth2Users._id)    
        setDocument(version.document._id)     
      }        
    };

    const OnChangeImage = e => {
      setImage( e.target.files[0], ); 
      
    };


    const OnSubmitVersion = (comment) => (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('comment', comment);
      formData.append('document_user', document_user);
      formData.append('document', document);
      formData.append('text', text);
      formData.append('image', image);
      dispatch(editDocument_version(formData, history));
  }
       
      return (          
        <Container>
        <DocumentModal type='new_version' edit={open} OnSubmitVersion={OnSubmitVersion}/>
          <Segment > 
          { version.document ?
            <MyTable key={version._id} padded='very' inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{version.document.name}</Table.HeaderCell>
                <Table.HeaderCell>{version.document_user.name}</Table.HeaderCell>
                {/* <Table.HeaderCell>{version.document_user}</Table.HeaderCell> */}
                <Table.HeaderCell><Moment fromNow>{version.createdAt}</Moment></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            </MyTable>
            : null
          }
              <Form /* onSubmit={OnSubmit} */ >
                  <Form.Field>
                      <TextArea
                          style={{ minHeight: 100}}
                          type="text"
                          id="text"
                          name="text"
                          onChange={OnChange}
                          value={text}
                          required
                      />
                  </Form.Field>
                  <Form.Field>
                      <Input
                          type="file"
                          name='image'
                          onChange={OnChangeImage}
                      />
                  </Form.Field>
                  
                  <Form.Field>
                      <MyButton onClick={handleOpen}> Guardar </MyButton>
                  </Form.Field>
              </Form>
            </Segment>
        </Container>
        )
    }
   /*  const newVersion = { coment, document_user, document }
   
        return (   
          <Fragment>
            <MySidebar.Pushable >

            <MySidebar
              animation='overlay'
              direction='right'
              onHide={() => setVisible( false )}
              visible={visible}
              width='wide'
            >
            <ChatPage />
            </MySidebar>

            <MySidebar.Pusher dimmed={visible}>
           {<div className="container">
            <div />
            <div className="center"> 
            <Form  onSubmit={ OnSubmit } >
                <Form.Field>
                    <TextArea
                        style={{ minHeight: 100}}
                        type="text"
                        id="coment"
                        name="coment"
                        onChange={OnChange}
                        value={coment}
                        required
                    />
                </Form.Field>
                
                <Form.Field>
                    <Button onClick={handleOpen}> Guardar </Button>
                </Form.Field>
            </Form>
             </div>

            <div className="end">
              <MyButton
                className="button"
                onClick={showChat}>

                <Icon name='chat' />
              </MyButton>
            </div>
    
            </div> 
 }
            </MySidebar.Pusher>
            </MySidebar.Pushable>

            <DocumentModal type='new_version' handleOpen={handleOpen} open={open} newVersion={newVersion}/>
          </Fragment>
        )
    } */


export default EditDocumentVersion