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
  const [state, setState] = useState({
    channels: {
      music: {
        volume: 1.0
      },
      sfx: {
        volume: 1.0
      }
    }
  })

  const { sound, onReady } = useAssets()

  if (!loaded && !loading) {
    loading = true
    
  }

  onReady(assets => {
    console.log('claims to be ready')
    const promise = assets.sound['BackgroundMusic'].play()
    if (promise !== undefined) {
      promise.then(result => {
        console.log('playing')
      }).catch(e => {
        console.log('not playing', e)
      })
    }
  })

  return (
    <SoundContext.Provider value={[state, setState]}>
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