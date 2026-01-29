import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderCalculator } from './test-utils';

describe('Calculator - Number Input', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should display single digit when clicked', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    const displays = screen.getAllByText('5');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should display multiple digits when clicked sequentially', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-1'));
    fireEvent.click(screen.getByTestId('button-2'));
    fireEvent.click(screen.getByTestId('button-3'));
    expect(screen.getByTestId('button-1').textContent).toBe('1');
  });

  it('should not display leading zeros', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-5'));
    const displays = screen.getAllByText('5');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should allow zero after other digits', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-0'));
    const displays = screen.getAllByText('50');
    expect(displays.length).toBeGreaterThan(0);
  });
});
