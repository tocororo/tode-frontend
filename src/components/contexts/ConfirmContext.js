import React, {Component, createContext} from 'react'

export const ConfirmContext = createContext();

class ConfirmContextProvider extends Component {
    state = {
        open:false
    }

    toogleOpen = () => this.setState({open:!this.state.open})

    render(){
        return(
            <ConfirmContext.Provider value={{...this.state, toogleOpen:this.toogleOpen}}>
                {this.props.children}
            </ConfirmContext.Provider>
        )
    }
}

export default ConfirmContextProvider