const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAllDatas = async (req, res) => {

  const datas = await TransactionModel.collection.distinct('yearMonth');

  try {
    res.send(datas);
    console.log(`GET /datas`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos as datas" });
    console.log(`GET /datas - ${JSON.stringify(error.message)}`);
  }
};

const findByPeriod = async (req, res) => {

  const { period, filtro } = req.query;

  var condition = filtro
    ? { description: { $regex: new RegExp(filtro), $options: "i" }, yearMonth: period }
    : { yearMonth: period };

  const transactions = await TransactionModel.find(condition);
  try {
    res.send(transactions);
    console.log(`GET /porperiodo`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos as datas" });
    console.log(`GET /porperiodo - ${JSON.stringify(error.message)}`);
  }
};

const deleteLancamento = async (req, res) => {

  const { id } = req.params;

  const transaction = await TransactionModel.findOneAndRemove({ _id: id });
  try {
    res.send(transaction);
    console.log(`DELETE /apagarlancamento`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos as datas" });
    console.log(`DELETE /apagarlancamento - ${JSON.stringify(error.message)}`);
  }
};

const addLancamento = async (req, res) => {

  var transaction = {
    description: req.body.description,
    value: req.body.value,
    category: req.body.category,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    yearMonth: req.body.yearMonth,
    type: req.body.type
  };
  var data = new TransactionModel(transaction);
  const retorno = await data.save();
  try {
    res.send(retorno);
    console.log(`POST /add`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos as datas" });
    console.log(`POST /add - ${JSON.stringify(error.message)}`);
  }
};

const updateLancamento = async (req, res) => {

  const { id } = req.params;

  const transacitionUpdated = await TransactionModel.findOneAndUpdate({ _id: id }, req.body, { new: true });

  try {
    res.send(transacitionUpdated);
    console.log(`PUT /update`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos as datas" });
    console.log(`PUT /update - ${JSON.stringify(error.message)}`);
  }
};

module.exports = {
  findAllDatas,
  findByPeriod,
  deleteLancamento,
  addLancamento,
  updateLancamento
};
