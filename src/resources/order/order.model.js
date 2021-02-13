import mongoose from "mongoose";
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userDetail: {
        name: String,
        lastName: String,
        email: String,
        address: String,
        phone: String
    },
    chartItems: [
        {
            name: String, 
            code: String,
            staffSalePrice: Number,
            dimensions: {
                x:Number,
                y:Number,
                z:Number 
            },
            quantity: Number,
            color: String,
        }
    ],
    amount: Number,
    status: Boolean,
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    ownerId: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

orderSchema.plugin(mongoosePaginate);
export const Order = mongoose.model('order', orderSchema);
