const orderService = require("../services/order.service.js");

const createOrder = async (req, res) => {
  const user = req.user;
  const { shippingAddress, promoCode } = req.body;

  try {
    const createdOrder = await orderService.createOrder(user, shippingAddress, promoCode);
    return res.status(201).send(createdOrder);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const findOrderById = async (req, res) => {
  const user = req.user;

  try {
    let order = await orderService.findOrderById(req.params.id);
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const orderHistory = async (req, res) => {
  const user = req.user;

  try {
    let order = await orderService.usersOrderHistory(user._id);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// New controller for applying promo code to an existing order
const applyPromoCode = async (req, res) => {
  const { orderId } = req.params;
  const { promoCode } = req.body;

  try {
    const updatedOrder = await orderService.applyPromoCodeToOrder(orderId, promoCode);
    return res.status(200).send(updatedOrder);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { createOrder, findOrderById, orderHistory, applyPromoCode };
