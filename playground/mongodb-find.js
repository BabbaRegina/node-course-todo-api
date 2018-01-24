// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, database) => {
    if (err) {
        return console.log('Unable to connect to db server');
    }

    console.log('Connected to mongodb server');

    const db = database.db('TodoApp');
    // db.collection('Todos')
    //     .find({
    //     // _id: '5a68741bdc2306084cdabd16'
    //     _id: new ObjectID('5a68741bdc2306084cdabd16')
    //     })
    //     .toArray()
    //     .then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }, (err) => {
    //         console.log('Unable to fetch todos', err);
    //      });

    db.collection('Users')
        .find({
        // _id: '5a68741bdc2306084cdabd16'
            name: 'Irene'
        })
        .toArray()
        .then((docs) => {
            console.log('Users');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch users', err);
         });

    db.collection('Todos')
        .find()
        .count()
        .then((count) => {
            console.log('Todos count', count);
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });
    database.close();
});