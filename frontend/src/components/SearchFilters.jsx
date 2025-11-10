import React, { useState } from "react";
import "./SearchFilters.css";

export default function SearchFilters({
    searchTerm,
    setSearchTerm,
    typeFilters,
    setTypeFilters,
    manufacturerFilters,
    setManufacturerFilters,
}) {
    // lokale state voor de drie sliders
    const [lengte, setLengte] = useState(50);
    const [breedte, setBreedte] = useState(50);
    const [hoogte, setHoogte] = useState(50);






    return (
        <div className="filters-wrapper">
            {/* Zoekveld */}
            <input
                type="text"
                placeholder="Zoek console..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            {/* Type-filter */}
            <div className="filter-group">
                <h4>Type</h4>
                {["home", "handheld"].map((t) => (
                    /*loopt over die array en voor elke waarde t (eerste "home", dan "handheld") wordt het JSX-blok binnen de map gerenderd.*/
                    
                    <label key={t}>
                        {/*React gebruikt key intern om te weten welke elementen zijn veranderd/nieuw/toegevoegd. Omdat t (bv. "home") uniek is, is dat een goede key. Keys voorkomen onnodige DOM-updates en bugs bij her-rendering.*/ }
 
                        <input
                            type="checkbox"
                            checked={typeFilters[t]}
                            // Dit maakt de checkbox controlled: de weergegeven staat (aan of uit) wordt volledig bepaald door React state. typeFilters[t] haalt de boolean op voor dat specifieke type. Als typeFilters.home === true wordt de eerste checkbox aangevinkt weergegeven.// 
                            onChange={() =>
                                setTypeFilters((prev) => ({ ...prev, [t]: !prev[t] }))
                         //*event handler die wordt aangeroepen zodra een gebruiker op de checkbox klikt (de checkbox verandert).//
                         //De handler gebruikt de functionele vorm van setState: setTypeFilters(prev => ...).

                        //Waarom functioneel? Omdat het zeker werkt als meerdere updates snel achter elkaar komen of als de nieuwe state afhankelijk is van de oude state. Het voorkomt race conditions en stale values.

                        //{...prev, [t]: !prev[t] } is ES6-syntaxis:

                        //...prev kopieert alle bestaande eigenschappen van het oude typeFilters object (immutability).

                        //[t]: !prev[t] verandert (togglet) precies die ene eigenschap: als prev[t] true was, wordt false, en omgekeerd.

                       // Zo wordt een nieuw object gemaakt met de gewijzigde waarde — dat is belangrijk omdat React state immutable h
                            }
                        />
                        {t}
                    </label>
                ))}

            </div>

            {/* Manufacturer-filter */}
            <div className="filter-group">
                <h4>Manufacturer</h4>
                {["Atari", "Nintendo", "Sega", "Sony", "Microsoft", "Other"].map(
                    (m) => (
                        <label key={m}>
                            <input
                                type="checkbox"
                                checked={manufacturerFilters[m]}
                                onChange={() =>
                                    setManufacturerFilters((prev) => ({
                                        ...prev,
                                        [m]: !prev[m],
                                    }))
                                }
                            />
                            {m}
                        </label>
                    )
                )}
            </div>






            {/* sliders: lengte, breedte, hoogte */}
            <div className="filter-group">
                <h4>Afmetingen</h4>
                <div className="sliders">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={lengte}
                        onChange={(e) => setLengte(e.target.value)}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={breedte}
                        onChange={(e) => setBreedte(e.target.value)}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={hoogte}
                        onChange={(e) => setHoogte(e.target.value)}
                    />
                </div>

                {/* waarden weergeven */}
                <div className="dimension-values">
                    L: {lengte} | B: {breedte} | H: {hoogte}
                </div>
            </div>
        </div>
    );
}
