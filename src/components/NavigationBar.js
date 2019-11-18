import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Collapse, Navbar, NavbarToggler, Nav, NavItem, Container, Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,Button
} from 'reactstrap'

import RegisterModal from './User/Register'
import Logout from './User/Logout'
import LoginModal from './User/Login'
import '../css/navigationBar.css';

import PropTypes from 'prop-types'
import { logout } from '../actions/AuthAction'

/* <Dropdown group isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret className="DropdownToggle">

                            {user ? `${user.name}` : ''}

                        </DropdownToggle>
                        <DropdownMenu className="dropdownMenu">
                            <DropdownItem className="dropdownItem" ><Logout /></DropdownItem>
                        </DropdownMenu>
                    </Dropdown> */

class NavigationBar extends Component {
    state = {
        isOpen: false,
        dropdownOpen: false
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
    

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {

        const { isAuthenticated, user } = this.props.auth
        const authLinks = (
            <Fragment>

                <NavItem>
                    <Link className="nav-link" to='/users'>Users</Link>
                </NavItem>
                <NavItem >
                    <Link className="nav-link" to='/editar'>Editar</Link>
                </NavItem>
                <NavItem>
                    <Button className="logout" onClick={this.props.logout}>{user ? `${user.name}` : ''}</Button>
                </NavItem>


            </Fragment >

        )

        const gestLinks = (
            <Fragment>
                <NavItem color="">
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )

        return (
            <div className="menu">
                <Navbar className="navbar" dark expand='sm' >
                    <Container>
                        <Link className="navbar-brand" to='/'>TocororoEAC</Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='nav ml-auto' navbar>
                                {isAuthenticated ? authLinks : gestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

Dropdown.propTypes = {
    a11y: PropTypes.bool, // defaults to true. Set to false to enable more bootstrap like tabbing behavior
    disabled: PropTypes.bool,
    direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
    group: PropTypes.bool,
    isOpen: PropTypes.bool,
    // For Dropdown usage inside a Nav
    nav: PropTypes.bool,
    active: PropTypes.bool,
    // For Dropdown usage inside a Navbar (disables popper)
    inNavbar: PropTypes.bool,
    tag: PropTypes.string, // default: 'div' unless nav=true, then 'li'
    toggle: PropTypes.func,
    setActiveFromChild: PropTypes.bool
};

DropdownToggle.propTypes = {
    caret: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    'data-toggle': PropTypes.string,
    'aria-haspopup': PropTypes.bool,
    // For DropdownToggle usage inside a Nav
    nav: PropTypes.bool,
    // Defaults to Button component
    tag: PropTypes.any
};

DropdownMenu.propTypes = {
    tag: PropTypes.string,
    children: PropTypes.node.isRequired,
    right: PropTypes.bool,
    flip: PropTypes.bool, // default: true,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    // Custom modifiers that are passed to DropdownMenu.js, see https://popper.js.org/popper-documentation.html#modifiers
    modifiers: PropTypes.object,
    persist: PropTypes.bool, // presist the popper, even when closed. See #779 for reasoning
    // passed to popper, see https://popper.js.org/popper-documentation.html#Popper.Defaults.positionFixed
    positionFixed: PropTypes.bool
};

DropdownItem.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    divider: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    header: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object,
    toggle: PropTypes.bool // default: true
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(NavigationBar)




