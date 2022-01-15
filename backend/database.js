const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/trade', { useNewUrlParser: true }).then(()=>{
        console.log("Database connected successfully")
    }, e => {
        console.error('Connection error', e.message)
    })

const database = mongoose.connection

module.exports = database