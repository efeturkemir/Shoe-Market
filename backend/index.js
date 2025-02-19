const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const products = require('./routes/products');

// CORS configuration
const corsOrigin = {
  origin: ['https://shoe-market-25f4a.web.app', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200 // Corrected the typo here
};

dotenv.config();
const app = express();

// Apply middleware in correct order
app.use(cors(corsOrigin)); // CORS first
app.use(express.json());    // Body parsing next
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/products', products);

app.get('/status', (req, res) => {
  res.status(200).send('OK');
});

const port = process.env.PORT;
app.listen(port, () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));
  console.log("Server listening on port", port);
});