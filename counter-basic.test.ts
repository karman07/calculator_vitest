/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';

// Simple counter reducer
const counterReducer = (state = { value: 0 }, action: any) => {
  switch (action.type) {
    case 'increment':
      return { value: state.value + 1 };
    case 'decrement':
      return { value: state.value - 1 };
    case 'incrementByAmount':
      return { value: state.value + action.payload };
    default:
      return state;
  }
};

describe('Redux Counter Tests', () => {
  it('should increment counter', () => {
    const initialState = { value: 0 };
    const action = { type: 'increment' };
    const result = counterReducer(initialState, action);
    expect(result.value).toBe(1);
  });

  it('should decrement counter', () => {
    const initialState = { value: 0 };
    const action = { type: 'decrement' };
    const result = counterReducer(initialState, action);
    expect(result.value).toBe(-1);
  });

  it('should increment by amount', () => {
    const initialState = { value: 0 };
    const action = { type: 'incrementByAmount', payload: 5 };
    const result = counterReducer(initialState, action);
    expect(result.value).toBe(5);
  });

  it('should handle multiple operations', () => {
    let state = { value: 0 };
    state = counterReducer(state, { type: 'increment' });
    state = counterReducer(state, { type: 'increment' });
    state = counterReducer(state, { type: 'decrement' });
    expect(state.value).toBe(1);
  });
});