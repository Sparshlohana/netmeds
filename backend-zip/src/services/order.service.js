const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const cartService = require("../services/cart.service.js");
const promoCodeService = require("../services/promoCode.service.js");

async function createOrder(user, shippAddress, promoCode) {
  console.log("user ", user, shippAddress, promoCode);

  let address;

  if (shippAddress._id) {
    address = await Address.findById(shippAddress._id);
  } else {
    address = new Address(shippAddress);
    address.user = user;
    await address.save();

    user.addresses.push(address);
    await user.save();
  }

  // Get the user's cart
  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  let discountAmount = cart.discounte || 0;
  let promoCodeData = null;

  // Apply promo code if provided
  if (promoCode) {
    promoCodeData = await promoCodeService.validatePromoCode(promoCode);

    // Calculate discount
    if (promoCodeData.discountType === 'percentage') {
      discountAmount += (promoCodeData.discountValue / 100) * cart.totalPrice;
    } else if (promoCodeData.discountType === 'fixed') {
      discountAmount += promoCodeData.discountValue;
    }
  }

  const totalDiscountedPrice = cart.totalPrice - discountAmount;

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice,
    discount: discountAmount,
    promoCode: promoCodeData?._id,
    totalItem: cart.totalItem,
    shippingAddress: address,
    orderDate: new Date(),
    orderStatus: "PENDING",
    paymentDetails: {
      status: "PENDING",
    },
    createdAt: new Date(),
  });

  const savedOrder = await createdOrder.save();

  // Deactivate promo code if it's single-use or has a usage limit
  if (promoCodeData && promoCodeData.usageLimit === 1) {
    await promoCodeService.deactivatePromoCode(promoCode);
  }

  return savedOrder;
}

async function placedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";
  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";
  return await order.save();
}

async function deliveredOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED"; // Assuming OrderStatus is a string enum or a valid string value
  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress")
    .populate("promoCode")

  return order;
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: "PLACED",
    })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      .sort({ createdAt: -1 })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
      },
    })
    .sort({ createdAt: -1 })
    .lean();
}


async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) throw new Error("order not found with id ", orderId)

  await Order.findByIdAndDelete(orderId);
}

async function applyPromoCodeToOrder(orderId, promoCode) {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  const promoCodeData = await promoCodeService.validatePromoCode(promoCode);
  if (!promoCodeData) {
    throw new Error("Invalid or expired promo code");
  }

  // Check if a promo code is already applied
  if (order.promoCode) {
    if (order.promoCode === promoCodeData._id) {
      throw new Error("Promo code already applied");
    } else {
      let oldDiscount = order.discount || 0;

      order.totalDiscountedPrice += oldDiscount;
      order.discount = 0;
    }
  }

  // Apply the new promo code
  let discountAmount = order.discount || 0;
  if (promoCodeData.discountType === 'percentage') {
    discountAmount += (promoCodeData.discountValue / 100) * order.totalPrice;
  } else if (promoCodeData.discountType === 'fixed') {
    discountAmount += promoCodeData.discountValue;
  }

  const totalDiscountedPrice = order.totalPrice - discountAmount;
  order.discount = discountAmount;
  order.totalDiscountedPrice = totalDiscountedPrice;
  order.promoCode = promoCodeData._id;

  await order.save();

  // Deactivate the promo code if its usage is limited to 1
  if (promoCodeData.usageLimit === 1) {
    await promoCodeService.deactivatePromoCode(promoCode);
  }

  return order;
}


module.exports = {
  createOrder,
  placedOrder,
  confirmedOrder,
  shipOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
  applyPromoCodeToOrder,
};
