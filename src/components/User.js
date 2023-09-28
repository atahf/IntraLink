import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Container, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import UserProfileAvatar from '../assets/user.jpg';
import { useChangePass } from "../hooks/useUser";
import Loading from "./Loading";
import { getToken, decodeJwtToken } from "../utils/jwtTools";
import { getEditUserURL, getFileURL, getPPAddURL } from "../utils/urlTools";
import { json } from "react-router-dom";

const User = ({ userData, editable, changePassword }) => {
    const [pictureLoaded, setPictureLoaded] = useState(false);
    const [picture, setPicture] = useState(null);
    const [pictureURL, setPictureURL] = useState(null);
    const [newPicture, setNewPicture] = useState(null);
    const [newPictureURL, setNewPictureURL] = useState('');
    const [editInfo, setEditInfo] = useState(false);
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);
    const [fName, setFName] = useState(userData.firstName);
    const [lName, setLName] = useState(userData.lastName);
    const [PhoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
    const [Address, setAddress] = useState(userData.address);
    const [dob, setDob] = useState(userData.birthdate);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null);

    const { change, isLoadingChange, errorChange, resultChange } = useChangePass();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [show, setShow] = useState(false);

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
        setPictureLoaded(false);

        if(!userData.profilePicture || userData.profilePicture === "") {
            setPictureLoaded(true);
            return;
        }

        // TODO: download profile picture
        fetch(getFileURL(userData.profilePicture), {
            method: 'GET',
            headers: {
                'Authorization': getToken()
            },
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData);

                const base64 = jsonData.returnObject.fileData;
                const decodedData = atob(base64);

                const byteArrays = new Uint8Array(decodedData.length);
                for (let i = 0; i < decodedData.length; i++) {
                    byteArrays[i] = decodedData.charCodeAt(i);
                }

                const file = new Blob([byteArrays], { type: 'image/jpeg' });
                setPicture(file);
                setPictureURL(URL.createObjectURL(file));
                setPictureLoaded(true);
                
            })
            .catch(error => {
                console.log(error);
                setPictureLoaded(true);
            });
    };

    const handleEdit = async () => {
        setEditInfo(false);
        setIsLoadingEdit(true);

        const token = getToken();
        const editUserInfo = {
            username: decodeJwtToken(token).sub,
            firstName: (fName ? fName : '-'),
            lastName: (lName ? lName : '-'),
            birthdate: (dob ? dob : null),
            phoneNumber: (PhoneNumber ? PhoneNumber : '-'),
            address: (Address ? Address : '-')
        };

        fetch(getEditUserURL(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(editUserInfo)
        })
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData);
                
                const formData = new FormData()
                formData.append("file", newPicture);

                fetch(getPPAddURL(), {
                    method: 'POST',
                    headers: {
                        'Authorization': token
                    },
                    body: formData
                })
                    .then(response => response.json())
                    .then(jsonData => {
                        console.log(jsonData);
                        
                        setIsLoadingEdit(false);
                        setEditInfo(true);
                        window.location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleCancel = () => {
        setNewPicture(null);
        setEditInfo(false);
    };

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
                const imageUrl = URL.createObjectURL(file);
                setNewPicture(file);
                setNewPictureURL(imageUrl);
            }
        }
    };

    const handleChange = async (event) => {
        event.preventDefault();

        const changePassword = {
            oldPassword: oldPass,
            newPassword: newPass
        }

        await change(changePassword);
    };

    const handleClose = () => {
        setShow(false);
        setOldPass('');
        setNewPass('');
        if(resultChange) {
            window.location.reload();
        }
    };

    useEffect(() => {
        loadPicture();
    }, []);

    return (
        <Container style={{padding: '15px', margin: '5px'}}>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {isLoadingChange && (
                            <Loading />
                        )}
                        {!isLoadingChange && resultChange && resultChange.status === "200" && (
                            <p>{resultChange.returnObject}</p>
                        )}
                        {!isLoadingChange && !resultChange && (
                            <Form onSubmit={handleChange}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Enter Your Current Password
                                    </Form.Label>

                                    <Form.Control 
                                        type="password" 
                                        placeholder="current password" 
                                        value={oldPass} 
                                        onChange={(e) => {setOldPass(e.target.value)}}
                                        required 
                                        autoComplete='true'
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Enter Your New Password
                                    </Form.Label>

                                    <Form.Control 
                                        type="password" 
                                        placeholder="new password" 
                                        value={newPass} 
                                        onChange={(e) => {setNewPass(e.target.value)}}
                                        required 
                                        autoComplete='true'
                                    />
                                </Form.Group>

                                <Button type='submit' disabled={oldPass === newPass}>Change</Button>
                            </Form>
                        )}
                    </Container>
                </Modal.Body>
            </Modal>


            {!editable && (
                <Row>
                    <Col xs={6} md={4} className="d-flex justify-content-center align-items-center">
                        {pictureLoaded && (
                            <Card.Img 
                                variant="top" 
                                src={picture ? pictureURL : UserProfileAvatar} 
                                style={{width: '300px', height: 'auto'}}
                            />
                        )}
                        {!pictureLoaded && (
                            <Loading />
                        )}
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
                                src={newPicture ? newPictureURL : (picture ? pictureURL : UserProfileAvatar)}
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

                                <FloatingLabel className="mb-3" label="First Name">
                                    <Form.Control
                                        placeholder="Enter first name"
                                        type="text"
                                        value={fName} 
                                        onChange={(e) => {setFName(e.target.value)}}
                                    />
                                </FloatingLabel>

                                <FloatingLabel className="mb-3" label="Last Name">
                                    <Form.Control
                                        placeholder="Enter last name"
                                        type="text"
                                        value={lName} 
                                        onChange={(e) => {setLName(e.target.value)}}
                                    />
                                </FloatingLabel>

                                <FloatingLabel className="mb-3" label="Birthdate">
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter birthdate"
                                        value={dob} 
                                        onChange={(e) => {setDob(e.target.value)}}
                                    />
                                </FloatingLabel>

                                <FloatingLabel className="mb-3" label="Phone Number">
                                    <Form.Control
                                        placeholder="Enter phone number"
                                        type="tel"
                                        pattern="0[0-9]{10}"
                                        maxLength={11}
                                        value={PhoneNumber} 
                                        onChange={(e) => {setPhoneNumber(e.target.value)}}
                                    />
                                </FloatingLabel>

                                <FloatingLabel className="mb-3" label="Address">
                                    <Form.Control
                                        placeholder="Enter address"
                                        type="text"
                                        value={Address} 
                                        onChange={(e) => {setAddress(e.target.value)}}
                                    />
                                </FloatingLabel>
                            </Card.Text>
                            <Button style={{width: '100px', margin: 'auto 10px'}} variant="primary" onClick={handleEdit}>Save</Button>
                            <Button style={{width: '100px', margin: 'auto 10px'}} variant="secondary" onClick={handleCancel}>Cancel</Button>
                        </Card.Body>
                    </Col>
                </Row>
            )}
            {editable && !editInfo && (
                <Row>
                    <Col xs={6} md={4} className="d-flex justify-content-center align-items-center">
                        {pictureLoaded && (
                            <Card.Img 
                                variant="top" 
                                src={picture ? pictureURL : UserProfileAvatar} 
                                style={{width: '300px', height: 'auto'}}
                            />
                        )}
                        {!pictureLoaded && (
                            <Loading />
                        )}
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
                            <Button style={{width: '100px', margin: 'auto 10px'}} onClick={() => setEditInfo(true)}>Edit</Button>
                            {changePassword && (
                                <Button style={{width: '200px', margin: 'auto 10px'}} onClick={() => setShow(true)}>Change Password</Button>
                            )}
                        </Card.Body>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
 
export default User;
