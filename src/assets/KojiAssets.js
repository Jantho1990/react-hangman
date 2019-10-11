import Koji from '@withkoji/vcc'
import AssetManifest from 'assets/AssetManifest'

const sound = Koji.config.sounds
const data = {
    wordList: Koji.config.general.wordListPath
}

const translateSoundToManifest = (kojiSound) => {
  let ret = {}
  kojiSound.list.map((sound) => {
    return [
      [sound.name], {
          ...sound,
          path: sound.source,
          options: {
              ...sound.options
          }
      }
    ]
  }).forEach(([name, sound]) => {
      ret[name] = sound
  })
  return ret
}

export const createManifest = () => {
  return new AssetManifest(
    [ 'sound', translateSoundToManifest(sound) ],
    [ 'data', data ]
  )
}