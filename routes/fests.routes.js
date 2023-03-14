const router = require("express").Router()
const Fest = require('./../models/Fest.model')


const { verifyToken } = require('../middlewares/verifyToken')


router.get("/getAllFests", (req, res, next) => {

  Fest
    .find()
    .sort({ title: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/details/:fest_id", (req, res, next) => {

  const { fest_id } = req.params

  Fest
    .findById(fest_id)
    .populate('owner fans')
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get("/getFestByOwner/:owner", (req, res, next) => {

  const { owner } = req.params

  Fest
    .find({ owner })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get("/getFestJoinedById/:fans_id", (req, res, next) => {

  const { fans_id } = req.params

  Fest
    .find({ fans: { $in: [fans_id] } })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post("/newFest", verifyToken, (req, res, next) => {

  const { title, description, price, genre, imageUrl, startDate, endDate, location, video, website } = req.body
  const { _id: owner } = req.payload

  Fest
    .create({ title, description, price, genre, imageUrl, startDate, endDate, location, owner, video, website })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put('/edit/:fest_id', (req, res, next) => {
  const { fest_id } = req.params
  let { title, description, price, genre, imageUrl, startDate, endDate, video, website } = req.body

  Fest
    .findById(fest_id)
    .then(fest => {
      if (imageUrl === '') { imageUrl = fest.imageUrl }
      Fest
        .findByIdAndUpdate(fest_id, { title, description, price, genre, imageUrl, startDate, endDate, video, website })
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


router.put('/join/:fest_id', verifyToken, (req, res, next) => {

  const { fest_id } = req.params
  const { _id: fan } = req.payload

  Fest
    .findByIdAndUpdate(fest_id, { $addToSet: { fans: fan } }, { new: true })
    .then(response => res.json(response))
    .catch(err => next(err))

})

router.put('/leave/:fest_id', verifyToken, (req, res, next) => {

  const { fest_id } = req.params
  const { _id: fan } = req.payload

  Fest
    .findByIdAndUpdate(fest_id, { $pull: { fans: fan } }, { new: true })
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router


