import React, { useState } from 'react';
import { Container, Form, FloatingLabel, Button, Offcanvas } from 'react-bootstrap';

const NewTicket = () => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleTicket = async (event) => {
        event.preventDefault();
    };

    return (
        <div className="ticket-page">
            <Container fluid className='ticket-container'>
                <Form className='ticket-form' onSubmit={handleTicket}>
                    <FloatingLabel className="mb-3" controlId="ticket.subject" label="Subject">
                        <Form.Control 
                            type="text" 
                            placeholder="Enter subject" 
                            required 
                            autoComplete='true' 
                            value={subject} 
                            onChange={(e) => {setSubject(e.target.value)}}
                        />
                    </FloatingLabel>

                    <FloatingLabel className="mb-3" controlId="ticket.description" label="Description">
                        <Form.Control 
                            type="text" 
                            placeholder="Enter description" 
                            required 
                            autoComplete='true' 
                            value={description} 
                            as="textarea"
                            maxLength={512}
                            onChange={(e) => {setDescription(e.target.value)}}
                            style={{ height: '100px', width: '100%' }}
                        />
                    </FloatingLabel>

                    <Button className='ticket-btn' variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
 
export default NewTicket;