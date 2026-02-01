import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

await transporter.verify();


const sendInvoice = async (to, data) => {
  console.log("📧 Sending invoice to:", to);
  console.log("📨 EMAIL:", process.env.EMAIL);
  console.log("📨 EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
};

export default { sendInvoice };
