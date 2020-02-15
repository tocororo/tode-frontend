import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/Avatar.png';

const URLNotFound = () => (
<div>
<img src={Avatar} style={{width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
<center><Link to="/">Return to Home Page</Link></center>
</div>
);
export default URLNotFound;