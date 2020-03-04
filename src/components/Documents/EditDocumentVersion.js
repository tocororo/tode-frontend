import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {withRouter} from 'react-router-dom';
import { Button, Form, TextArea, Sidebar, Segment, Icon } from 'semantic-ui-react'
import '../../css/editpage.css'
import styled from 'styled-components'

import { newDocument_version, getDocument_version_content, getDocument_versionById } from '../../actions/DocumentVersionAction'
import ChatPage from '../Chat/ChatPage'

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
  const [coment, setComent] = useState('');
  const [document, setDocument] = useState('');
  const [document_user, setDocument_user] = useState('');
  const [visible, setVisible] = useState(false);

  /* utilizando variables de los reducers.js */
  // const users = useSelector(state => state.auth.user);
  const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2)
  const { document_version_content, version}  = useSelector(state => state.doc_version);
  
  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()

  // useeffect for componentDidMount, ComponentDidUpdate, componentWillUnmount    

  useEffect( () =>{
        dispatch(getDocument_versionById(props.match.params.id))
        dispatch(getDocument_version_content(props.match.params.id))
        setComent(document_version_content)        
  },[document_version_content])

    // funcion que controla la visibilidad del chat 
    const showChat = () => {
      setVisible( prevState => !prevState.visible )
    }

   
    const OnChange = e => {
        setComent( e.target.value, );
        if(oauth2IsAuthenticated)
        setDocument_user(oauth2Users._id)
        setDocument (version.document )

    };

    const OnSubmit = (e) => {
        e.preventDefault();

        const newDoc = { coment, document_user, document };
        dispatch(newDocument_version(newDoc, props.history));
    }
       
        return (          
            <MySidebar.Pushable >

            <MySidebar
              animation='overlay'
              direction='right'
              onHide={() => setVisible( false )}
              vertical
              visible={visible}
              width='wide'
            >
            <ChatPage />
            </MySidebar>

            <MySidebar.Pusher dimmed={visible}>
            <div className="container">
            <div />
            <div className="center">
            <Form onSubmit={OnSubmit}>
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
                    <Button type="submit"> Guardar </Button>
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

            </MySidebar.Pusher>
            </MySidebar.Pushable>
        )
    }


export default (withRouter(EditDocumentVersion))