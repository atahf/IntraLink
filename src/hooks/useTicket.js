import { useState } from 'react';
import { getSubmissionTicketsURL } from '../utils/urlTools';
import { getToken, decodeJwtToken } from '../utils/jwtTools';

export const useTicket = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const token = getToken();
    const username = decodeJwtToken(token).sub;

    const submit = async (subject, description) => {
        setIsLoading(true);
        setError(null);

        const postData = { username: username, subject: subject, description: description, submission_date: (new Date()).toISOString() };
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(postData)
        };
        
        try {
            const response = await fetch(getSubmissionTicketsURL(), postOptions);
            if(response.ok) {
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

    return { submit, isLoading, error };
};