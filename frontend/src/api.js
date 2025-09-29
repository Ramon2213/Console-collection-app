const API_URL = 'http://localhost:3000';

// ================= AUTH =================
export const register = async (username, password) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
};

export const login = async (username, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
};

export const logout = async (username) => {
    const res = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    return res.json();
};

// ================= CONSOLES =================
export const getConsoles = async () => {
    const res = await fetch(`${API_URL}/consoles`);
    return res.json();
};

export const getCollection = async (username) => {
    const res = await fetch(`${API_URL}/collection?username=${username}`);
    return res.json();
};

export const addConsole = async (username, consoleName) => {
    const res = await fetch(`${API_URL}/collection/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName })
    });
    return res.json();
};

export const removeConsole = async (username, consoleName) => {
    const res = await fetch(`${API_URL}/collection/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName })
    });
    return res.json();
};

// ================= FAVORITES =================
export const addFavorite = async (username, consoleName) => {
    const res = await fetch(`${API_URL}/collection/favorite/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName })
    });
    return res.json();
};

export const removeFavorite = async (username, consoleName) => {
    const res = await fetch(`${API_URL}/collection/favorite/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName })
    });
    return res.json();
};
