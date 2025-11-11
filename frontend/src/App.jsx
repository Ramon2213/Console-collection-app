import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';

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
    const [isMuted, setIsMuted] = useState(false);

    // ================= FILTERS =================
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

    // ================= SLIDERS =================
    const [sliderValues, setSliderValues] = useState({ lengte: 0, breedte: 0, hoogte: 0 });
    const [minDimensions, setMinDimensions] = useState({ lengte: 0, breedte: 0, hoogte: 0 });
    const [maxDimensions, setMaxDimensions] = useState({ lengte: 0, breedte: 0, hoogte: 0 });

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

                if (allConsoles.length > 0) {
                    const minDim = {
                        lengte: Math.min(...allConsoles.map(c => c.dimensions.length)),
                        breedte: Math.min(...allConsoles.map(c => c.dimensions.width)),
                        hoogte: Math.min(...allConsoles.map(c => c.dimensions.height)),
                    };
                    const maxDim = {
                        lengte: Math.max(...allConsoles.map(c => c.dimensions.length)),
                        breedte: Math.max(...allConsoles.map(c => c.dimensions.width)),
                        hoogte: Math.max(...allConsoles.map(c => c.dimensions.height)),
                    };
                    setMinDimensions(minDim);
                    setMaxDimensions(maxDim);
                    setSliderValues(maxDim); // start sliders op max zodat alles zichtbaar is
                }

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
            initialColors[c] = { active: !!colorDetail, state: colorDetail?.state || 'Goed' };
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

        // filter op sliders
        if (c.dimensions.length > sliderValues.lengte) return false;
        if (c.dimensions.width > sliderValues.breedte) return false;
        if (c.dimensions.height > sliderValues.hoogte) return false;

        return true;
    });

    // ================= CLEAR COLLECTION =================
    const handleClearCollection = async () => {
        if (!window.confirm("Weet je zeker dat je hele collectie wilt verwijderen?")) return;
        for (const consoleName of collection) {
            await removeConsole(username, consoleName);
        }
        setCollection([]);
        setCollectionDetails({});
        setFavorites([]);
    };

    // ================= CLEAR WISHLIST =================
    const handleClearWishlist = async () => {
        if (!window.confirm("Weet je zeker dat je alle favorieten wilt verwijderen?")) return;
        for (const name of favorites) {
            await removeFavorite(username, name);
        }
        setFavorites([]);
    };

    // ================= CONDITIONAL RENDER =================
    if (loading) return <div>Loading...</div>;

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <Navbar
                    currentPage={window.location.pathname.substring(1) || 'collectie'}
                    setCurrentPage={(page) => window.history.pushState({}, '', `/${page}`)}
                    isMuted={isMuted}
                    toggleMute={toggleMute}
                    handleLogout={handleLogout}
                />
            )}

            {isLoggedIn && (
                <SearchFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    typeFilters={typeFilters}
                    setTypeFilters={setTypeFilters}
                    manufacturerFilters={manufacturerFilters}
                    setManufacturerFilters={setManufacturerFilters}
                    sliderValues={sliderValues}
                    setSliderValues={setSliderValues}
                    minDimensions={minDimensions}
                    maxDimensions={maxDimensions}
                />
            )}

            <Routes>
                <Route
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/collectie" replace />
                        ) : (
                            <AuthPage
                                username={username}
                                setUsername={setUsername}
                                password={password}
                                setPassword={setPassword}
                                handleLogin={handleLogin}
                                handleRegister={handleRegister}
                            />
                        )
                    }
                />
                <Route
                    path="/collectie"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
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
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <WishlistPage
                                favorites={favorites}
                                consoles={consoles}
                                toggleFavorite={toggleFavorite}
                                collection={collection}
                                handleClearWishlist={handleClearWishlist}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

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
        </BrowserRouter>
    );
}

export default App;
