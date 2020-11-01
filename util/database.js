const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://tommybab_node:i3USmkwJ0b8clDGJ@cluster0.edvp1.mongodb.net/test?retryWrites=true&w=majority')
                .then(client => {
                    callback(client);
                    console.log('Connected');
                })
                .catch(err => console.log(err));

}

module.exports = mongoConnect;