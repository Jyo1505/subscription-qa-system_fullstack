// import nodemailer from "nodemailer";

// export const sendInvoiceEmail = async (toEmail, htmlContent) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     await transporter.sendMail({
//       from: `"MyQAApp" <${process.env.GMAIL_USER}>`,
//       to: toEmail,
//       subject: "Your Invoice",
//       html: htmlContent
//     });

//     console.log("✅ Invoice email sent to", toEmail);
//   } catch (error) {
//     console.error("❌ Email error:", error);
//   }
// };
