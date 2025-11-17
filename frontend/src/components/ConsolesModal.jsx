// components/ConsolesModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Modal.css';

const formatConsoleName = (name) =>
    name.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');

const formatControllerColor = (color) =>
    color.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');

function ConsolesModal({ consoleItem, onClose }) {
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

    // ================= HANDLE ESC =================
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (imageModalOpen) closeImageModal();
                else onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [imageModalOpen, onClose]);

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
                if (audio.duration) {
                    setProgress((audio.currentTime / audio.duration) * 100);
                }
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

    // ================= IMAGE VARIANTS =================
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

    // ================= RENDER =================
    return (
        <>
            <div
                className="modal-overlay"
                style={{ display: hideMainModal ? 'none' : 'flex' }}
                onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose(); }}
            >
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>X</button>

                    <h3>{consoleItem.name}</h3>

                    {/* ================= PLAY KNOP ================= */}
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

                    {/* ================= AFMETINGEN ================= */}
                    <div className="dimensions">
                        {consoleItem.dimensions
                            ? `Afmetingen: ${consoleItem.dimensions.length} x ${consoleItem.dimensions.width} x ${consoleItem.dimensions.height} cm (lxbxh)`
                            : 'Afmetingen onbekend'}
                    </div>

                    {/* ================= CONSOLE KLEUREN ================= */}
                    {consoleItem.colors?.length > 1 && (
                        <div className="console-colors-block">
                            <h4>Kleuren:</h4>
                            <div className="console-colors-variants">
                                {consoleItem.colors.map(color => (
                                    <img
                                        key={color}
                                        src={getConsoleColorImageVariants(consoleItem.name, color)[0]}
                                        alt={`${consoleItem.name} ${color}`}
                                        className="modal-image clickable"
                                        onClick={() => openImageModal(getConsoleColorImageVariants(consoleItem.name, color))}
                                        data-attempt="0"
                                        onError={(e) => {
                                            const variants = getConsoleColorImageVariants(consoleItem.name, color);
                                            let attempt = parseInt(e.target.dataset.attempt || '0', 10);
                                            if (attempt < variants.length - 1) {
                                                e.target.dataset.attempt = attempt + 1;
                                                e.target.src = variants[attempt + 1];
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ================= CONTROLLERS ================= */}
                    {consoleItem.controllerColors?.length > 0 && (
                        <div className="controllers-block">
                            <h4>Controllers:</h4>
                            <div className="controller-variants">
                                {consoleItem.controllerColors.map(color => (
                                    <img
                                        key={color}
                                        src={getControllerImageVariants(consoleItem.name, color)[0]}
                                        alt={`${consoleItem.name} controller ${color}`}
                                        className="modal-image clickable"
                                        onClick={() => openImageModal(getControllerImageVariants(consoleItem.name, color))}
                                        data-attempt="0"
                                        onError={(e) => {
                                            const variants = getControllerImageVariants(consoleItem.name, color);
                                            let attempt = parseInt(e.target.dataset.attempt || '0', 10);
                                            if (attempt < variants.length - 1) {
                                                e.target.dataset.attempt = attempt + 1;
                                                e.target.src = variants[attempt + 1];
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ================= ORIGINEEL PLAATJE ================= */}
                    {(!consoleItem.colors || consoleItem.colors.length <= 1) && (
                        <img
                            src={consoleItem.image}
                            alt={consoleItem.name}
                            className="modal-image clickable"
                            onClick={() => openImageModal([consoleItem.image, '/images/placeholder.png'])}
                            onError={(e) => { e.target.src = "/images/placeholder.png"; }}
                        />
                    )}
                </div>
            </div>

            {/* ================= UITVERGROTING MODAAL ================= */}
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

export default ConsolesModal;
