import React, { useState } from 'react';
import { Container, Row, Col, Card, Toast, Form, FloatingLabel, Button } from 'react-bootstrap';
import { decodeJwtToken, getToken } from '../utils/jwtTools';

const ChatBox = ({ messages, sendMessage, otherUser }) => {
    const [newMessage, setNewMessage] = useState('');

    const senderMe = (sender) => {
        return decodeJwtToken(getToken()).sub === sender;
    };

    function adjustTimeZone(dateString, hours) {
        const date = new Date(dateString);
        // Add 3 hours (3 * 60 * 60 * 1000 milliseconds) to adjust the time zone
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        return date;
    }

    const calculateMinutesAgo = (targetDate) => {
        const currentDate = new Date();
        const targetDateObject = new Date(targetDate);
      
        if (!isNaN(targetDateObject)) {
          const timeDifference = currentDate - targetDateObject;
          const minsAgo = Math.floor(timeDifference / (1000 * 60));
          return minsAgo;
        }
      
        return NaN;
    };

    const calculateDaysAgo = (targetDate) => {
        const currentDate = new Date();
        const targetDateObject = new Date(targetDate);
      
        if (!isNaN(targetDateObject)) {
          const timeDifference = currentDate - targetDateObject;
          const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          return daysAgo;
        }
      
        return NaN;
    };

    const giveDate = (date) => {
        const myDate = adjustTimeZone(date, 3);
        const mins = calculateMinutesAgo(myDate);
        const days = calculateDaysAgo(myDate);

        if(mins === 0) {
            return "now";
        }
        else if(mins > 0 && mins <= 1) {
            return "1 minute ago";
        }
        else if(mins <= 59) {
            return mins.toString() + " minutes ago";
        }
        else {
            console.log(myDate);
            if(days === 0) {
                return myDate.toString().match(/(\d{2}:\d{2})/)[0];
            }
            else if(days === 1) {
                return "Yesterday " + myDate.toString().match(/(\d{2}:\d{2})/)[0];
            }
            else {
                const day = myDate.getDate().toString().padStart(2, '0');
                const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
                const year = myDate.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                return formattedDate + ' ' + myDate.toString().match(/(\d{2}:\d{2})/)[0];
            }
        }
    };

    const handleSend = (event) => {
        event.preventDefault();

        const body = newMessage;
        const receiver = otherUser[0];

        sendMessage(receiver, body);
        setNewMessage('');
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                <Row>
                    <Col style={{overflowY: 'scroll'}}>
                        {messages.map((message, index) => (
                            <Toast
                                key={index}
                                className={`${senderMe(message.sender) ? 'ms-auto' : 'me-auto'}`}
                                style={{margin: '5px'}}
                            >
                                <Toast.Body>
                                    {message.body} <br />
                                    <p className='text-end' style={{marginBottom: '2px'}}>{giveDate(message.date)}</p>
                                </Toast.Body>
                            </Toast>
                        ))}
                    </Col>
                </Row>
                </Card.Body>
                <Card.Footer>
                    <Container>
                        <Row>
                            <Col sm={11} className="justify-content-center align-items-center">
                                <FloatingLabel label="New Message">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px' }}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col sm={1} className="d-flex justify-content-center align-items-center">
                                <Button variant="primary" onClick={handleSend} className="d-flex align-items-center">
                                    <i className="fa fa-paper-plane" />
                                    <span className="ms-2">Send</span>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default ChatBox;

