import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.js";

let confirmationResult = null;

/**
 * Initialize reCAPTCHA verifier for phone authentication
 * @param {string} elementId - HTML element ID where reCAPTCHA will be rendered
 * @returns {RecaptchaVerifier} - The verifier instance
 */
export const initializeRecaptcha = (elementId = "recaptcha-container") => {
  try {
    if (!document.getElementById(elementId)) {
      const container = document.createElement("div");
      container.id = elementId;
      container.style.display = "none";
      document.body.appendChild(container);
    }

    const verifier = new RecaptchaVerifier(auth, elementId, {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA verified");
      },
    });

    return verifier;
  } catch (error) {
    console.error("Error initializing reCAPTCHA:", error);
    throw error;
  }
};

/**
 * Send OTP to phone number via SMS
 * @param {string} phoneNumber - Phone number with country code (e.g., +8801XXXXXXXXX)
 * @returns {Promise<string>} - Verification ID or confirmation result
 */
export const sendOTP = async (phoneNumber) => {
  try {
    const recaptchaVerifier = initializeRecaptcha();

    const result = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    confirmationResult = result;
    console.log("OTP sent successfully to", phoneNumber);
    return result;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error(error.message || "Failed to send OTP. Please try again.");
  }
};

/**
 * Verify OTP code entered by user
 * @param {string} otpCode - 6-digit OTP code
 * @returns {Promise<Object>} - User credential object
 */
export const verifyOTP = async (otpCode) => {
  try {
    if (!confirmationResult) {
      throw new Error("No OTP request found. Please request OTP first.");
    }

    const userCredential = await confirmationResult.confirm(otpCode);
    console.log("OTP verified successfully");
    return userCredential.user;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error(
      error.message || "Invalid OTP. Please check and try again."
    );
  }
};

/**
 * Get current user from Firebase Auth
 * @returns {Object|null} - Current user object or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Sign out from Firebase
 * @returns {Promise<void>}
 */
export const signOutUser = async () => {
  try {
    await auth.signOut();
    confirmationResult = null;
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export default {
  sendOTP,
  verifyOTP,
  getCurrentUser,
  signOutUser,
  initializeRecaptcha,
};
