const nodemailer = require("nodemailer");

const smtpEmail = process.env.SMTP_EMAIL?.trim();
const smtpPassword = process.env.SMTP_PASSWORD?.replace(/\s+/g, "");

if (!smtpEmail || !smtpPassword) {
  throw new Error("SMTP_EMAIL and SMTP_PASSWORD must be defined in .env");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtpEmail,
    pass: smtpPassword,
  },
});

const sendOtpEmail = async ({ to, otp }) => {
  return transporter.sendMail({
    from: `"WriTask" <${smtpEmail}>`,
    to,
    subject: "WriTask Registration OTP",
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
    html: `
      <p>Your verification code is <strong>${otp}</strong>.</p>
      <p>It expires in 10 minutes.</p>
    `,
  });
};

module.exports = { sendOtpEmail };