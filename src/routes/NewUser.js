import { Container, Col, Row } from 'react-bootstrap';
import NewUserForm from "../components/NewUserForm";

const NewUser = () => {
    return (
        <Container>
            <Row>
                <Col xs={6} md={6}>
                    <NewUserForm />
                </Col>
                <Col xs={6} md={6}>

                </Col>
            </Row>
        </Container>
    );
}
 
export default NewUser;
