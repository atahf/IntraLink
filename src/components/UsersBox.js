import React, { useEffect, useState } from 'react';
import { Container, Card, Pagination } from 'react-bootstrap';
import { getToken } from '../utils/jwtTools';
import {  getAllUsersDataURL } from '../utils/urlTools';
import Loading from './Loading';
import User from '../components/User';

const UsersBox = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [users, setUsers] = useState(null);
    const [userNum, setUserNum] = useState(0);

    const style = {
        ...(props.style && {
            height: props.style.height,
            width: props.style.width,
        }),
    };

    const loadUsers = async () => {
        setIsLoading(true);
        const token = getToken();

        fetch(getAllUsersDataURL(), {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(jsonData => {
                setUsers(jsonData.returnObject);
                setIsLoading(false);
                return;
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
                return;
            });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <Card style={style}>
            {isLoading && (
                <Loading />
            )}
            {!isLoading && users && (<>
                {users[userNum] && (
                    <User userData={users[userNum]}/>
                )}
                <Pagination style={{margin: '15px', display: 'flex', justifyContent: 'center' }}>
                    <Pagination.First onClick={() => {setUserNum(0)}} disabled={userNum === 0}/>
                    <Pagination.Prev onClick={() => {setUserNum(userNum-1)}} disabled={userNum-1 < 0}/>

                    {users.map((user, index) => {
                        const startIndex = Math.max(0, userNum - 2);
                        const endIndex = Math.min(users.length, userNum + 3);

                        if (index >= startIndex && index < endIndex) {
                            return (
                                <Pagination.Item
                                    key={index}
                                    active={index === userNum}
                                    onClick={() => setUserNum(index)}
                                >
                                    {index+1}
                                </Pagination.Item>
                            );
                        }

                        return null;
                    })}

                    <Pagination.Next onClick={() => {setUserNum(userNum+1)}} disabled={userNum+1 > users.length-1}/>
                    <Pagination.Last onClick={() => {setUserNum(users.length-1)}} disabled={userNum === users.length-1}/>
                </Pagination>
            </>)}
        </Card>
    );
}
 
export default UsersBox;