import React, { useState } from 'react'
import useAssets from '../assets/useAssets'
import useLocalStorage from '../local-storage/useLocalStorage'

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
  // Default values from localStorage, if they exist.
  const { hydrateState, setItem } = useLocalStorage()
  const defaultValues = hydrateState({
    masterVolume: 1.0,
    musicChannelVolume: 1.0,
    sfxChannelVolume: 1.0
  })

  const [ masterVolume, setMasterVolumeFunc ] = useState(defaultValues.masterVolume)
  const setMasterVolume = value => {
    setItem('masterVolume', value)

    setMasterVolumeFunc(value)
  }

  const [ musicChannelVolume, setMusicChannelVolumeFunc ] = useState(defaultValues.musicChannelVolume)
  const setMusicChannelVolume = value => {
    setItem('musicChannelVolume', value)

    setMusicChannelVolumeFunc(value)
  }

  const [ sfxChannelVolume, setSfxChannelVolumeFunc ] = useState(defaultValues.sfxChannelVolume)
  const setSfxChannelVolume = value => {
    setItem('sfxChannelVolume', value)

    setSfxChannelVolumeFunc(value)
  }

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