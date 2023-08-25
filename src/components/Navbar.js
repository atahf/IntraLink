import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { decodeJwtToken } from '../utils/jwtTools';

const CustomNavbar = () => {
	const { logout } = useLogout();
	const { jwtToken } = useAuthContext();

	const handleLogout = () => {
		logout();
	}

	const getUsername = () => {
		const tokenJSON = decodeJwtToken(jwtToken);
		return tokenJSON.sub;
	}

	return (
		<header>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container fluid>
					<Navbar.Brand href="/">IntraLink</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{jwtToken && (
							<Nav className="me-auto">
								<Nav.Link href="#">About</Nav.Link>
								<Nav.Link href="#">Dashboard</Nav.Link>
							</Nav>
						)}
						{jwtToken && (
							<Nav className="ms-auto">
								<Nav.Link href="/ticket">Ticket</Nav.Link>
								<Nav.Link href="/profile">{getUsername()}</Nav.Link>
								<Button onClick={handleLogout}>Logout</Button>
							</Nav>
						)}
						{!jwtToken && (
							<Nav className="me-auto">
								<Nav.Link href="#">About</Nav.Link>
							</Nav>
						)}
						{!jwtToken && (
							<Nav className="ms-auto">
								<Nav.Link href="/ticket">Ticket</Nav.Link>
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