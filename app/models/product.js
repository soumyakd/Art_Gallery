const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'name is required']
	},
	description: {
		type: String,
		required: true,
		minlength: 5
	},
    price: {
        type: Number, 
        required: true,
        minlength: 1
	},
	image: {
		type: String
	},
	user:{
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true
	}
},

 { timestamps: true })

const Product = mongoose.model('Product', productSchema)
module.exports = Product