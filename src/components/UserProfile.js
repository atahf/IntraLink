import React, { useEffect, useState } from 'react';
import { Spinner, Card, Button, Form, FloatingLabel,  Modal } from 'react-bootstrap';
import UserProfileAvatar from '../assets/user.jpg';
import { getToken, decodeJwtToken } from '../utils/jwtTools';
import { getUserDataURL, getDownloadURL } from '../utils/urlTools';

const UserProfile = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [data, setData] = useState(null);
    const [picture, setPicture] = useState(null);
    const [show, setShow] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPass2, setNewPass2] = useState('');

    const style = {
        ...(props.style && {
            height: props.style.height,
            width: props.style.width,
        }),
    };

    const handleClose = () => {
        setShow(false);
        setOldPass('');
        setNewPass('');
        setNewPass2('');
        setShowPass(false);
    }
    const handleShow = () => setShow(true);

    const loadData = async () => {
        setIsLoading(true);
        const token = getToken();
        const username = decodeJwtToken(token).sub;
        fetch(getUserDataURL(username), {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData.returnObject);
                
                if(!data.profilePicture) {
                    setIsLoading(false);
                    return;
                }
                        
                fetch(getDownloadURL(data.profilePicture), {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
                })
                
                    .then(response => response.blob())
                    .then(imageResponse => {
                        setPicture(imageResponse);
                        setIsLoading(false);
                        return;
                    })
                    .catch(error => {
                        setError(error);
                        setIsLoading(false);
                        return;
                    });
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
                return;
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
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
                    <Form className='profile-changepassword' onSubmit={() => {console.log("pressed change!")}}>
                        <FloatingLabel className="mb-3" controlId="profile.changepassword.oldpass" label="Old Password">
                            <Form.Control 
                                type={showPass ? 'text' : 'password'}
                                placeholder="Enter Old Password" 
                                required 
                                autoComplete='true'
                                value={oldPass}
                                onChange={(e) => {setOldPass(e.target.value)}}
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" controlId="profile.changepassword.newpass" label="New Password">
                            <Form.Control 
                                type={showPass ? 'text' : 'password'}
                                placeholder="Enter New Password" 
                                required 
                                autoComplete='true' 
                                value={newPass}
                                onChange={(e) => {setNewPass(e.target.value)}}
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" controlId="profile.changepassword.newpass2" label="New Password">
                            <Form.Control 
                                type={showPass ? 'text' : 'password'}
                                placeholder="Enter New Password Again" 
                                required 
                                autoComplete='true' 
                                value={newPass2}
                                onChange={(e) => {setNewPass2(e.target.value)}}
                            />
                        </FloatingLabel>

                        <Form.Group className="mb-3" controlId="profile.changepassword.show-password">
                            <Form.Check 
                                type="checkbox" 
                                label="Show Password" 
                                value={showPass} onChange={() => {setShowPass(!showPass)}}
                            />
                        </Form.Group>

                        <Button type='submit' disabled={newPass !== newPass2} onClick={() => {}}>Change</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Card style={style}>
                {isLoading && (
                    <div className='loading-spinner'>
                        <Spinner animation="border" variant="light"/>
                        <div className='loading-sprinner-text'>Loading...</div>
                    </div>
                )}
                {!isLoading && data && (<>
                    <Card.Img variant="top" src={picture ? picture : UserProfileAvatar} alt='UserProfileAvatar' />
                    <Card.Body>
                        <Card.Text style={{ padding: '0px 40px', textTransform: 'capitalize' }}>
                            Name: {data.firstName + ' ' + data.lastName} <br/>
                            Username: { data.username } <br/>
                            E-mail: {data.email} <br/>
                            Role: {data.role}
                        </Card.Text>
                    </Card.Body>
                    <div style={{margin: '15px', display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={handleShow}>Change Password</Button>
                    </div>
                </>)}
            </Card>
        </>
    );
}
 
export default UserProfile;