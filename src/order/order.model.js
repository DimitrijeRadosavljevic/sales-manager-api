import mongoose from "mongoose";
var mongoosePaginate = require('mongoose-paginate');
const Schema = new mongoose.Schema;

const orderSchema = new Schema({

})

orderSchema.plugin(mongoosePaginate);
export const Order = mongoose.Model('order', orderSchema);
