import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderCalculator } from './test-utils';

describe('Calculator - Chain Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle chained operations', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-+'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-*'));
    fireEvent.click(screen.getByTestId('button-2'));
    fireEvent.click(screen.getByTestId('button-='));
    // 5 + 3 = 8, 8 * 2 = 16
    const displays = screen.getAllByText('16');
    expect(displays[0]).toBeInTheDocument();
  });
});
