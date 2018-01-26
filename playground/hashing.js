const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var tok = jwt.sign(data, '123abc'); //SHA256(JSON.stringify(token.data) + 'someSecret').toString();
console.log(tok);

var dacoded = jwt.verify(tok, '123abc');
console.log(dacoded);

// var message = 'password';
// var hash = SHA256(message).toString();
// console.log('Message: ' + message);
// console.log('Hash: ' + hash);


// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed');
// } else {
//     console.log('Dont trust');
// }