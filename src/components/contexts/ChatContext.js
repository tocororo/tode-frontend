import React, {Component, createContext} from 'react'

export const ChatContext = createContext();

class ChatContextProvider extends Component {
    state = {
        visible:false,
        disabled: true,
        iconVisible:false
    }

    toogleVisible = () => this.setState({visible:!this.state.visible})
    showIcon = () =>
    this.setState({ iconVisible: true })
    hideIcon = () =>
    this.setState({ iconVisible: false })

    render(){
        return(
            <ChatContext.Provider value={{...this.state, toogleVisible:this.toogleVisible, showIcon: this.showIcon, hideIcon: this.hideIcon}}>
                {this.props.children}
            </ChatContext.Provider>
        )
    }
}

export default ChatContextProvider