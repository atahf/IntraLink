import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleLogin = async (event) => {
        event.preventDefault();

        await login(username, password)
    }

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <h3 className='login-title'>Log In</h3>
            
            <label className='login-label'>Username:</label>
            <input 
                className='login-input'
                type="text" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username} 
            />

            <label className='login-label'>Password:</label>
            <input 
                className='login-input'
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />

            <button className='login-btn' disabled={isLoading}>Log in</button>

            {error && <div className="login-error">{error}</div>}
        </form>
    );
}
 
export default Login;