import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/ProductRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

//configure env like this. if server.js and .env together in RootDirectory.
dotenv.config();

//database config
connectDb();

//ES module fix for production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// // rest API for local computer
// app.get('/', (req, res) => {
//     res.send("<h1>Welcome to ecommerce MERN </h1>");
// });

// Rest API - Handle React routing, return all requests to React app
//Render client for any path
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = process.env.PORT || 8080;
// App listen
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
});
