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

  .get('/batches/:id/students/:student_id', loadBatch, (req, res, next) => {
    if (!req.batch) { return next() }
    const student = req.batch.students.filter(student => {
      return student._id.toString() === req.params.student_id
    })
    res.json(student)
  })

  .post('/batches/:id/students', authenticate, loadBatch, (req, res, next) => {
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

    .patch('/batches/:id/students/:student_id', loadBatch, (req, res, next) => {
      if (!req.batch) { return next() }
      const student = req.batch.students = req.batch.students.filter(student => {
        return student._id.toString() === req.params.student_id
      })
      const updatedStudent = req.body

      student = [{ ...student }].concat(updatedStudent)
      student.save()
        .then((student) => {
          req.student = student
          next()
        })
        .catch((error) => next(error))
    },
    (req, res, next) => {
      res.json(req.student)
    })
  // .delete('/batches/:id/students', authenticate, (req, res, next) => {
  //   if (!req.batch) { return next() }
  //
  //   const userId = req.account._id
  //   const currentPlayer = req.batch.students.filter((p) => p.userId.toString() === userId.toString())[0]
  //
  //   if (!currentPlayer) {
  //     const error = Error.new('You are not a player of this batch!')
  //     error.status = 401
  //     return next(error)
  //   }
  //
  //   req.batch.students = req.batch.students.filter((p) => p.userId.toString() !== userId.toString())
  //   req.batch.save()
  //     .then((batch) => {
  //       req.batch = batch
  //       next()
  //     })
  //     .catch((error) => next(error))
  //
  // },
  // // Fetch new player data
  // getPlayers,
  // // Respond with new player data in JSON and over socket
  // (req, res, next) => {
  //   io.emit('action', {
  //     type: 'GAME_PLAYERS_UPDATED',
  //     payload: {
  //       batch: req.batch,
  //       students: req.students
  //     }
  //   })
  //   res.json(req.students)
  // })

  module.exports = router
