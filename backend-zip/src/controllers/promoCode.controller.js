const promoCodeService = require("../services/promoCode.service.js");

const createPromoCode = async (req, res) => {
    const promoCodeData = req.body;

    try {
        const createdPromoCode = await promoCodeService.createPromoCode(promoCodeData);
        return res.status(201).json(createdPromoCode);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const validatePromoCode = async (req, res) => {
    const { code } = req.params;

    try {
        const promoCode = await promoCodeService.validatePromoCode(code);
        return res.status(200).json(promoCode);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deactivatePromoCode = async (req, res) => {
    const { code } = req.params;

    try {
        const deactivatedPromoCode = await promoCodeService.deactivatePromoCode(code);
        return res.status(200).json(deactivatedPromoCode);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getAllPromoCodes = async (req, res) => {
    try {
        const promoCodes = await promoCodeService.getAllPromoCodes();
        return res.status(200).json(promoCodes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deletePromoCode = async (req, res) => {
    const { code } = req.params;

    try {
        const deletedPromoCode = await promoCodeService.deletePromoCode(code);
        return res.status(200).json(deletedPromoCode);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createPromoCode,
    validatePromoCode,
    deactivatePromoCode,
    getAllPromoCodes,
    deletePromoCode
};
