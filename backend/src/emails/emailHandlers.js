import { resendClient } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: process.env.EMAIL_FROM_NAME + " <" + process.env.EMAIL_FROM + ">",
      to: email,
      subject: "Welcome to Our Chat App",
      html: createWelcomeEmailTemplate(name, clientURL),
    });
    console.log("Welcome email sent:", data);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
