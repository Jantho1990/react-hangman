import { useContext } from 'react'
import { AssetsContext, onLoaded } from './AssetsContext'

const useAssets = () => {
  const [state, setState] = useContext(AssetsContext)

  let ready = false

  const isReady = key => {
    if (ready) return true
    console.warn(`Asset "${key}" is not yet loaded.`)
    return false
  }

  onLoaded(() => ready = true)

  const sound = key => {
    if (!isReady(key)) return

    if (state.sounds[key] === undefined) {
      throw new Error(`Sound "${key}" is not a loaded asset.`)
    }

    return state.sounds[key]
  }

  return {
    sound
  }
}

export default useAssets