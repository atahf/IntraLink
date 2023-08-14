import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <nav>
                    <ul className="nav-list">
                        <li>
                            <Link to="#">Login</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="main-content">
                <h1>Welcome to Our Website</h1>
                <p>This is the home page content.</p>
            </main>
        </div>
    );
}
 
export default Home;