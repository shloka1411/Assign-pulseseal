"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import logo2 from "@/assets/AuthIcons/Image1.png";
import pulsesealLogo from "@/assets/AuthIcons/Pulseseal Color Icon 1.svg";
import dashboardHeroImage from "@/assets/AuthIcons/dashboard-image.png";
import {
    Mail,
    Phone,
    MessageCircle,
    MessageSquare,
    Calendar,
    Clock,
    Zap,
    Target,
    Timer,
    UserCheck,
    Camera,
    TrafficCone,
    Trophy,
    Check,
    X,
    Star,
    PlayCircle,
    Play,
    BarChart3,
    ShieldCheck,
    Send,
    ChevronRight,
    Sparkles,
    Eye,
    Circle,
    LogIn,
    Network,
    Signal,
    FileText,
    Building2,
    Gauge,
    Headset,
    Facebook,
    Instagram,
    Linkedin
} from "lucide-react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/api/client";

interface AnimatedTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

interface FillOnScrollTextProps {
    children: ReactNode;
    className?: string;
}

interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
}

interface FloatingCardProps {
    children: ReactNode;
    className?: string;
}

interface FeatureItem {
    icon: ReactNode;
    title: string;
    description: string;
}

interface BenefitItem {
    title: string;
    description: string;
    stat: string;
}

interface PricingPlan {
    _id?: string;
    name: string;
    price: string;
    features: string[];
    notIncluded?: string[];
    popular: boolean;
}

const PRICING_PERIOD = "per employee / per year";
const PRICING_CTA = "Get Started";

interface DecodedTokenData {
    role?: string;
    isSuperUser?: boolean;
    isOrganizer?: boolean;
    user?: {
        is_superuser?: boolean;
        is_organizer?: boolean;
    };
}

interface NavigationItem {
    id: string;
    label: string;
}

interface FooterSection {
    title: string;
    links: Array<{
        label: string;
        href: string;
    }>;
}

interface StatItem {
    value: ReactNode;
    label: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
    children,
    className = "",
    delay = 0
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.21, 1.11, 0.81, 0.99]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const FillOnScrollText: React.FC<FillOnScrollTextProps> = ({
    children,
    className = ""
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "end 0.1"]
    });

    return (
        <motion.div
            ref={ref}
            style={{
                opacity: useTransform(scrollYProgress, [0, 0.3, 1], [0.4, 0.8, 1]),
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1])
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const StaggerContainer: React.FC<StaggerContainerProps> = ({
    children,
    className = "",
    delay = 0
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const StaggerItem: React.FC<StaggerItemProps> = ({
    children,
    className = ""
}) => {
    return (
        <motion.div
            variants={{
                hidden: {
                    opacity: 0,
                    y: 15,
                    scale: 0.98
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration: 0.5,
                        ease: "easeOut"
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const BrandButton: React.FC<{
    children: ReactNode;
    className?: string;
    size?: "default" | "lg";
    onClick?: () => void;
}> = ({ children, className = "", size = "default", onClick }) => {
    return (
        <motion.button
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(63, 90, 84, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                ${size === "lg" ? "px-8 py-3.5 text-lg" : "px-6 py-2.5 text-sm md:text-base"}
                bg-[#3f5a54] text-white font-bold rounded-lg
                transition-all duration-300 ${className}
            `}
        >
            {children}
        </motion.button>
    );
};

const FloatingCard: React.FC<FloatingCardProps> = ({
    children,
    className = ""
}) => {
    return (
        <motion.div
            whileHover={{
                y: -4,
                scale: 1.01,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.99 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const GradientButton: React.FC<{
    children: ReactNode;
    className?: string;
    size?: "default" | "lg";
    onClick?: () => void;
}> = ({ children, className = "", size = "default", onClick }) => {
    const gradientProgress = useMotionValue(0);
    const springProgress = useSpring(gradientProgress, {
        stiffness: 80,
        damping: 20,
        duration: 0.6
    });

    const backgroundGradient = useTransform(
        springProgress,
        [0, 1],
        [
            'linear-gradient(90deg, #df658c 0%, #656beb 100%)',
            'linear-gradient(90deg, #656beb 0%, #df658c 100%)'
        ]
    );

    const baseClasses = "text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300";
    const sizeClasses = size === "lg"
        ? "px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg"
        : "px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm";

    return (
        <motion.button
            className={`${baseClasses} ${sizeClasses} ${className}`}
            style={{
                background: backgroundGradient
            }}
            onHoverStart={() => gradientProgress.set(1)}
            onHoverEnd={() => gradientProgress.set(0)}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

const LandingPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>("features");
    const [token, setToken] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
    const [decodedToken, setDecodedToken] = useState<DecodedTokenData | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 3);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
            if (!storedToken) {
                setDecodedToken(null);
                return;
            }

            try {
                setDecodedToken(JSON.parse(atob(storedToken.split(".")[1])) as DecodedTokenData);
            } catch {
                setDecodedToken(null);
            }
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, []);
    const router = useRouter();

    const navigationItems: NavigationItem[] = [
        { id: "features", label: "Features" },
        { id: "pricing", label: "Pricing" },
        { id: "demo", label: "Demo" },
        { id: "benefits", label: "Benefits" },
        { id: "contact", label: "Contact" },
    ];

    const features: FeatureItem[] = [
        {
            icon: <BarChart3 className="w-6 h-6 text-[#3f5a54]" />,
            title: "Unified Performance Dashboard",
            description: "One screen. Complete picture. Who's in. Who's delivering. Who's falling behind."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-[#3f5a54]" />,
            title: "Proof-Based Accountability",
            description: "No more \"I'll do it\" followed by silence. Every task closes with evidence — or it doesn't close."
        },
        {
            icon: <Signal className="w-6 h-6 text-[#3f5a54]" />,
            title: "Real-Time Risk Signals",
            description: "Traffic lights for your team. Know who's on track, who's slipping, who's about to blow a deadline."
        },
        {
            icon: <UserCheck className="w-6 h-6 text-[#3f5a54]" />,
            title: "Manager Approval Workflows",
            description: "Nothing is \"done\" until leadership says so. Quality gates, not honor systems."
        },
        {
            icon: <Trophy className="w-6 h-6 text-[#3f5a54]" />,
            title: "Performance Leaderboards",
            description: "Scorecards. Rankings. Healthy competition. Recognition for those who deliver."
        },
        {
            icon: <Clock className="w-6 h-6 text-[#3f5a54]" />,
            title: "Smart Reminders & TAT Alerts",
            description: "Automated nudges before deadlines slip. No more manual chasing on WhatsApp."
        }
    ];

    const benefits: BenefitItem[] = [
        {
            title: "80+ Lakhs Registered SMEs",
            description: "Built for India's massive SME ecosystem — the same market where 80L+ businesses are already digitizing workforce operations.",
            stat: "80L+"
        },
        {
            title: "650+ Districts Coverage",
            description: "Nationwide presence ensuring local support and understanding of diverse business needs across India.",
            stat: "650+"
        },
        {
            title: "3x Faster Task Completion",
            description: "Teams using task-based tracking complete projects faster with clear accountability measures and real-time visibility.",
            stat: "3x"
        },
        {
            title: "24/7 Expert Support",
            description: "Monday to Sunday, 8 AM - 8 PM IST support via call and WhatsApp for immediate assistance. Real humans, real help.",
            stat: "24/7"
        }
    ];

    const fallbackPlans: PricingPlan[] = [
        {
            name: "HRMS Only",
            price: "900",
            features: [
                "Employee Records & Profiles",
                "Attendance Tracking",
                "Leave Management System",
                "Role Hierarchy & Reporting",
                "Workforce Access Controls",
                "Basic Analytics Dashboard",
                "Email Support (24h Response)"
            ],
            notIncluded: [
                "Task tracking & execution",
                "Proof of work uploads",
                "Manager approval workflows",
                "Performance leaderboards",
                "Real-time risk signals",
                "Unified dashboard",
                "API access",
                "Dedicated success manager"
            ],
            popular: false
        },
        {
            name: "TMS Only",
            price: "2,400",
            features: [
                "Task Creation & Assignment",
                "Proof-Based Work Submission",
                "Manager Approval Workflows",
                "Real-Time Signal Lights",
                "Task-Based Login/Logout",
                "TAT & Smart Reminders",
                "Performance Leaderboards",
                "Advanced Task Analytics",
                "Email Support (24h Response)"
            ],
            notIncluded: [
                "Attendance tracking",
                "Leave management",
                "Employee records",
                "Unified dashboard",
                "Cross-module analytics",
                "API access",
                "Dedicated success manager"
            ],
            popular: false
        },
        {
            name: "Combined",
            price: "3,000",
            features: [
                "Employee Records & Profiles",
                "Attendance Tracking",
                "Leave Management System",
                "Task Creation & Assignment",
                "Proof-Based Work Submission",
                "Manager Approval Workflows",
                "Real-Time Signal Lights",
                "Unified Performance Dashboard",
                "Cross-Module Insights",
                "Predictive Risk Alerts",
                "Advanced Reporting & Exports",
                "Full API Access",
                "Dedicated Success Manager"
            ],
            notIncluded: [],
            popular: true
        }
    ];

    useEffect(() => {
        const fetchPricingPlans = async () => {
            try {
                const response = await axiosClient.get("/api/pricing");
                const plans = response?.data?.data;
                if (Array.isArray(plans) && plans.length > 0) {
                    setPricingPlans(plans);
                } else {
                    setPricingPlans(fallbackPlans);
                }
            } catch {
                setPricingPlans(fallbackPlans);
            }
        };

        fetchPricingPlans();
    }, []);

    const dashboardStats: StatItem[] = [
        { value: "98%", label: "Task Completion" },
        { value: "24h", label: "Avg Response" },
        { value: "95%", label: "Approval Rate" },
        { value: "4.9", label: "User Rating" }
    ];

    const footerSections: FooterSection[] = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Demo", href: "#demo" },
                { label: "Mobile App", href: "#" }
            ]
        },
        {
            title: "Company",
            links: [
                { label: "About Us", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Careers", href: "/career" },
                { label: "Contact", href: "#contact" }
            ]
        },
        {
            title: "Support",
            links: [
                { label: "Help Center", href: "#" },
                { label: "Documentation", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" }
            ]
        }
    ];

    const handleDashboardClick = () => {
        if (!decodedToken) return;

        const role = decodedToken.role;
        const isSuperUser = decodedToken.isSuperUser ?? decodedToken.user?.is_superuser;
        const isOrganizer = decodedToken.isOrganizer ?? decodedToken.user?.is_organizer;
        let path: string;

        if (isSuperUser || role === 'SUPER_ADMIN' || isOrganizer || role === 'ADMIN') {
            path = '/dashboard/admin/pricing';
        } else {
            path = '/dashboard/dynamic';
        }

        router.push(path);
    };

    useEffect(() => {
        const handleScroll = (): void => {
            const sections = ["features", "pricing", "demo", "benefits", "contact"];
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const scrollPosition = window.scrollY + navbarHeight + 100; // Increased buffer for better detection

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string): void => {
        const element = document.getElementById(sectionId);
        const navbar = document.querySelector('nav');
        if (element && navbar) {
            const navbarHeight = navbar.offsetHeight;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight - 0; // 20px extra padding for aesthetics

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        } else if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-50  "
            >
                <div className="max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
                        <div className="flex items-center gap-8 sm:gap-12 lg:gap-16">
                            <motion.div
                                className="flex items-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Image
                                    src={pulsesealLogo}
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                                    alt="PulseSeal Logo"
                                    priority
                                />
                            </motion.div>

                            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                                {navigationItems.map((item) => (
                                    <motion.button
                                        key={item.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-3 xl:px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm ${activeSection === item.id
                                            ? "text-[#3f5a54]"
                                            : "text-gray-500 hover:text-[#3f5a54]"
                                            }`}
                                        onClick={() => scrollToSection(item.id)}
                                        type="button"
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                            {token ? (
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <BrandButton onClick={handleDashboardClick}>
                                        Dashboard
                                    </BrandButton>
                                </motion.div>
                            ) : (
                                <Link href="/auth/Login">
                                    <motion.div whileTap={{ scale: 0.95 }}>
                                        <BrandButton>
                                            Login
                                        </BrandButton>
                                    </motion.div>
                                </Link>
                            )}
                        </div>

                        <div className="lg:hidden">
                            {token ? (
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <BrandButton onClick={handleDashboardClick}>
                                        Dashboard
                                    </BrandButton>
                                </motion.div>
                            ) : (
                                <Link href="/auth/Login">
                                    <motion.div whileTap={{ scale: 0.95 }}>
                                        <BrandButton>
                                            Login
                                        </BrandButton>
                                    </motion.div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </motion.nav>

            <section className="relative min-h-[85vh] flex items-center pt-20 pb-4 px-4 md:px-8">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            >
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black leading-[1.1] tracking-tight text-[#1a2522]">
                                    Discipline &<br />
                                    Performance.<br />
                                    <span className="text-[#3f5a54]">Delivered Daily.</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                PulseSeal is your all-in-one task-based performance tracker for hybrid teams.
                                Transform accountability into achievement.
                            </motion.p>
                        </div>

                        <motion.div
                            className="relative order-1 lg:order-2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                        >
                            <div className="relative p-2 sm:p-4 lg:p-6">
                                {/* Dashboard Card with Frame */}
                                <div className="bg-white border-2 border-[#3f5a54] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-2xl relative z-10">
                                    <div className="border-[3px] sm:border-[15px] border-[#3f5a54] rounded-xl sm:rounded-2xl overflow-hidden shadow-inner bg-[#3f5a54]">
                                        <Image
                                            src={dashboardHeroImage}
                                            alt="PulseSeal Dashboard"
                                            className="w-full h-auto"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Floating Pills - Exactly matching image positions */}
                                <motion.div
                                    className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 z-20 bg-[#e7f6f2] px-4 py-2.5 rounded-2xl shadow-xl border border-[#3f5a54]/10 flex items-center gap-2.5"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.2, type: "spring" }}
                                >
                                    <div className="bg-white rounded-lg px-2 py-1 text-[10px] sm:text-xs font-black text-[#3f5a54] border border-[#3f5a54]/20 shadow-sm">85%</div>
                                    <div className="text-sm sm:text-base font-bold text-gray-800 whitespace-nowrap">Task Completion</div>
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 z-20 bg-[#f0f7ff] px-4 py-2.5 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-2.5"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.4, type: "spring" }}
                                >
                                    <div className="bg-white rounded-lg px-2 py-1 text-[10px] sm:text-xs font-black text-blue-600 border border-blue-100 shadow-sm">92%</div>
                                    <div className="text-sm sm:text-base font-bold text-gray-800 whitespace-nowrap">Team Approval Rate</div>
                                </motion.div>

                                <motion.div
                                    className="absolute bottom-16 -right-4 sm:bottom-20 sm:-right-8 z-20 bg-[#f8f5ff] px-4 py-2.5 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-2.5"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.6, type: "spring" }}
                                >
                                    <div className="bg-white rounded-lg px-2 py-1 text-[10px] sm:text-xs font-black text-purple-600 border border-purple-100 shadow-sm">98%</div>
                                    <div className="text-sm sm:text-base font-bold text-gray-800 whitespace-nowrap">On Time Delivery</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-6 lg:py-8 px-4 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-4">
                        <h2 className="text-[32px] md:text-[48px] font-black text-[#1a2522] mb-3">
                            Why Choose <span className="text-[#3f5a54]">PulseSeal?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
                            Built specifically for modern hybrid teams who demand accountability and results.
                        </p>
                    </div>

                    <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: "1200px" }}>
                        {[
                            {
                                id: 0,
                                number: "#1",
                                icon: <Zap className="w-6 h-6 text-orange-500" />,
                                title: "Time-Smart Teams",
                                description: "Intelligent time tracking with automatic task based check-ins and real-time productivity insights."
                            },
                            {
                                id: 1,
                                number: "#2",
                                icon: <ShieldCheck className="w-6 h-6 text-[#3f5a54]" />,
                                title: "Proof-Backed Accountability",
                                description: "Every task completion requires proof upload and manager approval for complete transparency."
                            },
                            {
                                id: 2,
                                number: "#3",
                                icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
                                title: "Track. Approve. Improve.",
                                description: "Visual signal lights (Red/Yellow/Green) show real-time status with actionable improvement suggestions."
                            }
                        ].map((item, index) => {
                            const position = (index - activeIndex + 3) % 3;
                            const isActive = position === 0;
                            const isPrev = position === 2;
                            const isNext = position === 1;

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute w-full max-w-4xl"
                                    initial={false}
                                    animate={{
                                        x: isActive ? 0 : isNext ? "35%" : "-35%",
                                        scale: isActive ? 1 : 0.82,
                                        opacity: isActive ? 1 : 0.25,
                                        zIndex: isActive ? 30 : 10,
                                        filter: isActive ? "blur(0px)" : "blur(15px)",
                                        rotateY: isActive ? 0 : isNext ? -25 : 25,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 70,
                                        damping: 15,
                                        mass: 0.8,
                                        zIndex: { duration: 0 }
                                    }}
                                >
                                    <div className={`
                                        bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] 
                                        p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16 min-h-[350px]
                                        transition-all duration-500 ${!isActive ? "pointer-events-none" : ""}
                                    `}>
                                        <div className="flex-1 space-y-8">
                                            <div className="flex items-center gap-5">
                                                <div className="bg-[#f0f4f3] p-4 rounded-2xl shadow-sm">
                                                    {item.icon}
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-black text-[#1a2522] tracking-tight">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="bg-[#f8faf9] rounded-[2rem] p-10 md:p-14 flex items-center justify-center min-w-[220px] shadow-inner">
                                            <span className="text-7xl md:text-9xl font-black text-[#3f5a54]/90 tracking-tighter">
                                                {item.number}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Progress Bar Container */}
                    <div className="max-w-4xl mx-auto mt-12">
                        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#3f5a54]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((activeIndex + 1) / 3) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="min-h-screen flex items-center justify-center py-6 px-4 bg-white">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-[32px] md:text-[48px] font-black text-[#1a2522] mb-3">
                            See What You Get — And <span className="text-[#3f5a54]">What You're Missing</span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
                            PulseSeal isn't just features. It's the difference between managing people and unleashing performance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#f8faf9] rounded-[2rem] p-6 md:p-8 transition-all duration-300 group"
                            >
                                <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black text-[#1a2522] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-base text-gray-600 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="pricing" className="min-h-screen flex items-center justify-center py-4 px-4 bg-white">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-4">
                        <h2 className="text-[32px] md:text-[48px] font-black text-[#1a2522] mb-2">
                            Simple Plans, <span className="text-[#3f5a54]">Powerful Outcomes</span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                            Choose the perfect plan to transform your team's productivity and accountability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan._id || `${plan.name}-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`
                                    relative rounded-[1.5rem] p-5 md:p-6 transition-all duration-500
                                    ${plan.popular
                                        ? "bg-[#3f5a54] text-white shadow-[0_40px_80px_-15px_rgba(63,90,84,0.3)] lg:scale-105 z-10"
                                        : "bg-white border border-gray-100 shadow-2xl text-[#1a2522]"
                                    }
                                `}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#3f5a54] px-4 py-1 rounded-full text-[10px] font-black tracking-widest shadow-xl uppercase">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-4">
                                    <div className={`
                                        inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4
                                        ${plan.popular ? "bg-white/10 text-white" : "bg-[#f4f7f6] text-[#3f5a54]"}
                                    `}>
                                        {plan.name} {plan.popular && <Sparkles className="w-3 h-3 ml-2" />}
                                    </div>
                                    <div className="flex items-start gap-1">
                                        <span className="text-xl md:text-2xl font-black mt-2">₹</span>
                                        <span className="text-5xl md:text-6xl font-black tracking-tighter">{plan.price}</span>
                                    </div>
                                    <p className={`mt-1 text-sm font-medium ${plan.popular ? "text-white/70" : "text-gray-500"}`}>
                                        {PRICING_PERIOD}
                                    </p>
                                </div>

                                <div className="space-y-2 mb-6 border-t border-current/10 pt-3 max-h-[220px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                                    {plan.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex items-center gap-2">
                                            <div className={`
                                                w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0
                                                ${plan.popular ? "bg-white/20" : "bg-[#f4f7f6]"}
                                            `}>
                                                <Check className={`w-2.5 h-2.5 ${plan.popular ? "text-white" : "text-[#3f5a54]"}`} />
                                            </div>
                                            <span className="text-sm font-medium opacity-90">{feature}</span>
                                        </div>
                                    ))}
                                    {plan.notIncluded && plan.notIncluded.map((feature, fIndex) => (
                                        <div key={`not-${fIndex}`} className="flex items-center gap-2 opacity-60">
                                            <div className={`
                                                w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0
                                                ${plan.popular ? "bg-white/10" : "bg-gray-100"}
                                            `}>
                                                <X className={`w-2.5 h-2.5 ${plan.popular ? "text-white" : "text-gray-400"}`} />
                                            </div>
                                            <span className="text-sm font-medium line-through">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`
                                    w-full py-3 rounded-4xl text-lg font-black transition-all duration-300
                                    ${plan.popular
                                        ? "bg-white text-[#3f5a54] hover:bg-[#f4f7f6] shadow-xl"
                                        : "bg-white text-[#3f5a54] border-2 border-[#3f5a54] hover:bg-[#f4f7f6] shadow-lg"
                                    }
                                `}>
                                    {PRICING_CTA}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            <section id="demo" className="min-h-[75vh] flex items-center py-20 px-4 bg-[#fcfdfd]">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-[32px] md:text-[48px] font-black text-[#1a2522] leading-[1.1]">
                                Experience the <span className="text-[#3f5a54]">PulseSeal Demo</span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-xl">
                                Discover how PulseSeal transforms team productivity through intuitive task tracking and real-time performance insights. This demo showcases the application's seamless interface, intelligent accountability features, and powerful reporting tools – empowering your team to achieve peak performance every day.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Device Mockup */}
                            <div className="relative rounded-[2.5rem] bg-[#0d1513] p-3 shadow-[0_50px_100px_-20px_rgba(63,90,84,0.3)] border-[10px] border-[#1a2522] overflow-hidden">
                                <div className="aspect-video rounded-[1.5rem] overflow-hidden bg-black/40 flex items-center justify-center relative">
                                    <video
                                        className="w-full h-full object-cover"
                                        poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    >
                                        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                                    </video>

                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group hover:bg-black/20 transition-all duration-500 cursor-pointer">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                                            <Play className="w-6 h-6 text-white fill-white ml-1" />
                                        </div>
                                    </div>

                                    {/* Video Progress Bar */}
                                    <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#3f5a54]"
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "65%" }}
                                            transition={{ duration: 2, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3f5a54]/10 rounded-full blur-3xl -z-10" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="benefits" className="min-h-screen flex items-center justify-center py-10 px-4 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto w-full relative">
                    <div className="text-center mb-10">
                        <h2 className="text-[32px] md:text-[48px] font-black leading-tight">
                            <span className="text-[#0a1d37]">Transform Your Team's</span> <span className="text-[#3f5a54]">Performance Today</span>
                        </h2>
                    </div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                        {/* Left Side Cards */}
                        <div className="space-y-8 lg:space-y-16">
                            {[benefits[0], benefits[2]].map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-white p-10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.04)] relative group transition-all duration-500"
                                >
                                    <div className="w-10 h-10 bg-[#3f5a54] rounded-lg flex items-center justify-center mb-6">
                                        {idx === 0 ? <FileText className="w-5 h-5 text-white" /> : <Gauge className="w-5 h-5 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0a1d37] mb-3">{benefit.title}</h3>
                                    <p className="text-[14px] text-gray-500 font-medium leading-relaxed">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Center Stats Grid */}
                        <div className="relative flex items-center justify-center py-8">
                            {/* Decorative Background Rings */}
                            <div className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
                                {/* Outer Solid Ring */}
                                <div className="w-[55%] aspect-square border-2 border-gray-200 rounded-full opacity-60" />
                                {/* Inner Dashed Ring */}
                                <div className="absolute w-[40%] aspect-square border-2 border-dashed border-gray-300 rounded-full opacity-80" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {dashboardStats.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-transparent p-5 rounded-2xl border border-gray-200 text-center min-w-[150px] relative z-10"
                                    >
                                        <div className="text-2xl font-black text-[#0a1d37] mb-1">{stat.value}</div>
                                        <div className="text-[13px] font-medium text-gray-500">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side Cards */}
                        <div className="space-y-8 lg:space-y-16">
                            {[benefits[1], benefits[3]].map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="bg-white p-10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.04)] relative group transition-all duration-500"
                                >
                                    <div className="w-10 h-10 bg-[#3f5a54] rounded-lg flex items-center justify-center mb-6">
                                        {idx === 0 ? <Building2 className="w-5 h-5 text-white" /> : <Headset className="w-5 h-5 text-white" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0a1d37] mb-3">{benefit.title}</h3>
                                    <p className="text-[14px] text-gray-500 font-medium leading-relaxed">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="min-h-screen flex items-center justify-center py-10 px-4 bg-[#fcfdfd] overflow-hidden">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-6">
                        <h2 className="text-[32px] md:text-[48px] font-black text-[#0a1d37] mb-1">
                            Get in Touch with Our <span className="text-[#3f5a54]">Support Team</span>
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">Have questions about PulseSeal? We're here to help!</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        {/* Contact Form Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-2 bg-white p-6 md:p-7 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-gray-50"
                        >
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#1a2522]">Name *</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-[#3f5a54] focus:ring-4 focus:ring-[#3f5a54]/5 outline-none transition-all duration-300 text-gray-700 placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#1a2522]">Email *</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-[#3f5a54] focus:ring-4 focus:ring-[#3f5a54]/5 outline-none transition-all duration-300 text-gray-700 placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-[#1a2522]">Services</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['General Inquiry', 'Technical Support', 'Billing & Pricing', 'Feature Request', 'Schedule Demo'].map((service, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${idx === 0
                                                        ? 'bg-[#3f5a54] text-white border-[#3f5a54]'
                                                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                                                    }`}
                                            >
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#1a2522]">Message *</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Tell us how we can help you..."
                                        className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-[#3f5a54] focus:ring-4 focus:ring-[#3f5a54]/5 outline-none transition-all duration-300 text-gray-700 placeholder:text-gray-300 resize-none"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button className="px-8 py-3.5 bg-[#3f5a54] text-white rounded-2xl text-base font-black hover:bg-[#2d413c] transition-all duration-300 flex items-center gap-3 group">
                                        Send a Message
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Side Info Cards */}
                        <div className="space-y-4">
                            {[
                                { icon: Mail, label: 'Email Support', value: 'support@pulseseal.in' },
                                { icon: Phone, label: 'Phone Support', value: '+91 62901 XXXXX' },
                                { icon: MessageCircle, label: 'WhatsApp Support', value: '+91 62901 XXXXX' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                    className="bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-4 group hover:shadow-xl transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#3f5a54] transition-all duration-500">
                                        <item.icon className="w-5 h-5 text-[#1a2522] group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-400 mb-0.5">{item.label}</p>
                                        <p className="text-base font-bold text-[#1a2522]">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Working Hours Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="bg-[#3f5a54] p-6 rounded-[2rem] shadow-2xl shadow-[#3f5a54]/20 text-white relative overflow-hidden"
                            >
                                <div className="relative z-10 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <h4 className="text-lg font-black">Support Hours</h4>
                                    </div>
                                    <div className="space-y-1 opacity-90">
                                        <p className="text-base font-bold">Monday to Sunday</p>
                                        <p className="text-xs font-medium">8:00 AM – 8:00 PM (IST)</p>
                                        <div className="pt-1">
                                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold border border-white/10">Response: 2 - 4 hours</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="min-h-[50vh] mb-16 flex items-center justify-center py-12 px-4 bg-[#F1F1F1] relative overflow-hidden">
                {/* Decorative Elements - Scattered Dots */}
                <div className="absolute top-[10%] left-[5%] w-2.5 h-2.5 rounded-full bg-blue-500 opacity-80" />
                <div className="absolute top-[20%] left-[10%] w-3.5 h-3.5 rounded-full bg-red-500 opacity-80" />
                <div className="absolute top-[40%] left-[8%] w-5 h-5 rounded-full bg-[#3f5a54] opacity-70" />
                <div className="absolute top-[55%] left-[2%] w-3 h-3 rounded-full bg-orange-400 opacity-80" />
                <div className="absolute top-[65%] left-[10%] w-3 h-3 rounded-full bg-green-500 opacity-80" />
                <div className="absolute top-[75%] left-[1%] w-2 h-2 rounded-full bg-purple-500 opacity-70" />
                <div className="absolute top-[85%] left-[18%] w-3 h-3 rounded-full bg-blue-600 opacity-80" />

                {/* Decorative Elements - Concentric Rings on Right */}
                <div className="absolute -right-42 top-0 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] pointer-events-none">
                    <div className="absolute inset-0 border-[30px] md:border-[60px] border-[#3f5a54] rounded-full" />
                    <div className="absolute inset-10 md:inset-20 border-[30px] md:border-[60px] border-[#3f5a54] rounded-full" />
                    {/* <div className="absolute inset-20 md:inset-40 border-[30px] md:border-[60px] border-[#3f5a54] rounded-full" /> */}
                </div>

                <div className="max-w-7xl mx-auto w-full text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[32px] md:text-[48px] font-black text-[#0a1d37] mb-1"
                    >
                        Be Among the First to Experience PulseSeal
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-[#0a1d37] font-medium mb-10 max-w-4xl mx-auto"
                    >
                        Join our exclusive early access program and transform how your team tracks performance. Limited spots available.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link href="/early-access">
                            <button className="px-10 py-4 bg-[#3f5a54] text-white rounded-xl text-lg font-black hover:bg-[#2d413c] transition-all duration-300">
                                Join Early Access
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>


            <footer className="bg-[#3f5a54] py-12 px-4 md:px-8 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-8">
                        {/* Brand & Socials */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={pulsesealLogo}
                                    className="w-9 h-9 brightness-0 invert"
                                    alt="PulseSeal"
                                />
                                <span className="text-2xl font-black tracking-tight">PulseSeal</span>
                            </div>

                            <div className="flex items-center gap-3">
                                {[
                                    { icon: X, href: "#" },
                                    { icon: Facebook, href: "#" },
                                    { icon: Instagram, href: "#" },
                                    { icon: Linkedin, href: "#" }
                                ].map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <social.icon className="w-4 h-4 text-white" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
                            {footerSections.map((section, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h3 className="text-base font-black">{section.title}</h3>
                                    <ul className="space-y-3">
                                        {section.links.map((link, lIdx) => (
                                            <li key={lIdx}>
                                                <a
                                                    href={link.href}
                                                    className="text-white/70 hover:text-white transition-colors text-sm font-medium"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Newsletter Section */}
                        <div className="lg:col-span-3 space-y-4">
                            <h3 className="text-base font-black">Join The Newsletter!</h3>
                            <div className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-[#2d413c] border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-white/30 transition-all text-sm text-white placeholder:text-white/30"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-white text-[#3f5a54] font-black py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all text-sm"
                                >
                                    Subscribe
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/50 text-xs font-medium">
                            Copyright © {new Date().getFullYear()} GIBY Technologies Pvt Ltd. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-xs font-medium">
                            <a href="#" className="text-white/50 hover:text-white transition-colors">Teams & Conditions</a>
                            <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;