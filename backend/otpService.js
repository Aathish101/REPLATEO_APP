import nodemailer from "nodemailer";
import crypto from "crypto";
import admin from "firebase-admin";

// 🔢 Generate OTP
export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// 📧 Gmail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📤 Send OTP
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

    // 🔥 Store OTP in Firestore
    await admin.firestore().collection("otps").doc(normalizedEmail).set({
      otp,
      expires: Date.now() + 15 * 60 * 1000,
    });

    console.log("✅ OTP sent & stored in Firestore");
    return true;

  } catch (error) {
    console.error("❌ Gmail OTP Error:", error.message);
    return false;
  }
};

// ✅ Verify OTP (Firestore version)
export const verifyOTP = async (email, otp) => {
  const normalizedEmail = email.toLowerCase();

  try {
    const doc = await admin
      .firestore()
      .collection("otps")
      .doc(normalizedEmail)
      .get();

    if (!doc.exists) return false;

    const data = doc.data();

    if (Date.now() > data.expires) {
      await admin.firestore().collection("otps").doc(normalizedEmail).delete();
      return false;
    }

    if (data.otp === otp.toString()) {
      await admin.firestore().collection("otps").doc(normalizedEmail).delete();
      return true;
    }

    return false;

  } catch (error) {
    console.error("❌ OTP Verify Error:", error.message);
    return false;
  }
};

// 🔁 Reset OTP reuse
export const sendResetOTPEmail = sendOTPEmail;