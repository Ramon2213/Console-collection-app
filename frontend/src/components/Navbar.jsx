import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ isMuted, toggleMute, handleLogout }) {
    const location = useLocation();

    return (
        <div className="top-left-buttons">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="mute-btn" onClick={toggleMute}>
                {isMuted ? "Unmute " : "Mute"}
            </button>
            <div className="navbar">
                <Link to="/collectie">
                    <button className={location.pathname === '/collectie' ? 'active' : ''}>
                        Jouw Collectie
                    </button>
                </Link>
                <Link to="/wishlist">
                    <button className={location.pathname === '/wishlist' ? 'active' : ''}>
                        Wishlist
                    </button>
                </Link>
            </div>
        </div>
    );
}
