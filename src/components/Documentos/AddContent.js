import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom';
import { Button, Form, TextArea, Sidebar, Segment, Input } from 'semantic-ui-react'
import '../../css/editpage.css'
import '@fortawesome/react-fontawesome'
import { MdChat } from 'react-icons/md'
import styled from 'styled-components'

import { createText, getDocumentByName } from '../../actions/DocumentAction'
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


function AddContent(props) {

  const history = useHistory()  
    /* creando variables de estado y un metodo para modificarlas */
  const [text, setText] = useState('');
  const [document, setDocument] = useState('');
  const [image, setImage] = useState('');

  /* utilizando variables de los reducers.js */
  const user = useSelector(state => state.auth.user);
  const { doc}  = useSelector(state => state.doc);
  
  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()

   
    const OnChange = e => {
        setText( e.target.value, );        
        setDocument (doc._id )
        
    };

    const OnChangeImage = e => {
      setImage( e.target.value, ); 
      
  };

    const OnSubmit = (e) => {
        e.preventDefault();

        const newText = { text,  document };
        dispatch(createText(props.match.params.name, newText, history));
    }
       
        return (          
            
            <Form onSubmit={OnSubmit} enctype="multipart/form-data" >
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
                        id="image"
                        name="image"
                        onChange={OnChangeImage}
                        value={image}
                        required
                    />
                </Form.Field>
                
                <Form.Field>
                    <Button type="submit"> Guardar </Button>
                </Form.Field>
            </Form>
        )
    }


export default (AddContent)