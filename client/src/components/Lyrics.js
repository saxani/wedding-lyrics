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

    useEffect(() => {
        setSongNum(randomizer(data));                         
    }, []);

    const onComplete = () => {
        setTimeout(() => {
            setSongNum(randomizer(data));
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
        </div>
    );
};

export default Lyrics;