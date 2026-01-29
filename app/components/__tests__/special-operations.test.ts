import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderCalculator } from './test-utils';

describe('Calculator - Special Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should clear display and state with AC button', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-+'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-AC'));
    const displays = screen.getAllByText('0');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should delete last digit with DEL button', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-1'));
    fireEvent.click(screen.getByTestId('button-2'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-DEL'));
    const displays = screen.getAllByText('12');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should return to 0 when deleting single digit', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-DEL'));
    const displays = screen.getAllByText('0');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should toggle sign correctly', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-toggleSign'));
    const displays = screen.getAllByText('-5');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should toggle sign on negative number', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-toggleSign'));
    fireEvent.click(screen.getByTestId('button-toggleSign'));
    const displays = screen.getAllByText('5');
    expect(displays[0]).toBeInTheDocument();
  });
});
