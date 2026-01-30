import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import counterReducer, { increment, decrement, incrementByAmount } from '../../store/counterSlice';

describe('Counter Slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const initialState = { value: 0 };

  it('should return the initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(1);
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(-1);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(5));
    expect(actual.value).toEqual(5);
  });

  it('should handle multiple increments', () => {
    let state = counterReducer(initialState, increment());
    state = counterReducer(state, increment());
    expect(state.value).toEqual(2);
  });

  it('should handle increment then decrement', () => {
    let state = counterReducer(initialState, increment());
    state = counterReducer(state, decrement());
    expect(state.value).toEqual(0);
  });
});