import React, { useState } from "react";
import { Card } from 'react-bootstrap';
import UserProfileAvatar from '../assets/user.jpg';

const User = ({ userData }) => {
    const capitalizeWords = (inputString) => {
            const words = inputString.split(' ');
            const capitalizedWords = words.map(word => {
                if (word.length === 0) {
                    return '';
                }
                return word.charAt(0).toUpperCase() + word.slice(1);
            });
            return capitalizedWords.join(' ');
      }

    return (
        <>
            <Card.Img variant="top" src={userData.profilePicture ? userData.profilePicture : UserProfileAvatar} alt='UserProfileAvatar' />
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
        </>
    );
}
 
export default User;