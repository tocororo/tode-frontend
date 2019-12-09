import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Button, Form, Modal, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/AuthAction'
import { clearErrors } from '../../actions/ErrorAction'
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../css/navigationBar.css';
import styled from 'styled-components'

const MyButton = styled(Button)`
&&&{
    background-color:#1d314d;
    color:#df3e32;
    border-radius:0px;
}

&&&:hover{
    background-color:white;
    color:#df3e32;
    border-radius:0px;
}
`

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


class RegisterModal extends Component {
    state = {

        modal: false,
        name: "",
        email: "",
        password: "",
        rol: [],
        msg: null,
        slectedOptiom: null

    };


    toggle = () => {
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
        });
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for REGISTER_ERROR
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        //si isAuthenticated close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    selectChange = (Option) => {
        const selected_roles = new Array(Option.lengt)
        for (let i = 0; i < Option.length; i++) {
            selected_roles[i] = Option[i].value;
        }
        this.setState({
            selectedOption: Option.value,
            rol: selected_roles
        })

    }


    OnChange = e => {
        this.setState({ [e.target.name]: e.target.value, });

    };

    OnSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, rol } = this.state;
        const newUser = { name, email, password, rol };
        this.props.register(newUser);

    }

    render() {

        return (
            <div>
                <Modal className="card-login" trigger={<MyButton className="register_login" color="green"  to='#'>Register</MyButton>}>
                  <Modal.Header>Registrese para mas opciones</Modal.Header>
                  <Modal.Content image>
                    <Modal.Description>
                    <Header>
                      {this.state.msg ? (<div className="alert alert-danger" role="alert">
                                              <strong>{this.state.msg}</strong>
                                          </div>) : null}
                      </Header>
                    <Form onSubmit={this.OnSubmit}>
                        <Form.Field>
                        <div className="input-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                           </div>
                          <input type="text" id="name" name='name' className=" form-control" placeholder="Nombre Completo" onChange={this.OnChange} />
                        </div>  
                        </Form.Field>
                        <Form.Field>
                        <div className="input-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                           </div>
                          <input type="email" id="email" name='email' className="form-control" placeholder="Correo" onChange={this.OnChange} />
                          </div>
                        </Form.Field>
                        <Form.Field>
                        <div className="input-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                           </div>
                          <input type="password" id="password" name='password' className=" form-control" placeholder="Contraseña" onChange={this.OnChange} />
                          </div>
                        </Form.Field>
                        <Form.Field>
                        <Select placeholder="Seleccione su Rol(es)" className="col-md-8 col-offset-4"
                            onChange={this.selectChange}
                            components={makeAnimated()}
                            isMulti
                            options={options} />
                        </Form.Field>
                        <Button type="submit" className="login_btn">Continuar</Button>
                    </Form>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>       
            </div>
        )
    }
}

/*
<Button className="register_login" color="info" onClick={this.toggle} to='#'>Register</Button>

                <div>
                    <Modal className="card-login " isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Registrese para mas opciones</ModalHeader>
                        <ModalBody className="">
                            {this.state.msg ? (<div className="alert alert-danger" role="alert">
                                <strong>{this.state.msg}</strong>
                            </div>) : null}
                            <Form onSubmit={this.OnSubmit}>
                                <FormGroup>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                        </div>
                                        <Input type="text" id="name" name='name' className=" form-control" placeholder="Nombre Completo" onChange={this.OnChange} />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                                        </div>
                                        <Input type="email" id="email" name='email' className="form-control" placeholder="Correo" onChange={this.OnChange} />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                                        </div>
                                        <Input type="password" id="password" name='password' className=" form-control" placeholder="Contraseña" onChange={this.OnChange} />
                                    </div>
                                    <div>
                                        <Select placeholder="Seleccione su Rol(es)" className="col-md-8 col-offset-4"
                                            onChange={this.selectChange}
                                            components={makeAnimated()}
                                            isMulti
                                            options={options}
                                        />
                                    </div>

                                    <Button type="submit" className="btn  float-right login_btn">Registrar</Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
*/ 

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal)