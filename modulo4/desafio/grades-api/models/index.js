import mongoose from "mongoose";

var Schema = mongoose.Schema;

var gradeSchema = new Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  subject: { type: String, required: true },
  type: { type: String, required: true },
  value: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Valor não pode ser negativo");
      }
    },
  },
});

const Grades = mongoose.model("grades", gradeSchema, "grades");

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db, Grades };
