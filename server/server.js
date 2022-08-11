const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000; 
const dataPath = './data.json';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/fetch_lyrics', (req, res) => {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if(err){
            console.log(error);
            return;
         }

        const lyrics = JSON.parse(data).data;
        res.send({ lyrics });
    });

});

app.post('/add_lyrics', (req, res) => {
    console.log('Got body:', req.body);

    fs.readFile(dataPath, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }

        const parsedData = JSON.parse(data).data;
        parsedData.push(req.body);
        const formattedData = { data: parsedData };

        fs.writeFile(dataPath, JSON.stringify(formattedData), (err) => {
          if (err) {
            console.log('Failed to write updated data to file');
            return;
          }
          console.log('Updated file successfully');
        });
      });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'../client/build/index.html'));
});