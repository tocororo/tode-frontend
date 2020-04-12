import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom';
import Select from 'react-select'
import {Button, Grid, Container, Input, Label, Icon, Image, Form, Divider, Card} from 'semantic-ui-react'
import makeAnimated from 'react-select/animated'
import Avatar from '../../assets/Avatar.png'
import '../../css/Profile.css'

import {updateUser,updateImage} from '../../actions/UserAction'
import {OAuth2Loaded} from '../../actions/OAuth2Action'

const roles = {
    AUTHOR: 'Autor',
    EDITOR: 'Editor',
    REVIEWER: 'Revisor'
}

const options = [
    { value: roles.AUTHOR, label: 'Autor' },
    { value: roles.EDITOR, label: 'Editor' },
    { value: roles.REVIEWER, label: 'Revisor' },
];

function Profile(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState([])
    const [state, setState] = useState({
        selectedOption:null,
        edit:false
    })

    const dispatch = useDispatch();
    const history = useHistory();
    const {oauth2Users, oauth2IsAuthenticated} = useSelector(state => state.oauth2);
    
    useEffect( ()=> {
        dispatch(OAuth2Loaded());
            setName(oauth2Users.name);
            setEmail(oauth2Users.email);
            setRole(oauth2Users.role);
    },[oauth2Users._id])

    const selectChange = (Option) => {
        const selected_roles = new Array(Option.lengt)
        for (let i = 0; i < Option.length; i++) {
            selected_roles[i] = Option[i].value;
        }
        setRole(selected_roles)
        setState(state => ({
            ...state,
            selectedOption:Option.value
        })
        )}

    const handleEdit = () => {
        setState(state => ({
            ...state,
            edit: !state.edit
        })
        )
    }

    const OnChangeName = e => {   
        setName(e.target.value, ); 
    };

    const OnSubmit = (e) => {
        e.preventDefault();
        const id = oauth2Users._id
        const newUser = {id, name, role}
        dispatch(updateUser(newUser))
        setState({ edit: false})
    }   

    console.log(oauth2Users.perfilImage);
    

    return(
      <Container>
            <Grid columns={2} columns='equal'>
                <Grid.Row>
                    <Grid.Column width={5} textAlign='center'>
                        <Grid.Row>
                        <Image src={Avatar/* oauth2Users.perfilImage */} size='small' spaced='right'/>
                        </Grid.Row>
                        <Grid.Row>
                        <input type = "file" name = "file" id = "file"  className = "inputfile" /> <label htmlFor="file"><strong>Cambiar</strong></label>
                        
                        {/* <Button color='teal'  size='mini' onClick={handleEdit} >
                            <Icon name='edit'/> Cambiar
                        </Button> */}
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Form onSubmit={OnSubmit} >                        
                           <Form.Field
                                control={Input}
                                label='Email :'
                                readOnly
                                transparent
                                type='email'
                                value={email || ''}
                            />
                            <Form.Field
                                control={Input}
                                label='UserName :'
                                readOnly={state.edit === false ? true : false}
                                transparent={state.edit === false ? true : false}
                                type="text"
                                id="name"
                                name="name"
                                onChange={OnChangeName.bind(this)}
                                value={name || ''}
                            /> 
                            { state.edit === true ?
                                <Form.Field>
                                <Select                                    
                                    placeholder="Seleccione su Rol(es)" 
                                    onChange={selectChange}
                                    components={makeAnimated()}
                                    isMulti
                                    options={options}                                    
                                />  
                                </Form.Field>
                                : 
                                <Form.Field
                                    label='Rol / Roles :'
                                    control={Input}
                                    readOnly
                                    transparent
                                    type="text"
                                    id="role"
                                    value={role || ''}
                                />
                                }
                            {state.edit === true ?
                                <Button.Group>
                                    <Button color='green'  type='submit' size='mini'>
                                        <Icon name='checkmark'/> Guardar
                                    </Button>
                                    <Button.Or />
                                    <Button color='red' size='mini' onClick={handleEdit}>
                                        <Icon name='remove' /> Cancelar
                                    </Button>
                                </Button.Group> 
                            : null
                            }
                            {state.edit === false ?  
                                <Button color='teal'  size='mini' onClick={handleEdit} >
                                <Icon name='edit'/> Editar Perfil
                                </Button>
                            : null
                            }
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider />
            <Grid columns={3} columns='equal' padded>
                <Grid.Row>
                    <Grid.Column>
                    <Card>
                        <Card.Content header='Autor' />
                        <Card.Content description='Los autores pueden enviar manuscritos a la revista directamente a través del sitio web de la revista. Se le pide al autor que cargue los archivos de envío y que proporcione metadatos o información de indexación (los metadatos mejoran la capacidad de búsqueda para la investigación en línea y para la revista). El autor puede cargar múltiples archivos, en forma de conjuntos de datos, instrumentos de investigación o textos fuente que enriquecerán el elemento, así como contribuir a formas más abiertas y sólidas de investigación y erudición.

                        El autor puede realizar un seguimiento de la presentación a través del proceso de revisión y editorial, así como participar en la edición y corrección de las presentaciones aceptadas para su publicación, iniciando sesión en el sitio web de la revista.' />
                        <Card.Content extra>
                        <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column>
                    <Card>
                        <Card.Content header='Editor' />
                        <Card.Content description='El editor supervisa todo el proceso de revisión, edición y publicación. El editor, en colaboración con el administrador de la revista, generalmente establece las políticas y procedimientos para la revista.

                        En el proceso editorial, el Editor asigna los envíos a los Editores de sección para ver a través de Revisión de envíos y Edición de envíos. El editor vigila el progreso de la presentación y ayuda con cualquier dificultad.
                        
                        Una vez que se completa la revisión, el Editor generalmente ve la presentación a través del proceso de Edición (incluida la edición, la producción y la corrección de pruebas) aunque en algunas revistas esto sigue siendo responsabilidad del Editor de la Sección a cargo del proceso de revisión de la presentación.
                        
                        El editor también crea los números de la revista, programa los envíos para su publicación, organiza la tabla de contenido y publica el número como parte del proceso de publicación. El Editor puede restaurar los envíos archivados a las listas activas En revisión o En edición.
                        
                        Los editores también pueden acceder a la configuración del diario, a los usuarios, roles y herramientas.' />
                        <Card.Content extra>
                        <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column>
                    <Card>
                        <Card.Content header='Revisor' />
                        <Card.Content description='El Revisor es seleccionado por el Editor o el Editor de Sección para revisar un envío. Se pide a los revisores que envíen comentarios al sitio web de la revista y pueden cargar archivos adjuntos para el uso del Editor y el Autor. Los revisores pueden ser calificados por los editores de sección, nuevamente según las políticas de esta revista.' />
                        <Card.Content extra>
                        <Icon name='user' />4 Friends
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>    
    )
}

export default Profile