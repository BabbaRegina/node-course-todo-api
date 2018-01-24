// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,database) => {
    if(err) {
        return console.log('Unable to connect to db server');
    }

    console.log('Connected to mongodb server');
    const db = database.db('TodoApp');
    // db.collection('Todos').insertOne({
    //     text: 'Something todo',
    //     completed: false
    // }, (err, res) => {
    //     if(err) {
    //         return console.log(`Unable to insert todo ${err}`);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });
    // db.collection('Users').insertOne({
    //     name: 'Irene',
    //     age: 27,
    //     location: 'Trento'
    // }, (err, res) => {
    //     if(err) {
    //         return console.log(`Unable to insert user ${err}`);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    database.close();
});