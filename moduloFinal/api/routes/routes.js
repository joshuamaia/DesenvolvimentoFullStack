const express = require('express');
const service = require('../services/transactionService');
const transactionRouter = express.Router();

transactionRouter.get("/datas/", service.findAllDatas);
transactionRouter.get("/porperiodo/", service.findByPeriod);

module.exports = transactionRouter;
