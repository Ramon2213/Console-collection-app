// src/components/SearchFilters.jsx
import React from "react";
import "./SearchFilters.css";

export default function SearchFilters({
    searchTerm,
    setSearchTerm,
    typeFilters,
    setTypeFilters,
    manufacturerFilters,
    setManufacturerFilters,
    sliderValues,
    setSliderValues,
    minDimensions,
    maxDimensions
}) {
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
                    <label key={t}>
                        <input
                            type="checkbox"
                            checked={typeFilters[t]}
                            onChange={() =>
                                setTypeFilters(prev => ({ ...prev, [t]: !prev[t] }))
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
                                    setManufacturerFilters(prev => ({
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

            {/* Sliders: lengte, breedte, hoogte */}
            <div className="filter-group">
                <h4>Afmetingen</h4>
                <div className="sliders">
                    <label>
                        Lengte: {sliderValues.lengte}
                        <input
                            type="range"
                            min={minDimensions.lengte}
                            max={maxDimensions.lengte}
                            value={sliderValues.lengte}
                            onChange={(e) =>
                                setSliderValues(prev => ({
                                    ...prev,
                                    lengte: Number(e.target.value)
                                }))
                            }
                        />
                    </label>

                    <label>
                        Breedte: {sliderValues.breedte}
                        <input
                            type="range"
                            min={minDimensions.breedte}
                            max={maxDimensions.breedte}
                            value={sliderValues.breedte}
                            onChange={(e) =>
                                setSliderValues(prev => ({
                                    ...prev,
                                    breedte: Number(e.target.value)
                                }))
                            }
                        />
                    </label>

                    <label>
                        Hoogte: {sliderValues.hoogte}
                        <input
                            type="range"
                            min={minDimensions.hoogte}
                            max={maxDimensions.hoogte}
                            value={sliderValues.hoogte}
                            onChange={(e) =>
                                setSliderValues(prev => ({
                                    ...prev,
                                    hoogte: Number(e.target.value)
                                }))
                            }
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
