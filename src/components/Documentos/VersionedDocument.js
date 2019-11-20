import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDocument_version } from '../../actions/DocumentVersionAction'
import { getDocument } from '../../actions/DocumentAction'
import {
    Accordion, Grid,
    Menu
} from 'semantic-ui-react'



class VersionedDocument extends Component {
    state = { activeIndex: -1 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    async componentDidMount() {

        this.props.getDocument();
        this.props.getDocument_version();
    }


    render() {
        const { activeIndex } = this.state
        const { docs } = this.props.doc
        const { docs_version } = this.props.doc_version

        return (

            < div >
                {
                    docs.map(doc => (

                        <Accordion as={Menu} vertical>
                            <Menu.Item>
                                <Accordion.Title
                                    active={activeIndex === doc._id}
                                    content={`${doc.name} | ${doc.document_user.name} | ${doc.createdAt}`}
                                    index={doc._id}
                                    onClick={this.handleClick}
                                />
                                <Accordion.Content active={activeIndex === doc._id} content={<Grid textAlign='left'>

                                    {docs_version.map(doc_version => (
                                        doc._id === doc_version.document._id ?
                                            <Grid.Row columns={1}>
                                                <Grid.Column>
                                                    <th scope="col">{doc_version.document.name}</th>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <th scope="col">{doc_version.coment}</th>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <th scope="col">{doc_version.document_user.name}</th>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <th scope="col">{doc_version.createdAt}</th>
                                                </Grid.Column>

                                            </Grid.Row>
                                            : ""))}
                                </Grid>

                                } />
                            </Menu.Item>
                        </Accordion>

                    ))
                }
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    doc_version: state.doc_version,
    doc: state.doc
})

export default connect(mapStateToProps, { getDocument_version, getDocument })(VersionedDocument)