const express = require('express')
const app = express()
const port = process.env.PORT || 5000;  //localhost:5000 port a run hobe
const mongoose = require('mongoose');    //mongoose import
require('dotenv').config()

async function main() {
  await mongoose.connect(process.env.DB_URL);  //mongodb database connection url .env file
}
main().then(()=> console.log("Mongodb connected successfully")).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('lebabae-commerce!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

