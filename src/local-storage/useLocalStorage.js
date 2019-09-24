import { objectFromEntries } from 'helpers'

/**
 * A hook for saving and retrieving desired state to local storage.
 */
export default function useLocalStorage() {
  
  /**
   * For each key, returns either the saved value or, if
   * no saved value exists, a default value.
   *
   * @param {array} keys The keys to look for in stored state.
   *
   * @return {object}
   */
  const hydrateState = keys => {
    const arr = Object.entries(keys).map(([key, defaultValue]) => {
      const rawValue = getItemUnsafe(key)
      
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

  const getItemUnsafe = key => {
    return window.localStorage.getItem(key)
  }

  const getItem = key => {
    const value = getItemUnsafe(key)

    if (value === null) {
      throw new Error(`"${key}" was not found in local storage.`)
    }

    return JSON.parse(value)
  }

  const setItemUnsafe = (key, value) => {
    return window.localStorage.setItem(key, value)
  }

  const setItem  = (key, value) => {
    return setItemUnsafe(key, JSON.stringify(value))
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
   * @param {function} callback The update function.
   *
   * @return {void}
   */
  const updateWrapper = (key, value, callback) => {
    if (typeof value !== 'function') {
      setItem(key, value)
    } else {
      setItem(key, value())
    }

    return callback(value)
  }

  return {
    hydrateState,
    getItem,
    setItem,
    removeItem,
    updateWrapper
  }
}
