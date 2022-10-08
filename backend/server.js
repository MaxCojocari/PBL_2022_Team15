const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.js');
const cors = require('cors');

dotenv.config();

mongoose.connect(
  process.env.DATABASE_ACCESS,
  () => console.log("Database successfully connected!")
);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/user', userRoute);
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})