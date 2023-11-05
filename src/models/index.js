const mongoose = require('mongoose');
const { mongoDB } = require('../../config');

mongoose.connect(
    `mongodb+srv://${mongoDB.username}:${mongoDB.password}@${mongoDB.database}.qkjilxe.mongodb.net/?retryWrites=true&w=majority`).then(res => {
        console.log('mongodb connected')
    })
    .catch(error => {
        console.log('Cannot Connect To Mongo Database!', error);
    });

const TasksModel = require('./Tasks');

module.exports = {
    TasksModel
}