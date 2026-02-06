import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AITool {
  id: number;
  name: string;
  category: string;
  status: 'HOT' | 'NEW' | 'RISING';
  launchDate: string;
  description: string;
  change: number;
}

const mockTools: AITool[] = [
  { id: 1, name: 'NeuralForge', category: 'Code Gen', status: 'HOT', launchDate: 'Today', description: 'AI pair programmer that actually understands your codebase', change: 847 },
  { id: 2, name: 'VoxCraft', category: 'Voice AI', status: 'NEW', launchDate: 'Yesterday', description: 'Clone any voice with 3 seconds of audio', change: 234 },
  { id: 3, name: 'PixelMind', category: 'Image Gen', status: 'RISING', launchDate: '2 days ago', description: 'Photorealistic renders in under 2 seconds', change: 562 },
  { id: 4, name: 'DataWeave', category: 'Analytics', status: 'HOT', launchDate: 'Today', description: 'Turn spreadsheets into insights with natural language', change: 923 },
  { id: 5, name: 'AgentStack', category: 'Agents', status: 'NEW', launchDate: 'Today', description: 'Deploy autonomous AI agents in minutes', change: 445 },
  { id: 6, name: 'SynthFlow', category: 'Music', status: 'RISING', launchDate: '3 days ago', description: 'Generate production-ready beats with AI', change: 312 },
  { id: 7, name: 'DocuBrain', category: 'RAG', status: 'HOT', launchDate: 'Yesterday', description: 'Chat with your entire document library', change: 678 },
  { id: 8, name: 'VideoForge', category: 'Video', status: 'NEW', launchDate: 'Today', description: 'Text to cinematic video in 60 seconds', change: 1205 },
];

const categories = ['ALL', 'Code Gen', 'Voice AI', 'Image Gen', 'Analytics', 'Agents', 'Music', 'RAG', 'Video'];

function TickerBar() {
  const tickerItems = [
    '127 NEW AI TOOLS THIS WEEK',
    'AGENT FRAMEWORKS UP 340%',
    'CODE ASSISTANTS DOMINATING',
    'VOICE CLONING EXPLODING',
    'VIDEO AI IS HERE',
    'RAG TOOLS MULTIPLYING',
  ];

  return (
    <div className="bg-[#00ff88] text-black py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -2000] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="mx-8 font-mono font-bold text-sm tracking-tight">
            {item} <span className="text-[#003d1f]">///</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, suffix = '' }: { label: string; value: string; suffix?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0a0a0a] border border-[#222] p-4 md:p-6"
    >
      <div className="text-[#666] text-xs font-mono uppercase tracking-widest mb-2">{label}</div>
      <div className="text-2xl md:text-4xl font-bold text-white font-mono">
        {value}<span className="text-[#00ff88]">{suffix}</span>
      </div>
    </motion.div>
  );
}

function ToolCard({ tool, index }: { tool: AITool; index: number }) {
  const statusColors = {
    HOT: 'bg-red-500 text-white',
    NEW: 'bg-[#00ff88] text-black',
    RISING: 'bg-yellow-400 text-black',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, backgroundColor: '#111' }}
      className="bg-[#0a0a0a] border border-[#222] p-4 md:p-5 cursor-pointer group transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 text-[10px] font-mono font-bold ${statusColors[tool.status]}`}>
            {tool.status}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#00ff88] transition-colors">
            {tool.name}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#00ff88] font-mono text-sm">+{tool.change}</span>
          <svg className="w-4 h-4 text-[#00ff88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </div>
      <p className="text-[#888] text-sm mb-3 line-clamp-2">{tool.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#444] font-mono">{tool.category}</span>
        <span className="text-[#666]">{tool.launchDate}</span>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [toolCount, setToolCount] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      setToolCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredTools = activeCategory === 'ALL'
    ? mockTools
    : mockTools.filter(t => t.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Ticker */}
      <TickerBar />

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(#00ff8810 1px, transparent 1px),
              linear-gradient(90deg, #00ff8810 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <span className="text-[#00ff88] font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
                /// THE AI TOOL TRACKER ///
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
              <span className="block">EVERY AI TOOL.</span>
              <span className="block text-[#00ff88]">EVERY LAUNCH.</span>
              <span className="block text-[#666]">EVERY DAY.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto mb-10 font-light px-4">
              The AI landscape moves fast. <span className="text-white font-medium">Too fast.</span>
              <br className="hidden sm:block" />
              Get the definitive weekly digest of every tool worth knowing about.
            </p>

            {/* Subscribe Form */}
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto px-4"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-[#111] border-2 border-[#333] px-5 py-4 text-white placeholder-[#555] font-mono focus:outline-none focus:border-[#00ff88] transition-colors text-base"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#00ff88] text-black px-8 py-4 font-bold font-mono uppercase tracking-wider hover:bg-[#00cc6a] transition-colors min-h-[56px]"
                  >
                    Subscribe
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#00ff88] text-black px-8 py-4 inline-block font-bold font-mono"
                >
                  YOU'RE IN. FIRST ISSUE DROPS MONDAY.
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[#444] text-sm mt-4 font-mono">
              Join 12,847+ founders, investors, and builders
            </p>
          </motion.div>
        </div>
      </header>

      {/* Stats Strip */}
      <section className="border-y border-[#222] bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Tools Tracked" value={toolCount.toLocaleString()} suffix="+" />
            <StatCard label="This Week" value="127" suffix=" new" />
            <StatCard label="Categories" value="23" />
            <StatCard label="Growth Rate" value="340" suffix="%" />
          </div>
        </div>
      </section>

      {/* Live Feed */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="text-[#00ff88] font-mono text-xs tracking-[0.2em] uppercase block mb-2">
              Live Feed
            </span>
            <h2 className="text-2xl md:text-4xl font-black">LATEST LAUNCHES</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
            <span className="text-[#666] font-mono text-sm">Updating in real-time</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 font-mono text-sm whitespace-nowrap transition-all min-h-[44px] ${
                activeCategory === cat
                  ? 'bg-[#00ff88] text-black'
                  : 'bg-[#111] text-[#888] hover:text-white border border-[#222]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="border-t border-[#222] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="text-center mb-12">
            <span className="text-[#00ff88] font-mono text-xs tracking-[0.2em] uppercase block mb-2">
              Every Issue
            </span>
            <h2 className="text-2xl md:text-4xl font-black">WHAT YOU GET</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: '01',
                title: 'Tool Drops',
                description: 'Every significant AI tool launch, categorized and rated by potential impact.',
              },
              {
                icon: '02',
                title: 'Trend Analysis',
                description: 'Which categories are heating up, cooling down, and why it matters for you.',
              },
              {
                icon: '03',
                title: 'Alpha Picks',
                description: 'Our top 3 tools of the week that could change how you work.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-[#222] p-6 md:p-8 group hover:border-[#00ff88] transition-colors"
              >
                <span className="text-5xl md:text-6xl font-black text-[#111] group-hover:text-[#00ff88]/20 transition-colors">
                  {item.icon}
                </span>
                <h3 className="text-xl font-bold mt-4 mb-2">{item.title}</h3>
                <p className="text-[#666]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#222]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6">
              DON'T GET LEFT BEHIND.
            </h2>
            <p className="text-[#888] text-lg mb-8 max-w-xl mx-auto">
              The AI revolution won't wait for you to catch up.
              <br />
              <span className="text-[#00ff88]">Stay ahead. Subscribe now.</span>
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form2"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto px-4"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-[#111] border-2 border-[#333] px-5 py-4 text-white placeholder-[#555] font-mono focus:outline-none focus:border-[#00ff88] transition-colors text-base"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#00ff88] text-black px-8 py-4 font-bold font-mono uppercase tracking-wider hover:bg-[#00cc6a] transition-colors min-h-[56px]"
                  >
                    Subscribe
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#00ff88] text-black px-8 py-4 inline-block font-bold font-mono"
                >
                  YOU'RE IN. FIRST ISSUE DROPS MONDAY.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-[#444] text-xs font-mono">
            Requested by <a href="https://twitter.com/speedrun26mil" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#888] transition-colors">@speedrun26mil</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#888] transition-colors">@clonkbot</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
