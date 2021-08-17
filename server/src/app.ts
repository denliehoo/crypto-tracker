import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import transactionRoutes from "./routes";
import bodyParser from "body-parser";

// note that if we make any changes to the server, firstly exit the server (crtl +C),
// then, npm start again and then it will automatically update the dist folder
const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(bodyParser());
app.use(cors());
app.use(transactionRoutes);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vvwvw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
