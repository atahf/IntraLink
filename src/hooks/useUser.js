import { useState } from 'react';
import { getNewUserURL, getResetURL, getChangePassURL } from '../utils/urlTools';
import { getToken, decodeJwtToken } from '../utils/jwtTools';

export const useAddUser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const token = getToken();

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
            const response = await fetch(getResetURL(), postOptions);
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

export const useChangePass = () => {
    const [errorChange, setErrorChange] = useState(null);
    const [isLoadingChange, setIsLoadingChange] = useState(null);
    const [resultChange, setResultChange] = useState(null);
    const token = getToken();

    const change = async (changePassword) => {
        setIsLoadingChange(true);
        setErrorChange(null);
        setResultChange(null);
        
        try {
            fetch(getChangePassURL(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(changePassword)
            })
                .then(response => response.json())
                .then(jsonData => {
                    setResultChange(jsonData);
                    setIsLoadingChange(false);
                    return;
                })
                .catch(error => {
                    setErrorChange(error);
                    setIsLoadingChange(false);
                    return;
                });
        } catch (error) {
            setIsLoadingChange(false);
            setErrorChange(error);
        }
    }

    return { change, isLoadingChange, errorChange, resultChange };
};
