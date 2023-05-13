import { createTransport } from "nodemailer";
import "dotenv/config";

const transporter = createTransport({
  host: process.env.SMTP_MAIL_HOST,
  port: process.env.SMTP_MAIL_PORT,
  auth: {
    user: process.env.SMTP_MAIL_USER,
    pass: process.env.SMTP_MAIL_PASSWORD,
  },
});

export default transporter;

export async function sendEmailVerificationToken(toEmail, verificationToken) {
  await transporter.sendMail({
    from: "noreply@screenwave.com",
    to: toEmail,
    subject: "Your Email Verification Code",
    html: `<p>Your email verification code is ${verificationToken}. It will expire after 10 mins.</p>`
  })
}