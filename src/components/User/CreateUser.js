import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editUser } from '../../actions/AuthAction'
class CreateUser extends Component {
    state = {
        _id: "",
        name: "",
        password: "",
        email: "",
        editing: false

    };

    static propTypes = {
        editUser: PropTypes.func.isRequired
    }



    async componentDidMount() {
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/user/' + this.props.match.params.id);
            this.setState({
                editing: true,
                _id: this.props.match.params.id,
                name: res.data.name,
                email: res.data.email,
                password: ""
            })
        }
    }

    OnChange = () => {
        this.setState({
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        })
    }

    OnSubmit = (e) => {
        e.preventDefault();
        const newUser = { _id: this.state._id, name: this.state.name, email: this.state.email, password: this.state.password }
        if (this.state.editing) {
            //axios.put('http://localhost:4000/edit_user/' + this.state._id, newUser)
            this.props.editUser(newUser);
        }
        //this.props.addUser(newUser);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="card card-body center-block">

                    <h2>Add New User</h2>
                    <form onSubmit={this.OnSubmit}>
                        {this.state.msg ? (<div class="alert alert-danger" role="alert">
                            <strong>{this.state.msg}</strong>
                        </div>) : null}
                        <div className="form-group">
                            <input type="text" id="name" value={this.state.name} className="form-control mb-3" placeholder="name" onChange={this.OnChange} />
                            <input type="text" id="password" value={this.state.password} className="form-control mb-3" placeholder="password" onChange={this.OnChange} />
                        </div>
                        <button type="submit" className="btn btn-success">Save</button>
                    </form>

                </div>
                <div className="col-md-3"></div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    //isAuthenticated: state.auth.authenticated,
    // error: state.error
})

export default connect(mapStateToProps, { editUser })(CreateUser)