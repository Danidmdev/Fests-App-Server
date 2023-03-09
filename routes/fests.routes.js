const router = require("express").Router()
const Fest = require('./../models/Fest.model')

const { verifyToken } = require('../middlewares/verifyToken')


router.get("/getAllFests", (req, res, next) => {

  Fest
    .find()
    .sort({ title: 1 })
    // .select({ title: 1, imageUrl: 1, owner: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/details/:fest_id", (req, res, next) => {

  const { fest_id } = req.params

  Fest
    .findById(fest_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/newFest", verifyToken, (req, res, next) => {

  const { title, description, price, genre, imageUrl, startDate, endDate, location } = req.body
  const { _id: owner } = req.payload

  Fest
    .create({ title, description, price, genre, imageUrl, startDate, endDate, location, owner })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put('/edit/:fest_id', (req, res, next) => {
  const { fest_id } = req.params
  let { title, description, price, genre, imageUrl, startDate, endDate } = req.body

  Fest
    .findById(fest_id)
    .then(fest => {
      if (imageUrl === '') { imageUrl = fest.imageUrl }
      Fest
        .findByIdAndUpdate(fest_id, { title, description, price, genre, imageUrl, startDate, endDate })
        .then(response => res.json(response))
    })
    .catch(err => next(err))
})

router.delete('/delete/:fest_id', (req, res, next) => {

  const { fest_id } = req.params

  Fest
    .findByIdAndDelete(fest_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router
