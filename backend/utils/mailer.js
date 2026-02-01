// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendInvoice = async (to, data) => {
//   try {
//     const result = await resend.emails.send({
//       from: "Subscription QA <onboarding@resend.dev>", // REQUIRED
//       to: [to],
//       subject: "Subscription Invoice",
//       text: `
// Payment Successful ✅

// Plan: ${data.plan}
// Amount: ₹${data.amount}
// Transaction ID: ${data.txnId}
// Valid Till: ${data.expiry}
// Date: ${data.date}

// Thank you for subscribing!
//       `
//     });

//     console.log("✅ Resend email sent:", result);
//   } catch (err) {
//     console.error("❌ Resend email failed:", err);
//   }
// };

// export default { sendInvoice };
