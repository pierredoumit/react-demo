const express = require('express');
require('dotenv').config()
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

//connect db
connectDB();

//init middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/steps', require('./routes/api/steps'));

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on host and port ${PORT}`));
