import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
                <div className="box" onClick={() => setUrl("/tickets")}>Tickets</div>
                <div className="box" onClick={() => setUrl("/new-user")}>New User</div>

                <div className="box" onClick={() => setUrl("#")}>Box</div>
                <div className="box" onClick={() => setUrl("#")}>Box</div>
                <div className="box" onClick={() => setUrl("#")}>Box</div>
                <div className="box" onClick={() => setUrl("#")}>Box</div>
                <div className="box" onClick={() => setUrl("#")}>Box</div>
                <div className="box" onClick={() => setUrl("#")}>Box</div>
            </div>
        </Container>
    );
}
 
export default UserHome;