const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator:'v1:us1:1a644bd4-a40e-48e4-acb6-93800217106c',
  key: '5ad949bc-4c33-4989-a588-b1136f4aa78b:OiTMVBSaSw+sIxKIkXvhBqHVV71iMBCg4+dSc+mkpbE=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body

  chatkit
  .createUser({
    name: username,
    id: username
  })
  .then(() => res.sendStatus(201))
  .catch(error => {
    if(error.error_type === 'services/chatkit/user_already_exists'){
      res.sendStatus(200)
    }else{
      res.status(error.statusCode).json(error)
    }
  })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
