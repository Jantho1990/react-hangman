import { objectFromEntries } from '../helpers'

/**
 * Loads a new HTMLAudioElement, without injecting it into the DOM.
 *
 * @param {string} path The path to the sound resource.
 *
 * @return {Promise} A promise resolving to the loaded HTMLAudioElement.
 */
const loadSound = path => {
  const sound = new Audio(path)

  return new Promise((resolve, reject) => {
    const onLoad = el => {
      sound.removeEventListener('canplay', onLoad, false)
      resolve(sound)
    }

    const onError = e => {
      sound.removeEventListener('error', onError, false)
      reject(e)
    }
  
    sound.addEventListener('canplay', onLoad, false)
    sound.addEventListener('error', onError, false)
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
  // File extension
  let contentType = ''
  const ext = path.split('.')
  if (ext[ext.length - 1] === 'json') {
    contentType = 'json'
  }

  return await fetch(path)
    .then(response => {
      switch (contentType) {
        case 'json':
          return response.json()
        default:
          return response.text()
      }
    })
    .then(text => text)
    .catch(e => { throw e })
}
let dbg = 0
/**
 * Takes an asset manifest and returns an object with the loaded assets.
 *
 * @param {Object} manifest An object formatted as an asset manifest.
 *
 * @return {Promise} A promise resolving to an object with the loaded assets.
 */
const loadFromManifest = async manifest => {
  let dbg2 = 0
  const loadedManifest = Object.entries(manifest).map(async ([assetType, assetTypeList]) => {
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

    const loadedAssets = Object.entries(assetTypeList).map(async ([name, path]) => {
      const result = await loaderFunc(path)
        .then(res => res)
        .catch(e => {throw e})

      return [name, result]
    })

    return await Promise.all(loadedAssets)
      .then(result => {
        return [assetType, objectFromEntries(result)]
      })
  })

  return await Promise.all(loadedManifest)
    .then(result => {
      return objectFromEntries(result)
    })
}

export {
  loadSound,
  loadData,
  loadFromManifest
}