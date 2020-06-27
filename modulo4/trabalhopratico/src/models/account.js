const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var accountSchema = new Schema({
  agencia: { type: Number, required: true }, // String is shorthand for {type: String}
  conta: { type: Number, required: true },
  name: { type: String, required: true },
  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Balance não pode ser negativo");
      }
    },
  },
});

const Accounts = mongoose.model("accounts", accountSchema, "accounts");

module.exports = Accounts;
