const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true 
	},
	user: {
		type : Schema.Types.ObjectId,
        ref : 'User'
	},
	title: {
		type: String,
		required: true
	},
	price: {
        type: Number
	},
	image: {
		type: String
	},
    quantity: {
        type: Number,
        default: 1
	},
	total: {
		type: Number
	},
	status: {
        type : String,
        default :'Cart'
    },
	createdAt: {
        type: Date,
        default: Date.now
    }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart


