import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderCalculator } from './test-utils';

describe('Calculator - Display and Basic Rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render calculator with initial display of 0', () => {
    renderCalculator();
    const displays = screen.getAllByText('0');
    expect(displays[0]).toBeInTheDocument();
  });

  it('should render all number buttons', () => {
    renderCalculator();
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByTestId(`button-${i}`)).toBeInTheDocument();
    }
  });

  it('should render all operation buttons', () => {
    renderCalculator();
    expect(screen.getByTestId('button-+')).toBeInTheDocument();
    expect(screen.getByTestId('button--')).toBeInTheDocument();
    expect(screen.getByTestId('button-*')).toBeInTheDocument();
    expect(screen.getByTestId('button-/')).toBeInTheDocument();
  });

  it('should render special buttons', () => {
    renderCalculator();
    expect(screen.getByTestId('button-AC')).toBeInTheDocument();
    expect(screen.getByTestId('button-DEL')).toBeInTheDocument();
    expect(screen.getByTestId('button-=')).toBeInTheDocument();
    expect(screen.getByTestId('button-.')).toBeInTheDocument();
    expect(screen.getByTestId('button-toggleSign')).toBeInTheDocument();
    expect(screen.getByTestId('button-%')).toBeInTheDocument();
  });
});
