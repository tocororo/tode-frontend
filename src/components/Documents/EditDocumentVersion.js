import React, {Fragment, useState, useEffect, createRef, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom';
import { Button, Form, TextArea, Sidebar, Segment, Container, Input, Table } from 'semantic-ui-react'
import '../../css/editpage.css'
import styled from 'styled-components'
import Moment  from 'react-moment'

import { editDocument_version, getDocument_version_content, getDocument_versionById} from '../../actions/DocumentVersionAction'
import Chat from '../ChatRoom/index'
import DocumentModal from './DocumentModal';
import { ChatContext } from '../contexts/ChatContext';
import {getMessages} from '../../actions/MessageAction'


const MyTable = styled(Table)`
  &&& {
    background-color:#1d314d;
    margin-bottom: 10vh;
  }
`
const MySidebar = styled(Sidebar)`
  &&& {
    background-color:teal;
  }
  `
const MySegment = styled(Segment)`
  &&& {
    min-height: 90vh;
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
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [document, setDocument] = useState('');
  const [document_user, setDocument_user] = useState('');
  const [open, setOpen] = useState(false);
  const {visible,toogleVisible} = useContext(ChatContext)
  

  /* utilizando variables de los reducers.js */
  // const users = useSelector(state => state.auth.user);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2);
  const {document_version_content, version}  = useSelector(state => state.doc_version); 
  const {messages} = useSelector(state => state.message)

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()
  const history = useHistory()
  //const fileInputRef = createRef(null)

  // useeffect for componentDidMount, ComponentDidUpdate, componentWillUnmount    
  let id = props.match.params.id
  useEffect( () =>{
    dispatch(getDocument_versionById(props.match.params.id));
    dispatch(getDocument_version_content(props.match.params.id)); 
    dispatch(getMessages({id}))   
    setText(document_version_content);    
    localStorage.setItem('doc_chat', props.match.params.id)    
  },[document_version_content, version._id, messages.length])

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
    /* function handleClick() {
      fileInputRef.current.click();
    } */

    const OnSubmitVersion = (comment) => (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('comment', comment);
      formData.append('document_user', document_user);
      formData.append('document', document);
      formData.append('text', text);
      formData.append('image', image);
      dispatch(editDocument_version(formData, history));
      localStorage.removeItem('doc_chat')
  }
       
  return (  
    <div style={{margin:-14}}>
    <MySidebar.Pushable> 
        <MySidebar
          animation='overlay'
          direction='right'
          //onHide={toogleVisible}
          visible={visible}
          width='wide'
          >
          <Chat doc={props.match.params.id} messages={messages}/>           
        </MySidebar> 

      <MySidebar.Pusher dimmed={false/* visible */}>
        <MySegment basic>
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
                  <Form.Field
                  control={TextArea}
                  style={{ minHeight: 100}}
                  type="text"
                  id="text"
                  name="text"
                  onChange={OnChange}
                  value={text}
                  required
                />
                <Form.Field
                  control={Input}
                  input={
                    <input 
                    multiple
                    type="file"
                    //hidden
                    name='image'
                    onChange={OnChangeImage}
                    //ref={fileInputRef}
                    />}
                />
                 {/* <Button
                content="Choose File"
                labelPosition="left"
                icon="file"
                onClick={handleClick}
              />   */}
                  
                  <Form.Field>
                      <MyButton onClick={handleOpen}> Guardar </MyButton>
                  </Form.Field>
              </Form>
            </Segment>
        </MySegment>
        </MySidebar.Pusher> 
        </MySidebar.Pushable>
        </div>
        )
    }
   


export default EditDocumentVersion