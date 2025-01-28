const express = require('express')
const app = express()
const port = process.env.PORT || 5000;  //localhost:5000 port a run hobe
const mongoose = require('mongoose');    //mongoose import
const cors = require('cors')
require('dotenv').config()

//middleware
app.use(express.json()) //express ta ke json a convert korte hobe . ta na korle backend a data pabo na
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true    //keno aejinish ta korbo, jokhon amra authentication releted kaj korbo amra frontend theke login korbo registration korbo tokhon amader  tokhon define korte hobe credentials:true karon, 
}))
//routes
const userRoutes = require("./src/users/user.route")
const productsRouts = require("./src/products/product.route")

app.use('/api/auth',userRoutes)
app.use('/api/products',productsRouts)
async function main() {
  await mongoose.connect(process.env.DB_URL);  //mongodb database connection url .env file

  app.get('/', (req, res) => {
    res.send('lebabae-commerce Server is running!')
  })
  
}
main().then(()=> console.log("Mongodb connected successfully")).catch(err => console.log(err));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

