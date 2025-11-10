
import express from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import cors from 'cors';
import allConsoles from './consolelist.js'; // default import

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

const usersFilePath = path.join(process.cwd(), 'users.json');

function loadUsers() {
    if (!fs.existsSync(usersFilePath)) return [];
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// sort on year (optional)
allConsoles.sort((a, b) => a.year - b.year);

// minimal loggedIn tracking
const loggedInUsers = {};

// ================= REGISTER =================
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username en password verplicht' });

    const users = loadUsers();
    if (users.find(u => u.username === username)) return res.status(409).json({ message: 'Gebruiker bestaat al' });

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, collection: [], favorites: [], collectionDetails: {} });
    saveUsers(users);

    res.status(201).json({ message: 'Gebruiker geregistreerd!' });
});

// ================= LOGIN =================
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ message: 'Ongeldige inloggegevens' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Ongeldige inloggegevens' });

    loggedInUsers[username] = true;
    res.json({ message: `Welkom, ${username}!` });
});

// ================= LOGOUT =================
app.post('/logout', (req, res) => {
    const { username } = req.body;
    if (loggedInUsers[username]) {
        delete loggedInUsers[username];
        return res.json({ message: `${username} uitgelogd` });
    }
    res.status(400).json({ message: 'Gebruiker niet ingelogd' });
});

// ================= GET ALL CONSOLES =================
app.get('/consoles', (req, res) => res.json(allConsoles));

// ================= GET USER COLLECTION =================
app.get('/collection', (req, res) => {
    const username = req.query.username;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    user.collection = user.collection || [];
    user.favorites = user.favorites || [];
    user.collectionDetails = user.collectionDetails || {};

    res.json({ collection: user.collection, favorites: user.favorites, collectionDetails: user.collectionDetails });
});

// ================= ADD to collection =================
app.post('/collection/add', (req, res) => {
    const { username, consoleName } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    if (!allConsoles.find(c => c.name === consoleName)) return res.status(400).json({ message: 'Console bestaat niet' });
    if (user.collection && user.collection.includes(consoleName)) return res.status(400).json({ message: 'Console al in collectie' });

    user.collection = user.collection || [];
    user.collection.push(consoleName);

    user.collectionDetails = user.collectionDetails || {};
    // Als de console nog niet in de collectionDetails staat, voeg hem toe met standaardwaarden
    if (!user.collectionDetails[consoleName]) {
        user.collectionDetails[consoleName] = {
            controllers: 0, // standaard geen controllers
            controllerColors: [],
            state: 'Goed', // standaard conditie
            colors: [] // geen kleurvarianten actief bij toevoegen
        };
    }


    saveUsers(users);
    res.json({ message: `${consoleName} toegevoegd`, collection: user.collection, collectionDetails: user.collectionDetails });
});

// ================= REMOVE from collection (DELETE) =================
app.delete('/collection/remove', (req, res) => {
    const { username, consoleName } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    user.collection = (user.collection || []).filter(c => c !== consoleName);

    if (user.collectionDetails && user.collectionDetails[consoleName]) {
        delete user.collectionDetails[consoleName];
    }

    saveUsers(users);
    res.json({ message: `${consoleName} verwijderd`, collection: user.collection, collectionDetails: user.collectionDetails || {} });
});

// ================= REMOVE from favorites (DELETE) =================
app.delete('/collection/favorite/remove', (req, res) => {
    const { username, consoleName } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    user.favorites = (user.favorites || []).filter(c => c !== consoleName);
    saveUsers(users);

    res.json({ message: `${consoleName} verwijderd uit favorieten`, favorites: user.favorites });
});

// ================= UPDATE details for a console =================
app.post('/collection/update', (req, res) => {
    const { username, consoleName, controllers, controllerColors, colors, state } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    user.collectionDetails = user.collectionDetails || {};
    user.collectionDetails[consoleName] = user.collectionDetails[consoleName] || {};

    user.collectionDetails[consoleName].controllers = (controllers !== undefined) ? controllers : 0;
    user.collectionDetails[consoleName].controllerColors = Array.isArray(controllerColors) ? controllerColors : [];
    user.collectionDetails[consoleName].colors = Array.isArray(colors) ? colors : [];
    user.collectionDetails[consoleName].state = typeof state === 'string' ? state : 'Goed';

    saveUsers(users);
    res.json({ message: `${consoleName} details opgeslagen`, collection: user.collection, collectionDetails: user.collectionDetails });
});

// ================= FAVORITES =================
app.post('/collection/favorite/add', (req, res) => {
    const { username, consoleName } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    if (!user.favorites) user.favorites = [];
    if (!user.favorites.includes(consoleName)) {
        user.favorites.push(consoleName);
        saveUsers(users);
    }

    res.json({ message: `${consoleName} toegevoegd aan favorieten`, favorites: user.favorites });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
