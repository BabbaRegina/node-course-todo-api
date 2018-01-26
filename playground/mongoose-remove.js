const { mongoose } = require('./../server/db/mongoose');
const { ObjectID } = require('mongodb');
const { Todo } = require('./../server/models/todo');

const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(JSON.stringify(result, undefined, 2)); //non ritorna l'oggetto
// });

Todo.findOneAndRemove({_id: '5a69fff7e2a60247d8a438a1'}).then((todo) => {
    console.log(JSON.stringify(todo, undefined, 2));
});

Todo.findByIdAndRemove('5a69fff7e2a60247d8a438a1').then((todo) => {
    console.log(JSON.stringify(todo, undefined, 2));
});