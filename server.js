const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const authenticate = require('./middleware/authMiddleware');
const {loginUser} = require  ('./controllers/userController');
const {sendMail, mailTransporter, readFile} = require  ('./utils'); // send email and file function
const cors = require('cors');


const app = express();



app.get('/file', (req, res) => {
    try{
        const data = readFile('./files/dummy.txt')
        res.status(200).json({data})
    }catch(err){
        res.status(500).json({err})
    }
})



// make port mutable for command line args
let port = process.env.PORT || 5000;

// Adding middleware
// adding an express.json() middleware parser to receive JSON objects
app.use(express.json());

app.use(
    cors({
    	origin: '*',
        methods: "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS"
    })
)

// Import routers for different resources
const beerRoutes = require('./routes/beerRoutes');
const breweriesRoutes = require('./routes/breweriesRoute');
const suppliersRoutes = require('./routes/supplierRoute');
const categoriesRoutes = require('./routes/categoryRoute');
const kegsizeRoutes = require('./routes/kegsizeRoute');
const usersRoutes = require('./routes/userRoutes');
const tapRoutes = require('./routes/tapRoutes');


// Define your login and registration routes (public routes)
app.post('/api/login', loginUser);

// Apply the authenticate middleware to secure routes
//app.use('/api', authenticate);

// API endpoints for beer stock inventory
app.use("/api/beers", beerRoutes);
app.use("/api/tap", tapRoutes);
app.use("/api/breweries", breweriesRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/kegsizes", kegsizeRoutes);
app.use("/api/users", usersRoutes);

// app.use(authenticate)
app.use(errorHandler);
// app.use("/api/beers", beerRoutes);

// [experimental-code] port arg from command line
const args = process.argv.slice(2);

// Process command-line arguments
args.forEach((arg, index) => {
  if (arg === '--port' && args[index + 1]) {
    // Check for --port argument and set the port
    port = parseInt(args[index + 1]);
  }
});

app.listen(port, () => {
    console.log(`Server successfully running on ${port}`);
});


// const express = require('express')
// const dotenv = require('dotenv').config()
// const errorHandler = require('./middleware/errorHandler')
// const authenticate = require('./middleware/authMiddleware')

// const loginController = require('./controllers/userController')
// const cors = require('cors')

// const app = express()

// const port = process.env.PORT || 5000

// // Adding middleware
// // adding an express.json() mddleware parser to receieve json objects
// app.use(express.json())
// //Using cors to allow api request from front end
// app.use(cors())

// // Import routers for different resources
// const beerRoutes = require('./routes/beerRoutes');
// const breweriesRoutes = require('./routes/breweriesRoute');
// const suppliersRoutes = require('./routes/supplierRoute');
// const categoriesRoutes = require('./routes/categoryRoute')
// const kegsizeRoutes = require('./routes/kegsizeRoute')
// const usersRoutes = require('./routes/userRoutes')
// const tapRoutes = require('./routes/tapRoutes');

// // Define your login and registration routes (public routes)
// app.post('/api/login', loginController.loginUser);

// // API endpoints for beer stock invenntory
// //app.use("/", usersRoutes)
// app.use("/api/beers", beerRoutes)
// app.use("/api/tap", tapRoutes)
// app.use("/api/breweries", breweriesRoutes)
// app.use("/api/suppliers",  suppliersRoutes)
// app.use("/api/categories", categoriesRoutes)
// app.use("/api/kegsizes", kegsizeRoutes)
// app.use("/api/users", usersRoutes)
// // app.post('/api/register', loginController.registerUser);


// //app.use("/api/users", require('./routes/userRoutes'))
// app.use(errorHandler)

// app.listen(port, () => {
//     console.log(`Server sucessfully running on ${port}`)
// })


