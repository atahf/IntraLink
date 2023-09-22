import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
    const navigate = useNavigate();
  
    const handleClick = (url) => {
        navigate(url);
    };

    return (
        <Container>
            <div className="grid-container">
                <div className="box" onClick={handleClick("/ticket")}>New Ticket</div>
                <div className="box" onClick={handleClick("#")}>Tickets</div>
                <div className="box" onClick={handleClick("/new-user")}>New User</div>

                <div className="box" onClick={handleClick("#")}>Box</div>
                <div className="box" onClick={handleClick("#")}>Box</div>
                <div className="box" onClick={handleClick("#")}>Box</div>
                <div className="box" onClick={handleClick("#")}>Box</div>
                <div className="box" onClick={handleClick("#")}>Box</div>
                <div className="box" onClick={handleClick("#")}>Box</div>
                <div className="box" onClick={handleClick("#")}>Box</div>
                <div className="box" onClick={handleClick("#")}>Box</div>
            </div>
        </Container>
    );
}
 
export default UserHome;