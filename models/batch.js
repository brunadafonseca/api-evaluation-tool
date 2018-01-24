const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  day: { type: Date, default: Date.now },
  color: { type: String },
  remark: { type: String }
})

const studentSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  batchId: { type: Schema.Types.ObjectId, ref: 'batchSchema'},
  evaluations: [evaluationSchema]
})

const batchSchema = new Schema({
  students: [studentSchema],
  number: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  batchPerformance: {
    green: [],
    yellow: [],
    red: []
  }
});

module.exports = mongoose.model('batches', batchSchema)
