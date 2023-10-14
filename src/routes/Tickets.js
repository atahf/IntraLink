import TicketsBox from '../components/TicketsBox';
import { Container } from 'react-bootstrap';

const Tickets = () => {
    return (
        <div className='users-page'>
            <TicketsBox style={{ height: '60%', width: '45%' }}/>
        </div>
    );
}
 
export default Tickets
