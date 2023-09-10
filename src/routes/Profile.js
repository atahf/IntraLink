import React, { useEffect, useState } from 'react';
import { Container, Spinner, Card, Col, Row, Button, Pagination, Form, FloatingLabel,  Modal } from 'react-bootstrap';
import UserProfileAvatar from '../assets/user.jpg';
import { getToken, decodeJwtToken } from '../utils/jwtTools';
import { getUserDataURL, getDownloadURL, getAllTicketsDataURL } from '../utils/urlTools';

const Profile = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [data, setData] = useState(null);
    const [picture, setPicture] = useState(null);

    const [ticketNum, setTicketNum] = useState(0);
    const [tickets, setTickets] = useState(null);

    const [show, setShow] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPass2, setNewPass2] = useState('');

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
        const username = decodeJwtToken(token).sub
        fetch(getUserDataURL(username), {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData.returnObject);
                
                /*if(!data.profilePicture) {
                    setIsLoading(false);
                    return;
                }*/

                fetch(getAllTicketsDataURL(), {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(response => response.json())
                    .then(jsonData => {
                        setTickets(jsonData.returnObject);
                        setIsLoading(false);
                        return;
                    })
                    .catch(error => {
                        setError(error);
                        setIsLoading(false);
                        return;
                    });
                        

                /*fetch(getDownloadURL(data.profilePicture), {
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
                    });*/
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
        <div className='profile-page'>
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


            <Container>
                {isLoading && (
                    <div className='profile-spinner'>
                        <Spinner animation="border" variant="light"/>
                        <div className='profile-sprinner-text'>Loading...</div>
                    </div>
                )}
                {!isLoading && data && tickets && (
                    <Row>
                        <Col xs={6} md={4}>
                            <Card>
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
                            </Card>
                        </Col>
                        <Col xs={6} md={8}>
                            <Card style={{ height: '100%' }}>
                                <Card.Body>
                                    {tickets[ticketNum] && (
                                        <Card.Text style={{ padding: '0px 40px', textTransform: 'capitalize' }}>
                                            <Container>
                                                Submitted By: {tickets[ticketNum].username} <br />
                                                Submission Date: {tickets[ticketNum].submissionDate} <br />
                                                Ticket ID: {tickets[ticketNum].id} <br />
                                                Status: {tickets[ticketNum].handled} <br />
                                                Subject: {tickets[ticketNum].subject} <br /><br />
                                                {tickets[ticketNum].description}
                                            </Container>
                                        </Card.Text>
                                    )}
                                </Card.Body>
                                <Pagination style={{margin: '15px', display: 'flex', justifyContent: 'center' }}>
                                    <Pagination.First onClick={() => {setTicketNum(0)}} disabled={ticketNum === 0}/>
                                    <Pagination.Prev onClick={() => {setTicketNum(ticketNum-1)}} disabled={ticketNum-1 < 0}/>

                                    {tickets.map((task, index) => {
                                        const startIndex = Math.max(0, ticketNum - 2);
                                        const endIndex = Math.min(tickets.length, ticketNum + 3);

                                        if (index >= startIndex && index < endIndex) {
                                            return (
                                                <Pagination.Item
                                                    key={index}
                                                    active={index === ticketNum}
                                                    onClick={() => setTicketNum(index)}
                                                >
                                                    {index+1}
                                                </Pagination.Item>
                                            );
                                        }

                                        return null;
                                    })}

                                    <Pagination.Next onClick={() => {setTicketNum(ticketNum+1)}} disabled={ticketNum+1 > tickets.length-1}/>
                                    <Pagination.Last onClick={() => {setTicketNum(tickets.length-1)}} disabled={ticketNum === tickets.length-1}/>
                                </Pagination>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}
 
export default Profile;
