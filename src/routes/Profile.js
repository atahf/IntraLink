import React, { useState } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className='profile-page'>
            <Container className='profile-container'>
                {isLoading && (
                    <div className='profile-spinner'>
                        <Spinner animation="border" variant="light"/>
                        <div className='profile-sprinner-text'>Loading...</div>
                    </div>
                )}
                {!isLoading && (
                    <div>Profile Page</div>
                )}
            </Container>
        </div>
    );
}
 
export default Profile;
