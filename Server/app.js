const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create

app.post("/insert", (request, response) => {
  const { name, filetype } = request.body;
  console.log(name, filetype);
  const db = dbService.getDbServiceInstance();

  const result = db.insertNewName(name, filetype);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

//read
app.get("/getAll", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.get("/search/:name", (request, response) => {
  const { name } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.searchByName(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});
app.listen(process.env.PORT, () => console.log("app is running"));
