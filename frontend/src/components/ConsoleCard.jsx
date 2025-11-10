export default function ConsoleCard({ consoleItem, onAdd, onRemove, onFavorite, isFavorite, isInCollection, onClick }) {
    const handleImageError = (e) => {
        e.target.src = "/images/placeholder.png";
    };

    return (
        <div className="card">
            {/* Afbeelding console */}
            <img
                src={consoleItem.image}
                alt={consoleItem.name}
                className="card-image"
                onError={handleImageError}
                onClick={onClick}
                style={{ cursor: onClick ? 'pointer' : 'default' }}
            />

            {/* Favoriet knop */}
            <img
                src={isFavorite ? "/images/star-filled.png" : "/images/star-empty.png"}
                alt="Favoriet"
                className="card-favorite"
                onClick={(e) => {
                    e.stopPropagation(); // voorkomt dat modal opent
                    onFavorite && onFavorite(consoleItem);
                }}
            />

            {/* Naam console */}
            <div className="card-name">{consoleItem.name}</div>

            {/* Add knop alleen zichtbaar als onAdd bestaat en console niet in collectie */}
            {onAdd && !isInCollection && (
                <button onClick={() => onAdd(consoleItem)}>Add</button>
            )}
        </div>
    );
}
