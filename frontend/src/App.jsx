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

// COMPONENTS
import Navbar from './components/Navbar';
import SearchFilters from './components/SearchFilters';
import Modal from './components/Modal';

// PAGES
import AuthPage from './pages/AuthPage';
import CollectionPage from './pages/CollectionPage';
import WishlistPage from './pages/WishlistPage';

function App() {
    // ================= STATE =================
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [consoles, setConsoles] = useState([]);
    const [collection, setCollection] = useState([]);
    const [collectionDetails, setCollectionDetails] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('collectie');
    const [isMuted, setIsMuted] = useState(false);

    // ================= SEARCH & FILTERS =================
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilters, setTypeFilters] = useState({ home: true, handheld: true });
    const [manufacturerFilters, setManufacturerFilters] = useState({
        Atari: true,
        Nintendo: true,
        Sega: true,
        Sony: true,
        Microsoft: true,
        Other: true
    });

    // ================= MODAAL =================
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedConsole, setSelectedConsole] = useState(null);
    const [colorStates, setColorStates] = useState({});
    const [controllerStates, setControllerStates] = useState([]);
    const [consoleState, setConsoleState] = useState('Goed');

    // ================= INITIAL LOAD =================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allConsoles = await getConsoles();
                setConsoles(allConsoles);

                const storedUser = localStorage.getItem('loggedInUser');
                if (storedUser) {
                    setUsername(storedUser);
                    setIsLoggedIn(true);

                    const coll = await getCollection(storedUser);
                    setCollection(coll.collection || []);
                    setCollectionDetails(coll.collectionDetails || {});
                    setFavorites(coll.favorites || []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // ================= AUTH =================
    const handleRegister = async () => {
        const res = await register(username, password);
        alert(res.message);
    };

    const handleLogin = async () => {
        const res = await login(username, password);
        alert(res.message);
        if (res.message.includes('Welkom')) {
            setIsLoggedIn(true);
            localStorage.setItem('loggedInUser', username);

            const coll = await getCollection(username);
            setCollection(coll.collection || []);
            setCollectionDetails(coll.collectionDetails || {});
            setFavorites(coll.favorites || []);
        }
    };

    const handleLogout = async () => {
        const res = await logout(username);
        alert(res.message);
        setIsLoggedIn(false);
        setCollection([]);
        setCollectionDetails({});
        setFavorites([]);
        localStorage.removeItem('loggedInUser');
    };

    // ================= MUTE =================
    const toggleMute = () => setIsMuted(prev => !prev);

    // ================= MODAAL =================
    const openModal = (consoleItem) => {
        if (!collection.includes(consoleItem.name)) return;

        setSelectedConsole(consoleItem);

        const details = collectionDetails[consoleItem.name] || {};

        setConsoleState(details.state || 'Goed');

        const initialColors = {};
        (consoleItem.colors || []).forEach(c => {
            const colorDetail = details.colors?.find(dc => dc.name === c);
            initialColors[c] = {
                active: !!colorDetail,
                state: colorDetail?.state || 'Goed'
            };
        });
        setColorStates(initialColors);

        const controllerCount = details.controllers ?? 0;
        const controllers = Array.from({ length: controllerCount }, (_, i) => ({
            color: details.controllerColors?.[i]?.color || '',
            state: details.controllerColors?.[i]?.state || 'Goed'
        }));

        setControllerStates(controllers.length > 0 ? controllers : []);
        setModalOpen(true);
    };

    // ================= COLLECTION =================
    const handleAddConsole = async (consoleItem) => {
        if (!isMuted) new Audio('/sounds/add.wav').play();
        await addConsole(username, consoleItem.name);
        const coll = await getCollection(username);
        setCollection(coll.collection || []);
        setCollectionDetails(coll.collectionDetails || {});
        setFavorites(coll.favorites || []);
    };

    const handleRemoveConsole = async (consoleItem) => {
        if (!isMuted) new Audio('/sounds/remove.wav').play();
        await removeConsole(username, consoleItem.name);
        const coll = await getCollection(username);
        setCollection(coll.collection || []);
        setCollectionDetails(coll.collectionDetails || {});
        setFavorites(coll.favorites || []);
        setModalOpen(false);
    };

    // ================= FAVORITES =================
    const toggleFavorite = async (consoleItem) => {
        if (favorites.includes(consoleItem.name)) {
            if (currentPage === 'wishlist' && !window.confirm("Weet je het zeker?")) return;
            if (!isMuted) new Audio('/sounds/unfavorite.wav').play();
            const res = await removeFavorite(username, consoleItem.name);
            setFavorites(res.favorites || []);
        } else {
            if (!isMuted) new Audio('/sounds/favorite.wav').play();
            const res = await addFavorite(username, consoleItem.name);
            setFavorites(res.favorites || []);
        }
    };

    // ================= FILTERED CONSOLES =================
    const filteredConsoles = consoles.filter(c => {
        if (!c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (!typeFilters[c.type]) return false;
        const man = ['Atari', 'Nintendo', 'Sega', 'Sony', 'Microsoft'].includes(c.manufacturer)
            ? c.manufacturer
            : 'Other';
        if (!manufacturerFilters[man]) return false;
        return true;
    });

    // ================= CLEAR COLLECTION =================
    const handleClearCollection = async () => {
        if (!window.confirm("Weet je zeker dat je hele collectie wilt verwijderen?")) return;

        try {
            for (const consoleName of collection) {
                await removeConsole(username, consoleName);
            }
            setCollection([]);
            setCollectionDetails({});
            setFavorites([]);
        } catch (err) {
            console.error("Kon collectie niet wissen:", err);
            alert("Er is iets misgegaan bij het legen van je collectie.");
        }
    };

    // ================= CLEAR WISHLIST =================
    const handleClearWishlist = async () => {
        if (!window.confirm("Weet je zeker dat je alle favorieten wilt verwijderen?")) return;

        for (const name of favorites) {
            await removeFavorite(username, name);
        }

        setFavorites([]);
    };

    // ================= AUTOSAVE MODAAL =================
    useEffect(() => {
        if (!selectedConsole) return;

        const saveDetails = async () => {
            const selectedColors = Object.entries(colorStates)
                .filter(([_, v]) => v.active)
                .map(([name, v]) => ({ name, state: v.state }));

            const controllersToSave = controllerStates.map(c => ({
                color: c.color || '',
                state: c.state || 'Goed'
            }));

            try {
                const res = await fetch('http://localhost:3000/collection/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username,
                        consoleName: selectedConsole.name,
                        controllers: controllerStates.length,
                        controllerColors: controllersToSave,
                        colors: selectedColors,
                        state: consoleState
                    })
                });

                const json = await res.json();
                if (json.collectionDetails) setCollectionDetails(json.collectionDetails);
            } catch (err) {
                console.error('Autosave error:', err);
            }
        };

        saveDetails();
    }, [colorStates, controllerStates, consoleState, selectedConsole, username]);

    // ================= CONDITIONAL RENDER =================
    if (loading) return <div>Loading...</div>;

    if (!isLoggedIn) {
        return <AuthPage
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
        />;
    }

    return (
        <div className="app-wrapper">
            {/* NAVBAR */}
            <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isMuted={isMuted}
                toggleMute={toggleMute}
                handleLogout={handleLogout}
            />

            {/* SEARCH & FILTERS */}
            <SearchFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                typeFilters={typeFilters}
                setTypeFilters={setTypeFilters}
                manufacturerFilters={manufacturerFilters}
                setManufacturerFilters={setManufacturerFilters}
            />

            {/* PAGINA CONTENT */}
            {currentPage === 'collectie' && (
                <CollectionPage
                    consoles={consoles}
                    collection={collection}
                    collectionDetails={collectionDetails}
                    favorites={favorites}
                    handleAddConsole={handleAddConsole}
                    handleRemoveConsole={handleRemoveConsole}
                    toggleFavorite={toggleFavorite}
                    openModal={openModal}
                    handleClearCollection={handleClearCollection}
                    filteredConsoles={filteredConsoles}
                />
            )}

            {currentPage === 'wishlist' && (
                <WishlistPage
                    favorites={favorites}
                    consoles={consoles}
                    toggleFavorite={toggleFavorite}
                    collection={collection}
                    handleClearWishlist={handleClearWishlist}
                />
            )}

            {/* MODAAL */}
            {modalOpen && selectedConsole && (
                <Modal
                    consoleItem={selectedConsole}
                    colorStates={colorStates}
                    setColorStates={setColorStates}
                    controllerStates={controllerStates}
                    setControllerStates={setControllerStates}
                    consoleState={consoleState}
                    setConsoleState={setConsoleState}
                    onRemove={() => handleRemoveConsole(selectedConsole)}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}

export default App;
