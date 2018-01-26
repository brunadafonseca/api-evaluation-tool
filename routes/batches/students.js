const router = require('express').Router()
const passport = require('../../config/auth')
const { Batch, Student } = require('../../models')

const authenticate = passport.authorize('jwt', { session: false })

const loadBatch = (req, res, next) => {
  const id = req.params.id

  Batch.findById(id)
    .then((batch) => {
      req.batch = batch
      next()
    })
    .catch((error) => next(error))
}

router
  .get('/batches/:id/students', loadBatch, (req, res, next) => {
    if (!req.batch) { return next() }
    res.json(req.batch.students)
  })

  .get('/batches/:id/students/:studentId', loadBatch, (req, res, next) => {
    if (!req.batch) { return next() }
    const student = req.batch.students.filter(student => {
      return student._id.toString() === req.params.studentId
    })[0]

    res.json(student)
  })

  .patch('/batches/:id/students', authenticate, loadBatch, (req, res, next) => {
    if (!req.batch) { return next() }

    const newStudent = req.body
    req.batch.students.push({ newStudent })

    req.batch.save()
      .then((batch) => {
        req.batch = batch
        next()
      })
      .catch((error) => next(error))
    },
    (req, res, next) => {
      res.json(req.students)
    })

    .patch('/batches/:id/students/:studentId', loadBatch, authenticate, (req, res, next) => {
      let student = req.batch.students.filter((student) => student._id.toString() === req.params.studentId)[0]

      student.evaluations = student.evaluations.push(req.body)
      console.log(student.evaluations)

      req.batch.save()
        .then((batch) => {
          req.batch = batch
        })
        res.json(req.batch)
    })
    .delete('/batches/:id/students/:studentId', authenticate, (req, res, next) => {
      if (!req.batch) { return next() }

      req.batch.students = req.batch.students.filter((student) => student._id.toString() !== req.params.studentId)
      req.batch.save()
        .then((batch) => {
          req.batch = batch
          next()
        })
        .catch((error) => next(error))
      },
      (req, res, next) => {
        res.json(req.students)
      })

  module.exports = router
