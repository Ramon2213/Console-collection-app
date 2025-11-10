// pages/CollectionPage.jsx
import React from 'react';
import ConsoleCard from '../components/ConsoleCard';

const CollectionPage = ({
    consoles,
    collection,
    collectionDetails,
    favorites,
    handleAddConsole,
    handleRemoveConsole,
    toggleFavorite,
    openModal,
    handleClearCollection,
    filteredConsoles
}) => {
    return (
        <div className="cards-collection-wrapper">
            <div className="cards-column">
                <h3>
                    Alle Consoles ({filteredConsoles.filter(c => !collection.includes(c.name)).length} nog niet in collectie)
                </h3>
                <div className="cards-grid">
                    {filteredConsoles.filter(c => !collection.includes(c.name)).map(consoleItem => (
                        <ConsoleCard
                            key={consoleItem.name}
                            consoleItem={consoleItem}
                            onAdd={handleAddConsole}
                            onFavorite={toggleFavorite}
                            isFavorite={favorites.includes(consoleItem.name)}
                            isInCollection={collection.includes(consoleItem.name)}
                        />
                    ))}
                </div>
            </div>

            <div className="collection-column">
                <h3>Jouw Collectie ({collection.length})</h3>
                {collection.length > 0 && (
                    <button className="clear-btn" onClick={handleClearCollection}>
                        Clear Collection
                    </button>
                )}
                <div className="cards-grid">
                    {consoles.filter(c => collection.includes(c.name)).map(consoleItem => (
                        <ConsoleCard
                            key={consoleItem.name}
                            consoleItem={consoleItem}
                            onRemove={() => handleRemoveConsole(consoleItem)}
                            onFavorite={toggleFavorite}
                            isFavorite={favorites.includes(consoleItem.name)}
                            isInCollection={collection.includes(consoleItem.name)}
                            onClick={() => openModal(consoleItem)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;
