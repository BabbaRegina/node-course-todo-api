

require('./config/config');

const _  = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

const port = process.env.PORT; 

app.use(bodyParser.json()); // middleware

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (err) => {
        res.status(400).send(err);
    })
});

// GET todos with input
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({});
        }
        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var myId = req.params.id;
    if (!ObjectID.isValid(myId)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(myId).then((todo) => {
        if (!todo) {
            return res.status(404).send({});
        }
        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }


    if(_.isBoolean(body.completed) && body.completed){
        body.competedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.competedAt = null;
    }
    Todo.findByIdAndUpdate(id, 
        {$set: body},
        {new : true}
    ).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Started on port Heroku at port ${port}`);
});

module.exports = { app };