import { useEffect, useState } from 'react'

// Works like useState, but remembers the value in localStorage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key)
      return savedValue !== null ? JSON.parse(savedValue) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
