if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}



const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const config = require("config")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const path = require('path')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const adminRouter = require('./routes/admins')

if (!config.get('myprivatekey')) {
  console.error('Fatal Error: myprivatekey is not defined.')
  process.exit(1)
}


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(cors())
app.use(cookieParser())
 
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())

 const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/index', indexRouter)
app.use('/users', userRouter) 
app.use("/admin", adminRouter)

const port = process.env.PORT || 5000
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build, index.html'))
  })
}
app.listen(port, () => {
  console.log(`Server Started on port ${port}`)
})
