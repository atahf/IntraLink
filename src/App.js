import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import CustomNavbar from './components/Navbar';

import Home from './routes/Home';
import Login from './routes/Login';
import Profile from './routes/Profile';

function App() {
	const { jwtToken } = useAuthContext();

	return (
		<div className='App'>
			<BrowserRouter>
				<CustomNavbar />
				<div className='pages'>
					<Routes>
						<Route 
							path="/" 
							element={<Home />}
						/>
						<Route 
							path="/login" 
							element={!jwtToken ? <Login /> : <Navigate to="/" />} 
						/>
						<Route 
							path="/profile" 
							element={jwtToken ? <Profile /> : <Navigate to="/login" />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
