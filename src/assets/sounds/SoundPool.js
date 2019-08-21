import Sound from 'assets/sounds/Sound'

class SoundPool {
  constructor(audio, options = {}, poolSize = 3) {
    this.count = 0
    this.sounds = [...Array(poolSize)]
      .map(() => new Sound(audio, options))
    this.options = Object.assign({ volume: 1, baseVolume: 1 }, options)
    this.volume = options.volume
  }

  play(overrides) {
    const { sounds, options } = this
    const opts = Object.assign({ time: 0 }, options, overrides)
    const index = this.count++ % sounds.length
    sounds[index].play(opts)
  }

  stop() {
    this.sounds.forEach(sound => sound.stop())
  }

  get volume() {
    return this.options.volume
  }

  set volume(volume) {
    this.options.volume = volume
  }
}

export default SoundPool