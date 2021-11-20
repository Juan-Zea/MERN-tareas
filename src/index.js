const express = require ('express')
const morgan = require('morgan')
const path = require('path')
const app = express();
const{mongoose}=require('./database')
//Settings 
// inico de puerto
app.set('port',process.env.PORT||5002);
//Middlewares

app.use(morgan('dev'))
app.use(express.json())
//Routes
app.use('/api/crud',require('./routes/crud.routes'))
//Static files
// console.log(path.join(__dirname,'public'))
app.use(express.static(path.join(__dirname,'public')))
//Starting server
app.listen(app.get('port'),()=>{
    console.log(`erver on port ${app.get('port')}`)
})


