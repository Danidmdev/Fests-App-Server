const router = require("express").Router();
const Fest = require('./../models/Fest.model')


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


router.post("/newFest", (req, res, next) => {

  const { title, description, price, genre, imageUrl, startDate, endDate, location, owner } = req.body

  Fest
    .create({ title, description, price, genre, imageUrl, startDate, endDate, location, owner })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put('/edit/:fest_id', (req, res, next) => {
  const { fest_id } = req.params
  const { title, description, price, genre, imageUrl, startDate, endDate } = req.body

  Fest
    .findByIdAndUpdate(fest_id, { title, description, price, genre, imageUrl, startDate, endDate })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete('/delete/:fest_id', (req, res, next) => {

  const { fest_id } = req.params

  Fest
    .findByIdAndDelete(fest_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router;
