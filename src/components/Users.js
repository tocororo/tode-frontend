import React, { Component } from 'react';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUsers, deleteUser } from '../actions/UserAction'
import PropTypes from 'prop-types'


class Users extends Component {

    async componentDidMount() {
        this.props.getUsers();
        console.log(this.props.user.users);
    }


    Delete = (id) => {
        this.props.deleteUser(id);
        alert('El usuario ha sido eliminado');
    }

    render() {
        const { users } = this.props.user;
        return (
            <div className="row">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Password</th>
                            <th scope="col">Created</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <td>{user.password}</td>
                                <td>{user.createdAt}</td>
                                <td>
                                    <Link className="btn btn-warning" to={"/edit_user/" + user._id}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                </td>
                                <td>
                                    <Link className="btn btn-danger" to="/users" onClick={this.Delete.bind(this, user._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        )
    }
}

Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { getUsers, deleteUser })(Users)