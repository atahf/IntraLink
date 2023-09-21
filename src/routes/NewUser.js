import { useState } from 'react';
import { Container, Form, FloatingLabel, Button, Col, Row } from 'react-bootstrap';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const NewUser = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [Email, setEmail] = useState('');
    const [Username, setUsername] = useState('');
    const [Role, setRole] = useState('');
    const [Department, setDepartment] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState(null);

    const handleAddUser = async (event) => {
        event.preventDefault();

        // TODO: send userAdd request and handle errors
    };

    return (
        <Container>
            <Form onSubmit={handleAddUser}>
                <Row className="new-user-input-container">
                    <Col xs={6} md={6}>
                        <Form.Group className="mb-3 new-user-input-box" controlId="newUserForm.firstName">
                            <FloatingLabel label="First Name" style={{zIndex: "0"}}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter First Name" 
                                    required
                                    value={fName} 
                                    onChange={(e) => {setFName(e.target.value)}}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col xs={6} md={6}>
                        <Form.Group className="mb-3 new-user-input-box" controlId="newUserForm.lastName">
                            <FloatingLabel label="Last Name" style={{zIndex: "0"}}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Last Name" 
                                    required
                                    value={lName} 
                                    onChange={(e) => {setLName(e.target.value)}}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="new-user-input-container">
                    <Col xs={4} md={4}>
                        <div className="input-container">
                            <Form.Group className="mb-3 new-user-input-box" controlId="newUserForm.email">
                                <FloatingLabel label="Email" style={{zIndex: "0"}}>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter Email" 
                                        required
                                        value={Email} 
                                        onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3 new-user-input-box" controlId="newUserForm.roleSelect">
                                <FloatingLabel label="Select Role For Permissions" style={{zIndex: "0"}}>
                                    <Form.Select 
                                        aria-label="Select Role For Permissions"
                                        required
                                        value={Role}
                                        onChange={(e) => {setRole(e.target.value)}}
                                    >
                                        <option value="" hidden disabled> --- </option>
                                        <option value="employee">Employee</option>
                                        <option value="IT">IT</option>
                                        <option value="IT Admin">IT Admin</option>
                                        <option value="HR">HR</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </div>
                    </Col>
                    <Col xs={4} md={4}>
                        <div className="input-container">
                            <Form.Group className="mb-3 new-user-input-box" controlId="newUserForm.department">
                                <FloatingLabel label="Department" style={{zIndex: "0"}}>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Department" 
                                        required
                                        value={Department} 
                                        onChange={(e) => {setDepartment(e.target.value)}}
                                    />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3 new-user-input-box" controlId="newUserForm.phoneNumber">
                                <PhoneInput
                                    placeholder="Enter Phone Number"
                                    value={PhoneNumber}
                                    onChange={setPhoneNumber}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                    <Col xs={4} md={4}>
                        <div className="input-container">
                            <Form.Group className="mb-3 new-user-input-box" controlId="newUserForm.username">
                                <FloatingLabel label="Username" style={{zIndex: "0"}}>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Username" 
                                        required
                                        value={Username} 
                                        onChange={(e) => {setUsername(e.target.value)}}
                                    />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className="mb-3 new-user-input-box d-flex justify-content-center align-items-center" controlId="newUserForm.dobSelect">
                                <Form.Label style={{ margin: '0 10px 0 0' }}>Enter Birthdate</Form.Label>
                                <DatePicker
                                    className='datepicker-custom-style'
                                    selected={dob}
                                    onChange={(date) => { setDob(date) }}
                                />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="newUserForm.btnSubmit" style={{display: "flex", margin: "10px auto"}}>
                    <Button type='submit'>
                        Add User
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
 
export default NewUser;
