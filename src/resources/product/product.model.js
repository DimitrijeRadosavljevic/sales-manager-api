import mongoose from "mongoose";
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    color: {
        type: String
    },

    dimensions: {
        x: Number,
        y: Number,
        z: Number 
    },

    staffSalePrice: {
        type: Number,
        required: true
    },

    staffSaleType: String,

    quantity: Number,

    homeDelivery: Boolean,

    imagePath: String
});
productSchema.plugin(mongoosePaginate);
export const Product = mongoose.model('product', productSchema);