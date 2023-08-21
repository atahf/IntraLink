import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { getLoginURL } from '../utils/urlTools';
import { setToken } from '../utils/jwtTools';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        const postData = { username: username, password: password };
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };
        
        try {
            const response = await fetch(getLoginURL(), postOptions);
            if(response.ok) {
                const jwtToken = response.headers.get('Authorization');
                if (jwtToken) {
                    setToken(jwtToken);
                    dispatch({type: 'LOGIN', payload: jwtToken})
                    setIsLoading(false);
                }
                else {
                    setIsLoading(false)
                    setError(new Error("No JWT token received!"));
                }
            }
            else if(!response.ok && response.status === 403) {
                setIsLoading(false);
                setError("Wrong Username or Password!");
            }
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    return { login, isLoading, error };
};