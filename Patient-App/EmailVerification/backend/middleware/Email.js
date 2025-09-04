import {
  Verification_Email_Template,
  Welcome_Email_Template,
} from "../libs/EmailTemplate.js";
import { transporter } from "./Email.config.js";

export const SendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"TechInnovation IT Services" <shubhampadhi2005@gmail.com>',
      to: email,
      subject: "Please Verify Your E-mail",
      text: "Verify Your E-mail",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const WelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"TechInnovation IT Services" <shubhampadhi2005@gmail.com>',
      to: email,
      subject: "Your Email is Verified Successfully",
      text: `Welcome ${name}, Your Email is Verified Successfully`,
      html: Welcome_Email_Template.replace("{name}", name),
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
//transporter;
