require('dotenv').config();

module.exports = {
    server: {
        PORT: process.env.PORT || 4000
    },
    mongoDB: {
        database: process.env.MONGODB_DATABASE,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    },

};