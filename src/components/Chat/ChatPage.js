import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import MessagesContainer from './MessagesContainer';
import InputContainer from './InputContainer';
import '../../css/ChatPage.css';
import openSocket from 'socket.io-client';
import axios from 'axios';

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            socket: openSocket("https://10.2.64.4:4000"),
            document_id: props.doc
        };

        this.state.socket.on("new-message", (message) => {
            let currentMessages = this.state.messages;
            currentMessages.push(message);
            this.setState({
                messages: currentMessages
            });
        });
    }


    async componentDidMount() {
        const {document_id} = this.state
        const params = ({
            document_id
        })
        await axios.get("/message", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            params
        }).then((res) => {
            this.setState({
                messages: res.data
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {


        return (
            <Grid className="grid">

                <Grid.Column width={1} />

                <Grid.Column className="messages-container" width={12}>
                    <Grid.Row className="messages">
                        {this.state.messages.length > 0 ?
                            <MessagesContainer messages={this.state.messages} />
                            :
                            <div />
                        }
                    </Grid.Row>
                    <Grid.Row>
                        <InputContainer handleSubmit={this.handleSubmit} />
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column width={1} />

            </Grid>
        );
    }

    handleSubmit = (sender, content) => {



        let reqBody = {
            sender: sender,
            content: content,
            document: this.state.document_id
        }

        fetch("/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        }).then((res) => {
            return res.json();
        }).then((resJson) => {
            this.state.socket.emit("new-message", resJson);
        }).catch((err) => {
            console.log(err);
        });

        this.componentDidMount();
    }

}



export default ChatPage;