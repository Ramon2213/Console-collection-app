export default function Navbar({ currentPage, setCurrentPage, isMuted, toggleMute, handleLogout }) {
    return (
        <div className="top-left-buttons">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="mute-btn" onClick={toggleMute}>
                {isMuted ? "Unmute " : "Mute"}
            </button>
            <div className="navbar">
                <button
                    className={currentPage === 'collectie' ? 'active' : ''}
                    onClick={() => setCurrentPage('collectie')}
                >
                    Jouw Collectie
                </button>
                <button
                    className={currentPage === 'wishlist' ? 'active' : ''}
                    onClick={() => setCurrentPage('wishlist')}
                >
                    Wishlist
                </button>
            </div>
        </div>
    );
}
