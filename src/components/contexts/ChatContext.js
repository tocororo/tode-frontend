import React, {Component, createContext} from 'react'

export const ChatContext = createContext();

class ChatContextProvider extends Component {
    state = {
        visible:false,
        disabled: true
    }

    toogleVisible = () => this.setState({visible:!this.state.visible})
    trueDisabled = () => this.setState({disabled:true})
    falseDisabled = () => this.setState({disabled:false})
    render(){
        return(
            <ChatContext.Provider value={{...this.state, toogleVisible:this.toogleVisible, trueDisabled:this.trueDisabled, falseDisabled:this.falseDisabled}}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

export default ChatContextProvider