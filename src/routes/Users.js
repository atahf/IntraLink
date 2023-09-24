import UsersBox from '../components/UsersBox';
import { Container } from 'react-bootstrap';

const Users = () => {
    return (
        <div className='users-page'>
            <UsersBox style={{ height: '100%' }}/>
        </div>
    );
}
 
export default Users;
