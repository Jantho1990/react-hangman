import { useContext } from 'react'
import { SoundContext, onLoaded } from 'sound-manager/SoundContext'
import useAssets from 'assets/useAssets'

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
  const { sound } = useAssets()
  const {
    master,
    channels,
    muted,
    sounds,
    setMasterVolume,
    setMuted,
    setSounds,
    channelVolumeSetters
  } = useContext(SoundContext)

  const isReady = key => {
    if (ready) return true
    console.warn(`Cannot use sound "${key}", assets are not yet loaded.`)
    return false
  }

  const isLoaded = () => ready

  const onReady = callback => {
    callbacks.push(callback)
  }

  /**
   * Plays a loaded audio asset.
   * @param {string} key The name of the audio to play. Must already be loaded.
   *
   * @return {void}
   */
  const play = key => {
    if (!isReady(key)) return
    if (muted) return

    const audio = sound(key)

    audio.volume = master.volume * channels[audio.channel].volume * audio.options.baseVolume

    audio.play()

    setSounds({
      ...sounds,
      [key]: audio
    })
  }

  /**
   * Stops an audio asset.
   * @param {string} key The name of the audio to stop.
   *
   * @return {void}
   */
  const stop = key => {
    const audio = sounds[key]

    if (audio === undefined) return

    audio.stop()

    const newSounds = sounds
    delete newSounds[key]
    setSounds({
      ...newSounds
    })
  }

  /**
   * Check to see if an audio asset is currently playing.
   *
   * @param {string} key The name of the audio asset.
   *
   * @return {boolean} The playing status of the audio asset, or false if it isn't defined.
   */
  const isPlaying = key => {
    const audio = sounds[key]

    if (audio === undefined) {
      return false
    }

    return audio.playing
  }

  /**
   * Change a channel's volume.
   * @param {string} channelName The name of the channel.
   * @param {number} volume The volume to change to, from 0 to 1.
   *
   * @return {void}
   */
  const changeChannelVolume = (channelName, volume) => {
    if (volume > 1) {
      throw new Error(`Volume must be a number between 0 and 1, ${volume} provided.`)
    }
    
    const channel = channels[channelName]
    if (channel === undefined) {
      throw new Error(`Channel "${channelName}" not found in SoundContext.`)
    }

    channelVolumeSetters[channelName](volume)
  }

  /**
   * Change the master volume.
   *
   * @param {number} volume The volume to change to, from 0 to 1.
   *
   * @return {void}
   */
  const changeMasterVolume = volume => {
    if (volume > 1) {
      throw new Error(`Volume must be a number between 0 and 1, ${volume} provided.`)
    }

    setMasterVolume(volume)
  }

  /**
   * Update the volumes on all playing sounds.
   *
   * @return {void}
   */
  const updateSoundVolumes = () => {
    if (sounds !== undefined) {
      Object.entries(sounds).forEach(([, sound]) => {
        if (muted) {
          sound.volume = 0
        } else {
          sound.volume = master.volume * channels[sound.channel].volume * sound.options.baseVolume
        }
      })
    }
  }

  /**
   * Toggles sound muting.
   *
   * @return {void}
   */
  const toggleMute = () => {
    setMuted(!muted)
  }

  updateSoundVolumes()

  return {
    isLoaded,
    onReady,
    play,
    stop,
    isPlaying,
    master,
    channels,
    changeChannelVolume,
    changeMasterVolume,
    updateSoundVolumes,
    muted,
    toggleMute
  }
}

export default useSound