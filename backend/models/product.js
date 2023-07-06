const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    brandName:{
        type: String,
        required: true
        
    },
    gender:{
        
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    comments: [commentSchema]

})
const Product = mongoose.model('product', productSchema)

module.exports = Product
