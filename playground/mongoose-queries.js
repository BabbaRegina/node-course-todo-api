const { mongoose } = require('./../server/db/mongoose');
const { ObjectID } = require('mongodb');
const { Todo } = require('./../server/models/todo');

const { User } = require('./../server/models/user');


var userId = '5a6999a89fb1a72bf8a26788';
User.findById(userId).then((user) => {
    if(!user) return console.log('utente non trovato');
    console.log('Mail utente', user.email);
}).catch((err) => console.log(err));


// var id = '5a69acdbf008753c38be7f94kk';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid!');
// } else {

//     Todo.find({
//         _id: id
//     }).then((todos) => {
//         console.log('Todos', todos);
//     });

//     Todo.findOne({
//         completed: false
//     }).then((todo) => {
//         console.log('Todo', todo);
//     });

//     Todo.findById(id).then((todo) => {
//         if (!todo) {
//             return console.log('ID not found');
//         }
//         console.log('Todo by id', todo);
//     }).catch((err) => console.log(err));

// }