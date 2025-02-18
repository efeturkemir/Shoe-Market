const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const loginRouter = require('./routes/loginRouter')
const registerRouter = require('./routes/registerRouter')
const products = require('./routes/products');
const corsOrigin ={
  origin: ['https://shoe-market-25f4a.web.app', 'http://localhost:5173'], //or whatever port your frontend is using
  credentials: true,            
  optionSuccessStatus:200
}
dotenv.config()
const app = express();
app.use(cors(corsOrigin))
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/products', products )


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT
app.listen(port, () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(console.log("Connected to database"))
    .catch(err => console.log(err))
    console.log("Port is listening", port);
})

