import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, hasPermission } from '../utils/jwtTools';

const Home = () => {
    const [url, setUrl] = useState('/');
    const navigate = useNavigate();

    useEffect(() => {
        if(url && url !== "/") {
            navigate(url);
        }
    }, [url]);

    return (
        <div className='users-page'>
            <div className="grid-container">
                <div className="box" onClick={() => setUrl("/new-ticket")}>
                    <i className='fa fa-solid fa-info user-home-icon'/>
                    <p>New Ticket</p>
                </div>

                {hasPermission("ticket:read", getToken()) && (
                    <div className="box" onClick={() => setUrl("/tickets")}>
                        <i className='fa fa-solid fa-list user-home-icon'/>
                        <p>Tickets</p>
                    </div>
                )}

                {hasPermission("user:add", getToken()) && (
                    <div className="box" onClick={() => setUrl("/new-user")}>
                        <i className='fa fa-user-plus user-home-icon'/>
                        <p>New User</p>
                    </div>
                )}

                {hasPermission("user:read", getToken()) && (
                    <div className="box" onClick={() => setUrl("/users")}>
                        <i className='fa fa-users user-home-icon'/>
                        <p>Users</p>
                    </div>
                )}

                <div className="box" onClick={() => setUrl("/chat")}>
                    <i className='fa fa-solid fa-comments user-home-icon'/>
                    <p>Messages</p>
                </div>

                <div className="box" onClick={() => setUrl("/files")}>
                    <i className='fa fa-regular fa-folder-open user-home-icon'/>
                    <p>Files</p>
                </div>

                {hasPermission("log:read", getToken()) && (
                    <div className="box" onClick={() => setUrl("/logs")}>
                        <i className='fa fa-solid fa-history user-home-icon'/>
                        <p>Logs</p>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Home;