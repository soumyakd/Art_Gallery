const Product = require('../models/product')
productsController = {}

productsController.list = (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products)
        })
        .catch((err) => {
            res.json(err)
        })
}

productsController.create = (req, res) => {
    console.log(req.msg)
    const body = req.body
    if(req.file) {
        body.image = req.file.filename
    }
    const product = new Product(body)
    product.user = req.user._id
    product.save()
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
}

productsController.show = (req, res) => {
    const id = req.params.id
    console.log(id)
    Product.findOne({ _id:id, user:req.user._id})
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
}

productsController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    console.log(body, id) 
    Product.findByIdAndUpdate({ _id: id, user: req.user._id })
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
}

productsController.destroy = (req, res) => {
    const id = req.params.id
    Product.findByIdAndDelete(id)
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = productsController