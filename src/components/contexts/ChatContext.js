import React, {Component, createContext} from 'react'

export const ChatContext = createContext();

class ChatContextProvider extends Component {
    state = {
        visible:false
    }

    toogleVisible = () => this.setState({visible:!this.state.visible})

    render(){
        return(
            <ChatContext.Provider value={{...this.state, toogleVisible:this.toogleVisible}}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

export default ChatContextProvider