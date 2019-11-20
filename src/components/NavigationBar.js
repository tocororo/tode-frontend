import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


import {
    Accordion, Grid,
    Menu
} from 'semantic-ui-react'

import RegisterModal from './User/Register'
import LoginModal from './User/Login'
import '../css/navigationBar.css';

import PropTypes from 'prop-types'
import { logout } from '../actions/AuthAction'


class NavigationBar extends Component {

    state = { activeIndex: -1 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    static propTypes = {
        auth: PropTypes.object.isRequired
    }




    render() {

        const Documentos = (

            <Grid textAlign='left'>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Link className="nav-link " to="/new_document">Nuevo Documentos</Link>
                    </Grid.Column>
                    <Grid.Column>
                        <Link className="nav-link " to="/document">Biblioteca</Link>
                    </Grid.Column>
                </Grid.Row>

            </Grid>

        )

        const User = (

            <Grid textAlign='left'>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Link className="nav-link " to="/user">Usuarios</Link>
                    </Grid.Column>
                    <Grid.Column>
                        <Link className="nav-link " onClick={this.props.logout}>Salir</Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )

        const { activeIndex } = this.state
        const { isAuthenticated } = this.props.auth


        const authLinks = (
            <Fragment>

                <Accordion as={Menu} vertical>
                    <Menu.Item>
                        <Accordion.Title
                            active={activeIndex === 0}
                            content='Documentos'
                            index={0}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content active={activeIndex === 0} content={Documentos} />
                    </Menu.Item>


                    <Menu.Item>
                        <Accordion.Title
                            active={activeIndex === 1}
                            content='Usuario'
                            index={1}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content active={activeIndex === 1} content={User} />
                    </Menu.Item>
                </Accordion>

            </Fragment >

        )

        const gestLinks = (

            <Fragment >

                <Menu.Item >
                    <RegisterModal />
                </Menu.Item>


                <Menu.Item >
                    <LoginModal />
                </Menu.Item>

            </Fragment>

        )

        return (
            <div className="menu-lateral">
                <Menu.Item >
                    <Link className="navbar-brand" to='/'>TocororoEAC</Link>
                </Menu.Item>
                {isAuthenticated ? authLinks : gestLinks}

            </div>
        )
    }
}



const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavigationBar)




