// We importeren React hooks en onze API-functies
import { useState, useEffect } from 'react';
import {
    register,
    login,
    logout,
    getConsoles,
    getCollection,
    addConsole,
    removeConsole,
    addFavorite,
    removeFavorite
} from './api';
import './App.css';

function App() {
    // ================= STATE VARIABELEN =================
    // useState maakt "reactieve" variabelen aan die de UI opnieuw laten renderen als ze veranderen
    const [username, setUsername] = useState(''); // gebruikersnaam invoer
    const [password, setPassword] = useState(''); // wachtwoord invoer
    const [isLoggedIn, setIsLoggedIn] = useState(false); // check of gebruiker ingelogd is
    const [consoles, setConsoles] = useState([]); // lijst van alle consoles
    const [collection, setCollection] = useState([]); // lijst van consoles die gebruiker bezit
    const [favorites, setFavorites] = useState([]); // lijst met favorieten
    const [loading, setLoading] = useState(true); // laadstatus
    const [currentPage, setCurrentPage] = useState('collectie'); // bepaalt welke pagina actief is
    const [isMuted, setIsMuted] = useState(false); // mute state voor geluidjes

    // ================= INITIAL LOAD (useEffect) =================
    // Dit draait 1 keer wanneer de app geladen wordt
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Alle consoles ophalen uit de API
                const allConsoles = await getConsoles();
                setConsoles(allConsoles);

                // Checken of gebruiker eerder is ingelogd (in localStorage)
                const storedUser = localStorage.getItem('loggedInUser');
                if (storedUser) {
                    setUsername(storedUser);
                    setIsLoggedIn(true);

                    // Ophalen collectie en favorieten van die gebruiker
                    const coll = await getCollection(storedUser);
                    setCollection(coll.collection || []);
                    setFavorites(coll.favorites || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                // Na laden, de loading state uitzetten
                setLoading(false);
            }
        };
        fetchData();
    }, []); // lege array [] betekent dat dit alleen 1 keer draait bij het mounten

    // ================= AUTH FUNCTIES =================
    // Registreren
    const handleRegister = async () => {
        const res = await register(username, password);
        alert(res.message); // feedback naar gebruiker
    };

    // Inloggen
    const handleLogin = async () => {
        const res = await login(username, password);
        alert(res.message);
        if (res.message.includes('Welkom')) {
            setIsLoggedIn(true);
            localStorage.setItem('loggedInUser', username); // login opslaan in localStorage

            const coll = await getCollection(username); // collectie ophalen
            setCollection(coll.collection || []);
            setFavorites(coll.favorites || []);
        }
    };

    // Uitloggen
    const handleLogout = async () => {
        const res = await logout(username);
        alert(res.message);
        setIsLoggedIn(false); // status resetten
        setCollection([]);    // collectie leegmaken
        setFavorites([]);     // favorieten leegmaken
        localStorage.removeItem('loggedInUser'); // login wissen uit localStorage
    };

    // ================= MUTE FUNCTIE =================
    // Geluid aan/uit zetten
    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    // ================= CONSOLE FUNCTIES =================
    // Console toevoegen aan collectie
    const handleAddConsole = async (consoleItem) => {
        if (!isMuted) new Audio('/sounds/add.wav').play(); // geluidje bij toevoegen
        await addConsole(username, consoleItem.name);
        const coll = await getCollection(username);
        setCollection(coll.collection || []);
        setFavorites(coll.favorites || []);
    };

    // Console verwijderen uit collectie
    const handleRemoveConsole = async (consoleItem) => {
        if (!isMuted) new Audio('/sounds/remove.wav').play(); // geluidje bij verwijderen
        await removeConsole(username, consoleItem.name);
        const coll = await getCollection(username);
        setCollection(coll.collection || []);
        setFavorites(coll.favorites || []);
    };

    // ================= FAVORIETEN FUNCTIE =================
    // Toevoegen of verwijderen uit favorieten
    const toggleFavorite = async (consoleItem) => {
        if (favorites.includes(consoleItem.name)) {
            // Als de console al in favorieten staat → verwijderen
            if (currentPage === 'wishlist' && !window.confirm("Weet je het zeker?")) return;
            if (!isMuted) new Audio('/sounds/unfavorite.wav').play();
            const res = await removeFavorite(username, consoleItem.name);
            setFavorites(res.favorites || []);
        } else {
            // Anders → toevoegen aan favorieten
            if (!isMuted) new Audio('/sounds/favorite.wav').play();
            const res = await addFavorite(username, consoleItem.name);
            setFavorites(res.favorites || []);
        }
    };

    // ================= CLEAR FUNCTIES =================
    // Hele collectie leegmaken
    const handleClearCollection = async () => {
        if (!window.confirm("Weet je het zeker dat je je collectie wilt legen?")) return;
        if (!isMuted) new Audio('/sounds/clear.wav').play();
        for (const c of collection) {
            await removeConsole(username, c); // alle consoles verwijderen
        }
        const coll = await getCollection(username);
        setCollection(coll.collection || []);
        setFavorites(coll.favorites || []);
    };

    // Alle favorieten leegmaken
    const handleClearFavorites = async () => {
        if (!window.confirm("Weet je het zeker dat je al je favorieten wilt legen?")) return;
        if (!isMuted) new Audio('/sounds/clear.wav').play();
        for (const f of favorites) {
            await removeFavorite(username, f); // alle favorieten verwijderen
        }
        const coll = await getCollection(username);
        setFavorites(coll.favorites || []);
    };

    // ================= HELPER FUNCTIES =================
    // Als een afbeelding niet laadt → toon placeholder
    const handleImageError = (e) => {
        e.target.src = "/images/placeholder.png";
    };

    // ================= RENDER =================
    // Als data nog niet geladen is → laadscherm tonen
    if (loading) return <div>Loading...</div>;

    return (
        <div className="app-wrapper">
            {/* Als gebruiker NIET ingelogd is → login/register scherm */}
            {!isLoggedIn ? (
                <div className="auth-container-wrapper">
                    <div className="auth-container">
                        <h2>Register / Login</h2>
                        <form
                            className="auth-form"
                            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                        >
                            <input
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)} // update username state
                            />
                            <input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)} // update password state
                            />
                            <div className="button-group">
                                <button type="button" onClick={handleRegister}>Register</button>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <>
                    {/* ================= LINKS BOVEN: LOGOUT + MUTE + NAVBAR ================= */}
                    <div className="top-left-buttons">
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        <button className="mute-btn" onClick={toggleMute}>
                            {isMuted ? "Unmute 🔊" : "🔇"}
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

                    {/* ================= PAGINA INHOUD ================= */}
                    {currentPage === 'collectie' ? (
                        <div className="cards-collection-wrapper">
                            {/* Linkerkolom = consoles die je nog NIET hebt */}
                            <div className="cards-column">
                                <h3>Alle Consoles ({consoles.length - collection.length} nog niet in collectie)</h3>
                                <div className="cards-grid">
                                    {consoles.filter(c => !collection.includes(c.name)).map(consoleItem => (
                                        <div key={consoleItem.name} className="card">
                                            <img src={consoleItem.image} alt={consoleItem.name} className="card-image" onError={handleImageError} />
                                            <img src={favorites.includes(consoleItem.name) ? "/images/star-filled.png" : "/images/star-empty.png"}
                                                alt="" className="card-favorite" onClick={() => toggleFavorite(consoleItem)} />
                                            <div className="card-name">{consoleItem.name}</div>
                                            <button onClick={() => handleAddConsole(consoleItem)}>Add</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rechterkolom = jouw collectie */}
                            <div className="collection-column">
                                <h3>Jouw Collectie ({collection.length})</h3>
                                <button className="clear-btn" onClick={handleClearCollection}>Clear Collection</button>
                                <div className="cards-grid">
                                    {consoles.filter(c => collection.includes(c.name)).map(consoleItem => (
                                        <div key={consoleItem.name} className="card">
                                            <img src={consoleItem.image} alt={consoleItem.name} className="card-image" onError={handleImageError} />
                                            <div className="card-name">{consoleItem.name}</div>
                                            <button onClick={() => handleRemoveConsole(consoleItem)}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // ================= WISHLIST PAGINA =================
                        <div className="wishlist-wrapper">
                            <h3>Favorieten ({favorites.length})</h3>
                            {favorites.length > 0 && (
                                <button className="clear-btn" onClick={handleClearFavorites}>Clear Favorites</button>
                            )}

                            {favorites.length === 0 ? (
                                <div className="empty-wishlist">Je hebt nog geen favorieten</div>
                            ) : (
                                <div className="cards-grid">
                                    {consoles.filter(c => favorites.includes(c.name) && !collection.includes(c.name)).map(consoleItem => (
                                        <div key={consoleItem.name} className="card">
                                            <img src={consoleItem.image} alt={consoleItem.name} className="card-image" onError={handleImageError} />
                                            <img src="/images/star-filled.png" alt="" className="card-favorite" onClick={() => toggleFavorite(consoleItem)} />
                                            <div className="card-name">{consoleItem.name}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
