// pages/WishlistPage.jsx
import React from 'react';
import ConsoleCard from '../components/ConsoleCard';

const WishlistPage = ({
    favorites,
    consoles,
    toggleFavorite,
    collection,
    handleClearWishlist
}) => {
    return (
        <div className="cards-collection-wrapper">
            <div className="collection-column">
                <h3>Wishlist ({favorites.length})</h3>
                {favorites.length > 0 && (
                    <button className="clear-btn" onClick={handleClearWishlist}>
                        Clear Wishlist
                    </button>
                )}
                <div className="cards-grid">
                    {consoles
                        .filter(c => favorites.includes(c.name))
                        .map(consoleItem => (
                            <ConsoleCard
                                key={consoleItem.name}
                                consoleItem={consoleItem}
                                onFavorite={toggleFavorite}
                                isFavorite={favorites.includes(consoleItem.name)}
                                isInCollection={collection.includes(consoleItem.name)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
