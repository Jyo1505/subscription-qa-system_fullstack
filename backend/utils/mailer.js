import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  return transporter;
}

export async function sendInvoice(to, data) {
  try {
    const mailer = getTransporter();

    await mailer.sendMail({
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
`
    });

    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
}
