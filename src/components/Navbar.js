import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { decodeJwtToken, hasPermission } from '../utils/jwtTools';

const CustomNavbar = (props) => {
	const { logout } = useLogout();
	const { jwtToken } = useAuthContext();
	const [isHovered, setIsHovered] = useState(false);

	const perms = {...(props.perms)};

	const handleLogout = () => {
		logout();
	}

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
				<Container fluid>
					<Navbar.Brand href="/">IntraLink</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{jwtToken && (
							<Nav className="me-auto">
								<Nav.Link href="/ticket">Ticket</Nav.Link>
								{hasPermission("user:add", jwtToken) && (
									<Nav.Link href="/new-user">Add User</Nav.Link>
								)}
							</Nav>
						)}
						{jwtToken && (
							<Nav className="ms-auto">
								<Navbar.Text
									className={`dropdown-button ${isHovered ? 'hovered' : ''}`}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									style={{marginRight: '15px'}}
								>
									Signed in as: <b>{getUsername()}</b>
									{isHovered && (
										<div className="dropdown-content">
											<Nav.Link className="dropdown-content-link" href="/profie">Profile</Nav.Link>
											<Nav.Link className="dropdown-content-link" href="#">Account Settings</Nav.Link>
											<Nav.Link className="dropdown-content-link" onClick={logout}>Log Out</Nav.Link>
										</div>
									)}
								</Navbar.Text>
							</Nav>
						)}
						{!jwtToken && (
							<Nav className="me-auto">
							</Nav>
						)}
						{!jwtToken && (
							<Nav className="ms-auto">
								<Nav.Link href="/login">Login</Nav.Link>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default CustomNavbar;