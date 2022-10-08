const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routesURL = require('./routes/routes.js');
const cors = require('cors');

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/user', routesURL);
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})