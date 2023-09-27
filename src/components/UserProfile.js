import React, { useEffect, useState } from 'react';
import { Card, Button, Form, FloatingLabel,  Modal } from 'react-bootstrap';
import { getToken, decodeJwtToken } from '../utils/jwtTools';
import { getUserDataURL, getDownloadURL } from '../utils/urlTools';
import Loading from '../components/Loading';
import User from '../components/User';

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
                    <Loading />
                )}
                {!isLoading && data && (
                    <User userData={data} editable={true} changePassword={true}/>
                )}
            </Card>
        </>
    );
}
 
export default UserProfile;