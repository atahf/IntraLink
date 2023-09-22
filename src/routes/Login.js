import React, { useState } from 'react';
import { Container, Form, FloatingLabel, Button, Alert, Modal } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';
import Loading from '../components/Loading';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [usernameModal, setUsernameModal] = useState('');
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const {login, error, isLoading} = useLogin();

    const handleLogin = async (event) => {
        event.preventDefault();

        await login(username, password);
    };

    const handleClose = () => {
        setUsernameModal('');
        setShow(false);
    }
    const handleShow = () => setShow(true);

    return (
        <div className='login-page'>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Reset Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        {show2 && (
                            <Loading />
                        )}
                        {!show2 && (
                            <Form onSubmit={() => {setShow2(true)}}>
                                <Form.Group className="mb-3" controlId="login.reset-pass">
                                    <Form.Label>
                                        Enter Your Username
                                    </Form.Label>

                                    <Form.Control 
                                        type="text" 
                                        placeholder="username" 
                                        value={usernameModal} 
                                        onChange={(e) => {setUsernameModal(e.target.value)}}
                                        required 
                                            autoComplete='true'
                                    />
                                </Form.Group>

                                <Button type='submit' onClick={() => {}}>Reset</Button>
                            </Form>
                        )}
                    </Container>
                </Modal.Body>
            </Modal>

            <Container fluid className='login-container'>
                <Form className='login-form' onSubmit={handleLogin}>
                    <FloatingLabel className="mb-3" controlId="login.username" label="Username">
                        <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            required 
                            autoComplete='true'
                            value={username} 
                            onChange={(e) => {setUsername(e.target.value)}}
                        />
                    </FloatingLabel>

                    <FloatingLabel className="mb-3" controlId="login.password" label="Password">
                        <Form.Control 
                            type={showPass ? "text" : "password"} 
                            placeholder="Enter password" 
                            required 
                            autoComplete='true' 
                            value={password} 
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </FloatingLabel>

                    <Form.Group className="mb-3" controlId="login.show-password">
                        <Form.Check 
                            type="checkbox" 
                            label="Show Password" 
                            value={showPass} onChange={() => {setShowPass(!showPass)}}
                        />
                    </Form.Group>

                    <Button className='login-btn' variant="primary" type="submit" disabled={isLoading}>
                        Login
                    </Button>

                    <a className='login-visible-links' onClick={handleShow}>Forgot Password</a>

                    {error && (
                        <Alert className='login-error' variant='danger'>{error}</Alert>
                    )}
                </Form>
            </Container>
        </div>
    );
}
 
export default Login;
