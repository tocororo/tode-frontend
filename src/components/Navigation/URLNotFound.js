import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/PageNotFound.png';
import { Image, Segment, Container } from 'semantic-ui-react'
import styled from 'styled-components'

const MyLink = styled(Link)`
  &&& {
    background-color:#1d314d;
  }
`

const URLNotFound = () => (
    <Segment placeholder inverted color='teal' as={Container}>
        <Image size='huge' centered src={PageNotFound} />
        <MyLink className='button' to='/' >Back To Home</MyLink>
    </Segment>
);
export default URLNotFound;