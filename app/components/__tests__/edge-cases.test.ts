import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderCalculator } from './test-utils';

describe('Calculator - Edge Cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle decimal arithmetic', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-2'));
    fireEvent.click(screen.getByTestId('button-.'));
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-+'));
    fireEvent.click(screen.getByTestId('button-1'));
    fireEvent.click(screen.getByTestId('button-.'));
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-='));
    const displays = screen.getAllByText('4');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should handle negative results', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button--'));
    fireEvent.click(screen.getByTestId('button-8'));
    fireEvent.click(screen.getByTestId('button-='));
    const displays = screen.getAllByText('-5');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should reset after equals', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-+'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-='));
    fireEvent.click(screen.getByTestId('button-2'));
    const displays = screen.getAllByText('2');
    expect(displays[0]).toBeInTheDocument();
  });
});
