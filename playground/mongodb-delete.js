// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, database) => {
    if (err) {
        return console.log('Unable to connect to db server');
    }

    console.log('Connected to mongodb server');

    const db = database.db('TodoApp');

    // deleteMany
    db.collection('Users').deleteMany({name: 'Bubu'}).then((result) => {
        console.log(result);
    });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5a6897fbb60a85064443c4d2')
    }).then((result) => {
        console.log(result);
    });
    
    // database.close();
});