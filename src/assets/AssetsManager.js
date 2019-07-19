import Assets from './Assets'
import sounds from '../config/sounds.json'

const assets = {
  sounds: {}
}

class AssetsManager {
  constructor() {
    Object.entries(sounds).forEach(([name, src]) => {
      Assets.sound(src).then(sound => assets.sounds[name] = sound)
    })
  }


}

export default AssetsManager