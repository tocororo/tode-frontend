import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, Form, FormGroup, Input } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/AuthAction'
import { clearErrors } from '../../actions/ErrorAction'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../css/login.css';




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
                <Button className="register_login" color="info" onClick={this.toggle} to='#'>Login</Button>


                <Modal className="card-login " isOpen={this.state.modal} toggle={this.toggle}>

                    <ModalBody className="">

                        <img id="profile-img" alt="" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
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
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
