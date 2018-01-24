// const router = require('express').Router()
// const passport = require('../config/auth')
// const { Student } = require('../models')
//
// const authenticate = passport.authorize('jwt', { session: false })
// router
//   .post('/students', authenticate, (req, res, next) => {
//     console.log('shit')
//     const newStudent = {
//       name: req.body.name,
//       photo: req.body.photo,
//       batchId: req.body.batchId
//   }
//
//     Student.create(newStudent)
//       .then((student) => {
//         res.json(student)
//       })
//       .catch((error) => next(error))
//   })
//
// module.exports = router
