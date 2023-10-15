import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const router = createHashRouter([
	{
	  path: "/*",
	  element: <App />,
	}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	</React.StrictMode>
);
