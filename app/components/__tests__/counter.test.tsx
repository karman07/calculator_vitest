import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRedux } from './counter-test-utils';

describe('Counter Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render with initial value of 0', () => {
    renderWithRedux();
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
  });

  it('should render with custom initial value', () => {
    renderWithRedux({ counter: { value: 10 } });
    expect(screen.getByTestId('counter-value')).toHaveTextContent('10');
  });

  it('should increment when + button is clicked', () => {
    renderWithRedux();
    const incrementButton = screen.getByTestId('increment-button');
    fireEvent.click(incrementButton);
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
  });

  it('should decrement when - button is clicked', () => {
    renderWithRedux();
    const decrementButton = screen.getByTestId('decrement-button');
    fireEvent.click(decrementButton);
    expect(screen.getByTestId('counter-value')).toHaveTextContent('-1');
  });

  it('should increment by 5 when +5 button is clicked', () => {
    renderWithRedux();
    const incrementBy5Button = screen.getByTestId('increment-by-5-button');
    fireEvent.click(incrementBy5Button);
    expect(screen.getByTestId('counter-value')).toHaveTextContent('5');
  });

  it('should handle multiple button clicks', () => {
    renderWithRedux();
    const incrementButton = screen.getByTestId('increment-button');
    const decrementButton = screen.getByTestId('decrement-button');
    
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
  });

  it('should render all buttons', () => {
    renderWithRedux();
    expect(screen.getByTestId('increment-button')).toBeInTheDocument();
    expect(screen.getByTestId('decrement-button')).toBeInTheDocument();
    expect(screen.getByTestId('increment-by-5-button')).toBeInTheDocument();
  });
});