const router = require('express').Router()
const passport = require('../config/auth')
const { Batch } = require('../models')


const authenticate = passport.authorize('jwt', { session: false })

router
  .get('/batches', (req, res, next) => {
    Batch.find()
      .sort({ createdAt: -1 })
      .then((batches) => res.json(batches))
      .catch((error) => next(error))
  })
  .get('/batches/:id', (req, res, next) => {
    const id = req.params.id
    console.log(req.body)

    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .post('/batches', authenticate, (req, res, next) => {
    const newBatch = {
      number: req.body.number,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      students: [],
      batchPerformance: {}
    }

    Batch.create(newBatch)
      .then((batch) => {
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .put('/batches/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const updatedBatch = req.body

    Game.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
      .then((batch) => {
        res.json(batch)
      })
      .catch((error) => next(error))
  })
  .patch('/batches/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const patchForBatch = req.body

    Batch.findById(id)
      .then((batch) => {
        if (!batch) { return next() }

        const updatedBatch = { ...batch, ...patchForBatch }

        Batch.findByIdAndUpdate(id, { $set: updatedBatch }, { new: true })
          .then((batch) => {
            res.json(batch)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })
  .delete('/batches/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    Batch.findByIdAndRemove(id)
      .then(() => {
        res.status = 200
        res.json({
          message: 'Removed',
          _id: id
        })
      })
      .catch((error) => next(error))
  })

module.exports = router
