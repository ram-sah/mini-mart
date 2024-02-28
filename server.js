import express from 'express';
import dotenv from 'dotenv';
const app = express()

//configure env
dotenv.config();
//rest API
app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce MERN </h1>" );
});

//port
const PORT = process.env.PORT || 8080;
// App listen
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
});
