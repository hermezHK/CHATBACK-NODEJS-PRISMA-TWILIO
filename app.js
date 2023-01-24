import express from "express";
import cors from "cors";
import router from "./router";
import dotenv from "./dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

router(app);

const port = 6003;

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
