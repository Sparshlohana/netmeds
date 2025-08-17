const PromoCode = require("../models/promoCode.model.js");

async function createPromoCode(promoCodeData) {
    const promoCode = new PromoCode(promoCodeData);
    return await promoCode.save();
}

async function validatePromoCode(code) {
    const promoCode = await PromoCode.findOne({ code, isActive: true });

    if (!promoCode) {
        throw new Error('Invalid or inactive promo code.');
    }

    const currentDate = new Date();
    if (promoCode.expirationDate && promoCode.expirationDate < currentDate) {
        throw new Error('Promo code has expired.');
    }

    return promoCode;
}

async function deactivatePromoCode(code) {
    const promoCode = await PromoCode.findOneAndUpdate(
        { code, isActive: true },
        { isActive: false },
        { new: true }
    );

    if (!promoCode) {
        throw new Error('Promo code not found or already inactive.');
    }

    return promoCode;
}

async function getAllPromoCodes() {
    return await PromoCode.find();
}

async function deletePromoCode(code) {
    const promoCode = await PromoCode.findOneAndDelete({ _id: code });

    if (!promoCode) {
        throw new Error('Promo code not found.');
    }

    return promoCode;
}

module.exports = {
    createPromoCode,
    validatePromoCode,
    deactivatePromoCode,
    getAllPromoCodes,
    deletePromoCode
};
