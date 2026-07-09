"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Logo from "@/assets/AuthIcons/Pulseseal Color.svg"
import GoogleLogo from "@/assets/AuthIcons/google.png"
import loginRightImage from "@/assets/AuthIcons/Login-image.png"
import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginUser, forgotPassword, resetPassword } from '@/features/auth/authSlice'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
})

const Login: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const {
    loading,
    error,
    user,
    role,
    isOrganizer,
    isSuperUser,
    orgPermissions,
  } = useAppSelector((state) => state.auth);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [forgotEmail, setForgotEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && role) {
      let path: string;
      if (isSuperUser || role === 'SUPER_ADMIN' || isOrganizer || role === 'ADMIN') {
        path = '/dashboard/admin/pricing';
      } else {
        path = '/dashboard/dynamic';
      }
      router.push(path);
    }
  }, [user, role, isOrganizer, isSuperUser, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      dispatch(loginUser({ email: loginEmail, password: loginPassword }));
    }
  }

  const handleForgotPasswordClick = () => {
    setIsModalOpen(true)
    setCurrentStep(1)
    setForgotEmail('')
    setOtp('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleSendOTP = async () => {
    if (!forgotEmail) {
      toast.error('Please enter your email address');
      return;
    }
    try {
      await dispatch(forgotPassword({ email: forgotEmail })).unwrap();
      toast.success('OTP sent to your email');
      setCurrentStep(2);
    } catch (error) {
      toast.error('Failed to send OTP');
    }
  }

  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await dispatch(resetPassword({
        email: forgotEmail,
        otp,
        newPassword
      })).unwrap();
      toast.success('Password reset successfully');
      setIsModalOpen(false);
      setCurrentStep(1);
    } catch (error) {
      toast.error('Failed to reset password');
    }
  }

  const renderModalContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email Address</Label>
              <Input
                type="email"
                id="forgot-email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="rounded-xl border-gray-200 focus:border-[#3f5a54] focus:ring-[#3f5a54]/5 transition-all"
              />
            </div>
            <Button
              onClick={handleSendOTP}
              className="w-full bg-[#3f5a54] hover:bg-[#2d413c] text-white rounded-xl font-bold transition-all py-6"
            >
              Send OTP
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              We've sent an OTP to: <span className="font-semibold text-[#3f5a54]">{forgotEmail}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                type="text"
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                type="password"
                id="new-password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                type="password"
                id="confirm-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <Button
              onClick={handleResetPassword}
              className="w-full bg-[#3f5a54] hover:bg-[#2d413c] text-white rounded-xl font-bold transition-all py-6"
            >
              Reset Password
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const getModalTitle = () => {
    switch (currentStep) {
      case 1: return "Forgot Password"
      case 2: return "Reset Password"
      default: return "Forgot Password"
    }
  }

  const getModalDescription = () => {
    switch (currentStep) {
      case 1: return "Enter your email address to receive an OTP"
      case 2: return "Enter the OTP and set a new password"
      default: return "Enter your email address to receive an OTP"
    }
  }

  return (
    <div className={`flex min-h-screen bg-[#fcfdfd] overflow-hidden ${poppins.className}`}>
      {/* Left Column: Auth Form */}
      <div className={`flex w-full lg:w-[45%] items-center justify-center p-4 md:p-10 h-full relative z-10 ${poppins.className}`}>
        <div className="w-full max-w-[480px] space-y-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <Image
                src={Logo}
                alt="PulseSeal"
                className="h-10 w-auto"
                priority
              />
            </Link>
          </motion.div>

          {/* Headings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="text-4xl font-bold leading-tight">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-400 font-medium">
              Enter your credentials to access your account.
            </p>
          </motion.div>

          <div className="space-y-4">
            {/* Google Login */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                type="button"
                className="bg-gray-200 w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl text-base"
              >
                <Image src={GoogleLogo} alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </motion.div>

            {/* Divider */}
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-3 text-[10px] font-black text-gray-300 uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold ml-1">Email address</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#3f5a54] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full pl-14 pr-6 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#3f5a54] focus:ring-4 focus:ring-[#3f5a54]/5 transition-all duration-300 text-sm text-gray-700 font-medium placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#3f5a54] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="w-full pl-14 pr-14 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-[#3f5a54] focus:ring-4 focus:ring-[#3f5a54]/5 transition-all duration-300 text-sm text-gray-700 font-medium placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#3f5a54] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 text-center"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-xs font-bold text-[#ff5a5f] hover:text-[#ff3b41] transition-colors"
                >
                  Forget Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#3f5a54] text-white rounded-2xl font-bold hover:bg-[#2d413c] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Login'}
              </button>
            </motion.form>
          </div>

          {/* Footer Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-4 border-t border-gray-50"
          >
            <p className="text-xs text-gray-400  ">
              © {new Date().getFullYear()} <span className="text-[#3f5a54] font-semibold">GIBY Technologies Pvt Ltd.</span> All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Visual Component */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#3f5a54] relative items-center justify-center p-12 overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full -mr-40 -mt-40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full -ml-20 -mb-20 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-xl"
        >
          <div className="relative group">
            <div className="hidden" />
            <Image
              src={loginRightImage}
              alt="Complete Workforce. Complete Control."
              className="relative transition-transform duration-700"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-xl border-none shadow-2xl">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-black text-[#0a1d37]">{getModalTitle()}</DialogTitle>
            <DialogDescription className="text-gray-400 font-medium">
              {getModalDescription()}
            </DialogDescription>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Login
