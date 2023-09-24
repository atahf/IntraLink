import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken, hasPermission } from '../utils/jwtTools';

const UserHome = () => {
    const [url, setUrl] = useState('/');
    const navigate = useNavigate();

    useEffect(() => {
        if(url && url !== "/") {
            navigate(url);
        }
    }, [url]);

    return (
        <Container>
            <div className="grid-container">
                <div className="box" onClick={() => setUrl("/new-ticket")}>New Ticket</div>
                {hasPermission("ticket:read", getToken()) && (<div className="box" onClick={() => setUrl("/tickets")}>Tickets</div>)}
                {hasPermission("user:add", getToken()) && (<div className="box" onClick={() => setUrl("/new-user")}>New User</div>)}
                {hasPermission("user:read", getToken()) && (<div className="box" onClick={() => setUrl("/users")}>Users</div>)}
                <div className="box" onClick={() => setUrl("#")}>Tasks</div>
                <div className="box" onClick={() => setUrl("#")}>Messages</div>
                <div className="box" onClick={() => setUrl("#")}>Files</div>
            </div>
        </Container>
    );
}
 
export default UserHome;