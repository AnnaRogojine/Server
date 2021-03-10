const express = require('express');
const mongoose = require('mongoose');

const houses = require('./routes/houses');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the house listing API');
});

app.use('/api/houses', houses);

require('dotenv').config();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://AnnaRo:Df2MqKasP3ii05Mz@cluster0.ymfp4.mongodb.net/auth_system?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
        app.listen(port, () => console.log(`Server is running on port ${port}`))
    })
    .catch(err => console.log(err))
