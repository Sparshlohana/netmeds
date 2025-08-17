const Razorpay = require('razorpay');

apiKey = "rzp_test_VWj3KdL8fR4eKL"
apiSecret = "cW5KC1mCOERnVzqGxyBh3ptT"

const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});


module.exports = razorpay;