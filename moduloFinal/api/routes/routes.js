const express = require('express');
const service = require('../services/transactionService');
const transactionRouter = express.Router();

transactionRouter.get("/datas/", service.findAllDatas);
transactionRouter.get("/porperiodo/", service.findByPeriod);
transactionRouter.delete("/apagarlancamento/:id", service.deleteLancamento);
transactionRouter.post("/add/", service.addLancamento);
transactionRouter.put("/update/:id", service.updateLancamento);

module.exports = transactionRouter;
