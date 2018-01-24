const router = require('express').Router()
const passport = require('../../config/auth')
const { Batch } = require('../../models')

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

const getStudents = (req, res, next) => {
  Promise.all(req.batch.students.map(student => User.findById(student.userId)))
    .then((students) => {
      // Combine player data and user's name
      req.students = req.batch.students.map((player) => {
        const { name } = users
          .filter((u) => u._id.toString() === player.userId.toString())[0]

        return {
          userId: player.userId,
          name
        }
      })
      next()
    })
    .catch((error) => next(error))
}

router
  .get('/batches/:id/students', loadBatch, getStudents, (req, res, next) => {
    if (!req.batch || !req.students) { return next() }
    res.json(req.students)
  })

  .post('/batches/:id/students', authenticate, loadBatch, (req, res, next) => {
    if (!req.batch) { return next() }

    // const userId = req.account._id
    //
    // if (req.batch.students.filter((p) => p.userId.toString() === userId.toString()).length > 0) {
    //   const error = Error.new('You already joined this batch!')
    //   error.status = 401
    //   return next(error)
    // }
    //
    // // Add the user to the students

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
