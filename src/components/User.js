import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from 'react-bootstrap';
import UserProfileAvatar from '../assets/user.jpg';

const User = ({ userData }) => {
    const [picture, setPicture] = useState(null);

    const capitalizeWords = (inputString) => {
        const words = inputString.split(' ');
        const capitalizedWords = words.map(word => {
            if (word.length === 0) {
                return '';
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(' ');
    };

    const loadPicture = async () => {
        if(!userData.profilePicture || userData.profilePicture === "") {
            return;
        }


    };

    useEffect(() => {
        loadPicture();
    }, []);

    return (
        <Container style={{padding: '15px', margin: '5px auto'}}>
            <Row>
                <Col xs={6} md={4} className="d-flex justify-content-center align-items-center">
                    <Card.Img 
                        variant="top" 
                        src={picture ? picture : UserProfileAvatar} 
                        alt='UserProfileAvatar'
                        style={{width: '300px', height: 'auto'}}
                    />
                </Col>
                <Col xs={12} md={8} className="d-flex justify-content-center align-items-center">
                    <Card.Body>
                        <Card.Text style={{ padding: '0px 40px' }}>
                            Name: <b>{capitalizeWords(userData.firstName) + ' ' + capitalizeWords(userData.lastName)}</b> <br/>
                            Username: <b>{ userData.username }</b> <br/>
                            E-mail: <b>{userData.email}</b> <br/>
                            Role: <b>{userData.role}</b> <br/>
                            Department: <b>{userData.department}</b> <br/>
                            Birthdate: <b>{userData.birthdate}</b> <br/>
                            Age: <b>{userData.age}</b> <br/>
                            Gender: <b>{userData.gender}</b> <br/>
                            Birthdate: <b>{userData.birthdate}</b> <br/>
                            Phone Number: <b>{userData.phoneNumber}</b> <br/>
                            Address: <b>{userData.address}</b>
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    );
}
 
export default User;