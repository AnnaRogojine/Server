
const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    CustumerID: [{ type: String, require: true }],
    ListName: { type: String, require: true },
    items:  [{ProductName: String, ProductCode:String, ProductCompany:String ,Quantity:Number}]
})

module.exports = mongoose.model('House', HouseSchema);