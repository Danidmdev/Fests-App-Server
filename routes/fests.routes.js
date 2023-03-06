const router = require("express").Router();
const Fest = require('./../models/Fest.model')



router.get("/getAllFests", (req, res, next) => {

  Coaster
    .find()
    .sort({ title: 1 })
    .select({ title: 1, imageUrl: 1, owner: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/:fest_id", (req, res, next) => {

  const { fest_id } = req.params

  Coaster
    .findById(fest_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/newFest", (req, res, next) => {

  const { title, description, price, genre, imageUrl, startDate, endDate, location, owner } = req.body

  Coaster
    .create({ title, description, price, genre, imageUrl, startDate, endDate, location, owner })
    .then(response => res.json(response))
    .catch(err => next(err))
})




module.exports = router;
