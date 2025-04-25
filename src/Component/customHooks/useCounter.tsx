"use client"
import { useState } from 'react';

function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev > 0 ? ( prev - 1 ): prev);
  const reset = () => setCount(initialValue);

  return {count, increment, decrement, reset} as const;
}

export default useCounter;