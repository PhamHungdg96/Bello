import express from "express";
import Logger from "./utils/logger"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import * as http from 'http';
import ws from './ws'
import { AuthRoute } from "./routes/auth.route";
import { UserRoute } from "./routes/user.route";
import dbInit from "./db/init";

dotenv.config()
const log = Logger("APP")


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../public")));

const port = process.env.PORT || 3000 ;
const server = http.createServer(app);
server.listen(port, () => {
  log.info(`Server started on port ${port}`);
});
ws(server);

app.use("/api", AuthRoute.router)
app.use("/api/user", UserRoute.router)

dbInit()