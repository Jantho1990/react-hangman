class Sound {
  constructor(audio, options = {}) {
    this.playing = false
    this.audio = audio
    this.options = Object.assign({ volume: 1 }, options)

    if (options.loop) {
      audio.loop = true
    }

    return this
  }

  play(overrides) {
    const { audio, options } = this
    const opts = Object.assign({ time: 0 }, options, overrides)
    audio.volume = opts.volume
    audio.currentTime = opts.time
    audio.play()
    this.playing = true
  }

  stop() {
    this.audio.pause()
    this.playing = false
  }

  get volume() {
    return this.audio.volume
  }

  set volume(volume) {
    this.options.volume = this.audio.volume = volume
  }
}

export default Sound