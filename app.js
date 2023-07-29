//setting up environment
const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
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
console.log(process.env);
const mongoDBUrl = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})