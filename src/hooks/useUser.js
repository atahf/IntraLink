import { useState } from 'react';
import { getNewUserURL, getReesetURL } from '../utils/urlTools';
import { getToken, decodeJwtToken } from '../utils/jwtTools';

export const useAddUser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const token = getToken();
    const username = decodeJwtToken(token).sub;

    const add = async (newUser) => {
        setIsLoading(true);
        setError(null);

        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(newUser)
        };
        
        try {
            const response = await fetch(getNewUserURL(), postOptions);
            if(response.ok) {
                console.log(response);
                console.log(response.body);
                console.log(response.body.returnObject);
                setIsLoading(false);
            }
            else if(!response.ok && response.status === 403) {
                setIsLoading(false);
                setError("Something went wrong!");
            }
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    return { add, isLoading, error };
};

export const useResetPass = () => {
    const [errorReset, setErrorReset] = useState(null);
    const [isLoadingReset, setIsLoadingReset] = useState(null);

    const reset = async (username) => {
        setIsLoadingReset(true);
        setErrorReset(null);

        const postData = { username: username };
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };
        
        try {
            const response = await fetch(getReesetURL(), postOptions);
            if(response.ok) {
                console.log(response);
                console.log(response.body);
                console.log(response.body.returnObject);
                setIsLoadingReset(false);
            }
            else if(!response.ok && response.status === 403) {
                setIsLoadingReset(false);
                setErrorReset("Something went wrong!");
            }
        } catch (error) {
            setIsLoadingReset(false);
            setErrorReset(error);
        }
    }

    return { reset, isLoadingReset, errorReset };
};
