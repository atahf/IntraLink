import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const CustomNavbar = ({ home = {name: "Navbar", url: "/"}, btnLeft = [], btnRight = [], btnCenter = [], txtCenter = [], txtLeft = [], txtRight = [] }) => {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid>
				<Navbar.Brand href={home.url}>{home.name}</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{btnLeft.map((btnL, indexL) => (
							<Nav.Link href={btnL.url} key={indexL}>{btnL.name}</Nav.Link>
						))}

						{txtLeft.map((txtL, indexTL) => (
							<span className="nav-link" key={indexTL}>{txtL}</span>
						))}
					</Nav>

					<Nav className="mc-auto">
						{btnCenter.map((btnC, indexC) => (
							<Nav.Link href={btnC.url} key={indexC}>{btnC.name}</Nav.Link>
						))}

						{txtCenter.map((txtC, indexTC) => (
							<span className="nav-link" key={indexTC}>{txtC}</span>
						))}
					</Nav>

					<Nav className="ms-auto">
						{btnRight.map((btnR, indexR) => (
							<Nav.Link href={btnR.url} key={indexR}>{btnR.name}</Nav.Link>
						))}

						{txtRight.map((txtR, indexTR) => (
							<span className="nav-link" key={indexTR}>{txtR}</span>
						))}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default CustomNavbar;