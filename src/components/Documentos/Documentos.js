import React, { Component } from 'react'
import { Label, Menu, Tab } from 'semantic-ui-react'
import OriginalDocument from './OriginalDocument'
import VersionedDocument from './VersionedDocument'

const panes = [
    {
        menuItem: { key: 'biblioteca', icon: 'users', content: 'Biblioteca' },
        render: () => <Tab.Pane>
            <OriginalDocument />
        </Tab.Pane>,
    },
    {
        menuItem: (
            <Menu.Item key='messages'>
                Versions<Label>15</Label>
            </Menu.Item>
        ),
        render: () => <Tab.Pane>

            <VersionedDocument />
        </Tab.Pane>,
    },
]




class Documentos extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <Tab panes={panes} />
            </div>
        )
    }
}


export default Documentos