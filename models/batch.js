const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  day: { type: Date, default: Date.now },
  color: { type: String },
  remark: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  evaluations: [evaluationSchema]
})

const batchSchema = new Schema({
  students: [studentSchema],
  number: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  batchPerformance: {
    green: { type: Number },
    orange: { type: Number },
    red: { type: Number }
  }
});

module.exports = mongoose.model('batches', batchSchema)
