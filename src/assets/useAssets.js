import { useContext } from 'react'
import { AssetsContext, onLoaded } from './AssetsContext'

/**
 * Signifies if assets are ready to be used.
 */
let ready = false
onLoaded(assets => {
  ready = true
  callbacks.forEach(callback => callback(assets))
})

/**
 * Callbacks to run once assets are ready.
 */
const callbacks = []

const useAssets = () => {
  const [state, setState] = useContext(AssetsContext)

  const isReady = key => {
    if (ready) return true
    console.warn(`Cannot use asset "${key}", assets are not yet loaded.`)
    return false
  }

  const isLoaded = () => ready

  const onReady = callback => {
    callbacks.push(callback)
  }

  const sound = key => {
    if (!isReady(key)) return

    if (state.sound[key] === undefined) {
      throw new Error(`Sound "${key}" is not a loaded asset.`)
    }

    return state.sound[key]
  }

  const data = key => {
    if (!isReady(key)) return

    if (state.data[key] === undefined) {
      throw new Error(`Data "${key} is not a loaded asset.`)
    }

    return state.data[key]
  }

  return {
    isLoaded,
    onReady,
    sound,
    data
  }
}

export default useAssets