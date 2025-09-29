import express from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { fileURLToPath } from 'url';

// ================= PATH SETUP =================
// Nodig omdat __dirname niet standaard beschikbaar is in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// ================= MIDDLEWARE =================
// CORS: toestaan dat frontend op localhost:5173 requests kan doen
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// JSON body parser
app.use(express.json());

// Pad naar users.json bestand
const usersFilePath = path.join(__dirname, 'users.json');

// ================= HELPER FUNCTIES =================
// Gebruikers laden vanuit JSON bestand
function loadUsers() {
    if (!fs.existsSync(usersFilePath)) return []; // als bestand niet bestaat → lege array
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

// Gebruikers opslaan naar JSON bestand
function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// ================= CONSOLES =================
// Lijst van alle consoles, met naam, afbeelding, releasejaar en type
const allConsoles = [
    { name: "Magnavox Odyssey", image: "/images/magnavoxodyssey.png", year: 1972, type: "home" },
    { name: "Atari Pong", image: "/images/ataripong.png", year: 1975, type: "home" },
    { name: "Magnavox Odyssey 2", image: "/images/magnavoxodyssey2.png", year: 1978, type: "home" },
    { name: "Atari 2600", image: "/images/atari2600.png", year: 1977, type: "home" },
    { name: "Intellivision", image: "/images/intellivision.png", year: 1979, type: "home" },
    { name: "Atari 5200", image: "/images/atari5200.png", year: 1982, type: "home" },
    { name: "Coleco Vision", image: "/images/colecovision.png", year: 1982, type: "home" },
    { name: "Coleco Gemini", image: "/images/celocogemini.png", year: 1983, type: "home" },
    { name: "Game & Watch", image: "/images/gameandwatch.png", year: 1983, type: "handheld" },
    { name: "NES", image: "/images/nes.png", year: 1983, type: "home" },
    { name: "Sega SG-1000", image: "/images/segasg1000.png", year: 1983, type: "home" },
    { name: "Famicom", image: "/images/famicom.png", year: 1983, type: "home" },
    { name: "Sega Master System", image: "/images/segamastersystem.png", year: 1985, type: "home" },
    { name: "Atari 7800", image: "/images/atari7800.png", year: 1986, type: "home" },
    { name: "Atari 2600 Jr.", image: "/images/atari2600jr.png", year: 1986, type: "home" },
    { name: "Sega Genesis / Mega Drive", image: "/images/segagenesis.png", year: 1988, type: "home" },
    { name: "Game Boy", image: "/images/gameboy.png", year: 1989, type: "handheld" },
    { name: "Atari Lynx", image: "/images/atarilynx.png", year: 1989, type: "handheld" },
    { name: "SNES", image: "/images/snes.png", year: 1990, type: "home" },
    { name: "Neo Geo AES", image: "/images/neogeoaes.png", year: 1990, type: "home" },
    { name: "Atari Panther", image: "/images/ataripanther.png", year: 1990, type: "home" },
    { name: "Atari Jaguar", image: "/images/atarijaguar.png", year: 1993, type: "home" },
    { name: "PlayStation", image: "/images/playstation.png", year: 1994, type: "home" },
    { name: "Sega Saturn", image: "/images/segasaturn.png", year: 1994, type: "home" },
    { name: "Virtual Boy", image: "/images/virtualboy.png", year: 1995, type: "home" },
    { name: "Nintendo 64", image: "/images/n64.png", year: 1996, type: "home" },
    { name: "Game Boy Pocket", image: "/images/gameboypocket.png", year: 1996, type: "handheld" },
    { name: "Game Boy Color", image: "/images/gameboycolor.png", year: 1998, type: "handheld" },
    { name: "Neo Geo Pocket", image: "/images/neogeopocket.png", year: 1998, type: "handheld" },
    { name: "Neo Geo Pocket Color", image: "/images/neogeopocketcolor.png", year: 1999, type: "handheld" },
    { name: "Sega Dreamcast", image: "/images/dreamcast.png", year: 1999, type: "home" },
    { name: "PlayStation 2", image: "/images/playstation2.png", year: 2000, type: "home" },
    { name: "Game Boy Advance", image: "/images/gba.png", year: 2001, type: "handheld" },
    { name: "Pokemon Mini", image: "/images/pokemonmini.png", year: 2001, type: "handheld" },
    { name: "Nintendo GameCube", image: "/images/gamecube.png", year: 2001, type: "home" },
    { name: "Pocket Pikachu", image: "/images/pocketpikachu.webp", year: 2002, type: "handheld" },
    { name: "Xbox", image: "/images/xbox.png", year: 2001, type: "home" },
    { name: "Gameboy Advance SP", image: "/images/sp.png", year: 2003, type: "handheld" },
    { name: "PlayStation Portable (PSP)", image: "/images/psp.png", year: 2004, type: "handheld" },
    { name: "Nintendo DS", image: "/images/nds.png", year: 2004, type: "handheld" },
    { name: "Xbox 360", image: "/images/xbox360.png", year: 2005, type: "home" },
    { name: "Gameboy Micro", image: "/images/gameboymicro.png", year: 2005, type: "handheld" },
    { name: "Nintendo DS Lite", image: "/images/ndslite.png", year: 2006, type: "handheld" },
    { name: "Wii", image: "/images/wii.png", year: 2006, type: "home" },
    { name: "PlayStation 3", image: "/images/ps3.png", year: 2006, type: "home" },
    { name: "PSP Go", image: "/images/pspgo.png", year: 2009, type: "handheld" },
    { name: "DSi XL", image: "/images/dsixl.png", year: 2009, type: "handheld" },
    { name: "PlayStation Vita", image: "/images/psvita.png", year: 2011, type: "handheld" },
    { name: "Nintendo Wii U", image: "/images/wiiu.png", year: 2012, type: "home" },
    { name: "Nintendo 2DS", image: "/images/2ds.png", year: 2013, type: "handheld" },
    { name: "PlayStation 4", image: "/images/ps4.webp", year: 2013, type: "home" },
    { name: "Xbox One", image: "/images/xboxone.png", year: 2013, type: "home" },
    { name: "New Nintendo 3DS XL", image: "/images/3dsxl.png", year: 2014, type: "handheld" },
    { name: "Nintendo 2DS XL", image: "/images/2dsxl.webp", year: 2017, type: "handheld" },
    { name: "Nintendo Switch", image: "/images/switch.png", year: 2017, type: "home" },
    { name: "Switch Lite", image: "/images/switchlite.png", year: 2019, type: "handheld" },
    { name: "PlayStation 5", image: "/images/ps5.png", year: 2020, type: "home" },
    { name: "Xbox Series X/S", image: "/images/xboxxs.png", year: 2020, type: "home" },
    { name: "Steam Deck", image: "/images/steamdeck.png", year: 2022, type: "handheld" },
    { name: "Tapwave Zodiac", image: "/images/tapwavezodiac.png", year: 2003, type: "handheld" },
    { name: "WonderSwan", image: "/images/wonderswan.png", year: 1999, type: "handheld" },
    { name: "Ouya", image: "/images/ouya.png", year: 2013, type: "home" },
    { name: "Nintendo Switch 2", image: "/images/switch2.png", year: 2025, type: "home" }
];

// Sorteer automatisch op releasejaar (oud naar nieuw)
allConsoles.sort((a, b) => a.year - b.year);

// ================= AUTH =================
// Simpele in-memory opslag van ingelogde gebruikers
const loggedInUsers = {};

// ================= REGISTER ENDPOINT =================
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username en password verplicht' });

    const users = loadUsers();
    if (users.find(u => u.username === username)) return res.status(409).json({ message: 'Gebruiker bestaat al' });

    const hashedPassword = await bcrypt.hash(password, 10); // wachtwoord hashen
    users.push({ username, password: hashedPassword, collection: [], favorites: [] });
    saveUsers(users);

    res.status(201).json({ message: 'Gebruiker geregistreerd!' });
});

// ================= LOGIN ENDPOINT =================
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ message: 'Ongeldige inloggegevens' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Ongeldige inloggegevens' });

    loggedInUsers[username] = true; // markeer als ingelogd
    res.json({ message: `Welkom, ${username}!` });
});

// ================= LOGOUT ENDPOINT =================
app.post('/logout', (req, res) => {
    const { username } = req.body;
    if (loggedInUsers[username]) {
        delete loggedInUsers[username];
        return res.json({ message: `${username} uitgelogd` });
    }
    res.status(400).json({ message: 'Gebruiker niet ingelogd' });
});

// ================= CONSOLES ENDPOINTS =================
// Alle consoles ophalen
app.get('/consoles', (req, res) => res.json(allConsoles));

// Collectie van gebruiker ophalen
app.get('/collection', (req, res) => {
    const username = req.query.username;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });
    res.json({ collection: user.collection, favorites: user.favorites });
});

// Console toevoegen aan collectie
app.post('/collection/add', (req, res) => {
    const { username, consoleName } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    if (!allConsoles.find(c => c.name === consoleName)) return res.status(400).json({ message: 'Console bestaat niet' });
    if (user.collection.includes(consoleName)) return res.status(400).json({ message: 'Console al in collectie' });

    user.collection.push(consoleName);
    saveUsers(users);
    res.json({ message: `${consoleName} toegevoegd`, collection: user.collection });
});

// Console verwijderen uit collectie
app.post('/collection/remove', (req, res) => {
    const { username, consoleName } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    user.collection = user.collection.filter(c => c !== consoleName);
    saveUsers(users);
    res.json({ message: `${consoleName} verwijderd`, collection: user.collection });
});

// ================= FAVORITES ENDPOINTS =================
// Favoriet toevoegen
app.post('/collection/favorite/add', (req, res) => {
    const { username, consoleName } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    if (!allConsoles.find(c => c.name === consoleName)) return res.status(400).json({ message: 'Console bestaat niet' });
    if (!user.favorites) user.favorites = [];
    if (!user.favorites.includes(consoleName)) {
        user.favorites.push(consoleName);
        saveUsers(users);
    }

    res.json({ message: `${consoleName} toegevoegd aan favorieten`, favorites: user.favorites });
});

// Favoriet verwijderen
app.post('/collection/favorite/remove', (req, res) => {
    const { username, consoleName } = req.body;
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

    if (!user.favorites) user.favorites = [];
    user.favorites = user.favorites.filter(c => c !== consoleName);
    saveUsers(users);

    res.json({ message: `${consoleName} verwijderd uit favorieten`, favorites: user.favorites });
});

// ================= START SERVER =================
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
