import React, { useState } from 'react'
import styled from 'styled-components'
import useAssets from 'assets/useAssets'

const AudioEnableModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  height: 50vh;
  z-index: 500;
`

export default function SoundManager() {
  const [ audioEnabled, setAudioEnabled ] = useState(false)
  const { sound, onReady } = useAssets()

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

  const enableAudio = () => {
    sound('BackgroundMusic').play()
    setAudioEnabled(true)
  }

  const renderAudioEnabled = () => {
    if (audioEnabled) {
      return null
    }

    return (
      <AudioEnableModal>
        You need to enable audio
        <button onClick={enableAudio}>Do it!</button>
      </AudioEnableModal>
    )
  }

  return renderAudioEnabled()
}
