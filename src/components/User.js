import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Container, Button, Form, FloatingLabel } from 'react-bootstrap';
import UserProfileAvatar from '../assets/user.jpg';
import EditableText from "./EditableText";

const User = ({ userData, editable }) => {
    const [picture, setPicture] = useState(null);
    const [editInfo, setEditInfo] = useState(false);
    const [fName, setFName] = useState(userData.firstName);
    const [lName, setLName] = useState(userData.lastName);
    const [PhoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
    const [Gender, setGender] = useState(userData.gender);
    const [Address, setAddress] = useState(userData.address);
    const [dob, setDob] = useState(userData.birthdate);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null);

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

        // TODO: download profile picture
    };

    const handleEdit = async () => {
        setEditInfo(false);

        // TODO: send edit request
        window.location.reload();
    }

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleUnhover = () => {
        setIsHovered(false);
    };

    const handleGetImageBtn = () => {
        fileInputRef.current.click();
    };

    const handleGetImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 4 * 1024 * 1024; // 4MB
            if (file.size > maxSize) {
                alert('Image size exceeds 4MB. Please choose a smaller image.');
                return;
            } else {
                console.log('Selected image:', file);
            }
        }
    };

    useEffect(() => {
        loadPicture();
    }, []);

    return (
        <Container style={{padding: '15px', margin: '5px'}}>
            {!editable && (
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
                                First Name: <b>{capitalizeWords(userData.firstName)}</b> <br/>
                                Last Name: <b>{capitalizeWords(userData.lastName)}</b> <br/>
                                Username: <b>{ userData.username }</b> <br/>
                                E-mail: <b>{userData.email}</b> <br/>
                                Role: <b>{userData.role}</b> <br/>
                                Department: <b>{userData.department}</b> <br/>
                                Title: <b>{userData.title}</b> <br/>
                                Birthdate: <b>{userData.birthdate}</b> <br/>
                                Age: <b>{userData.age}</b> <br/>
                                Gender: <b>{userData.gender}</b> <br/>
                                Phone Number: <b>{userData.phoneNumber}</b> <br/>
                                Address: <b>{userData.address}</b>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            )}
            {editable && editInfo && (
                <Row>
                    <Col xs={6} md={4} className="d-flex justify-content-center align-items-center">
                        <div
                            onMouseEnter={handleHover}
                            onMouseLeave={handleUnhover}
                        >
                            <Card.Img 
                                variant="top" 
                                src={picture ? picture : UserProfileAvatar} 
                                alt='UserProfileAvatar'
                                style={{width: '300px', height: 'auto', border: '1px solid black'}}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleGetImage}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                multiple={false}
                            />
                            {isHovered && (
                                <div className="overlay">
                                    <i 
                                        className={"fa fa-trash fa-3x " + (picture ? "trash-icon" : "disabled-icon")}
                                        onClick={() => {}}
                                    />
                                    <i 
                                        className="fa fa-pencil fa-3x pen-icon"
                                        onClick={handleGetImageBtn}
                                    />
                                </div>
                            )}
                        </div>
                    </Col>
                    <Col xs={12} md={8} className="d-flex justify-content-center align-items-center">
                        <Card.Body>
                            <Card.Text style={{ padding: '0px 40px' }}>
                                To edit double click on field that you want to change. <br/><br/>
                                First Name: <EditableText text={fName} setText={setFName}/> <br/>
                                Last Name: <EditableText text={lName} setText={setLName}/> <br/>
                                Birthdate: <EditableText text={dob} setText={setDob}/> <br/>
                                Gender: <EditableText text={Gender} setText={setGender}/> <br/>
                                Phone Number: <EditableText text={PhoneNumber} setText={setPhoneNumber}/> <br/>
                                Address: <EditableText text={Address} setText={setAddress}/> <br/>
                            </Card.Text>
                            <Button style={{width: '100px'}} variant="primary" onClick={handleEdit}>Save</Button>
                            <Button style={{width: '100px'}} variant="secondary" onClick={() => setEditInfo(false)}>Cancel</Button>
                        </Card.Body>
                    </Col>
                </Row>
            )}
            {editable && !editInfo && (
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
                                First Name: <b>{capitalizeWords(userData.firstName)}</b> <br/>
                                Last Name: <b>{capitalizeWords(userData.lastName)}</b> <br/>
                                Username: <b>{ userData.username }</b> <br/>
                                E-mail: <b>{userData.email}</b> <br/>
                                Role: <b>{userData.role}</b> <br/>
                                Department: <b>{userData.department}</b> <br/>
                                Title: <b>{userData.title}</b> <br/>
                                Birthdate: <b>{userData.birthdate}</b> <br/>
                                Age: <b>{userData.age}</b> <br/>
                                Gender: <b>{userData.gender}</b> <br/>
                                Phone Number: <b>{userData.phoneNumber}</b> <br/>
                                Address: <b>{userData.address}</b>
                            </Card.Text>
                            <Button style={{width: '100px'}} onClick={() => setEditInfo(true)}>Edit</Button>
                        </Card.Body>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
 
export default User;
