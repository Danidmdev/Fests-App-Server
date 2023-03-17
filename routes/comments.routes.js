const router = require('express').Router()
const Comment = require('./../models/Comment.model')
const { verifyToken } = require("../middlewares/verifyToken")
const Fest = require('../models/Fest.model')

router.get("/getCommentByFest/:fest_id", (req, res, next) => {
    const { fest_id } = req.params

    Fest
        .findById(fest_id)
        .populate('owner comments')
        .populate({
            path: 'comments',
            populate: { path: 'owner' }
        })
        .then(response => {
            res.json(response.comments)
        })
        .catch(err => next(err))
})


router.post("/newComment/:fest_id", verifyToken, (req, res, next) => {

    const { text, createdAt } = req.body
    const { _id: owner } = req.payload
    const { fest_id } = req.params

    Comment
        .create({ text, createdAt, owner })
        .then(response => {
            return Fest.findByIdAndUpdate(fest_id, { $addToSet: { comments: response._id } })
        })
        .then((fest) => res.json(fest))
        .catch(err => next(err))
})

router.put('/edit-comment/:comment_id', (req, res, next) => {

    const { comment_id } = req.params
    const { text, createdAt } = req.body

    Comment
        .findByIdAndUpdate(comment_id, { text, createdAt })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete('/delete-comment/:comment_id/:fest_id', verifyToken, (req, res, next) => {

    const { comment_id, fest_id } = req.params
    const { _id: owner } = req.payload

    Comment
        .findByIdAndDelete(comment_id, { owner })
        .then(response => {
            return Fest.findByIdAndUpdate(fest_id, { $pull: { comments: response._id } })
        })
        .then(fest => res.json(fest))
        .catch(err => next(err))
})




module.exports = router