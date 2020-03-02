import React, { useState, useContext } from 'react'
import {
  Button,
  Header,
  Segment,
  TransitionablePortal,
  Icon,
  Label,
} from 'semantic-ui-react'
import { ConfirmContext } from '../contexts/ConfirmContext';

function Confirm(props) {
    //const [open, setOpen] = useState(false)

    // handleOpen = () => setOpen(true)

    //const handleClose = () => setOpen(false)
    const {open,toogleOpen} = useContext(ConfirmContext)
    
    return (
          <TransitionablePortal
            open={open}     
          >
            <Segment color='green' inverted raised secondary size='tiny'
              style={{ left: '75%', position: 'fixed', top: '80%', zIndex: 1000 }}
            >
              <Header>El articulo ha sido creado exitosamente</Header>
              <Label size='mini' color='grey' floating onClick={toogleOpen}>
                <Icon name='close'  corner='top right'/>
              </Label>
            </Segment>
          </TransitionablePortal>
    )
}
export default Confirm