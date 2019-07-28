import React from 'react'
import { objectFromEntries } from '../helpers'

/**
 * A hook for saving and retrieving desired state to local storage.
 */
export default function useLocalStorage() {
  
  const hydrateState = keys => {
    const arr = Object.entries(keys).map(([key, defaultValue]) => {
      const rawValue = getItem(key)
      
      let value
      if (rawValue !== null) {
        value = JSON.parse(rawValue)
      } else {
        value = defaultValue
      }
      
      return [key, value]
    })
    
    return objectFromEntries(arr)
  }

  const getItem = key => {
    return window.localStorage.getItem(key)
  }

  const setItem = (key, value) => {
    return window.localStorage.setItem(key, value)
  }

  const removeItem = key => {
    return window.localStorage.removeItem(key)
  }

  return {
    hydrateState,
    getItem,
    setItem,
    removeItem
  }
}
