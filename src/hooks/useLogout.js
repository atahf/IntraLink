import { useAuthContext } from './useAuthContext';
import { deleteToken } from '../utils/jwtTools';

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        deleteToken();

        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
};
