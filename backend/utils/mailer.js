import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

async function sendInvoice(to, data) {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Payment Invoice",
    text: `
Plan: ${data.plan}
Amount: ₹${data.amount}
Transaction ID: ${data.txnId}
Expiry: ${data.expiry}
Date: ${data.date}
`
  });
}

export default { sendInvoice };
