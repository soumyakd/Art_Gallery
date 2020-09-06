const Cart = require('../models/cart')
cartController = {}

cartController.create = (req, res) => {
    const body = req.body
    const cart = new Cart(body)
    cart.user = req.user._id
    cart.save()
    .then((cart) => {
        res.json(cart)
    })
    .catch((err) => {
        res.json(err)
    })
}

cartController.list = (req, res) => {
    Cart.find({ user: req.user._id})
    .then((cart) => {
        res.json(cart)
    })
    .catch((err) => {
        res.json(err)
    })
}

cartController.update = (req, res) =>{
    const body = req.body
    let formData
    if(body.cartQuantity === 1){
        formData = { $inc: { quantity: 1} }
    } else {
        formData = { $inc: { quantity: -1} }
    }
     
    Cart.findById({ _id: body.cartid, user: req.user._id})
    .then((cart) =>{   
         if((body.currentQuantity > 1 && body.cartQuantity  === -1) || body.cartQuantity  === 1) {     
            Cart.findOneAndUpdate({_id: body.cartid, user: req.user._id, status: 'Cart'}, formData, { new: true, runValidators: true })
                .then((cart) =>{    
                    res.json(cart)
                })
                .catch((err) =>{
                    console.log(err)
                    res.json(err)
                })        
        } else { 
            console.log('No Less')
            res.json ({message : 'Quantity cannot be less than 1'})
        }
    }) 
}


cartController.destroy = (req, res) =>{
    const id = req.params.id   
    Cart.findByIdAndDelete({ _id: id , user: req.user._id, status: 'Cart'})
    .then((cart) =>{
        res.json(cart)
    })
    .catch((err) =>{
        res.json(err)
    })
}

module.exports = cartController

