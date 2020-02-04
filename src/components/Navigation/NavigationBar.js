import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Accordion, Menu, Table} from 'semantic-ui-react'
import RegisterModal from '../User/Register'
import LoginModal from '../User/Login'
import '../../css/navigationBar.css';
import PropTypes from 'prop-types'
import { logout } from '../../actions/AuthAction'
import styled from 'styled-components'

const MyLink = styled(Link)`
&&&{
    color:#df3e32;
}

&&&:hover{
    color:tomato;
}
`
        
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

        /** MenuItem FOR DOCUMENTS */
        const Documentos = (
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><Link className="nav-link " to="/documents">Mi Biblioteca</Link></Table.HeaderCell>
                    </Table.Row>                     
                    <Table.Row>
                        <Table.HeaderCell><Link className="nav-link " to="/documents-shared">Biblioteca Compartida</Link></Table.HeaderCell>
                    </Table.Row> 
                    <Table.Row>
                         <Table.HeaderCell><Link className="nav-link " to="/new_document">Nuevo Documento</Link></Table.HeaderCell>
                    </Table.Row> 
                </Table.Header>
            </Table>             
        )

        /** MenuItem FOR USER */
        const User = (
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><Link className="nav-link " to="/user">Perfil</Link></Table.HeaderCell>
                    </Table.Row> 
                    <Table.Row>
                         <Table.HeaderCell><Link className="nav-link " onClick={this.props.logout} to="/">Salir</Link></Table.HeaderCell>
                    </Table.Row> 
                </Table.Header>
            </Table>   
        )

        const { activeIndex } = this.state
        const { isAuthenticated } = this.props.auth


        /** MENU FOR USERS AUTHENTICATEDS */
        const authLinks = (
            

                <Accordion  fluid styled vertical>
                    
                        <Accordion.Title
                            active={activeIndex === 0}
                            content='Documentos'
                            index={0}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content active={activeIndex === 0} content={Documentos} />
                    
                        <Accordion.Title
                            active={activeIndex === 1}
                            content='Usuario'
                            index={1}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content active={activeIndex === 1} content={User} />
                    
                </Accordion>
        )

        /** MENU FOR USERS NOT AUTHENTICATEDS */
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
                    <MyLink className="navbar-brand" to='/'> <h1>TODE</h1></MyLink>
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




