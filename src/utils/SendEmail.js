import nodemailer from "nodemailer";
import "dotenv/config.js";

/**
 * Sends an email.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} html - HTML content of the email.
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log(process.env.EMAIL_USER);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,        
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log({ to, subject });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email.");
  }
};
