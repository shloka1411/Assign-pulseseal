"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Lock,
  BadgeCheck,
  Calculator,
  Award,
  Tag,
  FlaskConical,
  Info,
  Mail,
  MessageCircle,
  Calendar,
  Rocket,
  Phone,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import pulsesealLogo from "@/assets/AuthIcons/Pulseseal Color Icon 1.svg";
import axiosClient from "@/lib/api/client";
import { toast } from "sonner";

const EarlyAccessPage = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5000);
  const [isPaused, setIsPaused] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [teamSize, setTeamSize] = useState("1-10");
  const [industry, setIndustry] = useState("Technology & Software");
  const [product, setProduct] = useState("HRMS");
  const [challenge, setChallenge] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isFormValid = 
    fullName.trim() !== "" && 
    email.trim() !== "" && 
    phone.trim() !== "" && 
    companyName.trim() !== "" && 
    termsAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosClient.post("/early-access", {
        fullName,
        workEmail: email,
        phoneNumber: phone,
        companyName,
        teamSize,
        industry,
        product,
        challenge,
        agreedToReceiveUpdates: termsAccepted,
      });

      if (response.data?.success) {
        setIsSubmitted(true);
      }
    } catch (error: any) {
      console.error("Error submitting early access request:", error);
      toast.error(error.response?.data?.message || "Failed to submit request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 100);
      }, 100);
    } else if (timeLeft <= 0) {
      setIsSubmitted(false);
      setTimeLeft(5000);
      router.push("/");
    }
    return () => clearInterval(timer);
  }, [isSubmitted, isPaused, timeLeft]);

  useEffect(() => {
    if (isSubmitted) {
      setTimeLeft(5000);
      setIsPaused(false);
    }
  }, [isSubmitted]);

  return (
    <div className="min-h-screen bg-[#fcfdfc] font-sans selection:bg-[#3f5a54]/10">
      <div className="max-w-[1500px] mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <Image
            src={pulsesealLogo}
            alt="PulseSeal"
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <span className="text-xl md:text-2xl font-black text-[#1a2522] tracking-tight">PulseSeal</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* Left Side: Content */}
          <div className="w-full lg:w-[55%] space-y-4">

            {/* Program Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="secondary" className="bg-[#4a5f5a] hover:bg-[#3f5a54] text-white px-3 py-1 rounded-full flex items-center gap-2 w-fit border-none text-[10px] font-semibold">
                <BadgeCheck className="w-3.5 h-3.5" /> Limited Early Access Program
              </Badge>
            </motion.div>

            {/* Hero Text */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a2522] leading-[1.1]"
              >
                Why Join Early Access?
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed"
              >
                Secure your spot for early access to PulseSeal's enterprise-grade HRMS platform. Experience the synergy of automated compliance and human-centric management.
              </motion.p>
            </div>

            {/* Benefits List */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.5 }
                }
              }}
              className="space-y-4"
            >
              {[
                { text: <>Get <span className="font-bold">3 months FREE</span> on Advanced Plan (worth ₹5,700 per employee)</> },
                { text: "Priority onboarding with dedicated success manager" },
                { text: "Shape the product roadmap with direct feedback access" },
                { text: "Lock in early bird pricing before public launch" },
                { text: "Exclusive access to beta features and updates" }
              ].map((benefit, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 bg-[#f0f4f3] p-0.5 rounded-full group-hover:bg-[#3f5a54]/10 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#3f5a54]" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm md:text-base">{benefit.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Feature Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
            >
              {[
                { icon: <Calculator className="w-4 h-4" />, text: "Quantifiable Savings" },
                { icon: <Award className="w-4 h-4" />, text: "VIP Onboarding Experience" },
                { icon: <Tag className="w-4 h-4" />, text: "Early Pricing Advantage" },
                { icon: <FlaskConical className="w-4 h-4" />, text: "Insider Beta Access" }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-gray-200 transition-all flex items-center gap-4 group"
                >
                  <div className="text-[#3f5a54] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-bold text-[#3f5a54] text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-[45%]"
          >
            <Card className="border-gray-100 rounded-xl overflow-hidden">
              <CardContent className="p-5 md:p-6 space-y-5">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1a2522]">Request Early Access</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-500">Full Name *</label>
                    <Input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-12 rounded-lg border-gray-500 focus:border-[#3f5a54] focus:ring-[#3f5a54]/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-500">Work Email *</label>
                    <Input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@company.com"
                      className="h-12 rounded-lg border-gray-500 focus:border-[#3f5a54] focus:ring-[#3f5a54]/20"
                    />
                    <div className="flex items-center gap-2 text-[11px] text-blue-500 font-medium pl-1">
                      <Info className="w-3 h-3" />
                      Business emails are preferred for faster verification
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-500">Phone Number (WhatsApp preferred) *</label>
                    <Input
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXXXXXXX"
                      className="h-12 rounded-lg border-gray-500 focus:border-[#3f5a54] focus:ring-[#3f5a54]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-500">Company Name *</label>
                      <Input
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company name"
                        className="h-12 rounded-lg border-gray-500 focus:border-[#3f5a54] focus:ring-[#3f5a54]/20"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-500">Team Size *</label>
                      <Select value={teamSize} onValueChange={setTeamSize}>
                        <SelectTrigger className="h-12 rounded-lg bg-[#F7F7F7] border-gray-200 focus:ring-[#3f5a54]/20">
                          <SelectValue placeholder="1-10 employees" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="200+">200+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-500">Industry</label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="h-12 rounded-lg bg-[#F7F7F7] border-gray-200 focus:ring-[#3f5a54]/20">
                          <SelectValue placeholder="Technology & Software" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology & Software">Technology & Software</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-500">Product *</label>
                      <Select value={product} onValueChange={setProduct}>
                        <SelectTrigger className="h-12 rounded-lg bg-[#F7F7F7] border-gray-200 focus:ring-[#3f5a54]/20">
                          <SelectValue placeholder="HRMS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HRMS">HRMS</SelectItem>
                          <SelectItem value="TMS">TMS</SelectItem>
                          <SelectItem value="Combined">Combined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-500">Challenge (Optional)</label>
                    <Textarea
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      placeholder="Primary workforce challenge..."
                      className="min-h-[100px] rounded-lg border-gray-500 focus:border-[#3f5a54] focus:ring-[#3f5a54]/20 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Checkbox 
                      id="terms" 
                      required
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                      className="border-gray-300 data-[state=checked]:bg-[#3f5a54] data-[state=checked]:border-[#3f5a54]" 
                    />
                    <label htmlFor="terms" className="text-[11px] text-gray-500 leading-tight">
                      I agree to receive product updates and early access communications from PulseSeal.
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={!isFormValid || isLoading}
                    className={`w-full h-14 font-bold rounded-xl text-lg shadow-lg transition-all duration-300 mt-4 ${
                      (isFormValid && !isLoading) 
                        ? "bg-[#3f5a54] hover:bg-[#324843] text-white hover:shadow-xl" 
                        : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                    }`}
                  >
                    {isLoading ? "Submitting..." : "Get Early Access"}
                  </Button>

                  <p className="text-center text-[10px] text-gray-600 font-semibold tracking-widest pt-2">
                    Learn More About PulseSeal —
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent 
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="font-sans sm:max-w-[550px] w-[95vw] h-fit max-h-[98vh] p-0 overflow-hidden rounded-xl border-none shadow-2xl"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 overflow-hidden z-50">
            <motion.div
              animate={{ width: `${(timeLeft / 5000) * 100}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
              className="h-full bg-[#3f5a54]"
            />
          </div>
          <div className="bg-white p-6 md:p-8 flex flex-col items-center text-center space-y-5">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-[#f0f4f3] rounded-full flex items-center justify-center shadow-inner relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-10 h-10 bg-[#3f5a54] rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <Check className="w-6 h-6" strokeWidth={3.5} />
              </motion.div>
            </div>

            {/* Header */}
            <div className="space-y-2">
              <DialogTitle className="text-xl md:text-2xl font-extrabold text-[#1a2522] leading-tight tracking-tight">
                🎉 You're In! Welcome to<br />PulseSeal Early Access
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-[13px] md:text-sm font-medium leading-relaxed">
                Thank you for joining our exclusive early access program!<br />
                We're excited to have you on board.
              </DialogDescription>
            </div>

            {/* Next Steps Section */}
            <div className="w-full space-y-3 text-left">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                WHAT HAPPENS NEXT
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    icon: <Mail className="w-5 h-5 text-[#3f5a54]" />,
                    title: "Confirmation email sent to your inbox",
                    desc: "Check your spam folder if you don't see it within 5 minutes."
                  },
                  {
                    icon: <MessageCircle className="w-5 h-5 text-[#3f5a54]" />,
                    title: "Our team will reach out within 24 hours via WhatsApp",
                    desc: "Personal concierge service to help set up your profile."
                  },
                  {
                    icon: <Calendar className="w-5 h-5 text-[#3f5a54]" />,
                    title: "You'll receive onboarding details 7 days before public launch",
                    desc: "A comprehensive guide to mastering PulseSeal features."
                  }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl">
                    <div className="p-1.5 bg-[#fcfdfc] rounded-lg">
                      {React.cloneElement(step.icon as React.ReactElement, { className: "w-4 h-4 text-[#3f5a54]" })}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a2522] text-[13px] md:text-sm">{step.title}</h4>
                      <p className="text-gray-500 text-[11px] md:text-xs">{step.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-3 p-3 bg-[#3f5a54] rounded-xl shadow-lg transform">
                  <div className="p-1.5 bg-white/10 rounded-lg text-white">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-[13px] md:text-sm">Early access kicks off: June 15, 2026</h4>
                    <p className="text-white/70 text-[11px] md:text-xs">Mark your calendar for the platform transformation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 space-y-1.5 border-t border-gray-50 w-full">
              <p className="text-gray-700 font-semibold text-[11px] md:text-xs">
                Questions? Reach out to our dedicated success team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-[10px] md:text-[11px] font-bold text-gray-600">
                <a href="mailto:support@pulseseal.in" className="flex items-center gap-1 hover:text-[#3f5a54] transition-colors">
                  <Mail className="w-3.5 h-3.5" /> support@pulseseal.in
                </a>
                <span className="hidden sm:inline text-gray-300">•</span>
                <a href="tel:+9162901XXXXX" className="flex items-center gap-1 hover:text-[#3f5a54] transition-colors">
                  <Phone className="w-3.5 h-3.5" strokeWidth={2.5} /> +91 62901 XXXXX
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EarlyAccessPage;