import React, { useState, useEffect } from "react";
import Loading from '../components/Loading';
import { Form, Button, ListGroup, Modal } from 'react-bootstrap';
import { decodeJwtToken, getToken } from '../utils/jwtTools';
import { getAllUsersPublicDataURL, getFileShareURL, getFileUnshareURL } from "../utils/urlTools";
import { Scrollbars } from 'react-custom-scrollbars-2';

const SharedUsers = ({ currentShares, fileId }) => {
    const [current, setCurrent] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const getCurrent = () => {
        if(currentShares.length > 0) {
            setCurrent(currentShares.split(' '));
            setSelectedUsers(currentShares.split(' '))
        }
    };

    const fetchUsers = async () => {
		fetch(getAllUsersPublicDataURL(), {
			method: 'GET',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': getToken()
			},
		})
				.then(response => response.json())
				.then(jsonData => {
                    setUsers(jsonData.returnObject);
                    setFilteredList(jsonData.returnObject);
				})
				.catch(error => {
						console.log(error);
				});
	}

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const st = event.target.value;
        if(st !== '') {
            setFilteredList(users.filter(item => item.username.includes(st) || `${item.firstName} ${item.lastName}`.includes(st) || item.email.includes(st)));
        }
        else {
            setFilteredList(users);
        }
    };

    const handleChange = (username, value) => {
        if(value) {
            if(!selectedUsers.includes(username)) {
                setSelectedUsers([...selectedUsers, username]);
            }
        }
        else {
            if(selectedUsers.includes(username)) {
                setSelectedUsers(selectedUsers.filter(item => item !== username));
            }
        }
    }

    const handleSave = async () => {
        const id = fileId;
        const token = getToken();
        const removed = current.filter(item => !selectedUsers.includes(item));
        const added = selectedUsers.filter(item => !current.includes(item));

        var usernames = removed.join(' ');
        if(usernames !== "") {
            fetch(getFileUnshareURL(id), {
                method: 'POST',
                body: JSON.stringify(usernames),
                headers: {
                    'Authorization': token
                }
            })
                .then(response => response.json())
                    .then(jsonData => {
                        console.log(jsonData);
                        var usernames = added.join(' ');
                        if(usernames !== "") {
                            fetch(getFileShareURL(id), {
                                method: 'POST',
                                body: JSON.stringify(usernames),
                                headers: {
                                    'Authorization': token
                                }
                            })
                                .then(response => response.json())
                                    .then(jsonData => {
                                        console.log(jsonData);
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        window.location.reload();
                                    });
                        }
                        else {
                            window.location.reload();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        var usernames = added.join(' ');
                        if(usernames !== "") {
                            fetch(getFileShareURL(id), {
                                method: 'POST',
                                body: JSON.stringify(usernames),
                                headers: {
                                    'Authorization': token
                                }
                            })
                                .then(response => response.json())
                                    .then(jsonData => {
                                        console.log(jsonData);
                                        window.location.reload();
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        window.location.reload();
                                    });
                        }
                        else {
                            window.location.reload();
                        }
                    });
        }
        else {
            var usernames = added.join(' ');
            if(usernames !== "") {
                fetch(getFileShareURL(id), {
                    method: 'POST',
                    body: JSON.stringify(usernames),
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(response => response.json())
                        .then(jsonData => {
                            console.log(jsonData);
                            window.location.reload();
                        })
                        .catch(error => {
                            console.log(error);
                            window.location.reload();
                        });
            }
            else {
                window.location.reload();
            }
        }
    };

    useEffect(() => {
        getCurrent();
        fetchUsers();
    }, []);

    return (
        <Modal.Body style={{height: '350px'}}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {handleSearch(e)}}
            />
            <Button onClick={() => {handleSave()}}>Save</Button>
            <ListGroup style={{height: '270px', fontSize: '13px', margin: '10px 0'}}>
                <Scrollbars>
                    {filteredList.map((user, index) => {
                        const myUsername = decodeJwtToken(getToken()).sub;
                        if(user.username !== myUsername) {
                            return(
                                <ListGroup.Item key={index}>
                                    <input
                                        type="checkbox"
                                        id={index}
                                        className="form-check-input"
                                        checked={selectedUsers.includes(user.username)}
                                        onChange={(e) => {handleChange(user.username, e.target.checked)}}
                                    />
                                    <label htmlFor={index}>&nbsp;&nbsp;{user.username}&nbsp;&nbsp;&nbsp;&nbsp;{user.firstName}&nbsp;{user.lastName}&nbsp;&nbsp;&nbsp;&nbsp;{user.email}</label>
                                </ListGroup.Item>
                            );
                        }
                    })}
                </Scrollbars>
            </ListGroup>
        </Modal.Body>
    );
}
 
export default SharedUsers;