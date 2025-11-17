// pages/ConsolesPage.jsx
import React, { useState } from 'react';
import ConsoleCard from '../components/ConsoleCard';
import ConsolesModal from '../components/ConsolesModal';

const ConsolesPage = ({
    consoles,
    collection,
    collectionDetails,
    favorites,
    toggleFavorite,
    filteredConsoles
}) => {
    const [selectedConsole, setSelectedConsole] = useState(null);

    const openModal = (consoleItem) => setSelectedConsole(consoleItem);
    const closeModal = () => setSelectedConsole(null);

    return (
        <div className="cards-collection-wrapper">
            <div className="cards-column">
                <h3>
                    Alle Consoles ({filteredConsoles.filter(c => !collection.includes(c.name)).length} nog niet in collectie)
                </h3>
                <div className="cards-grid">
                    {filteredConsoles.map(consoleItem => (
                        <ConsoleCard
                            key={consoleItem.name}
                            consoleItem={consoleItem}
                            onFavorite={toggleFavorite}
                            isFavorite={favorites.includes(consoleItem.name)}
                            isInCollection={collection.includes(consoleItem.name)}
                            onClick={() => openModal(consoleItem)}
                        />
                    ))}
                </div>
            </div>

            {/* ================= MODAL ================= */}
            {selectedConsole && (
                <ConsolesModal
                    consoleItem={selectedConsole}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ConsolesPage;
