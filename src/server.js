const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

/* define public directory path for express */
const publicDirectoryPath = path.join(__dirname, '../public');

/* to setup static directory */
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`server up at port ${PORT}`);
});