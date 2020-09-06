const express = require('express')
const router = express.Router()

const usersController = require('../app/controllers/usersController')
const productsController = require('../app/controllers/productsController')
const cartController = require('../app/controllers/cartController')

const upload = require('../app/middlewares/upload')

const { authenticateUser } = require('../app/middlewares/authentication')

// User
router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account', authenticateUser, usersController.account)

// Product
router.get('/products', productsController.list)
router.post('/products' ,authenticateUser,upload.single('image'),  productsController.create)
router.get('/products/:id', authenticateUser, productsController.show)
router.put('/products/:id', productsController.update)
router.delete('/products/:id', productsController.destroy)

// Cart
router.get('/cart', authenticateUser, cartController.list)
router.post('/cart', authenticateUser,cartController.create)
router.put('/cart/update', authenticateUser,cartController.update)
router.delete('/cart/:id', authenticateUser, cartController.destroy)

module.exports = router