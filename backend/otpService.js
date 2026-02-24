import nodemailer from "nodemailer";
import crypto from "crypto";

const otpStore = new Map();

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email) => {
  const normalizedEmail = email.toLowerCase();
  const otp = generateOTP();

  try {
    await transporter.sendMail({
      from: `"Replateo" <${process.env.EMAIL_USER}>`,
      to: normalizedEmail,
      subject: "Replateo OTP Verification",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>This OTP is valid for 15 minutes.</p>
      `,
    });

    otpStore.set(normalizedEmail, {
      otp,
      expires: Date.now() + 15 * 60 * 1000,
    });

    console.log("✅ OTP sent successfully via Gmail");
    return true;

  } catch (error) {
    console.error("❌ Gmail OTP Error:", error);
    return false;
  }
};

export const verifyOTP = (email, otp) => {
  const normalizedEmail = email.toLowerCase();
  const record = otpStore.get(normalizedEmail);

  if (!record) return false;
  if (Date.now() > record.expires) {
    otpStore.delete(normalizedEmail);
    return false;
  }

  if (record.otp === otp.toString()) {
    otpStore.delete(normalizedEmail);
    return true;
  }

  return false;
};

export const sendResetOTPEmail = sendOTPEmail;