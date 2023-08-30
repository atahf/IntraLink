import React, { useEffect } from 'react';
import { Container, Spinner, Card } from 'react-bootstrap';
import { useGetUserInfo } from '../hooks/useGet';
import UserProfileAvatar from '../assets/user.jpg';

const Profile = () => {
    const { GET, data, picture, isLoading, error } = useGetUserInfo();

    const getUserData = async () => {
        await GET();
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className='profile-page'>
            <Container fluid className='profile-container'>
                {isLoading && (
                    <div className='profile-spinner'>
                        <Spinner animation="border" variant="light"/>
                        <div className='profile-sprinner-text'>Loading...</div>
                    </div>
                )}
                {!isLoading && data && (
                    <Card style={{ width: '25rem' }}>
                        <Card.Img variant="top" src={picture ? picture : UserProfileAvatar} alt='UserProfileAvatar' />
                        <Card.Body>
                            <Card.Text style={{ padding: '0px 40px', textTransform: 'capitalize' }}>
                                Name: {data.firstName + ' ' + data.lastName} <br/>
                                Username: { data.username } <br/>
                                E-mail: {data.email} <br/>
                                Role: {data.role}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </div>
    );
}
 
export default Profile;
