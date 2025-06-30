const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3001
const cors = require('cors')

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/turin_rent')
}
main().catch(err => console.log(err));

const productRoute = require('./routes/productRoute')
const accountRoute = require('./routes/accountRoute')
const adminRoute = require('./routes/adminRoute')
const bankRoute = require('./routes/bankRoute')

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use('/', productRoute)
app.use('/', accountRoute)
app.use('/', adminRoute)
app.use('/', bankRoute)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
