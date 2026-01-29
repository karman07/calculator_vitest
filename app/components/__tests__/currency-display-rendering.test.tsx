import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderCurrencyConverter } from './currency-test-utils';

describe('CurrencyConverter - Display and Rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render currency converter with title', () => {
    renderCurrencyConverter();
    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
  });

  it('should render amount input field', () => {
    renderCurrencyConverter();
    expect(screen.getByTestId('currency-amount')).toBeInTheDocument();
  });

  it('should render from currency dropdown', () => {
    renderCurrencyConverter();
    expect(screen.getByTestId('from-currency')).toBeInTheDocument();
  });

  it('should render to currency dropdown', () => {
    renderCurrencyConverter();
    expect(screen.getByTestId('to-currency')).toBeInTheDocument();
  });

  it('should render convert button', () => {
    renderCurrencyConverter();
    expect(screen.getByTestId('convert-button')).toBeInTheDocument();
  });

  it('should render swap button', () => {
    renderCurrencyConverter();
    expect(screen.getByTestId('swap-button')).toBeInTheDocument();
  });

  it('should have default currency values', () => {
    renderCurrencyConverter();
    const fromSelect = screen.getByTestId('from-currency') as HTMLSelectElement;
    const toSelect = screen.getByTestId('to-currency') as HTMLSelectElement;

    expect(fromSelect.value).toBe('USD');
    expect(toSelect.value).toBe('INR');
  });

  it('should have default amount value', () => {
    renderCurrencyConverter();
    const amountInput = screen.getByTestId('currency-amount') as HTMLInputElement;
    expect(amountInput.value).toBe('100');
  });
});
