const mongoose = require('mongoose')

const configureDB = () => {
        mongoose.connect('mongodb://localhost:27017/art-server-jan', {   
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useFindAndModify: false
        })
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log(err)
        })
}   
module.exports = configureDB
