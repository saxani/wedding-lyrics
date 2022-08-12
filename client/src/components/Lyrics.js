import React, { useState, useEffect } from 'react';
import Letters from './Letters';
import '../App.css';

function randomizer(data) {
    let num = Math.floor(Math.random() * data.length);

    return num;
}

const Lyrics = ({ data }) => {
    const [songNum, setSongNum] = useState(randomizer(data));
    const [instance, setInstance] = useState(1);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setSongNum(randomizer(data));                         
    }, []);

    useEffect(() => {
        if (!isVisible) {
            setTimeout(() => {
                setSongNum(randomizer(data));
            }, 500);
        }
    }, [isVisible]);

    const onComplete = () => {
        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
            let tempInstance = instance + 1;
            setInstance(tempInstance);

        }, 5000);
    };

    const lyricsLetters = data[songNum].lyrics.split('');
   
    return (
        <div className='lyrics-wrapper'>
            <div className='lyrics'>
                <Letters lyrics={lyricsLetters} onComplete={onComplete} key={instance} />
            </div>
            <div className={`song-info ${isVisible ? "show": ""}`}><span>- {data[songNum].artist}</span><span className='song-title'>, {data[songNum].song}</span></div>
        </div>
    );
};

export default Lyrics;