import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(express.json());




app.use(cors());


//app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET, POST, PUT, DELETE'],
//        allowedHeaders: ['Content-Type'],
//    }
//    ));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World');
});

app.use('/books', booksRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to Database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });