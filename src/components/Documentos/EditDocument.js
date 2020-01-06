import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { Button, Form, TextArea, Sidebar, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { newDocument_version } from '../../actions/DocumentVersionAction'
import axios from 'axios'
import ChatPage from '../Chat/ChatPage'
import '../../css/editpage.css'
import '@fortawesome/react-fontawesome'
import { MdChat } from 'react-icons/md'
import styled from 'styled-components'

const MySidebar = styled(Sidebar)`
  &&& {
    background-color:#1d314d;
  }
`
const MyButton = styled(Button)`
&&&{
    background-color:#1d314d;
    color:white;
}

&&&:hover{
  background-color:#0f1d31;
  color:whitesmoke;
}
`


class EditDocument extends Component {
    state = {
        animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
        _id: "",
        coment: "",
        document: "",
        document_user: "",
        editing: false
    }

    handleChangerigth = (direction, animation) => () => {
        this.setState({ direction })
        this.setState((prevState) => ({ animation, visible: !prevState.visible }))
      }

    async componentDidMount() {
        if (this.props.match.params.id) {
            const res = await axios.get(`/document/${this.props.match.params.id}`)
            this.setState({
                editing: true,
                _id: this.props.match.params.id,
                coment: res.data.coment,
                document: this.props.match.params.id,
                document_user: res.data.document_user
            })
        }
    }

    OnChange = e => {


        this.setState({ [e.target.name]: e.target.value, });
        const { user } = this.props.auth
        user ? this.setState({ document_user: user._id }) : this.setState({ document_user: "" })

    };

    OnSubmit = (e) => {
        e.preventDefault();

        const { coment, document_user, document } = this.state;
        const newDoc = { coment, document_user, document };
        this.props.newDocument_version(newDoc);
        this.props.history.push('/document');


    }

    render() {
        const VerticalSidebarChat = ({ animation, direction, visible }) => (
            <Sidebar
              animation={animation}
              direction={direction}
              visible={visible}
            >
              <ChatPage doc={this.props.match.params.id}/>
          
            </Sidebar>
          )
          
          VerticalSidebarChat.propTypes = {
            animation: PropTypes.string,
            direction: PropTypes.string,
            visible: PropTypes.bool,
          }
          
        const { animation, dimmed, direction, visible } = this.state
        return (
            <MySidebar.Pushable >

            {direction != "left" ?
                    
              <VerticalSidebarChat
                animation={animation}
                direction={direction}
                visible={visible}
              />
              :
              <div />
            }

            <MySidebar.Pusher dimmed={dimmed && visible}>
            <div className="container">
            <div />
            <div className="center">
            <Form onSubmit={this.OnSubmit}>
                <Form.Field>

                    <TextArea
                        style={{ minHeight: 100}}
                        type="text"
                        id="coment"
                        name="coment"
                        onChange={this.OnChange}
                        value={this.state.coment}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <Button type="submit"> Guardar </Button>
                </Form.Field>
            </Form>
            </div>
            <div className="end">
              <MyButton
                className="button"
                active={direction === 'right'}
                onClick={this.handleChangerigth('right')}>
                <MdChat className="chats" />
              </MyButton>
            </div>
    
            </div>

            </MySidebar.Pusher>
            </MySidebar.Pushable>
        )
    }
}

EditDocument.propTypes = {
    newDocument_version: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    auth: state.auth
})

export default connect(mapStateToProps, { newDocument_version }) (withRouter(EditDocument))