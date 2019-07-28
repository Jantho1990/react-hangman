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

  /**
   * Helper function specifically for wrapping State Hook setters to
   * save their values to localStorage first.
   *
   * @param {string} key The key to save to in localStorage.
   * @param {*} value The incoming value.
   * @param {Function} callback The update function.
   *
   * @return {void}
   */
  const updateWrapper = (key, value, callback) => {
    setItem(key, value)

    callback(value)
  }

  return {
    hydrateState,
    getItem,
    setItem,
    removeItem,
    updateWrapper
  }
}
