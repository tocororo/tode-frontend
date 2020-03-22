import React, {Component, createContext} from 'react'

export const LoaderContext = createContext();

class LoaderContextProvider extends Component {
    state = {
        loader:false
    }

    showLoader = () => this.setState({open:true})
    hideLoader = () => this.setState({open:false})

    render(){
        return(
            <LoaderContext.Provider value={{...this.state, showLoader:this.showLoader, hideLoader:this.hideLoader}}>
                {this.props.children}
            </LoaderContext.Provider>
        )
    }
}

export default LoaderContextProvider