const BASE_URL = 'http://localhost:3000';

export async function register(username, password) {
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function login(username, password) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return res.json();
}

export async function logout(username) {
    const res = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    return res.json();
}

export async function getConsoles() {
    const res = await fetch(`${BASE_URL}/consoles`);
    return res.json();
}

export async function getCollection(username) {
    const res = await fetch(`${BASE_URL}/collection?username=${encodeURIComponent(username)}`);
    return res.json();
}

export async function addConsole(username, consoleName) {
    const res = await fetch(`${BASE_URL}/collection/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName })
    });
    return res.json();
}

export async function removeConsole(username, consoleName) {
    const res = await fetch(`${BASE_URL}/collection/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName })
    });
    return res.json();
}

export async function addFavorite(username, consoleName) {
    const res = await fetch(`${BASE_URL}/collection/favorite/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName })
    });
    return res.json();
}

export async function removeFavorite(username, consoleName) {
    const res = await fetch(`${BASE_URL}/collection/favorite/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName })
    });
    return res.json();
}

export async function updateConsoleDetails(username, consoleName, controllers, controllerColors, colors, state) {
    const res = await fetch(`${BASE_URL}/collection/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, consoleName, controllers, controllerColors, colors, state })
    });
    return res.json();
}

export async function clearCollection(username) {
    const res = await fetch(`${BASE_URL}/collection/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    return res.json();
}


export async function clearWishlist(username) {
    const res = await fetch(`${BASE_URL}/collection/favorite/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    return res.json();
}
