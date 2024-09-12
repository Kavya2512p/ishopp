const mongoose = require('mongoose');
const { Schema } = mongoose;

// Shipping Address Schema
const shippingAddressSchema = new Schema({
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false });

// User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        default: null
    },
    shippingAddress: {
        type: [shippingAddressSchema],
        default:[],
    },
    status: {
        type: Boolean,
        default: 1,
    },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;