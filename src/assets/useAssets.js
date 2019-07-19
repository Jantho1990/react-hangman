import { useContext } from 'react'
import { AssetsContext } from './AssetsContext'

const useAssets = () => {
  const [state, setState] = useContext(AssetsContext)

  const sound = key => {
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