'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { increment, decrement, incrementByAmount } from '../store/counterSlice';
import { useTheme } from '../context/ThemeContext';

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
      isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}>
        Counter
      </h2>
      <div className={`text-6xl font-mono text-center mb-6 p-4 rounded-lg ${
        isDark ? 'text-green-400 bg-slate-900' : 'text-blue-600 bg-slate-50'
      }`} data-testid="counter-value">
        {count}
      </div>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => dispatch(decrement())}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
          data-testid="decrement-button"
        >
          -
        </button>
        <button
          onClick={() => dispatch(increment())}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          data-testid="increment-button"
        >
          +
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          data-testid="increment-by-5-button"
        >
          +5
        </button>
      </div>
    </div>
  );
}