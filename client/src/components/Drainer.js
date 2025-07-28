import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Shield, Zap, Clock, Star, ArrowRight, Menu, X, Check, Users, TrendingUp, Lock } from 'lucide-react';

const LunchCoinWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [end, duration]);
    
    return count;
  };

  const Stats = () => {
    const issues = useCounter(50);
    const success = useCounter(99.8);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
          <div className="text-4xl font-bold text-cyan-400 mb-2">{issues}K+</div>
          <div className="text-gray-300">Issues Resolved</div>
        </div>
        <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
          <div className="text-4xl font-bold text-cyan-400 mb-2">{success}%</div>
          <div className="text-gray-300">Success Rate</div>
        </div>
        <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
          <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
          <div className="text-gray-300">Support</div>
        </div>
      </div>
    );
  };

  const GlowButton = ({ children, to = '/connect', variant = 'primary', className = '', ...props }) => {
    const baseClasses = "inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black text-center";
    const variants = {
      primary: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 focus:ring-cyan-400",
      secondary: "bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/50 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/20 focus:ring-cyan-400",
      outline: "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 focus:ring-cyan-400"
    };
    
    return (
      <Link 
        to={to}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  };

  const ServiceCard = ({ title, description, icon: Icon }) => (
    <div className="group p-6 bg-gray-900/60 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-all duration-300">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <h3 className="text-xl font-semibold text-white ml-4">{title}</h3>
      </div>
      <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
      <GlowButton 
        variant="outline" 
        className="w-full group-hover:bg-cyan-500/10"
        to="/connect"
      >
        Resolve
      </GlowButton>
    </div>
  );

  const HowItWorksStep = ({ number, title, description, isLast = false }) => (
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/30">
          {number}
        </div>
        {!isLast && <div className="w-0.5 h-16 bg-gradient-to-b from-cyan-500 to-transparent mx-auto mt-4"></div>}
      </div>
      <div className="flex-1 pb-8">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                LUNCH COIN
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">Services</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">How It Works</a>
              <a href="#faq" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200">FAQ</a>
              <GlowButton to="/connect" className="text-sm px-6 py-2">
                Connect Wallet
              </GlowButton>
            </div>

            <button 
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800/50">
            <div className="px-4 py-6 space-y-4">
              <a href="#services" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200">Services</a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200">How It Works</a>
              <a href="#faq" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200">FAQ</a>
              <GlowButton to="/connect" className="w-full">
                Connect Wallet
              </GlowButton>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white">NEXT-GEN</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                BLOCKCHAIN UTILITY
              </span>
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Lock className="w-6 h-6 text-cyan-400" />
              <span className="text-xl text-gray-300">Blockchain Issues? <span className="text-cyan-400 font-semibold">Fixed. Fast.</span></span>
            </div>
          </div>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your Trusted Tool for Seamless Crypto Recovery & Resolution. Whether you're dealing with stuck transactions, 
            wallet glitches, or smart contract errors — we make blockchain problems disappear, securely and efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <GlowButton to="/connect" className="text-lg px-10 py-5">
              Connect Wallet
            </GlowButton>
            <GlowButton 
              variant="outline" 
              to="/connect"
              className="text-lg px-10 py-5"
            >
              Import Wallet
            </GlowButton>
          </div>

          <div className="text-center mb-16">
            <p className="text-2xl font-semibold text-white mb-2">
              Crypto Rectification. <span className="text-cyan-400">Simplified. Trusted. Instant.</span>
            </p>
            <p className="text-gray-300">
              Join thousands who rely on us to get their crypto back on track — without the tech headache.
            </p>
          </div>

          <Stats />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">HOW IT WORKS</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple Steps - How to Fix Web3 Related Issues. Our streamlined process ensures your blockchain issues are resolved quickly and securely.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <HowItWorksStep 
              number="01"
              title="Select Issue to Fix"
              description="Choose from common blockchain problems like stuck transactions, wallet errors, or smart contract issues."
            />
            <HowItWorksStep 
              number="02"
              title="Connect Your Wallet"
              description="Securely link your crypto wallet using our automatic detection or choose manual connection."
            />
            <HowItWorksStep 
              number="03"
              title="Approve Connection"
              description="Confirm the secure connection in your wallet to authorize the rectification process."
            />
            <HowItWorksStep 
              number="04"
              title="Wait while Issue gets Fixed"
              description="Our advanced algorithms work behind the scenes to resolve your blockchain issue automatically."
              isLast={true}
            />
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gray-900/60 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Manual Connection</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                You can choose to Connect Manually. While our automatic connection tools are designed for seamless integration, 
                some situations call for a little extra control. This option gives you the power to hand-pick your wallet and 
                tailor the connection process to your specific needs.
              </p>
              <GlowButton 
                variant="secondary" 
                to="/connect"
                className="mb-2"
              >
                Connect Manually
              </GlowButton>
              <p className="text-sm text-cyan-400">Advanced users preferred</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">OUR SERVICES</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Issues to Resolve - Our Services. Comprehensive blockchain solutions for all your crypto-related challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard 
          title="Claim"
          description="Facilitate seamless claim processes for tokens, NFTs, or entitlements directly through our secure platform."
          icon={Shield}
        />
        <ServiceCard 
          title="Staking"
          description="Stake your tokens to earn rewards with our secure and user-friendly staking service."
          icon={Clock}
        />
        <ServiceCard 
          title="Swap"
          description="Efficiently swap tokens across supported chains with low slippage and high-speed execution."
          icon={ArrowRight}
        />
        <ServiceCard 
          title="Airdrop"
          description="Manage, distribute, or participate in token airdrops with complete transparency and control."
          icon={Star}
        />
        <ServiceCard 
          title="Rectification"
          description="Correct and resolve blockchain-related issues such as failed transactions or incorrect data entries."
          icon={Check}
        />
        <ServiceCard 
          title="Validation"
          description="Secure and validate transactions or blocks through our trusted validation infrastructure."
          icon={TrendingUp}
        />
        <ServiceCard 
          title="Presale"
          description="Join or manage token presales with full compliance and investor transparency."
          icon={Users}
        />
        <ServiceCard 
          title="Migration"
          description="Seamlessly migrate your tokens or assets between protocols or networks with expert support."
          icon={Zap}
        />
        <ServiceCard 
          title="KYC"
          description="Implement Know Your Customer (KYC) processes to ensure compliance and user verification."
          icon={Lock}
        />
        <ServiceCard 
          title="Staking"
          description="Stake your tokens to earn rewards with our secure and user-friendly staking service."
          icon={Clock}
        />
          </div>

          {/* Additional Services Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Airdrop Fixes','NFT Solutions','High Gas Fees','Blockchain Recovery','Crypto Wallet Restoration','Smart Contract Audits','REVOKE', 'KYC Issues', 'Wallet Approval', 'CONNECT TO DAPPS',
              'MIGRATION', 'TRANSACTION DELAY', 'TOKEN BRIDGE', 'Validation',
              'Claim Reward', 'Slippage Error', 'Rectification', 'Buy/Sell Liquidity'
            ].map((service, index) => (
              <div key={index} className="p-4 bg-gray-900/40 rounded-lg border border-gray-700/30 hover:border-cyan-500/50 transition-all duration-300 text-center">
                <h4 className="text-white font-semibold mb-2">{service}</h4>
                <GlowButton 
                  variant="outline" 
                  className="w-full text-sm py-2 px-4"
                  to="/connect"
                >
                  Resolve
                </GlowButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-20 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="text-xl text-gray-300">
              Got Questions? We've Got Answers. Everything you need to know about connecting your wallet and resolving blockchain issues.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "What types of wallets does WalletConnect support?",
                answer: "We play nice with everyone! WalletConnect supports a wide range of popular wallets, including MetaMask, Coinbase Wallet, Trust Wallet, and many more. The list keeps growing, so check our website for the latest updates."
              },
              {
                question: "Is the connection safe?",
                answer: "Security is our top priority. WalletConnect uses secure encryption protocols and never stores your private keys. Additionally, all connections are initiated by you, giving you complete control over your funds."
              },
              {
                question: "How do I connect my wallet?",
                answer: "Simply select the issue you want to resolve, approve wallet connect and wait for initialization. Contact our support if you have questions."
              },
              {
                question: "What if I want to disconnect my wallet?",
                answer: "No problem! You're always in control of your connections. Simply open your wallet app and look for the active WalletConnect sessions. You can easily disconnect from any dApp with a single tap."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900/60 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-xl text-white mb-6">Still have questions?</p>
            <p className="text-gray-300 mb-8">Our support team is here to help you 24/7</p>
            <GlowButton to="/connect">
              Contact Support
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  LUNCH COIN
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Your trusted partner for seamless crypto recovery and blockchain issue resolution. 
                We make Web3 problems disappear with cutting-edge security and instant solutions.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">50K+</div>
                  <div className="text-sm text-gray-400">Issues Resolved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">99.8%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link 
                  to="/connect"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  Connect Wallet
                </Link>
                <Link 
                  to="/connect"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  Manual Connection
                </Link>
                <Link 
                  to="/connect"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  Support Center
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link 
                  to="/privacy"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/terms"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link 
                  to="/disclaimer"
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800/50 pt-8 text-center">
            <p className="text-gray-400 mb-4">© 2025 LUNCH COIN. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Secure & Verified</span>
              <span>•</span>
              <span>Powered by Blockchain Technology</span>
            </div>
            <p className="text-xs text-gray-500 mt-4 max-w-2xl mx-auto">
              LUNCH COIN is committed to providing secure and reliable blockchain solutions. 
              This platform is designed for educational and utility purposes. Always verify transactions and connections. Use at your own discretion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LunchCoinWebsite;