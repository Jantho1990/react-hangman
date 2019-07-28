import React, { useState } from 'react'
import useAssets from '../assets/useAssets'

const SoundContext = React.createContext([{}, () => {}])

let loaded = false
let loading = false

/**
 * Provider for game sounds.
 *
 * @param {*} props React props.
 *
 * @return {JSX} Component wrapped in SoundContext.
 */
const SoundProvider = (props) => {
  // This is being run multiple times, and it seems to reset the default state each time.
  // So somehow this component is being rerendered, but I'm not sure why.
  // Also, mutating the values directly seems to preserve the actual updates.
  // UPDATE: No, it is only running the initial state once. Confirmed by running default
  // state as a function and console.log, and it only showed once.
  /* const [state, setState] = useState({
    master: {
      volume: 1.0
    },
    channels: {
      music: {
        volume: 1.0
      },
      sfx: {
        volume: 1.0
      }
    },
    muted: false,
    sounds: {}
  }) */

  const [ masterVolume, setMasterVolume ] = useState(1.0)

  const [ musicChannelVolume, setMusicChannelVolume ] = useState(1.0)

  const [ sfxChannelVolume, setSfxChannelVolume ] = useState(1.0)

  const channelVolumeSetters = {
    music: setMusicChannelVolume,
    sfx: setSfxChannelVolume
  }

  const [ muted, setMuted ] = useState(false)

  const [ sounds, setSounds ] = useState({})

  const state = {
    master: {
      volume: masterVolume
    },
    channels: {
      music: {
        volume: musicChannelVolume
      },
      sfx: {
        volume: sfxChannelVolume
      }
    },
    muted,
    sounds,
    setMasterVolume,
    setMusicChannelVolume,
    setSfxChannelVolume,
    setMuted,
    setSounds,
    channelVolumeSetters
  }

  console.log('sound provider updated', state)

  const { onReady } = useAssets()
  onReady(assets => {
    loaded = true
    onLoadedCallbacks.forEach(callback => callback(assets))
  })

  return (
    <SoundContext.Provider value={state}>
      {props.children}
    </SoundContext.Provider>
  )
}

const onLoadedCallbacks = []

/**
 * Queues a callback to run when all assets are loaded.
 *
 * @param {Function} callback A callback function.
 *
 * @return {void}
 */
const onLoaded = callback => {
  onLoadedCallbacks.push(callback)
}

export { SoundContext, SoundProvider, onLoaded }