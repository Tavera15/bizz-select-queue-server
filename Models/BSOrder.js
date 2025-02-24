const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    storeNumber: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean
    },
    clientName: {
        type: String,
        required: true
    },
    clientPhone: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    orderNumber: {
        type: String,
    },
    employee: {
        type: String,
    },
    dateEntered: {
        type: String,
        required: true
    },
    dateDue: {
        type: String,
        required: true
    },
    orderDetails: {
        type: String,
        required: true
    },
    orderFiles: [
        {
            type: String
        }
    ]
})

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;