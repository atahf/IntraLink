import { useState } from 'react';
import { getToken, decodeJwtToken } from '../utils/jwtTools';
import { getUserDataURL, getDownloadURL } from '../utils/urlTools';

export const useGetUserInfo = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [data, setData] = useState(null);
    const [picture, setPicture] = useState(null);

    const GET = async () => {
        setIsLoading(true);
        const token = getToken();
        const username = decodeJwtToken(token).sub
        fetch(getUserDataURL(username), {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData.returnObject);
                
                if(!data.profilePicture) {
                    setIsLoading(false);
                    return;
                }

                fetch(getDownloadURL(data.profilePicture), {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(response => response.blob())
                    .then(imageResponse => {
                        setPicture(imageResponse);
                        setIsLoading(false);
                        return;
                    })
                    .catch(error => {
                        setError(error);
                        setIsLoading(false);
                        return;
                    });
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
                return;
            });
    }

    return { GET, data, picture, isLoading, error };
};