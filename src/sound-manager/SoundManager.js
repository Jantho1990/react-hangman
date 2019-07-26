import React from 'react'
import useAssets from '../assets/useAssets'

export default function SoundManager() {
  const { sound } = useAssets()

  sound('BackgroundMusic').play()
  
  return null
}
