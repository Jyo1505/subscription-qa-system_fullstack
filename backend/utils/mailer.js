import nodemailer from "nodemailer";

const mailer = async (toEmail, htmlContent) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"MyQAApp" <${process.env.EAMIL}>`,
    to: toEmail,
    subject: "Your Invoice",
    html: htmlContent
  });
};

export default mailer; // ✅ THIS LINE FIXES EVERYTHING
