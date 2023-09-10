import React, { useEffect, useState } from 'react';
import { Container, Spinner, Card, Col, Row, Button, Pagination, Form, FloatingLabel,  Modal } from 'react-bootstrap';
import { useGetUserInfo } from '../hooks/useGet';
import UserProfileAvatar from '../assets/user.jpg';

const Profile = () => {
    const { GET, data, picture, isLoading, error } = useGetUserInfo();
    const [taskNum, setTaskNum] = useState(0);
    const tasks = [
        {
            subject: "task1",
            issuer: "ata",
            issueDate: "05/09/2023",
            deadlineDate: "10/09/2023",
            text: "Solve Uploading Problem of File Upload System"
        },
        {
            subject: "task2",
            issuer: "ata",
            issueDate: "05/09/2023",
            deadlineDate: "13/09/2023",
            text: "Design and Implement Messaging System"
        },
        {
            subject: "task3",
            issuer: "ata",
            issueDate: "05/09/2023",
            deadlineDate: "22/09/2023",
            text: "Prepare and Submit Report"
        },
    ];

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

    const getUserData = async () => {
        await GET();
    };

    useEffect(() => {
        getUserData();
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
                {!isLoading && data && (
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
                                    {tasks[taskNum] && (
                                        <Card.Text style={{ padding: '0px 40px', textTransform: 'capitalize' }}>
                                            <Container>
                                                Issued By: {tasks[taskNum].issuer} <br />
                                                Issued Date: {tasks[taskNum].issueDate} <br />
                                                Deadline Date: {tasks[taskNum].deadlineDate} <br /><br />
                                                {tasks[taskNum].text}
                                            </Container>
                                        </Card.Text>
                                    )}
                                </Card.Body>
                                <Pagination style={{margin: '15px', display: 'flex', justifyContent: 'center' }}>
                                    <Pagination.First onClick={() => {setTaskNum(0)}} disabled={taskNum === 0}/>
                                    <Pagination.Prev onClick={() => {setTaskNum(taskNum-1)}} disabled={taskNum-1 < 0}/>

                                    {tasks.map((task, index) => {
                                        const startIndex = Math.max(0, taskNum - 2);
                                        const endIndex = Math.min(tasks.length, taskNum + 3);

                                        if (index >= startIndex && index < endIndex) {
                                            return (
                                                <Pagination.Item
                                                    key={index}
                                                    active={index === taskNum}
                                                    onClick={() => setTaskNum(index)}
                                                >
                                                    {index+1}
                                                </Pagination.Item>
                                            );
                                        }

                                        return null;
                                    })}

                                    <Pagination.Next onClick={() => {setTaskNum(taskNum+1)}} disabled={taskNum+1 > tasks.length-1}/>
                                    <Pagination.Last onClick={() => {setTaskNum(tasks.length-1)}} disabled={taskNum === tasks.length-1}/>
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
