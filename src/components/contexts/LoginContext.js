import React, {Component, createContext} from 'react'

export const LoginContext = createContext();

class LoginContextProvider extends Component {
    state = {
        active:false
    }

    toogleActive = () => this.setState({active:!this.state.active})

    render(){
        return(
            <LoginContext.Provider value={{...this.state, toogleActive:this.toogleActive}}>
                {this.props.children}
            </LoginContext.Provider>
        )
    }
}

export default LoginContextProvider