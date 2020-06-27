const express = require("express");
const router = require("./router");

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log("Conectado na porta 3333");
});
