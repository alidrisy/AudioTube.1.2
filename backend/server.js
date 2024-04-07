import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

const port = process.env.PORT || 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
