import React, { useEffect, useState } from 'react';
import { Container, Spinner, Card, Pagination } from 'react-bootstrap';
import { getToken } from '../utils/jwtTools';
import {  getAllTicketsDataURL } from '../utils/urlTools';
import Loading from '../components/Loading';

const Tickets = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [tickets, setTickets] = useState(null);
    const [ticketNum, setTicketNum] = useState(0);

    const style = {
        ...(props.style && {
            height: props.style.height,
            width: props.style.width,
        }),
    };

    const loadTickets = async () => {
        setIsLoading(true);
        const token = getToken();

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
    };

    useEffect(() => {
        loadTickets();
    }, []);

    return (
        <Card style={style}>
            {isLoading && (
                <Loading />
            )}
            {!isLoading && tickets && (<>
                <Card.Body>
                    {tickets[ticketNum] && (
                        <Card.Text style={{ padding: '0px 40px', textTransform: 'capitalize' }}>
                            <Container>
                                Submitted By: {tickets[ticketNum].username} <br />
                                Submission Date: {tickets[ticketNum].submissionDate.replace("T", " ")} <br />
                                Ticket ID: {tickets[ticketNum].id} <br />
                                Status: {tickets[ticketNum].handled ? "" : "Not"} Resolved <br />
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
            </>)}
        </Card>
    );
}
 
export default Tickets;