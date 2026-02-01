import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendInvoice = async (to, data) => {
  try {
    const result = await resend.emails.send({
      from: "Subscription QA <onboarding@resend.dev>",
      to: to,
      subject: "Subscription Invoice",
      html: `
        <h2>Payment Successful ✅</h2>
        <p><b>Plan:</b> ${data.plan}</p>
        <p><b>Amount:</b> ₹${data.amount}</p>
        <p><b>Transaction ID:</b> ${data.txnId}</p>
        <p><b>Valid Till:</b> ${data.expiry}</p>
        <p><b>Date:</b> ${data.date}</p>
        <br/>
        <p>Thank you for subscribing!</p>
      `
    });

    console.log("✅ Invoice email sent:", result.id);
  } catch (err) {
    console.error("❌ Resend email failed:", err);
  }
};

export default { sendInvoice };
