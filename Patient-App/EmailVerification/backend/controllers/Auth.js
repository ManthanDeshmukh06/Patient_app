import { SendVerificationCode, WelcomeEmail } from "../middleware/Email.js";
import Usermodel from "../models/User.model.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const ExistsUser = await Usermodel.findOne({ email });
    if (ExistsUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new Usermodel({
      email,
      password: hashedPassword,
      name,
      verificationCode,
    });
    await user.save();
    SendVerificationCode(user.email, verificationCode);
    const { password: _, ...userWithoutPassword } = user._doc;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await Usermodel.findOne({
      verificationCode: code,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    await WelcomeEmail(user.email, user.name);
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { email: user.email, name: user.name, isVerified: user.isVerified },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { register, VerifyEmail };
