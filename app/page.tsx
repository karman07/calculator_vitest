'use client';

import { Calculator } from './components/Calculator';
import { CurrencyConverter } from './components/CurrencyConverter';
import { useTheme } from './context/ThemeContext';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Tools
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Calculator & Currency Converter
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border ${
              isDark
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-900'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Column */}
            <div className="flex justify-center lg:justify-start">
              <Calculator />
            </div>

            {/* Currency Converter Column */}
            <div className="flex justify-center lg:justify-end">
              <CurrencyConverter />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
