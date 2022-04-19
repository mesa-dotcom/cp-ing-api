import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as _ping from "ping";
import cors from "cors";
import * as bodyParser from "body-parser";
import * as _fs from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send(JSON.stringify({ message: "Hello World" }));
});

app.get("/setting", (req: Request, res: Response) => {
  _fs.readFile("./db/setting.json", (err, json) => {
    if (err) {
      res.send(JSON.stringify({ message: "Error" }));
    } else {
      res.send(JSON.stringify(JSON.parse(json.toString())));
    }
  });
});

// app.post("/group-ping", async (req: Request, res: Response) => {
//   const responses: any[] = []
//   const { ips } = req.body;
//   for(const [index, ip] of ips.entries()) {
//     const result = await _ping.promise.probe(ip);
//     responses.push(result)
//   }
//   res.send(JSON.stringify(responses));
// })

app.post("/ping", (req: Request, res: Response) => {
  const { ip } = req.body;
  _ping.promise
    .probe(ip)
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      res.send(JSON.stringify(err));
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
