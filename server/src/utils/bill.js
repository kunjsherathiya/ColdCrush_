const { sendEmail } = require("../config/email");

const generateBillHtml = (order, user, address) => {
  const productRows = order.productIds.map((item) => {
    const discountValue =
      item.discount?.type === 0
        ? (item.price.value * item.discount.value) / 100
        : item.discount?.value ?? 0;
    const finalPrice = item.price.value - discountValue;
    const total = finalPrice * item.qty;

    return `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.qty}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">${item.price.currency} ${item.price.value}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">${item.discount?.value ?? 0}${item.discount?.type === 0 ? "%" : item.price.currency}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right;">${item.price.currency} ${total.toFixed(2)}</td>
      </tr>
    `;
  }).join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:20px;border:1px solid #ddd;">
      <h2 style="text-align:center;color:#333;">Order Invoice</h2>
      <hr/>

      <table width="100%" style="margin-bottom:20px;">
        <tr>
          <td>
            <b>Customer Details:</b><br/>
            Name: ${user.fullName}<br/>
            Email: ${user.email}<br/>
            Phone: ${user.phone}
          </td>
          <td style="text-align:right;">
            <b>Order Details:</b><br/>
            Order ID: ${order.orderId}<br/>
            Order Date: ${new Date(order.createdAt).toLocaleDateString()}<br/>
            Payment Method: ${order.paymentMethod === 1 ? "Cash on Delivery" : "Online"}<br/>
            Payment Status: ${order.paymentStatus === 1 ? "Paid" : "Pending"}
          </td>
        </tr>
      </table>

      <table width="100%" style="margin-bottom:20px;">
        <tr>
          <td>
            <b>Delivery Address:</b><br/>
            ${address.address}, ${address.area}<br/>
            ${address.city}, ${address.state} - ${address.pincode}
          </td>
        </tr>
      </table>

      <table width="100%" style="border-collapse:collapse;margin-bottom:20px;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="padding:8px;border:1px solid #ddd;text-align:left;">Product</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:center;">Qty</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Discount</th>
            <th style="padding:8px;border:1px solid #ddd;text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
      </table>

      <table width="100%" style="margin-bottom:20px;">
        <tr>
          <td style="text-align:right;"><b>Total Qty:</b> ${order.totalQty}</td>
        </tr>
        <tr>
          <td style="text-align:right;font-size:18px;"><b>Total Amount: INR ${order.totalAmount.toFixed(2)}</b></td>
        </tr>
      </table>

      <hr/>
      <p style="text-align:center;color:#888;font-size:12px;">Thank you for your order!</p>
    </div>
  `;
};

const sendBillEmail = async (order, user, address) => {
  const html = generateBillHtml(order, user, address);
  const result = await sendEmail(user.email, `Invoice - ${order.orderId}`, html);
  return result;
};

module.exports = { sendBillEmail };
