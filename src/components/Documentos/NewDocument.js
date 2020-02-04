import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom';
import { newDocument } from '../../actions/DocumentAction'
import { TextArea,Button, Form, Input } from 'semantic-ui-react';

function NewDocument (props) {
  const history = useHistory();
  
  /* creando variables de estado y un metodo para modificarlas */
  // const [state, setState] = useState(
  //   {
  //    name: '',
  //    coment: '',
  //    document_user: '' 
  //   });
  
    const [name, setName] = useState('')
    const [coment, setComent] = useState('')
    const [document_user, setDocument_user] = useState()
    

  /* utilizando variables de los reducers.js */
  const user = useSelector(state => state.auth.user); 
  useEffect(()=>
  user ?
  console.log(user) : null
  ,[])

  /*  dispatch para utilizar las actions.js */
  const dispatch = useDispatch()
  const OnChangename = (e) => {
  setName(e.target.value );
  };

  const OnChangecoment = (e) => {
    setComent( e.target.value );
    if(user)
    setDocument_user(user._id)
    };
    
  const OnSubmit = (e) => {
    e.preventDefault();

    // const { name, coment, document_user } = state
    const newDoc = { name, coment, document_user };
    dispatch(newDocument(newDoc, history));  
  }
    return (

        <Form onSubmit={OnSubmit}>
            <Form.Field>
                <Input
                    type="text"
                    placeholder="Nombre del documento"
                    name="name"
                    onChange={OnChangename}
                    value={name}
                    required                     
                />
            </Form.Field>
            <Form.Field>
                <TextArea
                    style={{ minHeight: 100}}
                    placeholder="Comentario sobre el documento"
                    name="coment"
                    onChange={OnChangecoment} 
                    value={coment}    
                    required
                    />
             </Form.Field>
            <Form.Field>
                    <Button type="submit"> Guardar </Button>
            </Form.Field>
        </Form>

        )
    }



export default  NewDocument;