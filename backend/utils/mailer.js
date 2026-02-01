import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const sendInvoice = async (to, data) => {
  const mailOptions = {
    from: `"Subscription QA System" <${process.env.EMAIL}>`,
    to,
    subject: "Subscription Invoice",
    text: `
Payment Successful ✅

Plan: ${data.plan}
Amount: ₹${data.amount}
Transaction ID: ${data.txnId}
Valid Till: ${data.expiry}
Date: ${data.date}

Thank you for subscribing!
`
  };

  await transporter.sendMail(mailOptions);
};

export default { sendInvoice };
