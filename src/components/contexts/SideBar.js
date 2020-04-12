import React, {Component, createContext} from 'react'

export const SideBarContext = createContext();

class SideBarContextProvider extends Component {
    state = {
        open:false
    }

    toogleOpen = () => this.setState({open:!this.state.open})

    render(){
        return(
            <SideBarContext.Provider value={{...this.state, toogleOpen:this.toogleOpen}}>
                {this.props.children}
            </SideBarContext.Provider>
        )
    }
}

export default SideBarContextProvider