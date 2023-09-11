import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Tickets from '../components/Tickets';
import UserProfile from '../components/UserProfile';

const Profile = () => {
    return (
        <div className='profile-page'>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <UserProfile />
                    </Col>
                    <Col xs={6} md={8}>
                        <Tickets style={{ height: '100%' }}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
 
export default Profile;
