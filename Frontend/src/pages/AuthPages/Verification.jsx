import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { verifyOTP, sendOTP } from '../../services/firebaseAuthService';
import { API_PATHS, getFullUrl } from '../../utilities/apiPath';

const Verification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [signupData, setSignupData] = useState(null);

  useEffect(() => {
    // Check if user came from signup page
    const savedPhone = sessionStorage.getItem('phoneNumber');
    const savedData = sessionStorage.getItem('signupData');

    if (!savedPhone || !savedData) {
      setError('No signup request found. Please register again.');
      navigate('/register');
      return;
    }

    setPhoneNumber(savedPhone);
    setSignupData(JSON.parse(savedData));
  }, [navigate]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }

      // Step 1: Verify OTP with Firebase
      const firebaseUser = await verifyOTP(otp);
      console.log('OTP verified with Firebase:', firebaseUser.uid);

      // Step 2: Call backend verification endpoint
      const verificationResponse = await fetch(getFullUrl(API_PATHS.AUTH.VERIFY), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          firebaseUID: firebaseUser.uid,
        }),
      });

      if (!verificationResponse.ok) {
        const errorData = await verificationResponse.json();
        throw new Error(errorData.message || 'Verification failed on backend');
      }

      const verificationData = await verificationResponse.json();
      console.log('Backend verification successful:', verificationData);

      // Step 3: Store user data and token in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: verificationData.user.id,
        phoneNumber: verificationData.user.phoneNumber,
        name: verificationData.user.name,
        isVerified: true,
      }));
      localStorage.setItem('token', verificationData.token);

      // Step 4: Clear session storage
      sessionStorage.removeItem('phoneNumber');
      sessionStorage.removeItem('signupData');

      // Step 5: Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    setResendTimer(60);

    try {
      await sendOTP(phoneNumber);
      console.log('OTP resent successfully to', phoneNumber);
      setError('');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
      setResendTimer(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f6f6]">
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-110 bg-white p-8 rounded-2xl shadow-md">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 text-center">Verify Your Phone</h1>
            <p className="text-slate-500 text-sm mt-2 text-center">
              Enter the 6-digit code we sent to<br />
              <span className="font-bold text-slate-900">{phoneNumber}</span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-semibold">Verification Code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                value={otp}
                onChange={handleOtpChange}
                placeholder="000000"
                className="w-full px-4 py-4 text-center text-2xl font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition tracking-widest"
              />
              <p className="text-xs text-gray-500 text-center">6-digit code</p>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Phone'}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">Didn't receive the code?</p>
            <button
              onClick={handleResendOtp}
              disabled={resendTimer > 0 || loading}
              className="text-red-600 font-bold hover:underline disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>

      {/* reCAPTCHA Container */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Verification;