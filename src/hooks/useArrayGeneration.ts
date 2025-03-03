import { useState, useCallback } from 'react'

export function useArrayGeneration() {
  const [array, setArray] = useState<number[]>([])

  const generateRandomArray = useCallback((size: number) => {
    // Ensure size is within bounds
    const validSize = Math.min(Math.max(size, 2), 20)
    const newArray = Array.from({ length: validSize }, () => 
      Math.floor(Math.random() * 100)
    )
    setArray(newArray)
  }, [])

  const setCustomArray = useCallback((input: string) => {
    const numbers = input
      .split(',')
      .map(n => parseInt(n.trim(), 10))
      .filter(n => !isNaN(n))
    
    if (numbers.length >= 2 && numbers.length <= 20) {
      setArray(numbers)
    }
  }, [])

  return {
    array,
    setArray,
    generateRandomArray,
    setCustomArray
  }
} 