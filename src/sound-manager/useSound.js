import { useContext } from 'react'
import { SoundContext, onLoaded } from './SoundContext'
import useAssets from '../assets/useAssets'

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

const useSound = () => {
  const [state, setState] = useContext(SoundContext)
  const { sound, isLoaded: assetsLoaded } = useAssets()

  const isReady = key => {
    if (ready) return true
    console.warn(`Cannot use sound "${key}", assets are not yet loaded.`)
    return false
  }

  const isLoaded = () => ready

  const onReady = callback => {
    callbacks.push(callback)
  }

  const play = key => {
    if (!isReady(key)) return

    const audio = sound(key)

    audio.volume *= state.channels[audio.channel].volume

    audio.play()

    setState({
      ...state,
      sounds: {
        ...state.sounds,
        [key]: audio
      }
    })
  }

  const stop = key => {
    const audio = state.sounds[key]

    if (audio === undefined) {
      throw new Error(`Audio "${key}" not found in SoundContext.`)
    }

    audio.stop()

    const newSounds = state.sounds
    delete newSounds[key]
    setState({
      ...state,
      sounds: {
        ...newSounds
      }
    })
  }

  const isPlaying = key => {
    console.log(state)
    const audio = state.sounds[key]

    if (audio === undefined) {
      return false
    }

    return audio.playing
  }

  const changeVolume = (channelName, volume) => {
    if (volume > 1) {
      throw new Error(`Volume must be a number between 0 and 1, ${volume} provided.`)
    }
    
    const channel = state.channels[channelName]
    if (channel === undefined) {
      throw new Error(`Channel "${channelName}" not found in SoundContext.`)
    }

    channel.volume = volume

    setState({
      ...state,
      channels: {
        ...state.channels,
        [channelName]: channel
      }
    })
  }

  return {
    isLoaded,
    onReady,
    play,
    stop,
    isPlaying,
    changeVolume
  }
}

export default useSound