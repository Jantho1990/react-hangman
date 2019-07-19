import { useContext } from 'react'
import { AssetsContext, onLoaded } from './AssetsContext'

/**
 * Signifies if assets are ready to be used.
 */
let ready = false
onLoaded(() => ready = true)

const useAssets = () => {
  const [state, setState] = useContext(AssetsContext)

  const isReady = key => {
    if (ready) return true
    console.warn(`Cannot use asset "${key}", assets are not yet loaded.`)
    return false
  }

  const isLoaded = () => ready

  const sound = key => {
    if (!isReady(key)) return

    if (state.sound[key] === undefined) {
      throw new Error(`Sound "${key}" is not a loaded asset.`)
    }

    return state.sound[key]
  }

  return {
    isLoaded,
    sound
  }
}

export default useAssets