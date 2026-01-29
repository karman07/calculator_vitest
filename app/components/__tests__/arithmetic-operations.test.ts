import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderCalculator } from './test-utils';

describe('Calculator - Arithmetic Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should perform addition correctly', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-+'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-='));
    const displays = screen.getAllByText('8');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should perform subtraction correctly', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-1'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button--'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-='));
    const displays = screen.getAllByText('7');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should perform multiplication correctly', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-6'));
    fireEvent.click(screen.getByTestId('button-*'));
    fireEvent.click(screen.getByTestId('button-7'));
    fireEvent.click(screen.getByTestId('button-='));
    const displays = screen.getAllByText('42');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should perform division correctly', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-2'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-/'));
    fireEvent.click(screen.getByTestId('button-4'));
    fireEvent.click(screen.getByTestId('button-='));
    const displays = screen.getAllByText('5');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should perform modulo operation correctly', () => {
    renderCalculator();
    fireEvent.click(screen.getByTestId('button-1'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-%'));
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-='));
    const displays = screen.getAllByText('1');
    expect(displays[0]).toBeInTheDocument();
  });
});
