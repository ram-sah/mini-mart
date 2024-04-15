
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './backend/config/db.js';
import authRoutes from './backend/routes/authRoute.js';
import cors from 'cors';
import categoryRoutes from './backend/routes/categoryRoute.js'

//configure env like this. if server.js and .env together in RootDirectory.
dotenv.config();

//database config
connectDb();
const app = express()

//middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes);


//rest API
app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce MERN </h1>");
});

//port
const PORT = process.env.PORT || 8080;
// App listen
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
});
