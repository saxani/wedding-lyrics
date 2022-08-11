import React, { useState } from "react";
import Modal from 'react-modal';

const Submit = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [artist, setArtist] = useState('');
    const [lyrics, setLyrics] = useState('');

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const buttonStyle = {
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)'
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function submitLyrics(e) {
        e.preventDefault();
        const data = { artist: artist, lyrics: lyrics };

        await fetch('/add_lyrics', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
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
            {!modalIsOpen && <button style={buttonStyle} onClick={openModal}>Open Modal</button>}
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
                        Lyrics: 
                        <input onChange={(e) => setLyrics(e.target.value)} value={lyrics} />
                    </div>
                    <button onClick={submitLyrics}>Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Submit;