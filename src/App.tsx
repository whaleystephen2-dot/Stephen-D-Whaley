/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Palette, 
  Type as TypeIcon, 
  Image as ImageIcon, 
  MessageSquare, 
  ArrowRight, 
  Loader2, 
  Download, 
  RefreshCw,
  ChevronRight,
  ShieldCheck,
  Info,
  LayoutTemplate,
  Volume2,
  BookOpen,
  User,
  CreditCard
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Markdown from 'react-markdown';
import { 
  generateBrandStrategy, 
  generateImage, 
  chatWithBrandExpert, 
  type BrandIdentity 
} from './services/geminiService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const LOGO_STYLES = [
  "Minimalist",
  "Vintage",
  "Abstract",
  "Mascot",
  "Typographic",
  "Geometric",
  "3D Render",
  "Hand-Drawn",
  "Watercolor",
  "Futuristic",
  "Monogram",
  "Neon"
];

const renderTemplatePreview = (template: any, brand: BrandIdentity, logoUrl: string | null) => {
  const platform = template.platform.toLowerCase();
  const isInsta = platform.includes('instagram');
  const isTwitter = platform.includes('twitter') || platform.includes('x');
  const isFb = platform.includes('facebook');
  const isLinkedIn = platform.includes('linkedin');

  const bg = brand.colors[0]?.hex || '#000';
  const fg = brand.colors[brand.colors.length - 1]?.hex || '#fff';
  const accent = brand.colors[1]?.hex || '#ccc';
  const secondary = brand.colors[2]?.hex || accent;

  const containerStyle = { 
    backgroundColor: bg, 
    color: fg,
    fontFamily: brand.typography.bodyFont
  };

  const headerStyle = {
    fontFamily: brand.typography.headerFont
  };

  if (isInsta) {
    return (
      <div className="aspect-square w-full rounded-xl overflow-hidden flex flex-col relative shadow-inner mb-4 border border-black/5" style={containerStyle}>
        {/* Instagram Header Mockup */}
        <div className="p-3 border-b border-white/10 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-white/20 overflow-hidden bg-white/10">
            {logoUrl ? <img src={logoUrl} alt="Avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[8px]">{brand.name.charAt(0)}</div>}
          </div>
          <span className="text-[10px] font-bold">{brand.name}</span>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative">
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, ${accent} 1px, transparent 0)`,
            backgroundSize: '12px 12px'
          }}></div>
          
          {logoUrl && <img src={logoUrl} alt="Logo" className="w-16 h-16 object-contain mb-4 rounded-md shadow-lg z-10" />}
          <h4 style={headerStyle} className="text-lg font-bold mb-2 z-10 leading-tight">{template.placeholderText || brand.name}</h4>
          <p className="text-[10px] opacity-80 z-10 max-w-[80%]">{brand.tagline}</p>
        </div>

        {/* Instagram Footer Mockup */}
        <div className="p-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-sm border border-white/30"></div>
            <div className="w-4 h-4 rounded-sm border border-white/30"></div>
            <div className="w-4 h-4 rounded-sm border border-white/30"></div>
          </div>
          <div className="w-4 h-4 rounded-sm border border-white/30"></div>
        </div>
      </div>
    );
  }

  if (isTwitter) {
    return (
      <div className="aspect-[16/9] w-full rounded-xl overflow-hidden flex flex-col relative shadow-inner mb-4 border border-black/5" style={containerStyle}>
        <div className="flex-1 flex items-center p-6 gap-4 relative">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20" style={{ backgroundColor: accent, clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
          
          <div className="flex-1 z-10 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 overflow-hidden">
                {logoUrl && <img src={logoUrl} alt="Avatar" className="w-full h-full object-cover" />}
              </div>
              <span className="text-[10px] font-bold">{brand.name}</span>
            </div>
            <h4 style={headerStyle} className="text-base font-bold leading-tight">{template.placeholderText || brand.tagline}</h4>
            <div className="h-0.5 w-12 rounded-full" style={{ backgroundColor: secondary }}></div>
          </div>
          
          {logoUrl && (
            <div className="w-20 h-20 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 flex items-center justify-center z-10 shadow-xl">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isFb) {
    return (
      <div className="aspect-[1.91/1] w-full rounded-xl overflow-hidden flex flex-col relative shadow-inner mb-4 border border-black/5" style={{ backgroundColor: '#f0f2f5' }}>
        <div className="h-2/3 w-full relative overflow-hidden" style={{ backgroundColor: bg }}>
          <div className="absolute inset-0 opacity-20" style={{ 
            background: `linear-gradient(45deg, ${bg} 25%, ${accent} 25%, ${accent} 50%, ${bg} 50%, ${bg} 75%, ${accent} 75%, ${accent} 100%)`,
            backgroundSize: '40px 40px'
          }}></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h4 style={{ ...headerStyle, color: fg }} className="text-lg font-bold text-center drop-shadow-md">{template.placeholderText || brand.name}</h4>
          </div>
        </div>
        <div className="h-1/3 bg-white p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border-2 border-white -mt-8 shadow-md overflow-hidden bg-white shrink-0" style={{ backgroundColor: bg }}>
            {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" /> : <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ color: fg }}>{brand.name.charAt(0)}</div>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-neutral-900 truncate">{brand.name}</p>
            <p className="text-[8px] text-neutral-500 truncate">{brand.tagline}</p>
          </div>
          <div className="px-3 py-1 bg-neutral-100 rounded text-[8px] font-bold text-neutral-600 uppercase tracking-wider">Follow</div>
        </div>
      </div>
    );
  }

  if (isLinkedIn) {
    return (
      <div className="aspect-[1.91/1] w-full rounded-xl overflow-hidden flex relative shadow-inner mb-4 border border-black/5" style={{ backgroundColor: '#fff' }}>
        <div className="w-1/3 h-full p-4 flex flex-col justify-center gap-3 border-r border-neutral-100" style={{ backgroundColor: bg, color: fg }}>
          {logoUrl && <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded bg-white/10 p-1" />}
          <div className="space-y-1">
            <p style={headerStyle} className="text-xs font-bold leading-tight">{brand.name}</p>
            <p className="text-[8px] opacity-70 leading-tight">{brand.mission.substring(0, 60)}...</p>
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full -mr-12 -mt-12" style={{ backgroundColor: accent }}></div>
          <h4 style={{ ...headerStyle, color: '#1a1a1a' }} className="text-sm font-bold mb-2 relative z-10">{template.placeholderText || "Professional Excellence"}</h4>
          <p className="text-[10px] text-neutral-500 relative z-10">{template.description}</p>
          <div className="mt-4 flex gap-2 relative z-10">
            <div className="h-1 w-8 rounded-full" style={{ backgroundColor: accent }}></div>
            <div className="h-1 w-4 rounded-full" style={{ backgroundColor: secondary }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner mb-4 border border-black/5" style={containerStyle}>
       <div className="absolute inset-0 opacity-5" style={{ 
         backgroundImage: `linear-gradient(30deg, ${accent} 12%, transparent 12.5%, transparent 87%, ${accent} 87.5%, ${accent}), linear-gradient(150deg, ${accent} 12%, transparent 12.5%, transparent 87%, ${accent} 87.5%, ${accent}), linear-gradient(30deg, ${accent} 12%, transparent 12.5%, transparent 87%, ${accent} 87.5%, ${accent}), linear-gradient(150deg, ${accent} 12%, transparent 12.5%, transparent 87%, ${accent} 87.5%, ${accent}), linear-gradient(60deg, ${accent} 25%, transparent 25.5%, transparent 75%, ${accent} 75.5%, ${accent}), linear-gradient(60deg, ${accent} 25%, transparent 25.5%, transparent 75%, ${accent} 75.5%, ${accent})`,
         backgroundSize: '40px 70px'
       }}></div>
       {logoUrl && <img src={logoUrl} alt="Logo" className="w-12 h-12 object-contain mb-3 rounded-md shadow-lg z-10" />}
       <h4 style={headerStyle} className="text-lg font-bold z-10">{template.placeholderText || brand.name}</h4>
       <p className="text-[10px] opacity-70 mt-2 z-10">{brand.tagline}</p>
    </div>
  );
};

export default function App() {
  const [mission, setMission] = useState('');
  const [logoStyle, setLogoStyle] = useState<string>("Minimalist");
  const [desiredBrandVoice, setDesiredBrandVoice] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingLogos, setIsGeneratingLogos] = useState(false);
  const [brand, setBrand] = useState<BrandIdentity | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [monochromaticLogoUrl, setMonochromaticLogoUrl] = useState<string | null>(null);
  const [reversedLogoUrl, setReversedLogoUrl] = useState<string | null>(null);
  const [iconOnlyLogoUrl, setIconOnlyLogoUrl] = useState<string | null>(null);
  const [horizontalLogoUrl, setHorizontalLogoUrl] = useState<string | null>(null);
  const [verticalLogoUrl, setVerticalLogoUrl] = useState<string | null>(null);
  const [customLogoPrompt, setCustomLogoPrompt] = useState('');
  const [secondaryMarkUrls, setSecondaryMarkUrls] = useState<string[]>([]);
  const [abstractIconUrls, setAbstractIconUrls] = useState<string[]>([]);
  const [profileImageUrlUrls, setProfileImageUrlUrls] = useState<string[]>([]);
  const [moodBoardUrls, setMoodBoardUrls] = useState<string[]>([]);
  const [socialMediaTopic, setSocialMediaTopic] = useState('');
  const [selectedSocialColor, setSelectedSocialColor] = useState<string>('');
  const [selectedSocialFont, setSelectedSocialFont] = useState<string>('');
  const [isGeneratingSocialImage, setIsGeneratingSocialImage] = useState(false);
  const [socialImageUrl, setSocialImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const [negativePrompt, setNegativePrompt] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    checkApiKey();
  }, []);

  useEffect(() => {
    if (brand?.typography) {
      const { headerFont, bodyFont } = brand.typography;
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${headerFont.replace(/ /g, '+')}:wght@400;700&family=${bodyFont.replace(/ /g, '+')}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [brand?.typography]);

  const checkApiKey = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(selected);
    }
  };

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true); // Assume success as per guidelines
    }
  };

  const handleGenerate = async () => {
    if (!mission.trim()) return;
    setIsGenerating(true);
    setError(null);
    setLogoUrl(null);
    setMonochromaticLogoUrl(null);
    setReversedLogoUrl(null);
    setIconOnlyLogoUrl(null);
    setHorizontalLogoUrl(null);
    setVerticalLogoUrl(null);
    setSecondaryMarkUrls([]);
    setAbstractIconUrls([]);
    setProfileImageUrlUrls([]);
    setMoodBoardUrls([]);
    setSocialImageUrl(null);
    setSocialMediaTopic('');
    
    try {
      const strategy = await generateBrandStrategy(mission, logoStyle, desiredBrandVoice);
      setBrand(strategy);
      
      // Generate primary logo
      generateImage(strategy.logoPrompt, imageSize).then(setLogoUrl);
      
      // Generate variations
      generateImage(strategy.monochromaticLogoPrompt, imageSize).then(setMonochromaticLogoUrl);
      generateImage(strategy.reversedLogoPrompt, imageSize).then(setReversedLogoUrl);
      generateImage(strategy.iconOnlyLogoPrompt, imageSize).then(setIconOnlyLogoUrl);
      generateImage(strategy.horizontalLogoPrompt, imageSize).then(setHorizontalLogoUrl);
      generateImage(strategy.verticalLogoPrompt, imageSize).then(setVerticalLogoUrl);
      
      // Generate secondary marks in parallel
      const markPromises = strategy.secondaryMarkPrompts.map(prompt => generateImage(prompt, imageSize));
      Promise.all(markPromises).then(setSecondaryMarkUrls);

      // Generate abstract icons in parallel
      if (strategy.abstractIcons) {
        const iconPromises = strategy.abstractIcons.map(icon => generateImage(icon.prompt, "512px", "1:1"));
        Promise.all(iconPromises).then(setAbstractIconUrls);
      }

      // Generate profile images in parallel
      if (strategy.profileImagePrompts) {
        const profilePromises = strategy.profileImagePrompts.map(prompt => generateImage(prompt, "512px", "1:1"));
        Promise.all(profilePromises).then(setProfileImageUrlUrls);
      }

      // Generate mood board images
      if (strategy.moodBoard?.imagePrompts) {
        const moodBoardPromises = strategy.moodBoard.imagePrompts.map(prompt => generateImage(prompt, "1K", "1:1"));
        Promise.all(moodBoardPromises).then(setMoodBoardUrls);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key error. Please re-select your API key.");
        setHasApiKey(false);
      } else {
        setError("Something went wrong while forging your brand. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateLogos = async () => {
    if (!brand) return;
    setIsGeneratingLogos(true);
    setLogoUrl(null);
    setMonochromaticLogoUrl(null);
    setReversedLogoUrl(null);
    setIconOnlyLogoUrl(null);
    setHorizontalLogoUrl(null);
    setVerticalLogoUrl(null);
    setSecondaryMarkUrls([]);
    setAbstractIconUrls([]);
    setProfileImageUrlUrls([]);
    
    try {
      // Generate primary logo
      generateImage(brand.logoPrompt, imageSize, aspectRatio, negativePrompt).then(setLogoUrl);
      
      // Generate variations
      generateImage(brand.monochromaticLogoPrompt, imageSize, aspectRatio, negativePrompt).then(setMonochromaticLogoUrl);
      generateImage(brand.reversedLogoPrompt, imageSize, aspectRatio, negativePrompt).then(setReversedLogoUrl);
      generateImage(brand.iconOnlyLogoPrompt, imageSize, aspectRatio, negativePrompt).then(setIconOnlyLogoUrl);
      generateImage(brand.horizontalLogoPrompt, imageSize, aspectRatio, negativePrompt).then(setHorizontalLogoUrl);
      generateImage(brand.verticalLogoPrompt, imageSize, aspectRatio, negativePrompt).then(setVerticalLogoUrl);
      
      // Generate secondary marks in parallel
      const markPromises = brand.secondaryMarkPrompts.map(prompt => generateImage(prompt, imageSize, aspectRatio, negativePrompt));
      Promise.all(markPromises).then(setSecondaryMarkUrls);

      // Generate abstract icons in parallel
      if (brand.abstractIcons) {
        const iconPromises = brand.abstractIcons.map(icon => generateImage(icon.prompt, "512px", "1:1", negativePrompt));
        Promise.all(iconPromises).then(setAbstractIconUrls);
      }

      // Generate profile images in parallel
      if (brand.profileImagePrompts) {
        const profilePromises = brand.profileImagePrompts.map(prompt => generateImage(prompt, "512px", "1:1", negativePrompt));
        Promise.all(profilePromises).then(setProfileImageUrlUrls);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to regenerate logos. Please try again.");
    } finally {
      setIsGeneratingLogos(false);
    }
  };

  const handleGenerateCustomLogo = async () => {
    if (!customLogoPrompt.trim()) return;
    setIsGeneratingLogos(true);
    setLogoUrl(null);
    
    try {
      const imageUrl = await generateImage(customLogoPrompt, imageSize, aspectRatio, negativePrompt);
      setLogoUrl(imageUrl);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate custom logo. Please try again.");
    } finally {
      setIsGeneratingLogos(false);
    }
  };

  const handleGenerateSocialImage = async () => {
    if (!socialMediaTopic.trim() || !brand) return;
    setIsGeneratingSocialImage(true);
    setSocialImageUrl(null);
    
    try {
      let prompt = `Create a high-quality social media image for a brand named "${brand.name}". 
      The brand's mission is: "${brand.mission}". 
      The visual style should be: "${brand.moodBoard.imageryStyle}". 
      The image should be about: "${socialMediaTopic}". 
      Do not include text in the image.`;

      if (selectedSocialColor) {
        prompt += `\nProminently feature the brand color ${selectedSocialColor} in the image.`;
      }
      if (selectedSocialFont) {
        prompt += `\nIf any abstract shapes resembling typography are included, they should evoke the style of the ${selectedSocialFont} font.`;
      }
      
      const imageUrl = await generateImage(prompt, "1K", "1:1");
      setSocialImageUrl(imageUrl);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate social media image. Please try again.");
    } finally {
      setIsGeneratingSocialImage(false);
    }
  };

  const handleDownload = (url: string | null, filename: string) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !brand || isChatLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    try {
      const response = await chatWithBrandExpert(userMsg, brand);
      setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-card p-8 text-center space-y-6"
        >
          <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-bold">API Key Required</h1>
            <p className="text-sm text-neutral-500">
              To generate high-quality brand assets, you need to select a paid Gemini API key.
            </p>
          </div>
          <button
            onClick={handleOpenKeySelector}
            className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            Select API Key
          </button>
          <p className="text-xs text-neutral-400">
            Learn more about <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">Gemini API billing</a>.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Header */}
      <header className="border-bottom border-black/5 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-xl tracking-tight">BrandForge</span>
          </div>
          {brand && (
            <button 
              onClick={() => { setBrand(null); setMission(''); }}
              className="text-sm font-medium text-neutral-500 hover:text-black transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              New Brand
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!brand ? (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
                  Forge your <span className="italic">identity.</span>
                </h1>
                <p className="text-lg text-neutral-500 max-w-lg mx-auto">
                  Describe your company mission and let AI craft a comprehensive brand bible in seconds.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Company Mission</label>
                  <textarea 
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    placeholder="e.g. We create sustainable, high-performance outdoor gear for urban explorers who value minimalist design and ethical manufacturing."
                    className="w-full h-40 p-6 bg-white border border-black/10 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all resize-none text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Desired Brand Voice (Optional)</label>
                  <input 
                    type="text" 
                    value={desiredBrandVoice}
                    onChange={(e) => setDesiredBrandVoice(e.target.value)}
                    placeholder="e.g., playful, professional, authoritative, minimalist"
                    className="w-full px-6 py-4 bg-white border border-black/10 rounded-2xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-lg"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Logo Style</span>
                      <select
                        value={logoStyle}
                        onChange={(e) => setLogoStyle(e.target.value)}
                        className="bg-neutral-100 px-3 py-1.5 text-xs font-bold rounded-md outline-none focus:ring-2 focus:ring-black/5 text-black cursor-pointer"
                      >
                        {LOGO_STYLES.map((style) => (
                          <option key={style} value={style}>{style}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Resolution</span>
                      <div className="flex bg-neutral-100 p-1 rounded-lg">
                        {(["1K", "2K", "4K"] as const).map((size) => (
                          <button
                            key={size}
                            onClick={() => setImageSize(size)}
                            className={cn(
                              "px-3 py-1 text-xs font-bold rounded-md transition-all",
                              imageSize === size ? "bg-white shadow-sm text-black" : "text-neutral-400 hover:text-neutral-600"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Aspect Ratio</span>
                      <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="bg-neutral-100 px-3 py-1.5 text-xs font-bold rounded-md outline-none focus:ring-2 focus:ring-black/5 text-black cursor-pointer"
                      >
                        <option value="1:1">1:1 (Square)</option>
                        <option value="16:9">16:9 (Wide)</option>
                        <option value="4:3">4:3 (Landscape)</option>
                        <option value="9:16">9:16 (Vertical)</option>
                        <option value="3:4">3:4 (Portrait)</option>
                        <option value="4:1">4:1 (Ultra Wide)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Negative Prompt (Optional)</label>
                    <input 
                      type="text" 
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="e.g., text, words, realistic, 3d, shadows"
                      className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition-all text-sm"
                    />
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !mission.trim()}
                    className="w-full md:w-auto px-8 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-black/10"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Forging Identity...
                      </>
                    ) : (
                      <>
                        Generate Brand Bible
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                
                {isGenerating && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-neutral-400 italic"
                  >
                    Our AI is analyzing your mission, selecting palettes, and sketching logos...
                  </motion.p>
                )}

                {error && (
                  <p className="text-center text-sm text-red-500 font-medium">{error}</p>
                )}
              </div>

              {/* Testimonials Section */}
              <div className="pt-16 border-t border-black/5">
                <div className="text-center space-y-2 mb-10">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Trusted by Visionaries</h3>
                  <p className="text-2xl font-serif font-bold">Brands forged with our AI</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      quote: "BrandForge took our vague mission statement and turned it into a cohesive, stunning visual identity in minutes. It saved us weeks of back-and-forth with agencies.",
                      author: "Sarah Jenkins",
                      role: "Founder, EcoShift",
                      logo: "ES"
                    },
                    {
                      quote: "The brand voice guidelines were a game-changer. We finally have a consistent tone across all our social channels and customer support emails.",
                      author: "David Chen",
                      role: "CMO, Nexus Tech",
                      logo: "NT"
                    },
                    {
                      quote: "I was blown away by the quality of the logo variations and the mood board. It gave us the perfect foundation to launch our new product line.",
                      author: "Elena Rodriguez",
                      role: "Creative Director, Aura",
                      logo: "A"
                    }
                  ].map((testimonial, idx) => (
                    <div key={idx} className="glass-card p-6 flex flex-col justify-between space-y-4">
                      <p className="text-sm text-neutral-600 leading-relaxed italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                        <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-500">
                          {testimonial.logo}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{testimonial.author}</p>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Brand Hero */}
              <section className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Brand Identity</span>
                    <h2 className="text-6xl font-serif font-bold">{brand.name}</h2>
                    <p className="text-xl text-neutral-500 italic">"{brand.tagline}"</p>
                  </div>
                  <div className="flex gap-2">
                    {brand.personality.map((p) => (
                      <span key={p.trait} className="px-4 py-2 bg-neutral-100 rounded-full text-xs font-bold uppercase tracking-wider">
                        {p.trait}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-black/5 w-full" />
              </section>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Visual Identity */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Brand Marks</h3>
                    <button 
                      onClick={handleRegenerateLogos}
                      disabled={isGeneratingLogos || !logoUrl || secondaryMarkUrls.length === 0}
                      className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={cn("w-4 h-4", isGeneratingLogos && "animate-spin")} />
                      Regenerate Logos
                    </button>
                  </div>

                  {/* Custom Logo Generator */}
                  <div className="glass-card p-6 space-y-4">
                    <h4 className="text-sm font-bold">Custom Logo Generator</h4>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={customLogoPrompt}
                          onChange={(e) => setCustomLogoPrompt(e.target.value)}
                          placeholder="Describe your custom logo..."
                          className="flex-1 px-4 py-2 bg-neutral-50 border border-black/5 rounded-full text-sm outline-none focus:ring-2 focus:ring-black/5"
                        />
                        <button 
                          onClick={handleGenerateCustomLogo}
                          disabled={isGeneratingLogos || !customLogoPrompt.trim()}
                          className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50"
                        >
                          Generate
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Negative Prompt</label>
                          <input 
                            type="text" 
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                            placeholder="Elements to exclude..."
                            className="w-full px-4 py-2 bg-neutral-50 border border-black/5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Aspect Ratio</label>
                          <select
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value)}
                            className="w-full bg-neutral-50 px-3 py-2 text-sm rounded-xl border border-black/5 outline-none focus:ring-2 focus:ring-black/5 text-black cursor-pointer"
                          >
                            <option value="1:1">1:1 (Square)</option>
                            <option value="16:9">16:9 (Wide)</option>
                            <option value="4:3">4:3 (Landscape)</option>
                            <option value="9:16">9:16 (Vertical)</option>
                            <option value="3:4">3:4 (Portrait)</option>
                            <option value="4:1">4:1 (Ultra Wide)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Primary Logo */}
                    <div className="glass-card overflow-hidden group flex flex-col">
                      <div className="p-4 border-b border-black/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-neutral-400" />
                          <span className="text-xs font-bold uppercase tracking-widest">Primary Logo</span>
                        </div>
                      </div>
                      <div className="aspect-square bg-neutral-50 flex items-center justify-center relative">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Primary Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-neutral-300" />
                            <span className="text-xs text-neutral-400">Sketching...</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 border-t border-black/5 bg-white">
                        <button 
                          onClick={() => handleDownload(logoUrl, `${brand.name.replace(/\s+/g, '_')}_Primary_Logo.png`)}
                          disabled={!logoUrl}
                          className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Download className="w-4 h-4" />
                          Download Logo
                        </button>
                      </div>
                    </div>

                    {/* Logo Variations */}
                    <div className="glass-card p-6 space-y-6 flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-neutral-400" />
                          <span className="text-xs font-bold uppercase tracking-widest">Logo Variations</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {/* Monochromatic */}
                        <div className="flex flex-col gap-2">
                          <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden border border-black/5 relative group">
                            {monochromaticLogoUrl ? (
                              <img src={monochromaticLogoUrl} alt="Monochromatic" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin text-neutral-200" />
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">Monochromatic</p>
                          <button 
                            onClick={() => handleDownload(monochromaticLogoUrl, `${brand.name.replace(/\s+/g, '_')}_Monochromatic.png`)}
                            disabled={!monochromaticLogoUrl}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>

                        {/* Reversed */}
                        <div className="flex flex-col gap-2">
                          <div className="aspect-square bg-neutral-900 rounded-xl overflow-hidden border border-white/10 relative group">
                            {reversedLogoUrl ? (
                              <img src={reversedLogoUrl} alt="Reversed" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin text-neutral-700" />
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">Reversed</p>
                          <button 
                            onClick={() => handleDownload(reversedLogoUrl, `${brand.name.replace(/\s+/g, '_')}_Reversed.png`)}
                            disabled={!reversedLogoUrl}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>

                        {/* Icon Only */}
                        <div className="flex flex-col gap-2">
                          <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden border border-black/5 relative group">
                            {iconOnlyLogoUrl ? (
                              <img src={iconOnlyLogoUrl} alt="Icon Only" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin text-neutral-200" />
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">Icon Only</p>
                          <button 
                            onClick={() => handleDownload(iconOnlyLogoUrl, `${brand.name.replace(/\s+/g, '_')}_Icon_Only.png`)}
                            disabled={!iconOnlyLogoUrl}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>

                        {/* Horizontal */}
                        <div className="flex flex-col gap-2">
                          <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden border border-black/5 relative group">
                            {horizontalLogoUrl ? (
                              <img src={horizontalLogoUrl} alt="Horizontal" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin text-neutral-200" />
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">Horizontal</p>
                          <button 
                            onClick={() => handleDownload(horizontalLogoUrl, `${brand.name.replace(/\s+/g, '_')}_Horizontal.png`)}
                            disabled={!horizontalLogoUrl}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>

                        {/* Vertical */}
                        <div className="flex flex-col gap-2">
                          <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden border border-black/5 relative group">
                            {verticalLogoUrl ? (
                              <img src={verticalLogoUrl} alt="Vertical" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 animate-spin text-neutral-200" />
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">Vertical</p>
                          <button 
                            onClick={() => handleDownload(verticalLogoUrl, `${brand.name.replace(/\s+/g, '_')}_Vertical.png`)}
                            disabled={!verticalLogoUrl}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Logo Lockups */}
                    <div className="glass-card p-6 space-y-6 flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <LayoutTemplate className="w-4 h-4 text-neutral-400" />
                          <span className="text-xs font-bold uppercase tracking-widest">Logo Lockups</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Horizontal Lockup */}
                        <div className="flex flex-col gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Horizontal Lockup</p>
                          <div className="bg-white rounded-xl p-8 border border-black/5 flex items-center justify-center gap-4 shadow-sm h-40">
                            {iconOnlyLogoUrl || logoUrl ? (
                              <img src={iconOnlyLogoUrl || logoUrl || ''} alt="Icon" className="w-16 h-16 object-contain" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-16 h-16 bg-neutral-100 rounded-lg animate-pulse" />
                            )}
                            <div className="flex flex-col">
                              <span style={{ fontFamily: brand.typography.headerFont, color: brand.colors[0]?.hex }} className="text-3xl font-bold leading-none tracking-tight">{brand.name}</span>
                              <span style={{ fontFamily: brand.typography.bodyFont, color: brand.colors[1]?.hex || '#666' }} className="text-xs mt-1 tracking-widest uppercase">{brand.tagline}</span>
                            </div>
                          </div>
                        </div>

                        {/* Vertical Lockup */}
                        <div className="flex flex-col gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Vertical / Stacked Lockup</p>
                          <div className="bg-white rounded-xl p-8 border border-black/5 flex flex-col items-center justify-center gap-3 shadow-sm h-40">
                            {iconOnlyLogoUrl || logoUrl ? (
                              <img src={iconOnlyLogoUrl || logoUrl || ''} alt="Icon" className="w-16 h-16 object-contain" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-16 h-16 bg-neutral-100 rounded-lg animate-pulse" />
                            )}
                            <div className="flex flex-col items-center text-center">
                              <span style={{ fontFamily: brand.typography.headerFont, color: brand.colors[0]?.hex }} className="text-2xl font-bold leading-none tracking-tight">{brand.name}</span>
                              <span style={{ fontFamily: brand.typography.bodyFont, color: brand.colors[1]?.hex || '#666' }} className="text-[10px] mt-1 tracking-widest uppercase">{brand.tagline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Marks Variations */}
                    <div className="glass-card p-6 space-y-6 flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-neutral-400" />
                          <span className="text-xs font-bold uppercase tracking-widest">Secondary Variations</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {secondaryMarkUrls.length > 0 ? (
                          secondaryMarkUrls.map((url, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                              <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden border border-black/5">
                                <img src={url} alt={`Variation ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <button 
                                onClick={() => handleDownload(url, `${brand.name.replace(/\s+/g, '_')}_Variation_${idx + 1}.png`)}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Download
                              </button>
                            </div>
                          ))
                        ) : (
                          [1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-neutral-50 rounded-xl flex items-center justify-center border border-black/5">
                              <Loader2 className="w-5 h-5 animate-spin text-neutral-200" />
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Abstract Icons Section */}
                    <div className="glass-card p-6 space-y-6 flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-neutral-400" />
                          <span className="text-xs font-bold uppercase tracking-widest">Abstract Social Icons</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-neutral-500 italic">Simple, abstract icons suitable for social media profile pictures or favicons.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {abstractIconUrls.length > 0 ? (
                          abstractIconUrls.map((url, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                              <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden border border-black/5 group relative">
                                <img src={url} alt={`Abstract Icon ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                  <p className="text-[8px] text-white text-center leading-tight">
                                    {brand.abstractIcons[idx]?.description}
                                  </p>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleDownload(url, `${brand.name.replace(/\s+/g, '_')}_Icon_${idx + 1}.png`)}
                                className="w-full flex items-center justify-center gap-2 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors"
                              >
                                <Download className="w-3 h-3" />
                                Save
                              </button>
                            </div>
                          ))
                        ) : (
                          [1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="aspect-square bg-neutral-50 rounded-xl flex items-center justify-center border border-black/5">
                              <Loader2 className="w-4 h-4 animate-spin text-neutral-200" />
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Profile Image Suggestions */}
                    <div className="glass-card p-6 space-y-6 flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-neutral-400" />
                          <span className="text-xs font-bold uppercase tracking-widest">Profile Image Suggestions</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-neutral-500 italic">Variations optimized for social media profile pictures (Twitter, Facebook, Instagram).</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {profileImageUrlUrls.length > 0 ? (
                          profileImageUrlUrls.map((url, idx) => (
                            <div key={idx} className="flex flex-col gap-4">
                              <div className="flex justify-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-black/5">
                                  <img src={url} alt={`Profile Suggestion ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                              </div>
                              <button 
                                onClick={() => handleDownload(url, `${brand.name.replace(/\s+/g, '_')}_Profile_${idx + 1}.png`)}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Download Profile Image
                              </button>
                            </div>
                          ))
                        ) : (
                          [1, 2, 3].map((i) => (
                            <div key={i} className="aspect-square bg-neutral-50 rounded-xl flex items-center justify-center border border-black/5">
                              <Loader2 className="w-5 h-5 animate-spin text-neutral-200" />
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="glass-card p-8 space-y-8">
                    <div className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">Color Palette</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      {brand.colors.map((color, idx) => (
                        <div key={idx} className="space-y-4">
                          <div 
                            className="aspect-square rounded-2xl shadow-inner border border-black/5" 
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="space-y-1">
                            <p className="text-xs font-bold font-mono">{color.hex}</p>
                            <p className="text-sm font-medium">{color.name}</p>
                            <p className="text-[10px] text-neutral-400 leading-tight">{color.usage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mood Board */}
                  {brand.moodBoard && (
                    <div className="glass-card p-8 space-y-8">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-neutral-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">Mood Board</span>
                      </div>
                      <div className="space-y-6">
                        <p className="text-sm text-neutral-600 leading-relaxed">{brand.moodBoard.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Imagery Style</p>
                            <p className="text-sm font-medium leading-relaxed">{brand.moodBoard.imageryStyle}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Textures & Patterns</p>
                            <div className="flex flex-wrap gap-2">
                              {brand.moodBoard.textures.map((texture, idx) => (
                                <span key={idx} className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-neutral-700">
                                  {texture}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                          {moodBoardUrls.length > 0 ? (
                            moodBoardUrls.map((url, idx) => (
                              <div key={idx} className="group relative aspect-square bg-neutral-50 rounded-xl overflow-hidden border border-black/5">
                                <img src={url} alt={`Mood Board Image ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                <button 
                                  onClick={() => handleDownload(url, `${brand.name.replace(/\s+/g, '_')}_MoodBoard_${idx + 1}.png`)}
                                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))
                          ) : (
                            [1, 2, 3, 4].map((i) => (
                              <div key={i} className="aspect-square bg-neutral-50 rounded-xl flex items-center justify-center border border-black/5">
                                <Loader2 className="w-5 h-5 animate-spin text-neutral-200" />
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Imagery Styles */}
                  {brand.imagery && (
                    <div className="glass-card p-8 space-y-8">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-neutral-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">Imagery Styles</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Photography */}
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-lg font-bold">Photography</h4>
                            <p className="text-sm text-neutral-500">{brand.imagery.photography.style}</p>
                          </div>
                          <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Examples</p>
                            <ul className="space-y-2">
                              {brand.imagery.photography.examples.map((example, idx) => (
                                <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Illustration */}
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h4 className="text-lg font-bold">Illustration</h4>
                            <p className="text-sm text-neutral-500">{brand.imagery.illustration.style}</p>
                          </div>
                          <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Examples</p>
                            <ul className="space-y-2">
                              {brand.imagery.illustration.examples.map((example, idx) => (
                                <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Typography & Strategy */}
                <div className="space-y-8">
                  {/* Typography */}
                  <div className="glass-card p-8 space-y-8">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">Typography Pairings</span>
                    </div>
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Header Font: {brand.typography.headerFont}</p>
                        <p className="text-4xl font-bold" style={{ fontFamily: brand.typography.headerFont }}>
                          The quick brown fox jumps over the lazy dog.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Body Font: {brand.typography.bodyFont}</p>
                        <p className="text-lg leading-relaxed" style={{ fontFamily: brand.typography.bodyFont }}>
                          Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.
                        </p>
                      </div>
                      
                      <div className="p-6 bg-black/5 rounded-xl space-y-4 mt-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">In Context Preview</p>
                        <h1 className="text-3xl font-bold" style={{ fontFamily: brand.typography.headerFont }}>
                          {brand.name}
                        </h1>
                        <h2 className="text-xl" style={{ fontFamily: brand.typography.headerFont }}>
                          {brand.tagline}
                        </h2>
                        <p className="text-base leading-relaxed" style={{ fontFamily: brand.typography.bodyFont }}>
                          {brand.mission}
                        </p>
                      </div>
                      
                      {/* Typography Rationale Subsection */}
                      <div className="pt-6 border-t border-black/5 space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Pairing Rationale</p>
                        <p className="text-sm text-neutral-600 leading-relaxed italic">
                          "{brand.typography.rationale}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mission Summary */}
                  <div className="glass-card p-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">Brand Mission</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {brand.mission}
                    </p>
                  </div>

                  {/* Brand Personality */}
                  <div className="glass-card p-8 space-y-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">Brand Personality</span>
                    </div>
                    <div className="space-y-4">
                      {brand.personality.map((p, idx) => (
                        <div key={idx} className="space-y-1">
                          <p className="text-sm font-bold">{p.trait}</p>
                          <p className="text-xs text-neutral-500 leading-relaxed italic">
                            "{p.rationale}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tagline Suggestions */}
                  <div className="glass-card p-8 space-y-6">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">Tagline Suggestions</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {brand.marketingCopy.taglines.map((tagline, idx) => (
                        <div key={idx} className="p-4 bg-black/5 rounded-xl border border-black/5 group relative hover:bg-black/10 transition-colors">
                          <p className="text-lg font-serif font-bold italic">"{tagline}"</p>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(tagline);
                              // Optional: add a toast or feedback
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
                            title="Copy to clipboard"
                          >
                            <Download className="w-3.5 h-3.5 rotate-180" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brand Voice */}
                  <div className="glass-card p-8 space-y-6">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">Brand Voice</span>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Tone of Voice</p>
                        <p className="text-sm font-medium leading-relaxed">{brand.brandVoice.tone}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Messaging Principles</p>
                        <p className="text-sm text-neutral-600 leading-relaxed">{brand.brandVoice.messaging}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Mission-Driven Personality</p>
                        <p className="text-sm text-neutral-600 leading-relaxed italic">"{brand.brandVoice.personality}"</p>
                      </div>
                      <div className="pt-4 border-t border-black/5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Voice Rationale</p>
                        <p className="text-xs text-neutral-500 leading-relaxed">{brand.brandVoice.rationale}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/5">
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Language to Use</p>
                          <ul className="space-y-2">
                            {brand.brandVoice.languageToUse.map((word, idx) => (
                              <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                <span>{word}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Language to Avoid</p>
                          <ul className="space-y-2">
                            {brand.brandVoice.languageToAvoid.map((word, idx) => (
                              <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                <span>{word}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {brand.brandVoice.characteristics && brand.brandVoice.characteristics.length > 0 && (
                        <div className="pt-6 border-t border-black/5 space-y-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Key Characteristics</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {brand.brandVoice.characteristics.map((char, idx) => (
                              <div key={idx} className="space-y-2 p-4 bg-neutral-50 rounded-xl border border-black/5">
                                <p className="text-sm font-bold text-neutral-800">{char.name}</p>
                                <p className="text-xs text-neutral-600 leading-relaxed">{char.explanation}</p>
                                <div className="pt-2 mt-2 border-t border-black/5">
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Example</p>
                                  <p className="text-xs text-neutral-700 italic">"{char.exampleSentence}"</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Voice Examples Expansion */}
                      <div className="pt-6 border-t border-black/5 space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Voice in Action</p>
                        <div className="grid grid-cols-1 gap-4">
                          {brand.brandVoice.voiceExamples.map((example, idx) => (
                            <div key={idx} className="space-y-3 p-5 bg-black/5 rounded-xl">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{example.context}</p>
                              <p className="text-xs text-neutral-600 leading-relaxed">{example.application}</p>
                              <div className="pl-4 border-l-2 border-neutral-300">
                                <p className="text-sm text-neutral-800 leading-relaxed italic">"{example.example}"</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slogans */}
                  <div className="glass-card p-8 space-y-6">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">Slogan Options</span>
                    </div>
                    <div className="space-y-6">
                      {brand.slogans.map((s, idx) => (
                        <div key={idx} className="space-y-2 pb-4 border-b border-black/5 last:border-0 last:pb-0">
                          <p className="text-lg font-bold italic">"{s.slogan}"</p>
                          <p className="text-xs text-neutral-500 leading-relaxed">{s.rationale}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Marketing Copy */}
                  {brand.marketingCopy && (
                    <div className="glass-card p-8 space-y-6">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-5 h-5 text-neutral-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">Marketing Copy</span>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Brand Description</p>
                          <p className="text-sm text-neutral-600 leading-relaxed">{brand.marketingCopy.brandDescription}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Voice Words</p>
                          <div className="flex flex-wrap gap-2">
                            {brand.marketingCopy.voiceWords.map((word, idx) => (
                              <span key={idx} className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-neutral-700">
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media Templates */}
              {brand.socialMediaTemplates && brand.socialMediaTemplates.length > 0 && (
                <div className="glass-card p-8 space-y-8">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-5 h-5 text-neutral-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Social Media Templates</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brand.socialMediaTemplates.map((template, idx) => (
                      <div key={idx} className="space-y-4 bg-neutral-50 p-6 rounded-2xl border border-black/5 flex flex-col">
                        {renderTemplatePreview(template, brand, logoUrl)}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-sm font-bold">{template.name}</h4>
                            <span className="px-2 py-0.5 bg-white border border-black/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                              {template.platform}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 leading-relaxed">{template.description}</p>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-black/5 mt-auto">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Layout & Placement</p>
                            <p className="text-xs text-neutral-600 leading-relaxed">{template.layout} {template.contentPlacement}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Brand Integration</p>
                            <p className="text-xs text-neutral-600 leading-relaxed">{template.integration}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Image Suggestion</p>
                            <p className="text-xs text-neutral-600 leading-relaxed">{template.imageSuggestion}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Placeholder Text</p>
                            <p className="text-xs text-neutral-600 leading-relaxed italic bg-black/5 p-3 rounded-lg">"{template.placeholderText}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Business Card Mockup */}
              {brand.businessCardDesign && (
                <div className="glass-card p-8 space-y-8">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-neutral-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Business Card Mockup</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Front */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Front Design</p>
                      <div className="aspect-[1.75/1] bg-white rounded-xl border border-black/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8">
                        <div className="absolute inset-0 opacity-5" style={{ 
                          backgroundImage: `radial-gradient(${brand.colors[0].hex} 1px, transparent 1px)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo" className="w-24 h-24 object-contain mb-4 z-10" />
                        ) : (
                          <div className="w-24 h-24 bg-black text-white flex items-center justify-center font-bold text-4xl rounded-lg mb-4 z-10">
                            {brand.name.charAt(0)}
                          </div>
                        )}
                        <h3 style={{ fontFamily: brand.typography.headerFont }} className="text-2xl font-bold tracking-tight z-10">{brand.name}</h3>
                        <p style={{ fontFamily: brand.typography.bodyFont }} className="text-xs text-neutral-500 uppercase tracking-widest mt-1 z-10">{brand.tagline}</p>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed italic mt-4">{brand.businessCardDesign.front}</p>
                    </div>

                    {/* Back */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Back Design</p>
                      <div className="aspect-[1.75/1] bg-neutral-900 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden p-8 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 style={{ fontFamily: brand.typography.headerFont }} className="text-lg font-bold">Alex Sterling</h4>
                            <p style={{ fontFamily: brand.typography.bodyFont }} className="text-[10px] text-white/60 uppercase tracking-widest">Founder & CEO</p>
                          </div>
                          {iconOnlyLogoUrl || logoUrl ? (
                            <img src={iconOnlyLogoUrl || logoUrl || ''} alt="Icon" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-10 h-10 bg-white/10 rounded-lg" />
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          <p style={{ fontFamily: brand.typography.bodyFont }} className="text-[10px] leading-relaxed text-white/80 max-w-[70%] italic">
                            "{brand.mission}"
                          </p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[9px] font-mono text-white/60 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-white/40"></span>
                              hello@sterling.com
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-white/40"></span>
                              +1 (555) 000-1234
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-white/40"></span>
                              www.{brand.name.toLowerCase().replace(/\s+/g, '')}.com
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-white/40"></span>
                              @sterling_brand
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed italic mt-4">{brand.businessCardDesign.back}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-black/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Design Rationale</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">{brand.businessCardDesign.layoutRationale}</p>
                  </div>
                </div>
              )}

              {/* Social Media Image Generator */}
              {brand && (
                <div className="glass-card p-8 space-y-8">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-neutral-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Social Media Image Generator</span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Topic or Message</label>
                        <textarea 
                          value={socialMediaTopic}
                          onChange={(e) => setSocialMediaTopic(e.target.value)}
                          placeholder="e.g., Announcing a summer sale, showcasing a new product..."
                          className="w-full h-32 px-4 py-3 bg-neutral-50 border border-black/5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/5 resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Brand Color</label>
                          <select
                            value={selectedSocialColor}
                            onChange={(e) => setSelectedSocialColor(e.target.value)}
                            className="w-full bg-neutral-50 px-3 py-2 text-sm rounded-xl border border-black/5 outline-none focus:ring-2 focus:ring-black/5 text-black cursor-pointer"
                          >
                            <option value="">Any Color</option>
                            {brand.colors.map((color, idx) => (
                              <option key={idx} value={color.name}>{color.name} ({color.hex})</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Brand Font Style</label>
                          <select
                            value={selectedSocialFont}
                            onChange={(e) => setSelectedSocialFont(e.target.value)}
                            className="w-full bg-neutral-50 px-3 py-2 text-sm rounded-xl border border-black/5 outline-none focus:ring-2 focus:ring-black/5 text-black cursor-pointer"
                          >
                            <option value="">Any Font Style</option>
                            <option value={brand.typography.headerFont}>Header: {brand.typography.headerFont}</option>
                            <option value={brand.typography.bodyFont}>Body: {brand.typography.bodyFont}</option>
                          </select>
                        </div>
                      </div>
                      <button 
                        onClick={handleGenerateSocialImage}
                        disabled={isGeneratingSocialImage || !socialMediaTopic.trim()}
                        className="w-full py-3 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isGeneratingSocialImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating Image...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate Image
                          </>
                        )}
                      </button>
                    </div>
                    <div className="flex-1">
                      <div className="aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-black/5 relative flex items-center justify-center group">
                        {socialImageUrl ? (
                          <img src={socialImageUrl} alt="Social Media" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : isGeneratingSocialImage ? (
                          <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-neutral-300" />
                            <span className="text-xs text-neutral-400">Creating image...</span>
                          </div>
                        ) : (
                          <div className="text-center p-6">
                            <ImageIcon className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
                            <p className="text-sm text-neutral-400">Enter a topic and click generate to create a custom social media image.</p>
                          </div>
                        )}
                        
                        {socialImageUrl && (
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleDownload(socialImageUrl, `${brand.name.replace(/\s+/g, '_')}_Social_Image.png`)}
                              className="p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-black rounded-full shadow-lg transition-all"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Brand Guidelines */}
              {brand.brandGuidelines && (
                <div className="glass-card p-8 space-y-8">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-neutral-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Brand Guidelines</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-800 border-b border-black/5 pb-2">Logo Usage</h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Clear Space</p>
                            <p className="text-sm text-neutral-600 leading-relaxed">{brand.brandGuidelines.logoUsage.clearSpace}</p>
                            <div className="bg-neutral-50 p-6 rounded-xl border border-black/5 flex items-center justify-center h-40 relative overflow-hidden">
                              <motion.div 
                                animate={{ padding: ["10px", "30px", "10px"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="border border-dashed border-blue-400 bg-blue-50/50 flex items-center justify-center"
                              >
                                {logoUrl ? (
                                  <img src={logoUrl} alt="Logo Clear Space" className="w-16 h-16 object-contain" />
                                ) : (
                                  <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-bold text-xl rounded">
                                    {brand.name.charAt(0)}
                                  </div>
                                )}
                              </motion.div>
                              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-blue-500 uppercase tracking-widest">Clear Space Demo</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Minimum Size</p>
                            <p className="text-sm text-neutral-600 leading-relaxed">{brand.brandGuidelines.logoUsage.minimumSize}</p>
                            <div className="bg-neutral-50 p-6 rounded-xl border border-black/5 flex items-center justify-center h-32 relative overflow-hidden">
                              <motion.div 
                                animate={{ scale: [1, 0.5, 0.25, 0.5, 1] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="flex items-center justify-center"
                              >
                                {logoUrl ? (
                                  <img src={logoUrl} alt="Logo Minimum Size" className="w-24 h-24 object-contain" />
                                ) : (
                                  <div className="w-24 h-24 bg-black text-white flex items-center justify-center font-bold text-3xl rounded">
                                    {brand.name.charAt(0)}
                                  </div>
                                )}
                              </motion.div>
                              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-neutral-400 uppercase tracking-widest">Scale Demo</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Placement</p>
                            <p className="text-sm text-neutral-600 leading-relaxed">{brand.brandGuidelines.logoUsage.placement}</p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div className="bg-neutral-50 rounded-lg border border-black/5 p-4 flex flex-col items-center justify-center gap-2">
                                <div className="w-full h-16 bg-white border border-black/10 rounded relative">
                                  <div className="absolute top-2 left-2 w-4 h-4 bg-green-500 rounded-sm"></div>
                                </div>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-green-600">Acceptable</p>
                              </div>
                              <div className="bg-neutral-50 rounded-lg border border-black/5 p-4 flex flex-col items-center justify-center gap-2">
                                <div className="w-full h-16 bg-white border border-black/10 rounded relative overflow-hidden">
                                  <div className="absolute -left-1 -top-1 w-6 h-6 bg-red-500 rounded-sm"></div>
                                </div>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-red-500">Unacceptable</p>
                              </div>
                            </div>
                          </div>
                          
                          {brand.brandGuidelines.logoUsage.digitalMockups && (
                            <div className="space-y-3 pt-4 border-t border-black/5">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Digital Mockups</p>
                              <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                  <p className="text-xs font-bold text-green-600">Acceptable Applications</p>
                                  <ul className="space-y-2">
                                    {brand.brandGuidelines.logoUsage.digitalMockups.acceptable.map((item, idx) => (
                                      <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-xs font-bold text-red-500">Unacceptable Applications</p>
                                  <ul className="space-y-2">
                                    {brand.brandGuidelines.logoUsage.digitalMockups.unacceptable.map((item, idx) => (
                                      <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}

                          {brand.brandGuidelines.logoUsage.printMockups && (
                            <div className="space-y-3 pt-4 border-t border-black/5">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Print Mockups</p>
                              <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                  <p className="text-xs font-bold text-green-600">Acceptable Applications</p>
                                  <ul className="space-y-2">
                                    {brand.brandGuidelines.logoUsage.printMockups.acceptable.map((item, idx) => (
                                      <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-xs font-bold text-red-500">Unacceptable Applications</p>
                                  <ul className="space-y-2">
                                    {brand.brandGuidelines.logoUsage.printMockups.unacceptable.map((item, idx) => (
                                      <li key={idx} className="text-sm text-neutral-600 flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-800 border-b border-black/5 pb-2">Color Palette Variations</h4>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Primary</p>
                          <div className="flex gap-2">
                            {brand.brandGuidelines.colorPaletteVariations.primary.map((color, idx) => (
                              <div key={idx} className="w-8 h-8 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color }} title={color} />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Secondary</p>
                          <div className="flex gap-2">
                            {brand.brandGuidelines.colorPaletteVariations.secondary.map((color, idx) => (
                              <div key={idx} className="w-8 h-8 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color }} title={color} />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Accent</p>
                          <div className="flex gap-2">
                            {brand.brandGuidelines.colorPaletteVariations.accent.map((color, idx) => (
                              <div key={idx} className="w-8 h-8 rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color }} title={color} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-800 border-b border-black/5 pb-2">Typography Hierarchy</h4>
                        <div className="space-y-6 bg-neutral-50 p-6 rounded-2xl border border-black/5">
                          {(['h1', 'h2', 'h3', 'body', 'caption'] as const).map((level) => (
                            <div key={level} className="space-y-1">
                              <div className="flex justify-between items-baseline">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{level.toUpperCase()}</p>
                                <p className="text-[9px] font-mono text-neutral-500">{brand.brandGuidelines.typographyHierarchy[level].style}</p>
                              </div>
                              <p className="text-xs text-neutral-500 italic mb-1">{brand.brandGuidelines.typographyHierarchy[level].usage}</p>
                              <div className={cn(
                                level === 'h1' ? "text-4xl font-extrabold" :
                                level === 'h2' ? "text-3xl font-bold" :
                                level === 'h3' ? "text-2xl font-semibold" :
                                level === 'body' ? "text-base font-normal" : "text-xs font-light"
                              )} style={{ fontFamily: ['h1', 'h2', 'h3'].includes(level) ? brand.typography.headerFont : brand.typography.bodyFont }}>
                                {level === 'h1' ? 'Heading 1' : level === 'h2' ? 'Heading 2' : level === 'h3' ? 'Heading 3' : level === 'body' ? 'Body text example' : 'Caption text example'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-800 border-b border-black/5 pb-2">Brand Mark Applications</h4>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> Acceptable
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                              {brand.brandGuidelines.brandMarkApplications.acceptable.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center gap-1">
                              <Info className="w-3 h-3" /> Unacceptable
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                              {brand.brandGuidelines.brandMarkApplications.unacceptable.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {brand.brandGuidelines.socialMediaIconStyle && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-800 border-b border-black/5 pb-2">Social Media Icon Style</h4>
                          <div className="space-y-4 bg-neutral-50 p-6 rounded-2xl border border-black/5">
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Color Usage</p>
                              <p className="text-sm text-neutral-600 leading-relaxed">{brand.brandGuidelines.socialMediaIconStyle.colorUsage}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Size Constraints</p>
                              <p className="text-sm text-neutral-600 leading-relaxed">{brand.brandGuidelines.socialMediaIconStyle.sizeConstraints}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Guidance</p>
                              <p className="text-sm text-neutral-600 leading-relaxed">{brand.brandGuidelines.socialMediaIconStyle.guidance}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Acceptable Variations</p>
                              <ul className="list-disc list-inside space-y-1 text-sm text-neutral-600">
                                {brand.brandGuidelines.socialMediaIconStyle.acceptableVariations.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {brand.brandGuidelines.logoVersionGuidelines && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-800 border-b border-black/5 pb-2">Logo Version Guidelines</h4>
                          <div className="space-y-6">
                            {(['primary', 'monochromatic', 'reversed'] as const).map((version) => (
                              <div key={version} className="space-y-3 bg-neutral-50 p-6 rounded-2xl border border-black/5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 border-b border-black/5 pb-1 mb-2">{version} Version</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 flex items-center gap-1">
                                      <ShieldCheck className="w-3 h-3" /> Acceptable Use
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-xs text-neutral-600">
                                      {brand.brandGuidelines.logoVersionGuidelines[version].acceptable.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center gap-1">
                                      <Info className="w-3 h-3" /> Unacceptable Use
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-xs text-neutral-600">
                                      {brand.brandGuidelines.logoVersionGuidelines[version].unacceptable.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Chatbot Toggle */}
      {brand && (
        <div className="fixed bottom-8 right-8 z-50">
          <AnimatePresence>
            {showChat && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] glass-card shadow-2xl flex flex-col overflow-hidden border-black/10"
              >
                <div className="p-4 border-b border-black/5 bg-black text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-bold">Brand Consultant</span>
                  </div>
                  <button onClick={() => setShowChat(false)} className="text-white/60 hover:text-white">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50">
                  {chatMessages.length === 0 && (
                    <div className="text-center py-8 space-y-2">
                      <p className="text-sm text-neutral-500">Ask me anything about your new brand identity!</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {["How should I use the logo?", "Tell me about the colors", "Tone of voice?"].map(q => (
                          <button 
                            key={q}
                            onClick={() => {
                              setChatInput(q);
                            }}
                            className="text-[10px] bg-white border border-black/5 px-2 py-1 rounded-full hover:bg-black hover:text-white transition-all"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={cn(
                      "max-w-[85%] p-3 rounded-2xl text-sm",
                      msg.role === 'user' ? "bg-black text-white ml-auto rounded-tr-none" : "bg-white border border-black/5 mr-auto rounded-tl-none"
                    )}>
                      <div className="prose prose-sm prose-neutral max-w-none">
                        <Markdown>
                          {msg.text}
                        </Markdown>
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="bg-white border border-black/5 mr-auto p-3 rounded-2xl rounded-tl-none">
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-black/5">
                  <div className="relative">
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full pl-4 pr-10 py-2 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-black/5 outline-none text-sm"
                    />
                    <button 
                      type="submit"
                      disabled={!chatInput.trim() || isChatLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-black disabled:opacity-30"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setShowChat(!showChat)}
            className="w-14 h-14 bg-black text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
