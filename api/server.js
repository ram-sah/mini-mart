import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoute.js'

//configure env
dotenv.config();
//database config
connectDb();
const app = express()

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes)

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
