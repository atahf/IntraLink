import React, { useState } from 'react';
import { Container, Form, FloatingLabel, Button, Alert, Offcanvas } from 'react-bootstrap';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const {login, error, isLoading} = useLogin();
    const navigate = useNavigate();

    
    const [showHint, setShowHint] = useState(false);
    const handleCloseHint = () => setShowHint(false);
    const handleShowHint = () => setShowHint(true);
    const handleRedirection = () => navigate('/ticket');

    const handleLogin = async (event) => {
        event.preventDefault();

        await login(username, password);
    };

    return (
        <div className='login-page'>
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

                    <a className='login-visible-links' onClick={handleShowHint}>Forgot Password</a>
                    <Offcanvas show={showHint} onHide={handleCloseHint} placement='bottom'>
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{textAlign:'center'}}>
                            If you have forgotten your password, you may submit a ticket to change your password.
                            <br/>
                            Click <a className='login-visible-links' onClick={handleRedirection}>here</a> to go ticket page.
                        </Offcanvas.Body>
                    </Offcanvas>

                    {error && (
                        <Alert className='login-error' variant='danger'>{error}</Alert>
                    )}
                </Form>
            </Container>
        </div>
    );
}
 
export default Login;
