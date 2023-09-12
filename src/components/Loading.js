import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className='loading-spinner'>
            <Spinner animation="border" variant="dark" role="status"/>
            <div className='loading-sprinner-text' style={{color: 'black'}}>Loading...</div>
        </div>
    );
}
 
export default Loading;
