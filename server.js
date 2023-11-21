const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const authenticate = require('./middleware/authMiddleware');
const {loginUser} = require  ('./controllers/userController');
const {sendMail, mailTransporter, readFile, makePDF} = require  ('./utils'); // send email and file function
const cors = require('cors');

// Import routers for different resources
const beerRoutes = require('./routes/beerRoutes');
const breweriesRoutes = require('./routes/breweriesRoute');
const suppliersRoutes = require('./routes/supplierRoute');
const categoriesRoutes = require('./routes/categoryRoute');
const kegsizeRoutes = require('./routes/kegsizeRoute');
const usersRoutes = require('./routes/userRoutes');
const tapRoutes = require('./routes/tapRoutes');


const app = express();

// make port mutable for command line args
let port = process.env.PORT || 5000;

// [experimental-code] port arg from command line
const args = process.argv.slice(2);

// Process command-line arguments
args.forEach((arg, index) => {
  if (arg === '--port' && args[index + 1]) {
    // Check for --port argument and set the port
    port = parseInt(args[index + 1]);
  }
});

// Adding middleware
// adding an express.json() middleware parser to receive JSON objects
app.use(express.json());
app.use(errorHandler);
app.use(
    cors({
    	origin: '*',
        methods: "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS"
    })
)
// Apply the authenticate middleware to secure routes
//app.use('/api', authenticate);

/** Routes */
app.post('/api/login', loginUser);
app.use("/api/beers", beerRoutes);
app.use("/api/tap", tapRoutes);
app.use("/api/breweries", breweriesRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/kegsizes", kegsizeRoutes);
app.use("/api/users", usersRoutes);


app.listen(port, () => {
    console.log(`Server successfully running on ${port}`);
});

