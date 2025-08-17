const mongoose = require('mongoose');
const { Schema } = mongoose;

const promoCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    usageLimit: {
        type: Number,
        default: 1,  // Limits how many times a promo code can be used
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PromoCode = mongoose.model('promoCodes', promoCodeSchema);

module.exports = PromoCode;
