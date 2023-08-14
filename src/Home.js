import React from 'react';
import CustomNavbar from './Navbar';
import Container from 'react-bootstrap/Container';

const Home = () => {
    return (
        <div>
            <CustomNavbar 
                home={{name: "IntraLink", url: "/"}} 
                btnLeft={[{url: "#", name: "About"}, {url: "#", name: "Support"}]} 
                btnRight={[{url: "/Login", name: "Login"}]}
            />
            <Container >
                <h1>Home Page</h1>
            </Container>
        </div>
    );
}
 
export default Home;