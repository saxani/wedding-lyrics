import React, { useState } from "react";
// import Modal from 'react-modal';
import { Button, Modal, Box, Backdrop, Fade, TextField } from '@mui/material';

const Submit = () => {
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [lyrics, setLyrics] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const customStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '600px',
        bgcolor: '#fff',
        borderRadius: '10px',
        padding: '30px'

    };

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
            {!open && 
                <div className='submit-button'>
                    <Button 
                        className='submit-button' 
                        onClick={handleOpen} 
                        variant="contained"
                        sx={{
                            color: 'rgb(0, 2, 44)',
                            backgroundColor: '#fff',
                            "&:hover": {
                                backgroundColor: "#acc9e8; !important"
                              }
                          }}
                    >
                        Submit Lyrics
                    </Button>
                </div>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Submit song lyrics"
                aria-describedby="Input artist, song, and lyrics in this modal"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={customStyles}>
                        <h2>What lyrics remind you of Meg and Jor?</h2>
                        <div className='input-section'>
                            <TextField 
                                id="outlined-basic" 
                                label="Artist" 
                                variant="outlined" 
                                sx={{width: '300px'}}
                                onChange={(e) => setArtist(e.target.value)}
                                value={artist}
                            />
                        </div>

                        <div className='input-section'>
                            <TextField 
                                id="outlined-basic" 
                                label="Song" 
                                variant="outlined" 
                                sx={{width: '300px'}}
                                onChange={(e) => setSong(e.target.value)}
                                value={song}    
                            />
                        </div>
                        <div className='input-section'>
                            <TextField
                                id="outlined-multiline-static"
                                label="Lyrics"
                                multiline
                                rows={3}
                                sx={{width: '300px'}}
                                onChange={(e) => setLyrics(e.target.value)} 
                                value={lyrics}
                            />
                        </div>
                        <Button 
                        onClick={submitLyrics}
                        variant="contained"
                        sx={{
                            color: 'rgb(118, 118, 118)',
                            backgroundColor: '#fff',
                            "&:hover": {
                                backgroundColor: "#acc9e8; !important"
                              }
                          }}
                    >
                        Submit
                    </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default Submit;