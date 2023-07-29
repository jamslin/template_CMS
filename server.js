if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}
//setting up environment
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

//setting up database connection
const mongoose = require('mongoose')
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const cluster = process.env.DB_CLUSTER
const database = process.env.DB_DATABASE
const mongoDBUrl = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//setting up pages
const indexRouter = require('./routes/index')
app.use('/', indexRouter)
const authorRouter = require('./routes/authors')
app.use('/authors', authorRouter)
const bookRouter = require('./routes/books')
app.use('/books', bookRouter)   
//const dataReader = require('./routes/data')
//app.use('/data', dataRouter)

//setting up host
app.listen(process.env.PORT || 3000)
