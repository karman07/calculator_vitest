import { describe, it, expect } from 'vitest';

// Simple counter reducer for testing
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

describe('Redux Counter', () => {
  it('should increment', () => {
    const initialState = { value: 0 };
    const action = { type: 'increment' };
    const result = counterReducer(initialState, action);
    expect(result.value).toBe(1);
  });

  it('should decrement', () => {
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
});