// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, database) => {
    if (err) {
        return console.log('Unable to connect to db server');
    }

    console.log('Connected to mongodb server');

    const db = database.db('TodoApp');

    // findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
        text: 'eat lunch' 
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    })
    .then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        name: 'Irene' 
    },{ 
        $inc: { 
            age: 100 
        } 
     }, {
        returnOriginal: false
    })
    .then((result) => {
        console.log(result);
    });
    
    
    // database.close();
});