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
    const students = req.batch.students
    students.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) { return -1 }
        if (nameA > nameB) { return 1 }
      })
    res.json(students)
  })

  .get('/batches/:id/students/:student_id', loadBatch, (req, res, next) => {
    if (!req.batch) { return next() }
    const student = req.batch.students.filter(student => {
      return student._id.toString() === req.params.student_id
    })[0]
    res.json(student)
  })

  .post('/batches/:id/students', authenticate, loadBatch, (req, res, next) => {
    if (!req.batch) { return next() }

    const newStudent = req.body
    const students = req.batch.students.push(newStudent)

    req.batch.save()
      .then((batch) => {
        req.batch = batch
        next()
      })
      .catch((error) => next(error))
    },
    (req, res, next) => {
      res.json(req.batch)
    })

    .patch('/batches/:id/students/:student_id', loadBatch, authenticate, (req, res, next) => {
      if (!req.batch) { return next() }
      const students = req.batch.students
      const student = students.filter(student => {
        return student._id.toString() === req.params.student_id
      })[0]

      student.evaluations.push(req.body)

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
