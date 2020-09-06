const User = require('../models/user')
const authorizeUser = function(req, res, next){
   
    const user =  req.user
    if(user.role === 'admin'){
        next()
    }else{
        res.status('401').send('Not an admin')
    }
}

module.exports = { authorizeUser }