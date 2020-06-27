const mongoose = require("mongoose");
const express = require("express");
const Accounts = require("./models/account");

const router = express.Router();

mongoose
  .connect("mongodb://localhost:27027/joshua", { useNewUrlParser: true })
  .then(() => {
    console.log("Conectado com Sucesso");
  });

router.get("/", async (request, response) => {
  const lista = await Accounts.find({});

  return response.json(lista);
});
router.patch("/depositar", async (request, response) => {
  const { agencia, conta, valor } = request.body;

  const account = await Accounts.findOne({ agencia: agencia, conta: conta });

  if (!account) {
    return response.status(404).json({ message: "Nenhuma conta encontrada" });
  }

  if (valor < 0) {
    return response.status(404).json({ message: "Valor negativo" });
  }

  const accountUpdated = await Accounts.findOneAndUpdate(
    { agencia: agencia, conta: conta },
    { balance: account.balance + valor },
    { new: true }
  );

  return response.json(accountUpdated);
});
router.patch("/sacar", async (request, response) => {
  const { agencia, conta, valor } = request.body;

  const account = await Accounts.findOne({ agencia: agencia, conta: conta });

  if (!account) {
    return response.status(404).json({ message: "Nenhuma conta encontrada" });
  }

  if (valor < 0) {
    return response.status(404).json({ message: "Valor negativo" });
  }

  if (account.balance - valor - 1 < 0) {
    return response.status(404).json({ message: "Saldo Insuficiente" });
  }

  const accountUpdated = await Accounts.findOneAndUpdate(
    { agencia: agencia, conta: conta },
    { balance: account.balance - valor - 1 },
    { new: true }
  );

  return response.json(accountUpdated);
});
router.get("/consultar", async (request, response) => {
  const { agencia, conta, valor } = request.body;

  const account = await Accounts.findOne({ agencia: agencia, conta: conta });

  if (!account) {
    return response.status(404).json({ message: "Nenhuma conta encontrada" });
  }

  return response.json(account);
});
router.delete("/apagarconta", async (request, response) => {
  const { agencia, conta, valor } = request.body;

  const account = await Accounts.findOne({ agencia: agencia, conta: conta });

  if (!account) {
    return response.status(404).json({ message: "Nenhuma conta encontrada" });
  }

  const accountDeleted = await Accounts.findOneAndDelete({
    agencia: agencia,
    conta: conta,
  });

  const contasAtivas = await Accounts.find({ agencia: agencia });

  if (!contasAtivas) {
    return response.json(0);
  }

  return response.json(contasAtivas.length);
});
router.patch("/transferir", async (request, response) => {
  const { contaOrigem, contaDestino, valor } = request.body;

  const accountOrigem = await Accounts.findOne({ conta: contaOrigem });

  const accountDestino = await Accounts.findOne({ conta: contaDestino });

  if (!accountOrigem) {
    return response
      .status(404)
      .json({ message: "Conta Origem não encontrada" });
  }

  if (!accountDestino) {
    return response
      .status(404)
      .json({ message: "Conta Destino não encontrada" });
  }

  if (accountOrigem.agencia === accountDestino.agencia) {
    if (accountOrigem.balance - valor < 0) {
      return response.status(404).json({ message: "Saldo insuficiente" });
    }

    const accountOrigenUpdated = await Accounts.findOneAndUpdate(
      { conta: contaOrigem },
      { balance: accountOrigem.balance - valor },
      { new: true }
    );

    const accountDestinoUpdated = await Accounts.findOneAndUpdate(
      { conta: contaDestino },
      { balance: accountDestino.balance + valor },
      { new: true }
    );
  } else {
    if (accountOrigem.balance - valor - 8 < 0) {
      return response.status(404).json({ message: "Saldo insuficiente" });
    }

    const accountOrigenUpdated = await Accounts.findOneAndUpdate(
      { conta: contaOrigem },
      { balance: accountOrigem.balance - valor - 8 },
      { new: true }
    );

    const accountDestinoUpdated = await Accounts.findOneAndUpdate(
      { conta: contaDestino },
      { balance: accountDestino.balance + valor },
      { new: true }
    );
  }

  const accountOrigemNewBalance = await Accounts.findOne({
    conta: contaOrigem,
  });

  return response.json(accountOrigemNewBalance);
});
router.get("/consultarmedia", async (request, response) => {
  const { agencia } = request.body;

  const accounts = await Accounts.find({ agencia: agencia });

  if (!accounts) {
    return response.json(0);
  }

  const soma = accounts.reduce((acc, item) => {
    return acc + item.balance;
  }, 0);

  const media = (soma * 1.0) / accounts.length;

  return response.json(media);
});
router.get("/consultarmenorsaldo", async (request, response) => {
  const { clientes } = request.body;

  const accounts = await Accounts.find({});

  if (!accounts) {
    return response.json(0);
  }

  const accountsOrderMenor = accounts.sort((a, b) => {
    return a.balance - b.balance;
  });

  const accountsRetorno = [];

  for (var i = 0; i < clientes; i++) {
    accountsRetorno.push(accountsOrderMenor[i]);
  }

  return response.json(accountsRetorno);
});
router.get("/consultarmaiorsaldo", async (request, response) => {
  const { clientes } = request.body;

  const accounts = await Accounts.find({});

  if (!accounts) {
    return response.json(0);
  }

  const accountsOrderMenor = accounts.sort((a, b) => {
    return b.balance - a.balance;
  });

  const accountsRetorno = [];

  for (var i = 0; i < clientes; i++) {
    accountsRetorno.push(accountsOrderMenor[i]);
  }

  return response.json(
    accountsRetorno.sort((a, b) => {
      return a.balance - b.balance;
    })
  );
});
router.get("/consultarprivate", async (request, response) => {
  const accounts = await Accounts.find({});

  if (!accounts) {
    return response.json(0);
  }

  var maiorValor = new Map();

  for (var i = 0; i < accounts.length; i++) {
    if (!maiorValor.get(accounts[i].agencia)) {
      maiorValor.set(accounts[i].agencia, accounts[i]);
    } else {
      if (maiorValor.get(accounts[i].agencia).balance < accounts[i].balance) {
        maiorValor.set(accounts[i].agencia, accounts[i]);
      }
    }
  }

  for (const acc of maiorValor) {
    await Accounts.findOneAndUpdate(
      { conta: acc[1].conta, agencia: acc[1].agencia },
      { agencia: 99 },
      { new: true }
    );
  }

  const accounts99 = await Accounts.find({ agencia: 99 });

  return response.json(accounts99);
});
module.exports = router;
