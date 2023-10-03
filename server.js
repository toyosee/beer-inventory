const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const authenticate = require('./middleware/authMiddleware')

//const loginController = require('./controllers/userController')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000

// Adding middleware
// adding an express.json() mddleware parser to receieve json objects
app.use(express.json())
//Using cors to allow api request from front end
app.use(cors())

// Import routers for different resources
const beerRoutes = require('./routes/beerRoutes');
const breweriesRoutes = require('./routes/breweriesRoute');
const suppliersRoutes = require('./routes/supplierRoute');
const categoriesRoutes = require('./routes/categoryRoute')
const kegsizeRoutes = require('./routes/kegsizeRoute')
const usersRoutes = require('./routes/userRoutes')
const tapRoutes = require('./routes/tapRoutes');

// API endpoints for beer stock invenntory
app.use("/api/beers", beerRoutes)
app.use("/api/tap", tapRoutes)
app.use("/api/breweries", breweriesRoutes)
app.use("/api/suppliers",  suppliersRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/kegsizes", kegsizeRoutes)
app.use("/api/users", usersRoutes)

// Define your login and registration routes (public routes)
// app.post('/api/login', loginController.loginUser);
// app.post('/api/register', loginController.registerUser);
//app.use("/api/users", require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server sucessfully running on ${port}`)
})