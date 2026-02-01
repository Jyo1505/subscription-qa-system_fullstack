// export async function sendInvoiceEmail() {
//   const nodemailer = await import("nodemailer");

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.sendMail({
//     to: "user@email.com",
//     subject: "Invoice",
//     text: "Your invoice"
//   });
// }
