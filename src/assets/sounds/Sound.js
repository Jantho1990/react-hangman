class Sound {
  audio = null
  constructor(audio, options = {}) {
    this.playing = false
    this.audio = audio
    this.options = Object.assign({ volume: 1, baseVolume: 1 }, options)

    if (options.loop) {
      audio.loop = true
    }

    return this
  }

  play(overrides) {
    const { audio, options } = this
    const opts = Object.assign({ time: 0 }, options, overrides)
    audio.volume = opts.volume * opts.baseVolume
    audio.currentTime = opts.time
    this.playing = true
    return audio.play()
  }

  stop() {
    this.audio.pause()
    this.playing = false
  }

  get volume() {
    return this.options.volume
  }

  set volume(volume) {
    this.options.volume = this.audio.volume = volume
  }
}

export default Sound