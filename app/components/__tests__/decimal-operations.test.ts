import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderCalculator } from './test-utils';

describe('Calculator - Decimal Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should add decimal point', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-.'));
    const displays = screen.getAllByText('5.');
    expect(displays.length).toBeGreaterThan(0);
  });

  it('should not add multiple decimal points', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-.'));
    fireEvent.click(screen.getByTestId('button-.'));
    const displays = screen.getAllByText('5.');
    expect(displays.length).toBeGreaterThan(0);
  });

  it('should handle decimal numbers correctly', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-.'));
    fireEvent.click(screen.getByTestId('button-5'));
    const displays = screen.getAllByText('3.5');
    expect(displays.length).toBeGreaterThan(0);
  });
});
