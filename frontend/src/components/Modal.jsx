import React, { useEffect, useState, useRef } from 'react';
import './Modal.css';
import { updateConsoleDetails } from '../api';

const formatConsoleName = (name) =>
    name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');

const formatControllerColor = (color) =>
    color.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');

function Modal({
    consoleItem,
    colorStates,
    setColorStates,
    controllerStates,
    setControllerStates,
    consoleState,
    setConsoleState,
    onRemove,
    onClose,
    username
}) {
    if (!username) console.warn('Geen username meegegeven! Changes niet opgeslagen.');

    // ================= IMAGE MODAL =================
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [imageModalSrc, setImageModalSrc] = useState('');
    const [imageModalVariants, setImageModalVariants] = useState([]);
    const [hideMainModal, setHideMainModal] = useState(false);

    const openImageModal = (variants) => {
        setImageModalVariants(variants);
        setImageModalSrc(variants[0]);
        setImageModalOpen(true);
        setHideMainModal(true);
    };

    const closeImageModal = () => {
        setImageModalOpen(false);
        setImageModalSrc('');
        setImageModalVariants([]);
        setHideMainModal(false);
    };

    // ================= HANDLE OVERLAY & ESC =================
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) onClose();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (imageModalOpen) closeImageModal();
                else onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, imageModalOpen]);

    // ================= SAVE CHANGES =================
    const saveChanges = async (updatedColors, updatedControllers, updatedConsoleState) => {
        if (!username) return;
        const colorsPayload = Object.keys(updatedColors)
            .filter(key => updatedColors[key].active)
            .map(key => ({ name: key, state: updatedColors[key].state }));

        const controllerColorsPayload = updatedControllers.map(c => ({
            color: c.color,
            state: c.state
        }));

        try {
            await updateConsoleDetails(
                username,
                consoleItem.name,
                updatedControllers.length,
                controllerColorsPayload,
                colorsPayload,
                updatedConsoleState
            );
        } catch (err) {
            console.error('Error saving console details:', err);
        }
    };

    // ================= COLOR TOGGLE =================
    const toggleColor = async (color) => {
        const newColors = {
            ...colorStates,
            [color]: {
                active: !colorStates[color]?.active,
                state: colorStates[color]?.state || 'Goed'
            }
        };
        setColorStates(newColors);
        await saveChanges(newColors, controllerStates, consoleState);
    };

    const handleColorStateChange = async (color, value) => {
        const newColors = {
            ...colorStates,
            [color]: { ...colorStates[color], state: value }
        };
        setColorStates(newColors);
        await saveChanges(newColors, controllerStates, consoleState);
    };

    // ================= CONTROLLERS =================
    const handleControllerCountChange = async (e) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 0) return;

        const newControllers = [...controllerStates];
        if (value > newControllers.length) {
            while (newControllers.length < value) newControllers.push({ color: '', state: 'Goed', imageKey: Date.now() });
        } else {
            newControllers.length = value;
        }

        setControllerStates(newControllers);
        await saveChanges(colorStates, newControllers, consoleState);
    };

    const handleControllerChange = async (index, key, value) => {
        const copy = [...controllerStates];
        copy[index] = { ...copy[index], [key]: value, ...(key === 'color' ? { imageKey: Date.now() } : {}) };
        setControllerStates(copy);
        await saveChanges(colorStates, copy, consoleState);
    };

    // ================= CONSOLE STATE CHANGE =================
    const handleConsoleStateChange = async (value) => {
        setConsoleState(value);
        await saveChanges(colorStates, controllerStates, value);
    };

    // ================= IMAGE HELPERS =================
    const getControllerImageVariants = (consoleName, color) => {
        const rawName = consoleName;
        const rawColor = color;
        return [
            `${rawName}${rawColor}.png`,
            `${rawName}${rawColor}.jpg`,
            `${rawName}${rawColor}.jpeg`,
            `${rawName}${rawColor}.webp`,
            `${formatConsoleName(rawName)}${formatControllerColor(rawColor)}.png`,
            `${formatConsoleName(rawName)}${formatControllerColor(rawColor)}.jpg`,
            `${formatConsoleName(rawName)}${formatControllerColor(rawColor)}.jpeg`,
            `${formatConsoleName(rawName)}${formatControllerColor(rawColor)}.webp`,
            `${formatConsoleName(rawName)}-${rawColor}.png`,
            `${formatConsoleName(rawName)}-${rawColor}.jpg`,
            `${formatConsoleName(rawName)}-${rawColor}.jpeg`,
            `${formatConsoleName(rawName)}-${rawColor}.webp`,
            '/images/placeholder.png'
        ].map(path => `/images/controllervarianten/${path}`);
    };

    const getConsoleColorImageVariants = (consoleName, color) => {
        const rawName = consoleName;
        return [
            `/images/consolekleuren/${rawName.replace(/\s+/g, '')}-${color}.png`,
            `/images/consolekleuren/${rawName.replace(/\s+/g, '')}-${color}.jpg`,
            `/images/consolekleuren/${rawName.replace(/\s+/g, '')}-${color}.jpeg`,
            `/images/consolekleuren/${rawName.replace(/\s+/g, '')}-${color}.webp`,
            '/images/placeholder.png'
        ];
    };

    // ================= GELUID MET PROGRESS =================
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    const progressInterval = useRef(null);

    const handlePlay = () => {
        if (!consoleItem.sound) return;

        if (!isPlaying) {
            const soundName = consoleItem.name.replace(/\s+/g, '');
            const audio = new Audio(`/sounds/jingles/${soundName}.mp3`);
            audioRef.current = audio;
            audio.play().catch(err => console.warn("Kon geluid niet afspelen:", err));
            setIsPlaying(true);

            progressInterval.current = setInterval(() => {
                if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
            }, 100);

            audio.onended = () => {
                setIsPlaying(false);
                setProgress(0);
                clearInterval(progressInterval.current);
            };
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setProgress(0);
            clearInterval(progressInterval.current);
        }
    };

    // ================= RENDER =================
    return (
        <>
            <div
                className="modal-overlay"
                onClick={handleOverlayClick}
                style={{ display: hideMainModal ? 'none' : 'flex' }}
            >
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>X</button>

                    <h3>{consoleItem.name}</h3>

                    <div className="play-button-wrapper">
                        <button
                            onClick={handlePlay}
                            disabled={!consoleItem.sound}
                            className={`play-button ${isPlaying ? 'playing' : ''}`}
                        >
                            {consoleItem.sound ? (isPlaying ? "Stop" : "Play Start-up Sound") : "No Start-up Sound"}
                            {isPlaying && (
                                <div className="progress-overlay" style={{ width: `${progress}%` }}></div>
                            )}
                        </button>
                    </div>



                    {/* Alleen standaard console state tonen als er geen kleuren of slechts één kleur is */}
                    {(!consoleItem.colors || consoleItem.colors.length <= 1) && (
                        <div className="console-state-section">
                            <label>Status console:</label>
                            <select value={consoleState} onChange={(e) => handleConsoleStateChange(e.target.value)}>
                                {['Nieuw', 'Goed', 'Gebruikt', 'Slecht'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    )}



                    <div className="dimensions">
                        {consoleItem.dimensions
                            ? `Afmetingen: ${consoleItem.dimensions.length} x ${consoleItem.dimensions.width} x ${consoleItem.dimensions.height} cm (lxbxh)`
                            : 'Afmetingen onbekend'}
                    </div>

                    {(!consoleItem.colors || consoleItem.colors.length <= 1) && (
                        <img
                            src={consoleItem.image}
                            alt={consoleItem.name}
                            className="modal-image clickable"
                            onClick={() => openImageModal([consoleItem.image, '/images/placeholder.png'])}
                            onError={(e) => { e.target.src = "/images/placeholder.png"; }}
                        />
                    )}

                    {consoleItem.colors?.length > 1 && (
                        <div className="console-colors">
                            <h4>Kleuren:</h4>
                            <div className="colors-list">
                                {consoleItem.colors.map(color => (
                                    <label key={color} className="color-label">
                                        <input
                                            type="checkbox"
                                            checked={colorStates[color]?.active || false}
                                            onChange={() => toggleColor(color)}
                                        />
                                        <span className="color-box" style={{ backgroundColor: color.toLowerCase() }}></span>
                                        {color}
                                    </label>
                                ))}
                            </div>

                            <div className="active-color-images">
                                {Object.entries(colorStates).map(([color, data]) => (
                                    data.active && (
                                        <div key={color} className="active-color-item">
                                            <img
                                                src={getConsoleColorImageVariants(consoleItem.name, color)[0]}
                                                alt={`${consoleItem.name} ${color}`}
                                                className="active-color-image clickable"
                                                onClick={() => openImageModal(getConsoleColorImageVariants(consoleItem.name, color))}
                                                data-attempt="0"
                                                onError={(e) => {
                                                    let variants = getConsoleColorImageVariants(consoleItem.name, color);
                                                    let attempt = parseInt(e.target.dataset.attempt || '0', 10);
                                                    if (attempt < variants.length - 1) {
                                                        e.target.dataset.attempt = attempt + 1;
                                                        e.target.src = variants[attempt + 1];
                                                    }
                                                }}
                                            />
                                            <select value={data.state} onChange={(e) => handleColorStateChange(color, e.target.value)}>
                                                {['Nieuw', 'Goed', 'Gebruikt', 'Slecht'].map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="controllers-section">
                        <label>
                            Aantal controllers:
                            <select
                                value={controllerStates.length}
                                onChange={handleControllerCountChange}
                                disabled={!consoleItem.controllerColors || consoleItem.controllerColors.length === 0}
                            >
                                {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </label>

                        <div className="controller-list">
                            {controllerStates.map((controller, index) => (
                                <div key={index} className="controller-selection">
                                    <label>Controller {index + 1} kleur:</label>
                                    <select
                                        value={controller.color}
                                        onChange={(e) => handleControllerChange(index, 'color', e.target.value)}
                                    >
                                        <option value="">Kies kleur</option>
                                        {consoleItem.controllerColors?.map(col => (
                                            <option key={col} value={col}>{col}</option>
                                        ))}
                                    </select>

                                    {controller.color && (
                                        <img
                                            key={`${controller.color}-${controller.imageKey || Date.now()}`}
                                            src={getControllerImageVariants(consoleItem.name, controller.color)[0]}
                                            alt={`${consoleItem.name} controller ${controller.color}`}
                                            className="controller-image clickable"
                                            onClick={() => openImageModal(getControllerImageVariants(consoleItem.name, controller.color))}
                                            data-attempt="0"
                                            onError={(e) => {
                                                const variants = getControllerImageVariants(consoleItem.name, controller.color);
                                                let attempt = parseInt(e.target.dataset.attempt || '0', 10);
                                                if (attempt < variants.length - 1) {
                                                    e.target.dataset.attempt = attempt + 1;
                                                    e.target.src = variants[attempt + 1];
                                                }
                                            }}
                                        />
                                    )}

                                    <select
                                        value={controller.state}
                                        onChange={(e) => handleControllerChange(index, 'state', e.target.value)}
                                    >
                                        {['Nieuw', 'Goed', 'Gebruikt', 'Slecht'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="remove-section">
                        <button className="removebutton" onClick={onRemove}>Remove from Collection</button>
                    </div>


                </div>
            </div>

            {imageModalOpen && (
                <div className="image-modal-overlay" onClick={closeImageModal}>
                    <div className="image-modal-content">
                        <button className="modal-close" onClick={closeImageModal}>X</button>
                        <img
                            src={imageModalSrc}
                            alt="Uitvergroting"
                            className="image-modal-img"
                            data-attempt="0"
                            onError={(e) => {
                                let attempt = parseInt(e.target.dataset.attempt || '0', 10);
                                if (attempt < imageModalVariants.length - 1) {
                                    e.target.dataset.attempt = attempt + 1;
                                    e.target.src = imageModalVariants[attempt + 1];
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
