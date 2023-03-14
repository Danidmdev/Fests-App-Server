const router = require('express').Router()
const User = require('./../models/User.model')

router.get('/getAllUsers', (req, res, next) => {

    User
        .find({ role: 'USER' })
        .sort({ createdAt: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/profile/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/edit-profile/:user_id', (req, res, next) => {

    const { user_id } = req.params
    let { username, avatar, email } = req.body
    User
        .findById(user_id)
        .then(user => {
            if (avatar === '') { avatar = user.avatar }
            User
                .findByIdAndUpdate(user_id, { username, avatar, email })
                .then(response => res.json(response))
        })
        .catch(err => next(err))
})


router.delete('/delete-profile/:user_id', (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})



module.exports = router

