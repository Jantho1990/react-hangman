import { objectFromEntries } from '../helpers'

/**
 * Loads a new HTMLAudioElement, without injecting it into the DOM.
 *
 * @param {string} path The path to the sound resource.
 *
 * @return {Promise} A promise resolving to the loaded HTMLAudioElement.
 */
const loadSound = async path => {
  const sound = new Audio(path)

  return new Promise((resolve, reject) => {
    const onLoad = el => {
      sound.removeEventListener('canplay', onLoad, false)
      resolve(sound)
    }
  
    sound.addEventListener('canplay', onLoad, false)
  })
}

/**
 * Fetches a data resource and returns its contents.
 *
 * @param {string} path The path to the data resource.
 * 
 * @return {Promise} A promise resolving to the loaded resource.
 */
const loadData = async path => {
  return await fetch(path)
    .then(response => response.body)
    .catch(e => { throw e })
}

/**
 * Takes an asset manifest and returns an object with the loaded assets.
 *
 * @param {Object} manifest An object formatted as an asset manifest.
 *
 * @return {Promise} A promise resolving to an object with the loaded assets.
 */
const loadFromManifest = async manifest => {
  const loadedManifest = await Object.entries(manifest).map(async ([assetType, assetTypeList]) => {
    let loaderFunc

    switch (assetType) {
      case 'sound':
        loaderFunc = loadSound
        break
      case 'data':
        loaderFunc = loadData
        break
      default:
        throw new Error(`Unknown asset type "${assetType}`)
    }

    const loadedAssets = await Object.entries(assetTypeList).map(async ([name, path]) => {
      return await [name, loaderFunc(path)]
    })
    debugger

    return [assetType, objectFromEntries(loadedAssets)]
  })

  return objectFromEntries(loadedManifest)
}

export {
  loadSound,
  loadData,
  loadFromManifest
}