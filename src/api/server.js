'use strict';
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

//models
var Personality = require('./Personality');

//connect server to mongoDB 

+
mongoose.connect(
    'mongodb://localhost:27017/bigfive', {
        useNewUrlParser: true,
        useCreateIndex: true,
    }
);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.get('/', (req, res) => res.send('hello world'))

// retrieves all the personalities
app.get('/api/personality/list', (req, res) => {
    Personality.find({}).exec((err, personalities) => {
        if (err) return res.status(404).send('Error while getting personalities!');
        return res.send({
            personalities
        });
    });
});

app.get('/api/personality/:id', (req, res) => {
    Personality.findById(req.params.id, (err, personality) => {
        if (err) return res.status(404).send({
            message: err.message
        });
        return res.send({
            personality
        })
    });
});

// create a new personality
app.post('/api/personality/create', (req, res) => {
    const personality = new Personality(req.body);
    personality.save((err) => {
        if (err) return res.status(404).send({
            message: err.message
        });
        return res.send({
            personality
        });
    });
});

// update an existing personality with the given object id
app.post('/api/personality/update/:id', (req, res) => {
    let options = {
        new: true
    };
    Personality.findByIdAndUpdate(req.params.id, req.body.data, options, (err, personality) => {
        if (err) return res.status(404).send({
            message: err.message
        });
        return res.send({
            message: 'personality updated!',
            personality
        });
    });
});

// delete an existing personality with the given object id
app.post('/api/personality/delete/:id', (req, res) => {
    Personality.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.status(404).send({
            message: err.message
        });
        return res.send({
            message: 'personality deleted!'
        });
    });
});

const PORT = 5000;
app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');