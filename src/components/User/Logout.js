import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/AuthAction'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render() {
        return (
            <div>
                <Fragment>
                    <Link className="nav-link" onClick={this.props.logout} to='/'>Logout</Link>

                </Fragment>
            </div>
        )
    }
}

export default connect(null, { logout })(Logout);