'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [operationDisplay, setOperationDisplay] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOperation: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }

    setOperation(nextOperation);
    setOperationDisplay(nextOperation);
    setWaitingForOperand(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setOperationDisplay('');
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setOperationDisplay('');
    setWaitingForOperand(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const operationSymbols: { [key: string]: string } = {
    '+': '➕',
    '-': '➖',
    '*': '✕',
    '/': '÷',
    '%': '%'
  };

  const buttons = [
    { label: 'AC', onClick: handleClear, className: 'col-span-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold' },
    { label: 'DEL', onClick: handleDelete, className: 'bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold' },
    { label: '/', onClick: () => handleOperation('/'), className: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold' },
    { label: '7', onClick: () => handleDigit('7'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '8', onClick: () => handleDigit('8'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '9', onClick: () => handleDigit('9'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '*', onClick: () => handleOperation('*'), className: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold' },
    { label: '4', onClick: () => handleDigit('4'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '5', onClick: () => handleDigit('5'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '6', onClick: () => handleDigit('6'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '-', onClick: () => handleOperation('-'), className: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold' },
    { label: '1', onClick: () => handleDigit('1'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '2', onClick: () => handleDigit('2'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '3', onClick: () => handleDigit('3'), className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '+', onClick: () => handleOperation('+'), className: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold' },
    { label: '0', onClick: () => handleDigit('0'), className: 'col-span-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '.', onClick: handleDecimal, className: 'bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium' },
    { label: '=', onClick: handleEquals, className: 'bg-emerald-600 hover:bg-emerald-700 text-white font-semibold' },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 px-4 py-8 ${
      isDark ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      <div className={`rounded-xl overflow-hidden w-full max-w-sm transition-all duration-300 shadow-lg ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}>
        {/* Display */}
        <div className={`p-6 text-right ${
          isDark ? 'bg-slate-800' : 'bg-slate-100'
        }`}>
          {previousValue !== null && operation && (
            <div className={`text-sm mb-2 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {previousValue} {operation === '*' ? '×' : operation === '/' ? '÷' : operation}
            </div>
          )}
          <div className={`text-5xl font-bold font-mono tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {display.length > 10 ? display.slice(-10) : display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="p-5 grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`py-4 px-2 rounded-lg transition-all duration-150 transform hover:scale-102 active:scale-95 text-lg ${button.className}`}
              data-testid={`button-${button.label}`}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Extra Functions */}
        <div className="px-5 pb-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleToggleSign}
            className={`py-3 px-3 rounded-lg transition-all duration-150 transform hover:scale-102 active:scale-95 font-medium ${
              isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
            data-testid="button-toggleSign"
          >
            +/-
          </button>
          <button
            onClick={() => handleOperation('%')}
            className={`py-3 px-3 rounded-lg transition-all duration-150 transform hover:scale-102 active:scale-95 font-medium ${
              isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
            data-testid="button-%"
          >
            MOD
          </button>
        </div>
      </div>
    </div>
  );
}
