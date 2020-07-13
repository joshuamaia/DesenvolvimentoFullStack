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

  const { period } = req.query;

  const transactions = await TransactionModel.find({ yearMonth: period });
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

module.exports = {
  findAllDatas,
  findByPeriod,
  deleteLancamento
};
