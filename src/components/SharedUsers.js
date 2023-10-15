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
        if(searchTerm !== '') {
            setFilteredList(users.filter(item => item.username.includes(searchTerm) || `${item.firstName} ${item.lastName}`.includes(searchTerm) || item.email.includes(searchTerm)));
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

    const shareNew = async () => {
        const added = selectedUsers.filter(item => !current.includes(item));
        const id = fileId;
        const usernames = added.join(' ');
        const token = getToken();

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
                    })
                    .catch(error => {
                        console.log(error);
                    });
        }
    };

    const unshare = async () => {
        const removed = current.filter(item => !selectedUsers.includes(item));
        const id = fileId;
        const usernames = removed.join(' ');
        const token = getToken();

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
                    })
                    .catch(error => {
                        console.log(error);
                    });
        }
    };

    const handleSave = async () => {
        await shareNew();
        await unshare();
        return window.location.reload();
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