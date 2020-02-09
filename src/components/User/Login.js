import React, { Component } from 'react'
//import { Button, Modal, ModalBody, Form, FormGroup, Input } from 'reactstrap'
import { Button, Form, Modal, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/AuthAction'
import { clearErrors } from '../../actions/ErrorAction'
import Avatar from '../../assets/Avatar.png'
import '../../css/login.css';
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

class LoginModal extends Component {
    state = {

        modal: false,
        email: "",
        password: "",
        msg: null

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
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for LOGIN_ERROR
            if (error.id === 'LOGIN_FAIL') {
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

    OnChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    OnSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const user = { email, password };
        this.props.login(user)
    }

    render() {
        return (
            <div>
            <Modal className="card-login " trigger={<MyButton className="register_login" color="green" onClick={this.toggle} to='#'>Login</MyButton>}>
                  <Modal.Content image>
                    <Modal.Description>
                    <img id="profile-img" alt="" className="profile-img-card" src={Avatar} /> 
                    <Header>
                       
                      {this.state.msg ? (<div className="alert alert-danger" role="alert">
                                              <strong>{this.state.msg}</strong>
                                          </div>) : null}
                      </Header>
                    <Form onSubmit={this.OnSubmit}>                        
                        <Form.Field>
                        <div className="input-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text"><Icon name='envelope' /></span>
                           </div>
                          <input type="email" id="email" name='email' className="form-control" placeholder="Correo" onChange={this.OnChange} />
                          </div>
                        </Form.Field>
                        <Form.Field>
                        <div className="input-group">
                           <div className="input-group-prepend">
                               <span className="input-group-text"><Icon name='key' /></span>
                           </div>
                          <input type="password" id="password" name='password' className=" form-control" placeholder="Contraseña" onChange={this.OnChange} />
                          </div>
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
<Button className="register_login" color="info" onClick={this.toggle} to='#'>Login</Button>


                <Modal className="card-login " isOpen={this.state.modal} toggle={this.toggle}>

                    <ModalBody className="">

                        <img id="profile-img" alt="" className="profile-img-card" src={Avatar} />
                        {this.state.msg ? (<div className="alert alert-danger" role="alert">
                            <strong>{this.state.msg}</strong>
                        </div>) : null}
                        <Form onSubmit={this.OnSubmit}>
                            <FormGroup>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                    </div>
                                    <Input type="email" id="email" name='email' className="form-control" placeholder="Correo" onChange={this.OnChange} />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                                    </div>
                                    <Input type="password" id="password" name='password' className=" form-control" placeholder="Contraseña" onChange={this.OnChange} />
                                </div>
                                <Button type="submit" name="btn" className="btn  float-right login_btn">Entrar</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal> 
 */


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
