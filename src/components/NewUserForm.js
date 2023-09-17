import { useState } from 'react';
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const NewUserForm = () => {
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
                <Form.Group className="mb-3" controlId="newUserForm.firstName">
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

                <Form.Group className="mb-3" controlId="newUserForm.lastName">
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

                <Form.Group className="mb-3" controlId="newUserForm.email">
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

                <Form.Group className="mb-3" controlId="newUserForm.username">
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

                <Form.Group className="mb-3" controlId="newUserForm.roleSelect">
                    <Form.Select  
                        aria-label="Default select example"
                        required
                        value={Role}
                        onChange={(e) => {setRole(e.target.value)}}
                    >
                        <option value="" disabled selected hidden>Select Role For Permissions</option>
                        <option value="employee">Employee</option>
                        <option value="IT">IT</option>
                        <option value="IT Admin">IT Admin</option>
                        <option value="HR">HR</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="newUserForm.department">
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

                <Form.Group className="mb-3" controlId="newUserForm.phoneNumber">
                    <PhoneInput
                        placeholder="Enter Phone Number"
                        value={PhoneNumber}
                        onChange={setPhoneNumber}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="newUserForm.dobSelect">
                    <Form.Label>Enter Birthdate</Form.Label> &nbsp;
                    <DatePicker
                        selected={dob} 
                        onChange={(date) => {setDob(date)}} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="newUserForm.btnSubmit">
                    <Button type='submit'>
                        Add User
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
 
export default NewUserForm;
