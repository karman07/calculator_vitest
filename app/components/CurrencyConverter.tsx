'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

interface ExchangeRateData {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
}

interface Currency {
  code: string;
  name: string;
  flag: string;
}

const POPULAR_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
];

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState('100');
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const convertCurrency = async (from: string, to: string, amt: string) => {
    if (!amt || parseFloat(amt) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amt}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.error?.info || 'Conversion failed');
      }

      setResult(data.result);
      setRate(data.rate);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
      setRate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    convertCurrency(fromCurrency, toCurrency, amount);
  }, []);

  const handleConvert = () => {
    convertCurrency(fromCurrency, toCurrency, amount);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getFromCurrencyName = () =>
    POPULAR_CURRENCIES.find((c) => c.code === fromCurrency)?.name || fromCurrency;
  const getToCurrencyName = () =>
    POPULAR_CURRENCIES.find((c) => c.code === toCurrency)?.name || toCurrency;
  const getFromFlag = () =>
    POPULAR_CURRENCIES.find((c) => c.code === fromCurrency)?.flag || '';
  const getToFlag = () =>
    POPULAR_CURRENCIES.find((c) => c.code === toCurrency)?.flag || '';

  return (
    <div className={`w-full max-w-lg rounded-xl overflow-hidden transition-all duration-300 shadow-lg ${
      isDark ? 'bg-slate-900' : 'bg-white'
    }`}>
      {/* Header */}
      <div className={`p-6 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Currency Converter
        </h2>
        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Real-time exchange rates
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Amount Input */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            data-testid="currency-amount"
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            } focus:outline-none focus:border-blue-500`}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>

        {/* From Currency */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            From {getFromFlag()}
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              convertCurrency(e.target.value, toCurrency, amount);
            }}
            data-testid="from-currency"
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-slate-50 border-slate-300 text-slate-900'
            } focus:outline-none focus:border-blue-500`}
          >
            {POPULAR_CURRENCIES.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={handleSwap}
            data-testid="swap-button"
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              isDark
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            ⇅ Swap
          </button>
        </div>

        {/* To Currency */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            To {getToFlag()}
          </label>
          <select
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(e.target.value);
              convertCurrency(fromCurrency, e.target.value, amount);
            }}
            data-testid="to-currency"
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-slate-50 border-slate-300 text-slate-900'
            } focus:outline-none focus:border-blue-500`}
          >
            {POPULAR_CURRENCIES.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={loading}
          data-testid="convert-button"
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
            loading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:scale-105 active:scale-95'
          } ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>

        {/* Error Message */}
        {error && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            isDark
              ? 'bg-red-900/30 text-red-300 border border-red-700'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`} data-testid="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Result */}
        {result !== null && !error && (
          <div className={`mt-6 p-4 rounded-lg border-2 ${
            isDark
              ? 'bg-slate-800 border-green-700'
              : 'bg-green-50 border-green-300'
          }`} data-testid="result-display">
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {amount} {fromCurrency} ({getFromCurrencyName()}) equals
            </p>
            <p className={`text-3xl font-bold mt-2 ${
              isDark ? 'text-green-400' : 'text-green-700'
            }`}>
              {result.toFixed(2)} {toCurrency}
            </p>
            {rate && (
              <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
