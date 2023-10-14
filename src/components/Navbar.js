import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { decodeJwtToken } from '../utils/jwtTools';
import {useLocation} from 'react-router-dom';

const CustomNavbar = (props) => {
	const { logout } = useLogout();
	const { jwtToken } = useAuthContext();
	const [isHovered, setIsHovered] = useState(false);
	const location = useLocation();

	const getUsername = () => {
		const tokenJSON = decodeJwtToken(jwtToken);
		return tokenJSON.sub;
	}

	const handleMouseEnter = () => {
		setIsHovered(true);
	};
  
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<header>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container fluid style={{margin: "auto 25px"}}>
					<Navbar.Brand href="/">IntraLink</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							{jwtToken && (
								<Navbar.Text
									className={`dropdown-button ${isHovered ? 'hovered' : ''}`}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									style={{marginRight: '15px'}}
								>
									Signed in as: <b>{getUsername()}</b>
									{isHovered && (
										<div className="dropdown-content">
											<Nav.Link className="dropdown-content-link" href="/profile">Profile</Nav.Link>
											<Nav.Link className="dropdown-content-link" onClick={logout}>Log Out</Nav.Link>
										</div>
									)}
								</Navbar.Text>
							)}
							{!jwtToken && location.pathname !== "/login" && (
								<Nav.Link href="/login">Login</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default CustomNavbar;