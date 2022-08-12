import React, { useState } from "react";
import Modal from 'react-modal';

const Submit = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [lyrics, setLyrics] = useState('');

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #666'
        },
    };
    
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function submitLyrics(e) {
        e.preventDefault();
        const data = { artist: artist, song: song, lyrics: lyrics };

        await fetch('/add_lyrics', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            {!modalIsOpen && <button className='submit-button button' onClick={openModal}>Submit lyrics</button>}
            <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Submit modal"
            >
                <button onClick={closeModal}>X</button>
                <h2>What lyrics remind you of Jor and Meg?</h2>
                <form>
                    <div>
                        Artist: 
                        <input onChange={(e) => setArtist(e.target.value)} value={artist} />
                    </div>
                    <div>
                        Song: 
                        <input onChange={(e) => setSong(e.target.value)} value={song} />
                    </div>
                    <div>
                        Lyrics: 
                        <input onChange={(e) => setLyrics(e.target.value)} value={lyrics} />
                    </div>
                    <button className='button' onClick={submitLyrics}>Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Submit;