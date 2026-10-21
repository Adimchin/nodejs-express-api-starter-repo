import express from "express"
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes

const server = app.listen(5001, () => {
  console.log('listening on port 5001')
});