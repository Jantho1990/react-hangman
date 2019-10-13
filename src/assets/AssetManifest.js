/**
 * The contents of the manifest.
 */
const contents = {}

/**
 * Allowed types of assets.
 */
const allowedTypes = [
  'sound',
  'data'
]

/**
 * A manifest for loading game assets.
 */
export default class AssetManifest {
  constructor(...lists) {
    lists.forEach(([assetType, value]) => {
      if (allowedTypes.find(type => type === assetType) === undefined) {
        throw new Error(`Undefined asset type in manifest: ${assetType}`)
      }
      contents[assetType] = value
    })

    return { ...contents }
  }
}