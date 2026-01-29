import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderCurrencyConverter } from './currency-test-utils';

describe('CurrencyConverter - Amount Input', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up fetch mock with frankfurter.app API format
    (global.fetch as any) = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        amount: 1,
        base: 'USD',
        date: '2026-01-29',
        rates: { INR: 83 },
      }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update amount input', () => {
    renderCurrencyConverter();
    const amountInput = screen.getByTestId('currency-amount') as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: '500' } });

    expect(amountInput.value).toBe('500');
  });

  it('should accept decimal amounts', () => {
    renderCurrencyConverter();
    const amountInput = screen.getByTestId('currency-amount') as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: '123.45' } });

    expect(amountInput.value).toBe('123.45');
  });

  it('should accept zero amount', () => {
    renderCurrencyConverter();
    const amountInput = screen.getByTestId('currency-amount') as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: '0' } });

    expect(amountInput.value).toBe('0');
  });

  it('should accept large amounts', () => {
    renderCurrencyConverter();
    const amountInput = screen.getByTestId('currency-amount') as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: '999999999' } });

    expect(amountInput.value).toBe('999999999');
  });
});
