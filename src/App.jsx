
import React, { useState } from "react";
import { Wallet, Send, Repeat, Clock, PieChart, Settings, Plus, ChevronRight, ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from "lucide-react";
import dragonLogo from "./assest/zyros.jpg";
import tonLogo from "./assest/ton.png";
import usdtLogo from "./assest/usdt.png"
import btcLogo from "./assest/btclogo.png"

export default function DragonWallet() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hideBalance, setHideBalance] = useState(false);


  const renderActiveComponent = () => {
    switch (activeTab) {
      case "send":
        return <SendFunds />;
      case "swap":
        return <SwapTokens />;
      case "history":
        return <TransactionHistory />;
      case "staking":
        return <StakingDashboard />;
      case "settings":
        return <WalletSettings />;
      default:
        return <WalletOverview hideBalance={hideBalance} toggleBalance={() => setHideBalance(!hideBalance)} />;
    }
  };

  return (
    <div className="min-h-screen max-h-full bg-gradient-to-br from-zinc-950 to-zinc-900 flex">
    <div className="w-64 flex-shrink-0">
    <nav className="sticky top-0 w-64 bg-black/40 backdrop-blur-md text-white py-6 flex flex-col h-screen border-r border-purple-900/30">
 
        <div className="flex items-center px-6 mb-12">
          <div className="w-16 h-16 flex items-center justify-center mr-2 bg-purple-900/20 rounded-xl p-2">
            <img src={dragonLogo} alt="Zyros Wallet Logo" className="w-full h-full object-contain " />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Zyros<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Wallet</span>
          </h1>
        </div>


        <div className="flex flex-col space-y-2 px-3 mt-2">
          <NavItem
            icon={<Wallet size={18} />}
            label="Overview"
            isActive={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <NavItem
            icon={<Send size={18} />}
            label="Send"
            isActive={activeTab === "send"}
            onClick={() => setActiveTab("send")}
          />
          <NavItem
            icon={<Repeat size={18} />}
            label="Swap"
            isActive={activeTab === "swap"}
            onClick={() => setActiveTab("swap")}
          />
          <NavItem
            icon={<Clock size={18} />}
            label="History"
            isActive={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          />
          <NavItem
            icon={<PieChart size={18} />}
            label="Staking"
            isActive={activeTab === "staking"}
            onClick={() => setActiveTab("staking")}
          />
          <NavItem
            icon={<Settings size={18} />}
            label="Settings"
            isActive={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </div>
        
    
        <div className="mt-auto px-6 py-4">
          <div className="text-xs text-gray-500 border-t border-gray-800 pt-4">
            <p>© 2025 Zyros Wallet</p>
            <p>Secure Crypto Management</p>
          </div>
        </div>
      </nav>
      </div>


      <main className="flex-1 p-8 text-white overflow-auto">
        {renderActiveComponent()}
      </main>
    </div>
  );
}


function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 ${
        isActive 
          ? "bg-gradient-to-r from-purple-800 to-blue-800 text-white shadow-lg shadow-purple-900/30" 
          : "text-gray-400 hover:bg-zinc-800/50 hover:text-purple-400"
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className={isActive ? "text-white" : "text-gray-500"}>{icon}</span>
        <span>{label}</span>
      </div>
      {isActive && <ChevronRight size={16} />}
    </button>
  );
}

function WalletOverview({ hideBalance, toggleBalance }) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">

      <div className="relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 blur"></div>
        <div className="relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-purple-800/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Total Balance</h2>
            <button 
              onClick={toggleBalance} 
              className="text-gray-400 hover:text-white transition-colors"
            >
              {hideBalance ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          
          <div className="mt-2">
            <h3 className="text-4xl font-bold mb-1">
              {hideBalance ? "••••••" : "$14,586.24"}
            </h3>
            <p className="text-green-500 text-sm">
              {hideBalance ? "••••••" : "+2.4% ($345.20 today)"}
            </p>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button className="px-4 py-2 bg-purple-700/80 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2">
              <Send size={16} />
              <span>Send</span>
            </button>
            <button className="px-4 py-2 bg-blue-700/80 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
              <Plus size={16} />
              <span>Receive</span>
            </button>
          </div>
        </div>
      </div>
      
 
      <div className="bg-zinc-900/70 backdrop-blur-sm p-6 rounded-xl border border-purple-800/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Your Assets</h3>
          <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
        </div>
        
        <div className="space-y-4">
          <AssetItem 
            name="ZYROS" 
            symbol="ZYROS" 
            balance={hideBalance ? "••••••" : "5,842.65"} 
            value={hideBalance ? "••••••" : "$8,764.00"} 
            change="+3.2%" 
            positiveChange={true}
            image={dragonLogo}
          />
          
          <AssetItem 
            name="Toncoin" 
            symbol="TON" 
            balance={hideBalance ? "••••••" : "124.5"} 
            value={hideBalance ? "••••••" : "$3,112.50"} 
            change="+1.8%" 
            positiveChange={true}
            image={tonLogo} 
          />
          
          <AssetItem 
            name="USDT" 
            symbol="USDT" 
            balance={hideBalance ? "••••••" : "2,500.00"} 
            value={hideBalance ? "••••••" : "$2,500.00"} 
            change="0.0%" 
            positiveChange={true}
            image={usdtLogo} 
          />
          
          <AssetItem 
            name="Bitcoin" 
            symbol="BTC" 
            balance={hideBalance ? "••••••" : "0.00425"} 
            value={hideBalance ? "••••••" : "$209.74"} 
            change="-1.2%" 
            positiveChange={false}
            image={btcLogo}
          />
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-zinc-900/70 backdrop-blur-sm p-6 rounded-xl border border-blue-800/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
        </div>
        
        <div className="space-y-4">
          <TransactionItem 
            type="sent" 
            asset="ZYROS" 
            amount={hideBalance ? "••••••" : "120"} 
            counterparty="0x7f...3a4b" 
            time="2 hours ago" 
            image={dragonLogo} 
          />
          
          <TransactionItem 
            type="received" 
            asset="TON" 
            amount={hideBalance ? "••••••" : "10.5"} 
            counterparty="0x3a...8c2d" 
            time="Yesterday" 
            image={tonLogo} 
          />
          
          <TransactionItem 
            type="received" 
            asset="ZYROS" 
            amount={hideBalance ? "••••••" : "450"} 
            counterparty="Staking Rewards" 
            time="2 days ago" 
            image={dragonLogo}
          />
        </div>
      </div>
    </div>
  );
}


function AssetItem({ name, symbol, balance, value, change, positiveChange,image}) {

  return (
    <div className="flex items-center justify-between p-4 hover:bg-zinc-800/30 rounded-lg transition-colors cursor-pointer">
      <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
    <img className="w-8 h-8 rounded-xl" src={image} alt={`${name} logo`} />
</div>

        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-400">{balance} {symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{value}</p>

        <p className={`text-sm ${positiveChange ? "text-green-500" : "text-red-500"}`}>
          {change}
        </p>
      </div>
    </div>
  );
}


function TransactionItem({ type, asset, amount, counterparty, time }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-zinc-800/30 rounded-lg transition-colors cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          type === "sent" ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
        }`}>
          {type === "sent" ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
        </div>
        <div>
          <h4 className="font-medium">{type === "sent" ? "Sent" : "Received"} {asset}</h4>
          <p className="text-sm text-gray-400">{counterparty}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${type === "sent" ? "text-red-500" : "text-green-500"}`}>
          {type === "sent" ? "-" : "+"}{amount}
        </p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}


function SendFunds() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 blur"></div>
        <div className="relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-purple-800/50">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">Send Funds</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Select Asset</label>
              <select className="w-full bg-zinc-800/90 border border-purple-800/40 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
                <option>ZYROS (ZYROS)</option>
                <option>Toncoin (TON)</option>
                <option>USD Tether (USDT)</option>
                <option>Bitcoin (BTC)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Recipient Address</label>
              <input 
                type="text" 
                placeholder="Enter wallet address or scan QR code" 
                className="w-full bg-zinc-800/90 border border-purple-800/40 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Amount</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0.00" 
                  className="w-full bg-zinc-800/90 border border-purple-800/40 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                />
                <button className="absolute right-3 top-3 px-2 py-1 bg-purple-700/50 text-xs text-white rounded hover:bg-purple-600 transition-colors">
                  MAX
                </button>
              </div>
              <p className="text-sm text-right mt-2 text-gray-400">≈ $0.00</p>
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Transaction Fee</label>
              <div className="flex space-x-4">
                <button className="flex-1 px-4 py-3 bg-zinc-800/90 border border-purple-800/40 rounded-lg text-white hover:border-purple-500 transition-all">
                  <p className="font-medium">Slow</p>
                  <p className="text-sm text-gray-400">0.01 TON</p>
                </button>
                <button className="flex-1 px-4 py-3 bg-zinc-800/90 border border-purple-500 rounded-lg text-white hover:border-purple-500 transition-all">
                  <p className="font-medium">Normal</p>
                  <p className="text-sm text-gray-400">0.05 TON</p>
                </button>
                <button className="flex-1 px-4 py-3 bg-zinc-800/90 border border-purple-800/40 rounded-lg text-white hover:border-purple-500 transition-all">
                  <p className="font-medium">Fast</p>
                  <p className="text-sm text-gray-400">0.1 TON</p>
                </button>
              </div>
            </div>
            
            <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-900/20 mt-4">
              Review Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Swap Tokens Component
function SwapTokens() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 blur"></div>
        <div className="relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-purple-800/50">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">Swap Tokens</h2>
          
          <div className="space-y-6">
            <div className="bg-zinc-800/90 border border-purple-800/40 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <label className="text-gray-400">From</label>
                <span className="text-sm text-gray-400">Balance: 5,842.65 ZYROS</span>
              </div>
              <div className="flex items-center space-x-4">
                <input 
                  type="text" 
                  placeholder="0.00" 
                  className="w-full bg-transparent text-white text-2xl focus:outline-none"
                />
                <div className="flex items-center space-x-2 bg-zinc-700/50 py-2 px-3 rounded-lg cursor-pointer hover:bg-zinc-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
      <img src={dragonLogo} alt="" />
                  </div>
                  <span>ZYROS</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button className="p-2 bg-zinc-800 rounded-full border border-purple-800/40 hover:border-purple-500 transition-all">
                <Repeat size={20} />
              </button>
            </div>
            
            <div className="bg-zinc-800/90 border border-purple-800/40 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <label className="text-gray-400">To</label>
                <span className="text-sm text-gray-400">Balance: 124.5 TON</span>
              </div>
              <div className="flex items-center space-x-4">
                <input 
                  type="text" 
                  placeholder="0.00" 
                  className="w-full bg-transparent text-white text-2xl focus:outline-none"
                />
                <div className="flex items-center space-x-2 bg-zinc-700/50 py-2 px-3 rounded-lg cursor-pointer hover:bg-zinc-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                  <img src={tonLogo} alt="" />
                  </div>
                  <span>TON</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Exchange Rate</span>
                <span className="text-white">1 ZYROS ≈ $0.000188935</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Price Impact</span>
                <span className="text-green-500">0.1%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Network Fee</span>
                <span className="text-white">0.05 TON</span>
              </div>
            </div>
            
            <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg shadow-purple-900/20 mt-4">
              Swap Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Transaction History Component
function TransactionHistory() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 blur"></div>
        <div className="relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-purple-800/50">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">Transaction History</h2>
          
          <div className="flex space-x-4 mb-6">
            <button className="px-4 py-2 bg-purple-700/80 text-white rounded-lg">All</button>
            <button className="px-4 py-2 bg-zinc-800/80 text-gray-300 rounded-lg hover:bg-zinc-700/80 transition-colors">Sent</button>
            <button className="px-4 py-2 bg-zinc-800/80 text-gray-300 rounded-lg hover:bg-zinc-700/80 transition-colors">Received</button>
            <button className="px-4 py-2 bg-zinc-800/80 text-gray-300 rounded-lg hover:bg-zinc-700/80 transition-colors">Swaps</button>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-gray-500 px-2">Today</div>
            
            <TransactionItem 
              type="sent" 
              asset="ZYROS" 
              amount="120" 
              counterparty="0x7f...3a4b" 
              time="2 hours ago" 
            />
            
            <div className="text-sm text-gray-500 px-2">Yesterday</div>
            
            <TransactionItem 
              type="received" 
              asset="TON" 
              amount="10.5" 
              counterparty="0x3a...8c2d" 
              time="Yesterday" 
            />
            
            <TransactionItem 
              type="sent" 
              asset="USDT" 
              amount="500" 
              counterparty="0x5d...7e2f" 
              time="Yesterday" 
            />
            
            <div className="text-sm text-gray-500 px-2">March 28, 2025</div>
            
            <TransactionItem 
              type="received" 
              asset="ZYROS" 
              amount="450" 
              counterparty="Staking Rewards" 
              time="2 days ago" 
            />
            
            <TransactionItem 
              type="sent" 
              asset="TON" 
              amount="15" 
              counterparty="0x8c...1a3b" 
              time="2 days ago" 
            />
            
            <TransactionItem 
              type="received" 
              asset="BTC" 
              amount="0.002" 
              counterparty="0x4f...9c2d" 
              time="2 days ago" 
            />
          </div>
          
          <div className="mt-6 text-center">
            <button className="px-4 py-2 bg-zinc-800/80 text-gray-300 rounded-lg hover:bg-zinc-700/80 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletSettings() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 blur"></div>
        <div className="relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border border-purple-800/50">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">Wallet Settings</h2>
          
          <div className="space-y-6">
            {/* Account Security Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Account Security</h3>
              
              <div className="bg-zinc-800/80 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">2-Factor Authentication</div>
                  <div className="text-sm text-gray-400">Add an extra layer of security to your account</div>
                </div>
                <div className="relative">
                  <input type="checkbox" id="2fa-toggle" className="sr-only" />
                  <div className="block bg-zinc-700 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-purple-500 w-6 h-6 rounded-full transition"></div>
                </div>
              </div>
              
              <div className="bg-zinc-800/80 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">Transaction PIN</div>
                  <div className="text-sm text-gray-400">Require PIN for all transactions</div>
                </div>
                <button className="px-4 py-2 bg-purple-700/80 text-white rounded-lg">Set PIN</button>
              </div>
              
              <div className="bg-zinc-800/80 rounded-lg p-4">
                <div className="font-medium text-white mb-2">Recovery Phrase</div>
                <div className="text-sm text-gray-400 mb-3">Backup your wallet with a 12-word recovery phrase</div>
                <button className="px-4 py-2 bg-purple-700/80 text-white rounded-lg">View Recovery Phrase</button>
              </div>
            </div>
            
            {/* Network Settings */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Network Settings</h3>
              
              <div className="bg-zinc-800/80 rounded-lg p-4">
                <div className="font-medium text-white mb-2">Default Network</div>
                <select className="w-full bg-zinc-700 text-white p-2 rounded-lg border border-zinc-600">
                  <option>Mainnet</option>
                  <option>Testnet</option>
                  <option>Custom RPC</option>
                </select>
              </div>
              
              <div className="bg-zinc-800/80 rounded-lg p-4">
                <div className="font-medium text-white mb-2">Gas Settings</div>
                <div className="text-sm text-gray-400 mb-3">Configure default gas price for transactions</div>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-purple-700/80 text-white rounded-lg">Standard</button>
                  <button className="px-4 py-2 bg-zinc-700/80 text-gray-300 rounded-lg hover:bg-zinc-600/80 transition-colors">Fast</button>
                  <button className="px-4 py-2 bg-zinc-700/80 text-gray-300 rounded-lg hover:bg-zinc-600/80 transition-colors">Custom</button>
                </div>
              </div>
            </div>
            
            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Preferences</h3>
              
              <div className="bg-zinc-800/80 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">Currency Display</div>
                  <div className="text-sm text-gray-400">Show fiat equivalent value</div>
                </div>
                <div className="relative">
                  <input type="checkbox" id="currency-toggle" className="sr-only" checked />
                  <div className="block bg-zinc-700 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-7 top-1 bg-purple-500 w-6 h-6 rounded-full transition"></div>
                </div>
              </div>
              
              <div className="bg-zinc-800/80 rounded-lg p-4">
                <div className="font-medium text-white mb-2">Local Currency</div>
                <select className="w-full bg-zinc-700 text-white p-2 rounded-lg border border-zinc-600">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>TRY (₺)</option>
                  <option>BTC (₿)</option>
                </select>
              </div>
              
              <div className="bg-zinc-800/80 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">Theme</div>
                  <div className="text-sm text-gray-400">Dark mode</div>
                </div>
                <div className="relative">
                  <input type="checkbox" id="theme-toggle" className="sr-only" checked />
                  <div className="block bg-zinc-700 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-7 top-1 bg-purple-500 w-6 h-6 rounded-full transition"></div>
                </div>
              </div>
            </div>
            
            {/* Connected Apps */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Connected Applications</h3>
              
              <div className="bg-zinc-800/80 rounded-lg p-4">
                <div className="font-medium text-white mb-3">Manage Connected dApps</div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">D</div>
                      <div className="text-white">ZyrosSwap</div>
                    </div>
                    <button className="px-3 py-1 bg-red-700/40 text-red-300 text-sm rounded-lg hover:bg-red-700/60 transition-colors">Disconnect</button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">N</div>
                      <div className="text-white">NFT Marketplace</div>
                    </div>
                    <button className="px-3 py-1 bg-red-700/40 text-red-300 text-sm rounded-lg hover:bg-red-700/60 transition-colors">Disconnect</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-zinc-700/80 text-gray-300 rounded-lg hover:bg-zinc-600/80 transition-colors">
              Reset to Default
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function StakingDashboard () {
  return(
    <div className="space-y-8 max-w-4xl mx-auto">
      <h2 className="text-center text-3xl">Staking Dashboard</h2>
      <div className="flex justify-between border-blue-800  r items-center mb-4 border w-full h-[200px]  bg-gradient-to-r from-purple-400 to-blue-400  rounded-xl">
            <h2 className="text-3xl   ml-2 text-center    font-bold bg-clip-text text-transparent text-white ">Staking Balance</h2>
            <p 
  
              className="text-white font-bold mr-2 text-3xl hover:text-white transition-colors"
            >
           26  <span className="border w-5 h-5 rounded-xl p-2"> ZYROS</span>
            </p>
          </div>


          <div className="flex justify-between border-blue-800  r items-center mb-4 border w-full h-[200px]  rounded-xl  bg-gradient-to-r from-purple-400 to-blue-400">
            <h2 className="text-2xl   ml-2 text-center   font-bold bg-clip-text text-transparent text-white ">Total Balance</h2>
            <p 
  
              className="text-white  text-3xl font-bold mr-2 hover:text-white transition-colors"
            >
           130 <span className="border w-5 h-5 rounded-xl p-2"> ZYROS</span>
            </p>
          </div>
    </div>
  )
}