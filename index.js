const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('./config/auth')
const { users, sessions, batches, students } = require('./routes')

const port = process.env.PORT || 3030

const app = express()

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(users)
  .use(sessions)
  .use(batches)
  .use(students)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

.listen(port)
