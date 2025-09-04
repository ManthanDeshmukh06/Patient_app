import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "shubhampadhi2005@gmail.com",
    pass: "conw uezl sjlz zesf",
  },
});
