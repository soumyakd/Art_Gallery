const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticateUser = (req, res, next) => {
    if(req.header('Authorization')) {
        const token = req.header('Authorization').split(' ')[1]
        let tokenData
        try {
            tokenData = jwt.verify(token, 'dct123')
            User.findById(tokenData._id)
            .then((user) => {
                req.user = user
                console.log(user)
                next()
            })
            .catch((err) => {
                res.json(err)
            })
            
        } catch(e) {
            res.json(e.message)
        }
    } else {
        res.json({
            errors: 'token not provided'
        })
    }
}

module.exports = {
    authenticateUser
}