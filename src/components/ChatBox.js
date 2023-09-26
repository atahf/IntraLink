import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Toast, Form, FloatingLabel, Button } from 'react-bootstrap';
import { decodeJwtToken, getToken } from '../utils/jwtTools';
import { Scrollbars } from 'react-custom-scrollbars-2';

const ChatBox = ({ messages, sendMessage, otherUser }) => {
    const [newMessage, setNewMessage] = useState('');
    const [messageSize, setMessageSize] = useState(null);
    const scrollbarsRef = useRef(null);

    useEffect(() => {
        if(messageSize !== messages.length) {
            setMessageSize(messages.length)
        }
    }, [messages]);

    useEffect(() => {
        const scrollDuration = 750;
        const scrollStartTime = performance.now();
        const startScrollTop = scrollbarsRef.current.getScrollTop();
        const targetScrollTop = scrollbarsRef.current.getScrollHeight();

        const animateScroll = (timestamp) => {
        const elapsed = timestamp - scrollStartTime;
        const progress = Math.min(elapsed / scrollDuration, 1);
        const newScrollTop = startScrollTop + progress * (targetScrollTop - startScrollTop);

        scrollbarsRef.current.scrollTop(newScrollTop);

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
        };

        requestAnimationFrame(animateScroll);
    }, [messageSize]);

    const senderMe = (sender) => {
        return decodeJwtToken(getToken()).sub === sender;
    };

    function adjustTimeZone(dateString, hours) {
        const date = new Date(dateString);
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
        const receiver = otherUser;

        sendMessage(receiver, body);
        setNewMessage('');
    }

    return (
        <Container>
            <Card style={{height: '750px'}}>
                <Card.Body style={{height: '600px'}}>
                    <Row style={{height: '600px'}}>
                        <Col style={{height: '600px'}}>
                            <Scrollbars style={{height: '600px'}} ref={scrollbarsRef}>
                                {messages.map((message, index) => (
                                    <Toast
                                        key={index}
                                        bg={`${senderMe(message.sender) ? 'dark' : ''}`}
                                        className={`${senderMe(message.sender) ? 'ms-auto text-white' : 'me-auto'}`}
                                        style={{margin: '5px 15px'}}
                                    >
                                        <Toast.Body>
                                            {message.body.split('\n').map((line, lineIndex) => (
                                                <div key={lineIndex}>
                                                    {line} <br />
                                                </div>
                                            ))}
                                            <p className='text-end' style={{marginBottom: '2px'}}>{giveDate(message.date)}</p>
                                        </Toast.Body>
                                    </Toast>
                                ))}
                            </Scrollbars>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Container>
                        <Row className="justify-content-center align-items-center">
                            <Col sm={10} className="justify-content-center align-items-center">
                                <FloatingLabel label="New Message">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '100px', resize: 'none' }}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center" style={{marginLeft: '5px'}}>
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

