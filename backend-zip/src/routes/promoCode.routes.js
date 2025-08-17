const express = require("express");
const promoCodeController = require("../controllers/promoCode.controller.js");

const router = express.Router();

router.post("/create", promoCodeController.createPromoCode);
router.get("/validate/:code", promoCodeController.validatePromoCode);
router.put("/deactivate/:code", promoCodeController.deactivatePromoCode);
router.get("/", promoCodeController.getAllPromoCodes);
router.delete("/delete/:code", promoCodeController.deletePromoCode);

module.exports = router;
