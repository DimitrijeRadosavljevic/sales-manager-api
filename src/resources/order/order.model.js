import mongoose from "mongoose";
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userDetail: {
        name: String,
        lastName: String,
        email: String,
        adress: String,
        phone: String
    },
    cardItem: [
        {
            name: String, 
            code: String,
            staffSalePrice: Number,
            dimensions: {
                x:Number,
                y:Number,
                z:Number 
            },
            quantity: Number
        }
    ],
    amount: Number,
    status: Boolean,
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    ownerId: {
        type: Schema.Types.ObjectId, ref: 'user'
    }
})

orderSchema.plugin(mongoosePaginate);
export const Order = mongoose.Model('order', orderSchema);
