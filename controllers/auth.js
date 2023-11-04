import { User } from "../models/user.js";
import sendEmail from "../utils/email.js";
import CustomError from "../utils/error.js";
import { generateActivationToken, sendToken } from "../utils/jwt.js";
import {
  comparePassword,
  hashPassword,
  hashSyncPassword,
} from "../utils/password.js";
import randomstring from "randomstring";
import {
  getUserByActivationToken,
  getUserByEmail,
  getUserByRandomString,
} from "../utils/user.js";

const getPrivateData = (req, res, next) => {
  console.log(req.user);
  return res.status(200).json({
    success: true,
    message: "You got access to the private data in this route",
    user: req.user,
  });
};

const register = async (req, res, next) => {
  try {
    // Check if the user already exists
    let user = await getUserByEmail(req);
    if (user) {
      return next(new CustomError("Email id Already Exist!", 400));
    }

    // Generate Hashed Password using the hashPassword function
    let hashedPassword = await hashPassword(req.body.password);

    // Generate an activation token
    const activationToken = generateActivationToken();

    user = await new User({
      ...req.body,
      password: hashedPassword,
      activationToken, // Store the activation token in the user document
    }).save();

    const activationLink = `${process.env.BASE_URL}/activate/${activationToken}`;
    // HTML content for the activation email
    const htmlContent = `
        <p>Hello ${user.firstName},</p>
        <p>Thank you for registering with our service. To activate your account, click the button below:</p>
        <a href="${activationLink}">
        <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Activate Your Account
        </button>
        </a>
        `;

    // Send the email with the activation link
    await sendEmail(user.email, "Account Activation", htmlContent);

    res.status(200).json({
      message: "Activation link sent to your email",
      activationToken: activationToken,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError("Internal Server Error", 500)); // Passing an internal server error
  }
};

const activateUser = async (req, res, next) => {
  try {
    // Find the user with the given activation token
    const user = await getUserByActivationToken(req);
    console.log(user);
    if (!user) {
      throw new CustomError("Invalid activation token", 400);
    }

    // Update the user's status to indicate activation
    user.isActive = true;
    user.activationToken = undefined; // Clear the activation token
    await user.save();

    res.status(200).json({
      message: "Account activated successfully",
    });
  } catch (error) {
    console.log(error);
    next(new CustomError("Internal Server Error", 500)); // Passing an internal server error
  }
};

const login = async (req, res, next) => {
  try {
    // Check if the user exists
    let user = await getUserByEmail(req);

    if (!user) {
      return next(new CustomError("User not found. Please register.", 404));
    }

    // Verify the user's password
    const isPasswordValid = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return next(new CustomError("Invalid password", 401));
    }

    // Generate and send an authentication token
    const token = sendToken(user);

    // Respond with a success message and the token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    next(new CustomError("Internal Server Error", 500));
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    // Check if the user exists based on their email
    const user = await getUserByEmail(req);

    if (!user) {
      return next(new CustomError("User not found. Please register.", 404));
    }

    // Generate a random reset token
    const resetToken = randomstring.generate(10); // Generate a 10-character random string
    const resetTokenExpires = Date.now() + 3600000; // Expires in 1 hour

    // Update the user with the reset token and its expiration time
    user.randomString = resetToken;
    user.randomStringExpires = resetTokenExpires;
    await user.save();

    const resetLink = `${process.env.BASE_URL}/resetPassword/${resetToken}`;

    // HTML content for the email
    const htmlContent = `
        <p>Hello ${user.firstName},</p>
        <p>You have requested to reset your password. Click the button below to reset it:</p>
        <a href="${resetLink}">
          <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Reset Your Password
          </button>
        </a>
      `;

    // Send the email with the password reset link
    await sendEmail(user.email, "Password Reset", htmlContent);

    res.status(200).json({
      message: "Password reset link sent to your email",
      resetToken: resetToken,
    });
  } catch (error) {
    console.error(error);
    next(new CustomError("Internal Server Error", 500));
  }
};

const verifyRandomString = async (req, res, next) => {
  try {
    // Find the user with the provided random string
    const user = await getUserByRandomString(req);

    if (!user) {
      return next(new CustomError("Invalid Link", 400));
    }

    // Check if the reset token has expired (assuming the token expires after 1 hour)
    if (user.randomStringExpires < Date.now()) {
      return next(new CustomError("Password reset link has expired", 400));
    }

    res.status(200).json({ message: "Random String Verified" });
  } catch (error) {
    console.error(error);
    next(new CustomError("Internal Server Error", 500));
  }
};

const resetpassword = async (req, res, next) => {
  try {
    const user = await getUserByRandomString(req);

    if (!user) {
      return next(new CustomError("Invalid Link", 400));
    }

    // Check if the reset token has expired (assuming the token expires after 1 hour)
    if (user.randomStringExpires < Date.now()) {
      return next(new CustomError("Password reset link has expired", 400));
    }
    // Generate a new hashed password using the newPassword
    const hashedPassword = hashSyncPassword(req.body.password);

    // Update the user's password
    user.password = hashedPassword;

    // Clear the random string and its expiration
    user.randomString = undefined;
    user.randomStringExpires = undefined;

    // Save the user with the updated password
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    next(new CustomError("Internal Server Error", 500));
  }
};

export {
  getPrivateData,
  register,
  login,
  forgotPassword,
  verifyRandomString,
  resetpassword,
  activateUser,
};
