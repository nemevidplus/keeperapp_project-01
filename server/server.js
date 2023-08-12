import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import noteRoute from "./routes/noteRoute.js";

dotenv.config();
const app = express();

// Middleware for parsing request body of json data
app.use(express.json());

/* Cross Origin Resource Sharing */
// Option 1: Allow all origin with default of cors(*)
app.use(cors("*"));
// Option 2: Allow custom origins
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// })
// );

const port = process.env.PORT;

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to MEAN project!");
});

// noteRoute is a set of routes and middlewares defined in noteRoute.js
// This line of code says baseURL of noteRoute is "/notes"
// so each URL in noteRoute starts with "/notes"
// we simplify code by separating routes in another file
app.use("/notes", noteRoute);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("App connected to database");
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
