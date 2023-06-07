import express from "express";
import cors from "cors";
import { handleError, unknowEndpoint } from "./common/middlewares";
import { AppRouter } from "./modules";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", AppRouter);

app.use(unknowEndpoint);
app.use(handleError);

app.listen(port, () => console.log("listening to port", port));
