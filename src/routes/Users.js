import UsersBox from '../components/UsersBox';
import { Container } from 'react-bootstrap';

const Users = () => {
    return (
        <div className='users-page'>
            <UsersBox style={{width: '1000px'}}/>
        </div>
    );
}
 
export default Users;
