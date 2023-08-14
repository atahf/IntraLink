import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();

        // TODO: add authentication

        history.push('/');
    }

    return (
        <div className='login-container'>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="login.email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="login.password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3 text-center" controlId="login.submit">
                            <Button type="submit">Login</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
 
export default Login;